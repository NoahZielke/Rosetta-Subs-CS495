from backend.models import Job
from user.models import User
from django.conf import settings
import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import boto3
import botocore
import os
from pathlib import Path
import moviepy.editor as mp
from .srtUtils import *
import eng_to_ipa as ipa
import time
import string

def pullJSONGenSRTCompleted(jobName):
    s3 = boto3.resource('s3')
    job = Job.objects.get(id=jobName)
    filename = str(job.id) + ".json"
    try:
        print('getting json file from bucket')
        s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
        print('got json file from bucket')
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("Output file could not be found")
        else:
            raise
    
    #json to srt
    with open(str(settings.BASE_DIR)+'/media/temp/'+filename) as f:
        data = writeTranscriptToSRT(f.read(), 'en', str(settings.BASE_DIR)+'/media/temp/'+str(job.id)+'.srt')

    #json to txt
    jsonFile = json.load(open(str(settings.BASE_DIR)+'/media/temp/'+filename, 'r'))
    transcript = jsonFile['results']['transcripts'][0]['transcript']
    with open(str(settings.BASE_DIR)+'/media/temp/'+str(job.id)+'.txt', 'w') as transcriptFile:
        transcriptFile.write(transcript)

    #Change Job status, job completed
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
    
    files = [str(settings.BASE_DIR) + '/media/temp/' + str(job.id) + ext for ext in ['.json', '.txt', '.srt']]

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
        s3.Bucket('subgenstoragebucket').download_file('subgen_output/'+filename, str(settings.BASE_DIR)+'/media/temp/'+filename)
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
    
    files = [str(settings.BASE_DIR) + '/media/temp/' + str(job.id) + ext for ext in ['.json']]

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

def transcribeNewUploads():
    s3 = boto3.resource('s3')
    transcribe = boto3.client('transcribe')
    newJobs = Job.objects.filter(status='Started')
    #Still checking with transcribe for all 'Started' Jobs in case of multiple file uploads or possibly ignored job
    if newJobs:
        for job in newJobs:
    
            #Video file location
            uploadFile = str(settings.BASE_DIR)+"/media/uploads/" + str(job.filename).split('/')[-1]
            #Audio file location
            filename = str(settings.BASE_DIR)+'/media/uploads/' + str(job.id) + ".mp3"
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
                newLoc = "subgen_input/" + str(job.id) + ".mp3"
                s3.Bucket('subgenstoragebucket').put_object(Key=newLoc, Body=data)
                
                #Request Transcription Job
                job_uri = "s3://subgenstoragebucket/" + newLoc
                outputFile = "subgen_output/" + str(job.id) + ".json"
                transcribe.start_transcription_job(
                        IdentifyLanguage=True,
                        TranscriptionJobName=str(job.id),
                        Media={'MediaFileUri': job_uri},
                        OutputBucketName="subgenstoragebucket",
                        OutputKey=outputFile
                )
    
                #Change job status
                job.status='Transcribing'
                job.save()
        
                # If we want to delete file after sent to s3: 
                os.remove(filename)

def receiveVocabWords(user, words):
    currUser = User.objects.get(username=user)
    if not currUser:
        err = "User does not exist"
        return err
    else:
        if currUser.vocab == False:
            return genVocabFile(user, words)
        else:
            return updateVocabFile(user, words)


#Function to create text file for vocab and upload to s3
#args --
#   user - username for vocab file
#   words - array of words/phrases/acronym
def genVocabFile(user, words):

    symbols = ["a", "b", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "s", "t", "u", "v", "w", "z",
                 "ə", "eɪ", "ɑ", "æ","ə","ɔ",
                "aʊ",  "aɪ", "ʧ", "ð", "ɛ",
                "h", "ɪ", "ʤ", "ŋ", "oʊ", "ɔɪ",
                "ʃ", "θ", "ʊ", "u", "ʒ", "l̩", "n̩", "ɝ", "ɡ", "ɹ", "ʌ", "ʍ"]

    filename = str(settings.BASE_DIR)+"/media/temp/" + user + ".txt"
    f = open(filename, "w+")
    f.write("Phrase\tIPA\tSoundsLike\tDisplayAs\r\n")
    output = []
    for word in words:
        output.append(word)
        formWord = word.replace("-", " ")
        formWord = formWord.translate(str.maketrans('','',string.punctuation))
        convWord = ipa.convert(text=formWord, stress_marks="none")

        if '*' in convWord:
            print("Unable to translate word: " + word + " to IPA for vocabulary creation\n")
            ipaWord = ""
        else:
            ipaWord = convWord.replace("  ", " ")
            ipaWord = ipaWord.strip()

            segments = ipaWord.split(" ")
            for seg in segments:
                if seg in symbols:
                    pass
                else:
                    print("Unsupported character in translation, IPA unavailable for this word")
                    ipaWord = ""
                    break

        dashedWord = word.replace(' ', '-')
        newLine = dashedWord + "\t" + ipaWord + "\t" + "\t" + word + "\r\n"
        f.write(newLine)
    f.close()

    uploadFileName = "vocab/" + user + ".txt"
    s3 = boto3.resource('s3')
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
    
    while True:
        status = transcribe.get_vocabulary(VocabularyName=user)
        if status['VocabularyState'] in ['READY']:
            print("Vocabulary successfully created\n")
            break
        elif status['VocabularyState'] in['FAILED']:
            print("Vocabulary could not be created, failure reason: \n \t")
            print(status['FailureReason']  + "\n")
            break
        else:
            time.sleep(10)

    #Update user model to indicate vocabulary exists for user
    currUser = User.objects.get(username=user)
    currUser.vocab = True
    currUser.save()
    return output

#Function to update text file for vocab and upload to s3
#args --
#   user - username for vocab file
#   words - array of words/phrases/acronym
def updateVocabFile(user, words):
    symbols = ["a", "b", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p",
                 "s", "t", "u", "v", "w", "z", "ə", "eɪ", "ɑ", "æ","ə","ɔ",
                "aʊ",  "aɪ", "ʧ", "ð", "ɛ", "h", "ɪ", "ʤ", "ŋ", "oʊ", "ɔɪ",
                "ʃ", "θ", "ʊ", "u", "ʒ", "l̩", "n̩", "ɝ", "ɡ", "ɹ", "ʌ", "ʍ"]

    s3 = boto3.resource('s3')
    downloadFileName = user + ".txt"
    try:
        s3.Bucket('subgenstoragebucket').download_file('vocab/'+downloadFileName, str(settings.BASE_DIR)+'/media/temp/'+ downloadFileName)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("Vocab file could not be found")
            return "Vocab file could not be found"
        else:
            raise
    
    filename = str(settings.BASE_DIR) + "/media/temp/" + user + ".txt"

    output = []
    q = open(filename, "r")
    lines = q.readlines()
    for line in lines:
        chunks = line.split("\t")
        if chunks[3] == "DisplayAs":
            continue
        output.append(chunks[3])
    q.close()

    f = open(filename, "a")
    for word in words:
        output.append(word)
        formWord = word.replace("-", " ")
        formWord = formWord.translate(str.maketrans('','',string.punctuation))
        convWord = ipa.convert(text=formWord, stress_marks="none")

        if '*' in convWord:
            print("Unable to translate word: " + word + " to IPA for vocabulary creation\n")
            ipaWord = ""
        else:
            ipaWord = convWord.replace("  ", " ")
            ipaWord = ipaWord.strip()

            segments = ipaWord.split(" ")
            for seg in segments:
                if seg in symbols:
                    pass
                else:
                    print("Unsupported character in translation, IPA unavailable for this word")
                    ipaWord = ""
                    break

        dashedWord = word.replace(' ', '-')
        newLine = dashedWord + "\t" + ipaWord + "\t" + "\t" + word + "\r\n"
        f.write(newLine)
    f.close()

    #s3.delete_object(Bucket='subgenstoragebucket', Key='vocab/'+downloadFileName)
    s3.Bucket('subgenstoragebucket').delete_objects(Delete={
        'Objects': [{'Key':'vocab/'+downloadFileName}]
    })

    data = open(filename, 'rb')
    s3.Bucket('subgenstoragebucket').put_object(Key='vocab/'+downloadFileName, Body=data)
    #os.remove(filename)

    transcribe = boto3.client('transcribe')
    uriLoc = "s3://subgenstoragebucket/vocab/" + downloadFileName
    transcribe.update_vocabulary(
            VocabularyName=user,
            LanguageCode='en-US',
            VocabularyFileUri=uriLoc
    )

    while True:
        status = transcribe.get_vocabulary(VocabularyName=user)
        if status['VocabularyState'] in ['READY']:
            print("Vocabulary successfully created\n")
            break
        elif status['VocabularyState'] in['FAILED']:
            print("Vocabulary could not be created, failure reason: \n \t")
            print(status['FailureReason']  + "\n")
            break
        else:
            time.sleep(10)
    return output

#Function to retrieve vocabulary for displaying
#args --
#   user - username for retrieval
def getVocab(user):
    currUser = User.objects.get(username=user)
    if not currUser:
        print("User does not exist")
        return "Could not find user"
    if currUser.vocab == False:
        print("User does not have a vocabulary file. Please create one\n")
        return
    s3 = boto3.resource('s3')
    fileUri = "vocab/" + user + ".txt"
    filename = user + ".txt"
    try:
        s3.Bucket('subgenstoragebucket').download_file(fileUri, str(settings.BASE_DIR)+'/media/temp/'+ filename)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("Vocab file could not be found")
        else:
            raise

    fileLoc = str(settings.BASE_DIR) + "/media/temp/" + filename
    f = open(fileLoc, "r")
    lines = f.readlines()
    vocabWords = []

    for line in lines:
        chunks = line.split("\t")
        chunk = chunks[3][:-1]
        if chunk == "DisplayAs":
            continue
        vocabWords.append(chunk)
    print(vocabWords)
    f.close()
    os.remove(fileLoc)
    return vocabWords

#Function to delete users vocabulary file
#args -- 
#   user - username of user whose vocabulary needs deleted
def deleteVocab(user):
    currUser = User.objects.get(username=user)
    if not currUser:
        print("User does not exist")
        return
        
    if currUser.vocab == False:
        print("User does not have a vocabulary file. Please create one\n")
        return
    
    transcribe = boto3.client('transcribe')
    transcribe.delete_vocabulary(VocabularyName = user)
    s3 = boto3.client('s3')
    fileUri = "vocab/" + user + ".txt"
    s3.delete_object(Bucket='subgenstoragebucket', Key=fileUri)

    currUser.vocab = False
    currUser.save()