from rest_framework import serializers
from .models import PlayerAccount,Player

class PlayerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerAccount
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField()
    
    class Meta:
        model = Player
        fields = '__all__'
    