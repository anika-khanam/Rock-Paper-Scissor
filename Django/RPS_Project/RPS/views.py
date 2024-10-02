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

class QueryGame(APIView):
    def get(self, request, room_id):
        try:
            room = GameRoom.objects.get(roomCode=room_id)
        except GameRoom.DoesNotExist:
            return Response({'error': 'Room not found'}, status=404)
        if room.gameID is None:
            return Response({"error": 'Game not started'}, status=204)
        return Response({"message": "Game found", "game_id":room.gameID}, status=200)

class GameRoundSelect(APIView):
    def post(self, request, game_id, player_id):
        choice = request.POST.get('choice')

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

        # Update the game state based on which player is submitting
        if game.p1ID == player_id:
            game.p1Choice = choice
        elif game.p2ID == player_id:
            game.p2Choice = choice
        else:
            return Response({'error': 'Invalid player ID'}, status=403)

        # Save the game state
        game.save()

        # One player has submitted their choice; wait for the other
        return Response({'message': 'Please poll for results'}, status=202)

class GameRoundResult(APIView):
    def get(self, request, game_id, player_id):
        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)
        
        if not game.both_guessed():
            return Response({'message': 'Waiting on player selections'}, status=202)
        
        if game.p1ID == player_id:
            game.p1Seen = True
            req_choice = game.p1Choice
            oth_choice = game.p2Choice
        elif game.p2ID == player_id:
            game.p2Seen = True
            req_choice = game.p2Choice
            oth_choice = game.p1Choice
        else:
            return Response({'error': 'Invalid player ID'}, status=403)
        
        # Reset round variables
        if game.both_seen():
            game.p1Choice = ""
            game.p2Choice = ""
            game.p1Seen = False
            game.p2Seen = False

        game.save()

        return Response({
            'message': 'Player choices found',
            'requester_choice': req_choice,
            'other_choice': oth_choice,
        }, status=200)
