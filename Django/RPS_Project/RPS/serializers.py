from rest_framework import serializers
<<<<<<< HEAD
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
=======
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
    
>>>>>>> 8fe946c00ae4d4718a536946f46316c9482d8cbe
