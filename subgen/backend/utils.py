from backend.models import Job
from django.conf import settings
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import boto3, botocore, os, email, smtplib, ssl, moviepy.editor as mp
from pathlib import Path
from .srtUtils import *
import eng_to_ipa as ipa
from moviepy.video.tools.subtitles import SubtitlesClip
from moviepy.video.io.VideoFileClip import VideoFileClip


def pullJSONGenSRTCompleted(jobName):
    s3 = boto3.resource('s3')
    job = Job.objects.get(id=jobName)
    filename = str(job.id) + ".json"
    try:
        print('getting json file from bucket')
        s3.Bucket('subgenstoragebucket').download_file(
            'subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
        print('got json file from bucket')
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("Output file could not be found")
        else:
            raise

    # json to srt
    with open(str(settings.BASE_DIR)+'/media/temp/'+filename) as f:
        data = writeTranscriptToSRT(f.read(), 'en', str(
            settings.BASE_DIR)+'/media/temp/'+str(job.id)+'.srt')

    # json to txt
    jsonFile = json.load(
        open(str(settings.BASE_DIR)+'/media/temp/'+filename, 'r'))
    transcript = jsonFile['results']['transcripts'][0]['transcript']
    with open(str(settings.BASE_DIR)+'/media/temp/'+str(job.id)+'.txt', 'w') as transcriptFile:
        transcriptFile.write(transcript)

    # Change Job status, job completed
    job.status = 'Completed'
    job.save()


def sendFilesCompleted(jobName):
    job = Job.objects.get(id=jobName)
    subject = "Your Transcription Job Has Been Completed"
    body = "Please find your subtitle file, transcription and AWS json information file in the atttached zip file"
    sender_email = "noreply.subgen@gmail.com"
    password = settings.EMAIL_PASSWORD

    receiver_email = job.email_address
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message["Bcc"] = receiver_email  # Recommended for mass emails
    message.attach(MIMEText(body, "plain"))

    files = [str(settings.BASE_DIR) + '/media/temp/' +
             str(job.id) + ext for ext in ['.json', '.txt', '.srt']]

    for file in files:
        with open(file, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {(str(job.filename)).split('.')[0]  + '.' + (file.split('/')[-1]).split('.')[1]}",
        )
        message.attach(part)

    text = message.as_string()
    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)

    job.status = 'Sent Confirmation'
    job.save()
    for file in files:
        os.remove(file)


def pullJSONGenSRTFailed(jobName):
    job = Job.objects.get(id=jobName)
    filename = str(job.id) + ".json"
    s3 = boto3.resource('s3')
    try:
        s3.Bucket('subgenstoragebucket').download_file(
            'subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("Output file could not be found")
        else:
            raise
    job.status = 'Failed'
    job.save()


def sendFilesFailed(jobName):
    job = Job.objects.get(id=jobName)
    subject = "Your Transcription Job Has Failed"
    body = "Please find the FailureReason in the json file"
    sender_email = "noreply.subgen@gmail.com"
    password = settings.EMAIL_PASSWORD
    receiver_email = job.email_address
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message["Bcc"] = receiver_email  # Recommended for mass emails
    message.attach(MIMEText(body, "plain"))

    files = [str(settings.BASE_DIR) + '/media/temp/' +
             str(job.id) + ext for ext in ['.json']]

    for file in files:
        with open(file, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {(str(job.filename)).split('.')[0] + '.' + (file.split('/')[-1]).split('.')[1]}",
        )
        message.attach(part)

    text = message.as_string()
    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)

    job.status = 'Sent Confirmation'
    job.save()
    for file in files:
        os.remove(file)


def transcribeNewUploads(job):
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')
    newJobs = Job.objects.filter(status='Started')
    #Still checking with transcribe for all 'Started' Jobs in case of multiple file uploads or possibly ignored job
#    if newJobs:
 #       for job in newJobs:
    
            #Video file location
    uploadFile = (str(settings.BASE_DIR)+"/media/uploads/" + str(job.filename).split('/')[-1]).replace(' ', '_')
    #Audio file location
    filename = str(settings.BASE_DIR)+'/media/uploads/' + str(job.id) + ".mp3"
    myFile = Path(uploadFile)
    #Convert Video to audio
    if myFile.exists():
        currClip = mp.VideoFileClip(uploadFile)
        currClip.audio.write_audiofile(filename)
        os.remove(uploadFile)
    #upload audio file to s3 bucket
    try:
        data = open(filename, 'rb')
        with data:
            newLoc = "subgen_input/" + str(job.id) + ".mp3"
            s3.Bucket('subgenstoragebucket').put_object(Key=newLoc, Body=data)
                    
            #Request Transcription Job
            job_uri = "s3://subgenstoragebucket/" + newLoc
            outputFile = "subgen_output/" + str(job.id) + ".json"
            transcribe.start_transcription_job(
                    TranscriptionJobName=str(job.id),
                    Media={'MediaFileUri': job_uri},
                    OutputBucketName="subgenstoragebucket",
                    OutputKey=outputFile,
                    LanguageCode='en-US'
            )
            os.remove(filename)
            #Change job status
            job.status='Transcribing'
            job.save()
    except OSError:
        print("Unable to open file: " + filename)

# Function to create text file for vocab and upload to s3
# args --
#   user - username for vocab file
#   words - array of words/phrases/acronym
def genVocabFile(user, words):
    filename = str(settings.BASE_DIR)+"/media/temp/" + user + ".txt"
    f = open(filename, "w+")
    f.write("Phrase\tIPA\tSoundsLike\tDisplayAs\r\n")
    for word in words:
        if ipa.isin_cmu(word):
            ipaWord = ipa.convert(word)
        else:
            ipaWord = ""
        dashedWord = word.replace(' ', '-')
        newLine = dashedWord + "\t" + ipaWord + "\t\t" + word + "\r\n"
        f.write(newLine)
    f.close()

    uploadFileName = "vocab/" + user + ".txt"
    s3 = boto3.client('s3')
    data = open(filename, 'rb')
    s3.Bucket('subgenstoragebucket').put_object(Key=uploadFileName, Body=data)
    os.remove(filename)

    transcribe = boto3.client('transcribe')
    uriLoc = "s3://subgenstoragebucket/" + uploadFileName
    transcribe.create_vocabulary(
        VocabularyName=user,
        LanguageCode='en-US',
        VocabularyFileUri=uriLoc
    )

    # Update user model to indicate vocabulary exists for user
    #currUser = User.objects.filter(name=user)
    #currUser.vocab = true


def burnCaption(videoFile, srtFile, outputFile):
    generator = lambda txt: mp.TextClip(txt, font='Georgia-Regular', fontsize=42, color='white', bg_color='black')
    sub = SubtitlesClip(srtFile, generator)
    myvideo = VideoFileClip(videoFile)
    final = mp.CompositeVideoClip([myvideo, sub.set_position(('center', 'bottom'))])
    final.write_videofile(outputFile, fps=myvideo.fps)

def sendEmail(emailAddress, subject, body, file, filename):
    sender_email = "noreply.subgen@gmail.com"
    password = settings.EMAIL_PASSWORD
    receiver_email = emailAddress
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message["Bcc"] = receiver_email  # Recommended for mass emails
    message.attach(MIMEText(body, "plain"))

    with open(file, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {filename}",
    )
    message.attach(part)

    text = message.as_string()
    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)
    return