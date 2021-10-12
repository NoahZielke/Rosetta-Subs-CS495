from django import urls
from django.contrib import admin
from django.urls import include, path
from django.urls.conf import include
from rest_framework import routers
from backend import views
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'jobs', views.JobViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('completed_job/', views.completed_job, name='completed_job'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)