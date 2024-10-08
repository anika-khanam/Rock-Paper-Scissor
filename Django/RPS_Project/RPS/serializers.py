from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PlayerAccount,Player

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirmPassword')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPassword']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirmPassword') 
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    
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
