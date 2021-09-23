from backend.models import Job
from django.conf import settings
import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from zipfile import ZipFile
import boto3
import botocore
import os
from pathlib import Path
import moviepy.editor as mp
from .srtUtils import *

def check_uploads():
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')
    file = open(str(settings.BASE_DIR) + '/media/temp/didCronRun.txt', 'w')
    file.write('The cronjob ran')
    newJobs = Job.objects.filter(status='Started')
    if newJobs:
        for job in newJobs:
    
            #Video file location
            uploadFile = str(settings.BASE_DIR)+"/media/uploads/" + str(job.file).split('/')[-1]
            #Audio file location
            filename = str(settings.BASE_DIR)+'/media/uploads/' + job.name + ".mp3"
            myFile = Path(uploadFile)
            #Convert Video to audio
            if myFile.exists():
                currClip = mp.VideoFileClip(uploadFile)
                currClip.audio.write_audiofile(filename)
            
            #upload audio file to s3 bucket
            try:
                data = open(filename, 'rb')
            except OSError:
                print("Unable to open file: " + filename)
                continue
            with data:
                newLoc = "subgen_input/" + job.name + ".mp3"
                s3.Bucket('subgenstoragebucket').put_object(Key=newLoc, Body=data)
                
                #Request Transcription Job
                job_uri = "s3://subgenstoragebucket/" + newLoc
                outputFile = "subgen_output/" + job.name + ".json"
                transcribe.start_transcription_job(
                        TranscriptionJobName=job.name,
                        Media={'MediaFileUri': job_uri},
                        OutputBucketName="subgenstoragebucket",
                        OutputKey=outputFile,
                        LanguageCode='en-US'
                )
    
                #Change job status
                job.status='Transcribing'
                job.save()
        
                # If we want to delete file after sent to s3: 
                os.remove(filename)

def check_curr_jobs():
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')

    currJobs = Job.objects.filter(status='Transcribing')
    if currJobs:
        for job in currJobs:
    
            filename = job.name + ".json"
            status = transcribe.get_transcription_job(TranscriptionJobName=job.name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED']:
                #File transcribed, pulling json and converting to srt
                #new files to be found in media/temp with file name = job name
                try:
                    print('getting json file from bucket')
                    s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
                    print('got json file from bucket')
                except botocore.exceptions.ClientError as e:
                    if e.response['Error']['Code'] == "404":
                        print("Output file could not be found")
                        continue
                    else:
                        raise
                
                #json to srt
                with open(str(settings.BASE_DIR)+'/media/temp/'+filename) as f:
                    data = writeTranscriptToSRT(f.read(), 'en', str(settings.BASE_DIR)+'/media/temp/'+job.name+'.srt')
    
                #json to txt
                jsonFile = json.load(open(str(settings.BASE_DIR)+'/media/temp/'+filename, 'r'))
                transcript = jsonFile['results']['transcripts'][0]['transcript']
                with open(str(settings.BASE_DIR)+'/media/temp/'+job.name+'.txt', 'w') as transcriptFile:
                    transcriptFile.write(transcript)
    
                #Change Job status, job completed
                job.status = 'Completed'
                job.save()
    
            elif status['TranscriptionJob']['TranscriptionJobStatus'] in ['FAILED']:
                #Error transcribing, pulling json for error information
                try:
                    s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
                except botocore.exceptions.ClientError as e:
                    if e.response['Error']['Code'] == "404":
                        print("Output file could not be found")
                        continue
                    else:
                        raise
                job.status = 'Failed'
                job.save()

def check_all_jobs():
    completedJobs = Job.objects.filter(status='Completed')
    subject = "Your Transcription Job Has Been Completed"
    body = "Please find your subtitle file, transcription and AWS json information file in the atttached zip file"
    sender_email = "noreply.subgen@gmail.com"
    password = settings.EMAIL_PASSWORD

    for job in completedJobs:
        receiver_email = job.email_address
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message["Bcc"] = receiver_email  # Recommended for mass emails
        message.attach(MIMEText(body, "plain"))
        
        files = [job.name + ext for ext in ['.json', '.txt', '.srt']]
        filename = str(settings.BASE_DIR) + '/media/temp/' + job.name + '.zip'

        with ZipFile(filename, 'w') as zip:
            for file in files:
                zip.write(os.path.join(str(settings.BASE_DIR)+'/media/temp/',filename), arcname=file)

        # Open PDF file in binary mode
        with open(filename, "rb") as attachment:
            # Add file as application/octet-stream
            # Email client can usually download this automatically as attachment
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())

        # Encode file in ASCII characters to send by email    
        encoders.encode_base64(part)

        # Add header as key/value pair to attachment part
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {job.name + '.zip'}",
        )

        # Add attachment to message and convert message to string
        message.attach(part)
        
        text = message.as_string()
        # Log in to server using secure context and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, text)
        
        job.status = 'Sent Confirmation'
        job.save()
    
    subject = "Your Transcription Job Has Failed"
    body = "Please find the FailureReason in the json file"
    failedJobs = Job.objects.filter(status='Completed')
    for job in failedJobs:
        receiver_email = job.email_address
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject
        message["Bcc"] = receiver_email  # Recommended for mass emails
        message.attach(MIMEText(body, "plain"))
        
        files = [job.name + ext for ext in ['.json']]
        filename = str(settings.BASE_DIR) + '/media/temp/' + job.name + '.zip'

        with ZipFile(filename, 'w') as zip:
            for file in files:
                zip.write(os.path.join(str(settings.BASE_DIR)+'/media/temp/',filename), arcname=file)

        # Open PDF file in binary mode
        with open(filename, "rb") as attachment:
            # Add file as application/octet-stream
            # Email client can usually download this automatically as attachment
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())

        # Encode file in ASCII characters to send by email    
        encoders.encode_base64(part)

        # Add header as key/value pair to attachment part
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {job.name + '.zip'}",
        )

        # Add attachment to message and convert message to string
        message.attach(part)
        
        text = message.as_string()
        # Log in to server using secure context and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, text)
        
        job.status = 'Sent Confirmation'
        job.save()
    return