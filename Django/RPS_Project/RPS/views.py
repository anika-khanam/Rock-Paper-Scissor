from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PlayerAccount,Player
from .serializers import PlayerAccountSerializer,PlayerSerializer
from django.shortcuts import render
import random, time, json

class PlayerAccountList(generics.ListCreateAPIView):
    serializer_class = PlayerAccountSerializer

    def get_queryset(self):
        queryset = PlayerAccount.objects.all()
        return queryset

class PlayerAccountDetail(generics.RetrieveDestroyAPIView):
    serializer_class = PlayerAccountSerializer
    queryset = PlayerAccount.objects.all()

class PlayerList(generics.ListCreateAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

    def get_queryset(self):
        queryset = Player.objects.all()
        return queryset

class PlayerDetail(generics.RetrieveDestroyAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

# Create your views here.
class GameRound(APIView):
    def post(self, request):
        print(self.pretty_request(request))
        req_json = json.loads(request.body.decode('utf-8'))
        if req_json["wait"] and random.random() < 0.5:
            time.sleep(10)
            resp = Response(random.choice(["rock","paper","scissors"]), 200)
        elif random.random() < 0.5:
            resp = Response(random.choice(["rock","paper","scissors"]), 200)
        else:
            resp = Response(None, 202)
        return resp

    def pretty_request(self, request):
        headers = ''
        for header, value in request.META.items():
            if not header.startswith('HTTP'):
                continue
            header = '-'.join([h.capitalize() for h in header[5:].lower().split('_')])
            headers += '{}: {}\n'.format(header, value)

        return (
            '{method} HTTP/1.1\n'
            'Content-Length: {content_length}\n'
            'Content-Type: {content_type}\n'
            '{headers}\n\n'
            '{body}'
        ).format(
            method=request.method,
            content_length=request.META['CONTENT_LENGTH'],
            content_type=request.META['CONTENT_TYPE'],
            headers=headers,
            body=request.body,
        )