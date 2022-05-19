# Generated by Django 4.0.1 on 2022-03-07 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BrokerageCompanyMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brokerage_company', models.CharField(blank=True, max_length=255, null=True)),
                ('is_active', models.CharField(blank=True, max_length=255, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'tbl_brokerage_company_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CompanyMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_code', models.CharField(blank=True, max_length=45, null=True)),
                ('company_name', models.CharField(blank=True, max_length=100, null=True)),
                ('company_type', models.CharField(blank=True, max_length=45, null=True)),
                ('admin_user_id', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(blank=True, max_length=10, null=True)),
                ('company_logo', models.CharField(blank=True, max_length=255, null=True)),
                ('company_address_line1', models.CharField(blank=True, max_length=255, null=True)),
                ('company_address_line2', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=45, null=True)),
                ('country', models.CharField(blank=True, max_length=45, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=15, null=True)),
                ('time_zone', models.CharField(blank=True, max_length=150, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('company_website', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'tbl_company_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RoleMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_name', models.CharField(blank=True, max_length=45, null=True)),
                ('role_type', models.CharField(blank=True, max_length=45, null=True)),
                ('is_active', models.CharField(blank=True, max_length=1, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'tbl_role_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(blank=True, max_length=45, null=True)),
                ('user_name', models.CharField(blank=True, max_length=255, null=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('phone', models.CharField(max_length=30, unique=True)),
                ('is_active', models.CharField(blank=True, max_length=1, null=True)),
                ('is_email', models.CharField(blank=True, max_length=1, null=True)),
                ('nmls_id', models.CharField(blank=True, max_length=30, null=True)),
                ('job', models.CharField(blank=True, max_length=255)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('overview', models.TextField(blank=True, max_length=102400)),
                ('avatar', models.CharField(blank=True, max_length=200)),
            ],
            options={
                'db_table': 'tbl_user_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserRoleMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.CharField(blank=True, max_length=1, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'tbl_user_role_map',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='WorkflowTypeMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('workflow_title', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'tbl_workflow_type_master',
                'managed': False,
            },
        ),
    ]
