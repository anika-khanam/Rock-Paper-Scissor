from django.db import models

class PlayerAccount(models.Model):
    userName = models.CharField(max_length=127,unique=True)
    email = models.EmailField(max_length=255)
    dateJoined = models.DateField(auto_now_add=True)

    def __str__(self):
          return self.userName

class Player(models.Model):
        playerName = models.CharField(max_length=255)
        wins = models.IntegerField(default=0)
        losses = models.IntegerField(default=0)
        userID = models.ForeignKey(PlayerAccount,on_delete=models.CASCADE,null=True)
    
        def __str__(self):
            return self.playerName

class Room(models.Model):
      publicCode = models.charField(max_length=5)
      isPrivate = models.BooleanField()
      playerOne = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True,related_name='playerOne')
      playerTwo =  models.ForeignKey(Player, on_delete=models.SET_NULL, null=True,related_name='playerTwo')

      def __str__(self) :
            return self.publicCode

    
class Game(models.Model):
    p1ID = models.IntegerField()
    p2ID = models.IntegerField()
    p1Choice = models.CharField(max_length=8, blank=True)
    p2Choice = models.CharField(max_length=8, blank=True)

    def both_guessed(self):
         return self.p1Choice and self.p2Choice

# Create your models here.
