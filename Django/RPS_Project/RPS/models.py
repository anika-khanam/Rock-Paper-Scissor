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
      draws = models.IntegerField(default=0)
      losses = models.IntegerField(default=0)
      roundwins = models.IntegerField(default=0)
      rounddraws = models.IntegerField(default=0)
      roundlosses = models.IntegerField(default=0)
      userID = models.ForeignKey(PlayerAccount,on_delete=models.CASCADE,null=True)

      def __str__(self):
            return self.playerName
        
class Game(models.Model):
      p1 = models.ForeignKey(Player, on_delete=models.CASCADE, null=False,related_name='playerOneGame')
      p2 = models.ForeignKey(Player, on_delete=models.CASCADE, null=False,related_name='playerTwoGame')
      p1Choice = models.CharField(max_length=8, blank=True)
      p2Choice = models.CharField(max_length=8, blank=True)
      p1Seen = models.BooleanField(default=False)
      p2Seen = models.BooleanField(default=False)
      p1Finalize = models.BooleanField(default=False)
      p2Finalize = models.BooleanField(default=False)
      terminated = models.BooleanField(default=False)

      def both_guessed(self):
            return self.p1Choice and self.p2Choice

      def both_seen(self):
            return self.p1Seen and self.p2Seen
      
      def both_finalize(self):
            return self.p1Seen and self.p2Seen
      def __str__(self):
            return f"PK: {self.pk}, P1:{self.p1} P2:{self.p2}"


class GameRoom(models.Model):
      roomCode = models.AutoField(primary_key=True)
      isPrivate = models.BooleanField(default=False)
      p1 = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True,related_name='playerOneRoom')
      p2 =  models.ForeignKey(Player, on_delete=models.SET_NULL, null=True,related_name='playerTwoRoom')
      game = models.ForeignKey(Game,on_delete=models.SET_NULL,null=True)

      def __str__(self) :
            return f"Code: {self.roomCode}, P1: {self.p1}, P2:{self.p2}"

      def room_full(self):
        return self.p1ID is not None and self.p1ID is not None
