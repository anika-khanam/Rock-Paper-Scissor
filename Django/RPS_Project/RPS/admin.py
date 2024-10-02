from django.contrib import admin
from .models import PlayerAccount,Player,Game,GameRoom

admin.site.register(PlayerAccount)
admin.site.register(Player)
admin.site.register(Game)
admin.site.register(GameRoom)