from django.contrib.auth.models import User, Group
from django.conf import settings
from django.db.models import base
from rest_framework import viewsets, parsers
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GroupSerializer, JobSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import Job
from .utils import pullJSONGenSRTCompleted, sendFilesCompleted, pullJSONGenSRTFailed, sendFilesFailed, transcribeNewUploads, burnCaption, sendEmail
from .srtUtils import writeTranslationToSRT
from .audioUtils import getAudioTranscript, overwriteAudio, getOrigAudio
import json, datetime, shutil, os
from django.http import HttpResponse, FileResponse
from zipfile import ZipFile
from django.core.files.storage import FileSystemStorage


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        mostRecentJob = Job.objects.latest('id')
        transcribeNewUploads(mostRecentJob)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@csrf_exempt
def completed_job(request):
    if request.method == 'POST':
        requestBodyStripped = (request.body).strip(b"'<>() ")
        requestBodyJson = requestBodyStripped.replace(b'\'', b'\"')
        jsonObj = json.loads(requestBodyJson)
        jobName = jsonObj['detail']['TranscriptionJobName']
        pullJSONGenSRTCompleted(jobName)
        sendFilesCompleted(jobName)
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def failed_job(request):

    return

def getLanguageCode(lang):
    langCodeMappings = {'Arabic':'ar', 'Chinese (Simplified)':'zh', 'Danish':'da', 'Dutch':'nl', 'English':'en', 'French':'fr', 'French':'fr', 'German':'de', 'Hindi':'hi', 'Icelandic':'is', 'Italian':'it', 'Japanese':'ja', 'Korean':'ko', 'Norwegian':'no', 'Polish':'pl', 'Portuguese':'pt', 'Romanian':'ro', 'Russian':'ru', 'Spanish':'es', 'Swedish':'sv', 'Turkish':'tr', 'Welsh':'cy'}
    return langCodeMappings[lang]

@csrf_exempt
def translate_transcript(request):
    if request.method == 'POST':
        file = request.FILES['file']
        filename = str(file.name).split('.')[0]
        sourceLanguage = getLanguageCode(request.POST['sourceLanguage'])
        targetLanguage = getLanguageCode(request.POST['targetLanguage'])
        translatedAudio = True if request.POST['translatedAudio'] == 'True' else False
        print(translatedAudio)
        contents = file.read()
        srtOutFile = str(settings.BASE_DIR) + '/media/temp/' + filename + '_' + targetLanguage + '.srt'
        translation = writeTranslationToSRT(contents, sourceLanguage, targetLanguage, srtOutFile, 'us-east-2')
        if translatedAudio:
            mp3OutFile = str(settings.BASE_DIR) + '/media/temp/' + filename + '_' + targetLanguage + '.mp3'
            getAudioTranscript(translation, targetLanguage, mp3OutFile)
            zipFileOutFilePath = str(settings.BASE_DIR) + '/media/temp/' + filename + '_' + targetLanguage + '.zip'
            zipFile = ZipFile(zipFileOutFilePath, 'w')
            zipFile.write(srtOutFile, filename + '_' + targetLanguage + '.srt')
            zipFile.write(mp3OutFile, filename + '_' + targetLanguage + '.mp3')
            zipFile.close()
            subject = "Download your files"
            body = "Your translated transcript and translated audio are attached"
            sendEmail(request.POST['emailAddress'], subject, body, zipFileOutFilePath, filename + '_' + targetLanguage + '.zip')
            return HttpResponse("<html><body>Email sent</body></html>")
        html = "<html><body>translating file {} <br></body></html>".format(file.name)
        return FileResponse(open(srtOutFile, 'rb'))
    
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

@csrf_exempt
def ovewriteAudioTrack(request):
    if request.method == 'POST':
        basePath = str(settings.BASE_DIR) + '/media/temp/'
        videoFile = request.FILES['videoFile']
        audioFile = request.FILES['audioFile']
        fs = FileSystemStorage()
        fs.save(videoFile.name, videoFile)
        fs.save(audioFile.name, audioFile)
        shutil.move(str(settings.MEDIA_ROOT) + '/' + videoFile.name, basePath + videoFile.name)
        shutil.move(str(settings.MEDIA_ROOT) + '/' + audioFile.name, basePath + audioFile.name)
        outputFile = basePath + (audioFile.name).split('.')[0] + '.' + (videoFile.name).split('.')[1]
        overwriteAudio(basePath + videoFile.name, outputFile, audioClipFile=basePath + audioFile.name)
        for file in [basePath + videoFile.name, basePath + audioFile.name]:
            os.remove(file)
        subject = "Download your files"
        body = "The video with the overwritten audio track is attached"
        sendEmail(request.POST['emailAddress'], subject, body, outputFile, (audioFile.name).split('.')[0] + '.' + (videoFile.name).split('.')[1])
        return HttpResponse("<html><body>Email sent</body></html>")
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

@csrf_exempt
def burnCaptions(request):
    if request.method == 'POST':
        basePath = str(settings.BASE_DIR) + '/media/temp/'
        videoFile = request.FILES['videoFile']
        subtitleFile = request.FILES['subtitleFile']
        fs = FileSystemStorage()
        fs.save(videoFile.name, videoFile)
        fs.save(subtitleFile.name, subtitleFile)
        shutil.move(str(settings.MEDIA_ROOT) + '/' + videoFile.name, basePath + videoFile.name)
        shutil.move(str(settings.MEDIA_ROOT) + '/' + subtitleFile.name, basePath + subtitleFile.name)
        outputFile = basePath + (videoFile.name).split('.')[0] + '_burnt_subs.' + (videoFile.name).split('.')[1]
        burnCaption(basePath + videoFile.name, basePath + subtitleFile.name, outputFile)
        subject = "Download your files"
        body = "The video with the subtitles burnt in is attached"
        sendEmail(request.POST['emailAddress'], subject, body, outputFile, (videoFile.name).split('.')[0] + '_burnt_subs.' + (videoFile.name).split('.')[1])
        return HttpResponse("<html><body>Email sent</body></html>")
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def input_vocabulary(request):

    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
