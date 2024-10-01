"""
URL configuration for RPS_Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PlayerAccountList,PlayerAccountDetail,PlayerList,PlayerDetail, GameRound



urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',PlayerAccountList.as_view()),
    path('',PlayerAccountList.as_view()),
    path('accounts/',PlayerAccountList.as_view()),
    path('accounts/<int:pk>/',PlayerAccountDetail.as_view()),
    path('players/',PlayerList.as_view()),
    path('players/<int:pk>/',PlayerDetail.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/select/', GameRound.as_view()),
]