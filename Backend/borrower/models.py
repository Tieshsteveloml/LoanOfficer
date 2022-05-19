from django.db import models

# Create your models here.


class BorrowerMaster(models.Model):
    user_id = models.CharField(max_length=45, blank=True, null=True)
    user_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=False, unique=True)
    is_active = models.CharField(max_length=1, blank=True, null=True)
    is_email = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tbl_borrower_master'