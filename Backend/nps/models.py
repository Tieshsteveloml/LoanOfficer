from django.db import models
# from django.contrib.auth.models import AbstractUser
# Create your models here.


class NPS(models.Model):
    user_id = models.IntegerField(blank=False)
    score = models.IntegerField(blank=False)
    description = models.TextField(max_length=10240, blank=True)
    sender_id = models.IntegerField(blank=False)
    published = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    nps_type = models.IntegerField(blank=True, default=1)   #  1: nps from borrower to loan officer 2: from loan officer to ellietrac

    class Meta:
        managed = True
        db_table = 'tbl_nps_reviews'


class TellUs(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True)
    max_score = models.IntegerField(blank=False, default=0)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        managed = True
        db_table = 'tbl_nps_tell_us'
