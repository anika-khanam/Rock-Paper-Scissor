from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PlayerAccount,Player
from .serializers import PlayerAccountSerializer,PlayerSerializer
from django.shortcuts import render
import random

class PlayerAccountList(generics.ListCreateAPIView):
    serializer_class = PlayerAccountSerializer

    def get_queryset(self):
        queryset = PlayerAccount.objects.all()
        return queryset

class PlayerAccountDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlayerAccountSerializer
    queryset = PlayerAccount.objects.all()

class PlayerList(generics.ListCreateAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

    def get_queryset(self):
        queryset = Player.objects.all()
        return queryset

class PlayerDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

# Create your views here.
class GameRound(APIView):
    def post(self, request):
        return Response(random.choice(["rock","paper","scissors"]))