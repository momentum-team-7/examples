from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass



class Album(models.Model):
    title = models.CharField(max_length=280)
    artist = models.CharField(max_length=280)
    release_date = models.DateField()
