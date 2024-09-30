from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import playerAccount,player
from .serializers import playerAccountSerializer,playerSerializer
from django.shortcuts import render

class playerAccountList(generics.ListCreateAPIView):
    serializer_class = playerAccountSerializer

    def get_queryset(self):
        queryset = playerAccount.objects.all()
        return queryset

class playerList(generics.ListCreateAPIView):
    serializer_class = playerSerializer

    def get_queryset(self):
        queryset = player.objects.all()
        return queryset

# Create your views here.
class GameRound(APIView):
    def post(self, request):
        return Response(random.choice(["rock","paper","scissors"]))