# Generated by Django 5.1 on 2024-10-01 11:51
from django.db import migrations, models
class Migration(migrations.Migration):
    dependencies = [
        ('RPS', '0006_gameroom'),
    ]
    operations = [
        migrations.AlterField(
            model_name='gameroom',
            name='p2ID',
            field=models.IntegerField(null=True),
        ),
    ]