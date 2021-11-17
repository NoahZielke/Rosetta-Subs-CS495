from django.contrib import admin
from django.urls import include, path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter
from backend import views
from django.conf import settings
from django.conf.urls.static import static

from user.views import UserViewSet
from auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

routes.register(r'jobs', views.JobViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(routes.urls)),
    path('completed_job/', views.completed_job, name='completed_job'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('input_vocab/', views.input_vocabulary, name='genVocab'),
    path('delete_vocab/', views.delete_vocabulary, name='deleteVocab'),
    path('display_vocab/', views.display_vocabulary, name='displayVocab'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
