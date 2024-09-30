from django.db import models

class playerAccount(models.Model):
    userName = models.CharField(max_length=127)
    email = models.EmailField(max_length=255)
    dateJoined = models.DateField(auto_now_add=True)

    def __str__(self):
          return self.userName

class player(models.Model):
        playerName = models.CharField(max_length=255)
        wins = models.IntegerField()
        losses = models.IntegerField()
    
        def __str__(self):
            return self.playerName


# Create your models here.
