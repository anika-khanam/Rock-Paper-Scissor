from rest_framework import generics
from .models import playerAccount,player
from .serializers import playerAccountSerializer,playerSerializer

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
