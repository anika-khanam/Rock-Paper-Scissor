from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PlayerAccount,Player,Game,GameRoom
from .serializers import PlayerAccountSerializer,PlayerSerializer,LeaderboardSerializer,RegisterSerializer
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class CheckUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are a logged-in user"})

@api_view(['GET'])
def guest_view(request):
    return Response({"message": "You are a guest user"}, status=status.HTTP_200_OK)


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

class PlayerLeaderboard(generics.ListAPIView):
    serializer_class = LeaderboardSerializer

    def get_queryset(self):
        queryset = Player.objects.order_by('-wins')
        for idx, player in enumerate(queryset, start=1):
            player.rank = idx  # Assign rank based on index in ordered queryset
        
        return queryset


# Create your views here.
class CreateRoom(APIView):
    def post(self, request, player_id):
        room = GameRoom.objects.create(p1ID=player_id)

        return Response({"message": "Room created successfully", "room_id":room.roomCode}, status=201)

class JoinRoom(APIView):
    def post(self, request, room_code, player_id):
        try:
            room = GameRoom.objects.get(roomCode=room_code)
        except GameRoom.DoesNotExist:
            return Response({'error': 'Room not found'}, status=404)
        
        room.p2ID = player_id

        # Create game now room is full
        game = Game.objects.create(p1ID = room.p1ID, p2ID = player_id)

        room.gameID = game
        room.save()

        return Response({"message": "Room joined successfully", "game_id":game.id}, status=201)

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
