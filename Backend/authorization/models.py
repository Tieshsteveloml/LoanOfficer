from django.db import models
# Create your models here.


class TokenMaster(models.Model):
    token = models.CharField(max_length=200, primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True)
    expired_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tbl_token_list'