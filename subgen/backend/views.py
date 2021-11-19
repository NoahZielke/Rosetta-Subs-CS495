from django.contrib.auth.models import User, Group
from rest_framework import viewsets, parsers
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GroupSerializer, JobSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import Job
from .utils import pullJSONGenSRTCompleted, sendFilesCompleted, pullJSONGenSRTFailed, sendFilesFailed, transcribeNewUploads, getVocab, receiveVocabWords, deleteVocab
import json, datetime
from django.http import HttpResponse, JsonResponse


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]


# class GroupViewSet(viewsets.ModelViewSet):
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]

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
        transcribeNewUploads()
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

@csrf_exempt
def input_vocabulary(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        try:
            username = json_data['username']
            words = json_data['words']
        except KeyError:
            return HttpResponse("Format Error")
        output = receiveVocabWords(username, words)
        return JsonResponse(output, safe=False)

@csrf_exempt
def delete_vocabulary(request):
    if request.method == 'POST':
        username = request.POST.get("username", '')
        deleteVocab(username)

    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

@csrf_exempt
def display_vocabulary(request):
    if request.method == 'POST':
        username = request.POST.get("username", '')
        print("USER:  " + username)
        output = getVocab(username)
        return JsonResponse(output, safe=False)