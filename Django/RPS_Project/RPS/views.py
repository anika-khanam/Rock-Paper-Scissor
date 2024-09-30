from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import random

# Create your views here.
class GameRound(APIView):
    def post(self, request):
        return Response(random.choice(["rock","paper","scissors"]))