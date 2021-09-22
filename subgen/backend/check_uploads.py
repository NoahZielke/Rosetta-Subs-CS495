from backend.models import Job
import boto3
import botocore
import os
from pathlib import Path
import moviepy.editor as mp

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
