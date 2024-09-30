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


# Create your models here.
