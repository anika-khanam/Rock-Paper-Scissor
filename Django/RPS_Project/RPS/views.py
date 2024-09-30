from rest_framework import generics
from .models import PlayerAccount,Player
from .serializers import PlayerAccountSerializer,PlayerSerializer

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
