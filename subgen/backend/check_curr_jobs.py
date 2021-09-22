from backend.models import Job
import boto3
import botocore
from srtUtils import *

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
