from django.db import models
from django.urls.resolvers import URLPattern

class Job(models.Model):
    name = models.CharField(max_length=100)
    filename = models.TextField()
    file = models.FileField(upload_to='uploads/', default='default/testAudio.mp3')
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, default="Started")

    class Meta:
        app_label='backend'
    def __str__(self):
        return self.name