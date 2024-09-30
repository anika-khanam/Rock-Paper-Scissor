from django.urls import path
from .views import GameRound

urlpatterns = [
    path('gameround/', GameRound.as_view()),
]