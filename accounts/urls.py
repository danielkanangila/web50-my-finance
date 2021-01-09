from django.urls import path, include
from knox.views import LogoutView

from . import views

urlpatterns = [
    path('', include('knox.urls')),
    path('user', views.AuthUserRetrieveAPIView.as_view()),
    path('register', views.RegisterAPIView.as_view()),
    path('login', views.LoginAPIView.as_view()),
    path('logout', LogoutView.as_view()),
]
