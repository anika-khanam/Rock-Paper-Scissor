from rest_framework import serializers
from .models import playerAccount,player

class playerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = playerAccount
        fields = '__all__'

class playerSerializer(serializers.ModelSerializer):
    class Meta:
        model = player
        fields = '__all__'