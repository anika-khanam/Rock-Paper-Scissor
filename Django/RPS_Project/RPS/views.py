from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PlayerAccount,Player,Game
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
    def post(self, request, game_id, player_id):
        choice = request.POST.get('choice')

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

        # Update the game state based on which player is submitting
        if game.player_one == player_id:
            game.player_one_choice = choice
        elif game.player_two == player_id:
            game.player_two_choice = choice
        else:
            return Response({'error': 'Invalid player ID'}, status=403)

        # Save the game state
        game.save()

        # Check if both players have made their choices
        if game.is_full():
            # Both players have made their selections
            return Response({
                'player_one_choice': game.player_one_choice,
                'player_two_choice': game.player_two_choice,
            }, status=200)

        # One player has submitted their choice; wait for the other
        return Response({'message': 'Waiting for the other player'}, status=202)
    

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