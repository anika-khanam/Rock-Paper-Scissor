from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib import admin
from django.urls import path
from .views import *



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',PlayerAccountList.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),  
    path('loggedin/', CheckUserView.as_view(), name='loggedin'), 
    path('guest/', guest_view, name='guest'), 
    path('accounts/',PlayerAccountList.as_view(), name='player_account_list'),
    path('accounts/<int:pk>/',PlayerAccountDetail.as_view()),
    path('players/',PlayerList.as_view()),
    path('players/<int:pk>/',PlayerDetail.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/select/', GameRoundSelect.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/result/', GameRoundResult.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/finalize/', GameFinalize.as_view()),
    path('gameround/<int:game_id>/player/<int:player_id>/terminate/', GameTerminate.as_view()),
    path('manageroom/create/<int:player_id>/', CreateRoom.as_view()),
    path('manageroom/delete/<int:room_id>/', DeleteRoom.as_view()),
    path('manageroom/join/<int:room_id>/player/<int:player_id>/', JoinRoom.as_view()),
    path('manageroom/poll/<int:room_id>/',QueryGame.as_view()),
    path('leaderboard/',PlayerLeaderboard.as_view()),
    path('manageroom/join/<int:room_code>/player/<int:player_id>/', JoinRoom.as_view()),
    path('manageroom/poll/<int:room_code>/',QueryGame.as_view()),
    path('leaderboard/',PlayerLeaderboard.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
]
    