from django.db import models
from loanofficer.models import UserMaster, UserRoleMap

# Create your models here.


class ReferralMap(models.Model):
    user_id = models.ForeignKey('loanofficer.UserMaster', on_delete=models.CASCADE, db_column="user_id",
                                related_name='referral_user_id')
    referral_id = models.CharField(max_length=255, default="", blank=True)
    referred_by = models.ForeignKey('loanofficer.UserMaster', on_delete=models.CASCADE, db_column="referred_by",
                                    blank=True, null=True, related_name='recruiter_id')
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'tbl_referral_map'


class ReferralTransaction(models.Model):
    user_id = models.ForeignKey('loanofficer.UserMaster', on_delete=models.CASCADE, db_column="user_id",
                                related_name='recruit_id')
    amount = models.FloatField(default=0.0, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    bonus = models.FloatField(default=0.0, blank=False)
    status = models.IntegerField(default=0, blank=False)  # 0: unpaid, 1: paid
    paid_amount = models.FloatField(default=0.0, blank=False)
    paid_date = models.DateTimeField(auto_now_add=True)
    referred_by = models.ForeignKey('loanofficer.UserMaster', on_delete=models.CASCADE, db_column="referred_by",
                                    blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tbl_referral_transaction'


class ReferralPolicy(models.Model):
    limit_amount = models.FloatField(default=0.0)
    bonus = models.FloatField(default=0.0)

    class Meta:
        managed = True
        db_table = 'tbl_referral_bill_policy'