# Generated by Django 5.1 on 2024-10-01 11:50
import django.db.models.deletion
from django.db import migrations, models
class Migration(migrations.Migration):
    dependencies = [
        ('RPS', '0005_game'),
    ]
    operations = [
        migrations.CreateModel(
            name='GameRoom',
            fields=[
                ('p1ID', models.IntegerField()),
                ('p2ID', models.IntegerField()),
                ('roomCode', models.AutoField(primary_key=True, serialize=False)),
                ('gameID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='RPS.game')),
            ],
        ),
    ]