# Generated by Django 5.1.1 on 2024-09-30 14:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RPS', '0003_alter_playeraccount_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='userID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='RPS.playeraccount'),
        ),
        migrations.AlterField(
            model_name='player',
            name='losses',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='player',
            name='wins',
            field=models.IntegerField(default=0),
        ),
    ]
