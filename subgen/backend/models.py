from django.db import models
from django.urls.resolvers import URLPattern
import uuid, random

class Job(models.Model):
    name = models.CharField(primary_key=True, max_length=36, default=str(uuid.uuid4()).replace('-', '') + str(random.randint(1,9999)), editable=False)
    filename = models.TextField()
    file = models.FileField(upload_to='media/uploads/', default='default/testAudio.mp3')
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, default="Started")
    email_address = models.EmailField(max_length=254, default="test@domain.com")

    class Meta:
        app_label='backend'
    def __str__(self):
        return self.name