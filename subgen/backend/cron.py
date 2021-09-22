from backend.models import Job
import boto3
import botocore
import os
from pathlib import Path
import moviepy.editor as mp
from srtUtils import *

def check_uploads():
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')

    newJobs = Job.objects.filter(status='Started')
    if newJobs:
        for job in newJobs:
    
            #Video file location
            uploadFile = "../subgen/media/uploads/" + str(job.file).split('/')[-1]
            #Audio file location
            filename = '../subgen/media/uploads/' + job.name + ".mp3"
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
                #os.remove(filename)

def check_curr_jobs():
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')

    currJobs = Job.objects.filter(status='Transcribing')

    if currJobs:
        for jobs in currJobs:
    
            filename = job.name + ".json"
    
            status = transcribe.get_transcription_job(TranscriptionJobName=job.name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED']:
                #File transcribed, pulling json and converting to srt
                #new files to be found in media/temp with file name = job name
                try:
                    s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, '../media/temp/'+filename)
                except botocore.exceptions.ClientError as e:
                    if e.response['Error']['Code'] == "404":
                        print("Output file could not be found")
                        continue
                    else:
                        raise
                #json to srt
                with open('../media/temp/'+filename) as f:
                    data = writeTranscriptToSRT(f.read(), 'en', '../media/temp/'+job.name+'.srt')
    
                #json to txt
                jsonFile = json.load(open('../media/temp/'+filename, 'r'))
                transcript = jsonFile['results']['transcripts'][0]['transcript']
                with open('../media/temp/'+job.name+'.txt', 'w') as transcriptFile:
                    transcriptFile.write(transcript)
    
                #Change Job status, job completed
                job.status = 'Completed'
                job.save()
    
            elif status['TranscriptionJob']['TranscriptionJobStatus'] in ['FAILED']:
                #Error transcribing, pulling json for error information
                try:
                    s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, '../media/temp/'+filename)
                except botocore.exceptions.ClientError as e:
                    if e.response['Error']['Code'] == "404":
                        print("Output file could not be found")
                        continue
                    else:
                        raise

