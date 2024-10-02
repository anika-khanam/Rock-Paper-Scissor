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
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import *



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',PlayerAccountList.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),  
    path('loggedin/', CheckUserView.as_view(), name='loggedin'), 
    path('guest/', guest_view, name='guest'), 
    path('accounts/',PlayerAccountList.as_view()),
    path('accounts/<int:pk>/',PlayerAccountDetail.as_view()),
    path('players/',PlayerList.as_view()),
    path('players/<int:pk>/',PlayerDetail.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/select/', GameRoundSelect.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/result/', GameRoundResult.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/finalize/', GameFinalize.as_view()),
    path('manageroom/create/<int:player_id>/', CreateRoom.as_view()),
    path('manageroom/join/<int:room_code>/player/<int:player_id>/', JoinRoom.as_view()),
    path('manageroom/poll/<int:room_code>/',QueryGame.as_view()),
    path('leaderboard/',PlayerLeaderboard.as_view())
]
