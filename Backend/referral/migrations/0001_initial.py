# Generated by Django 4.0.1 on 2022-03-10 11:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('loanofficer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReferralPolicy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('limit_amount', models.FloatField(default=0.0)),
                ('bonus', models.FloatField(default=0.0)),
            ],
            options={
                'db_table': 'tbl_referral_bill_policy',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='ReferralTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('bonus', models.FloatField(default=0.0)),
                ('status', models.IntegerField(default=0)),
                ('paid_amount', models.FloatField(default=0.0)),
                ('paid_date', models.DateTimeField(auto_now_add=True)),
                ('referred_by', models.ForeignKey(blank=True, db_column='referred_by', null=True, on_delete=django.db.models.deletion.CASCADE, to='loanofficer.usermaster')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='recruit_id', to='loanofficer.usermaster')),
            ],
            options={
                'db_table': 'tbl_referral_transaction',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='ReferralMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referral_id', models.CharField(blank=True, default='', max_length=255)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('referred_by', models.ForeignKey(blank=True, db_column='referred_by', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recruiter_id', to='loanofficer.usermaster')),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='referral_user_id', to='loanofficer.usermaster')),
            ],
            options={
                'db_table': 'tbl_referral_map',
                'managed': True,
            },
        ),
    ]