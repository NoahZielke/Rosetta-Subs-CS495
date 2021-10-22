from django.contrib import admin
from django.urls import include, path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter
from backend import views
from django.conf import settings
from django.conf.urls.static import static

<<<<<<< HEAD
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
=======
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'jobs', views.JobViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('home.urls')),
    path('', include(router.urls)),
>>>>>>> main
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)