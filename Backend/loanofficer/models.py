from django.db import models

# Create your models here.


class UserMaster(models.Model):
    user_id = models.CharField(max_length=45, blank=True, null=True)
    user_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=False, unique=True)
    is_active = models.CharField(max_length=1, blank=True, null=True)
    is_email = models.CharField(max_length=1, blank=True, null=True)
    nmls_id = models.CharField(max_length=30, blank=True, null=True)
    job = models.CharField(max_length=255, blank=True)
    officer_company = models.ForeignKey('BrokerageCompanyMaster', on_delete=models.CASCADE, db_column="officer_company"
                                        , blank=True, null=True)
    company_id = models.ForeignKey('CompanyMaster', on_delete=models.CASCADE, db_column="company_id",
                                   blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    overview = models.TextField(max_length=102400, blank=True)
    avatar = models.CharField(max_length=200, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'tbl_user_master'

    def __str__(self):
        return u'{0}'.format(self.user_name)


class RoleMaster(models.Model):
    role_name = models.CharField(max_length=45, blank=True, null=True)
    role_type = models.CharField(max_length=45, blank=True, null=True)
    is_active = models.CharField(max_length=1, blank=True, null=True)
    company_id = models.ForeignKey('CompanyMaster', on_delete=models.CASCADE, db_column="company_id",
                                   related_name="role_company_id", blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="created_by",
                                   related_name="role_created_user_id", blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="updated_by",
                                   related_name="role_updated_user_id", blank=True, null=True)
    work_flow_id = models.ForeignKey('WorkflowTypeMaster', on_delete=models.CASCADE, db_column="work_flow_id"
                                     , blank=True, null=True)

    def __str__(self):
        return u'{0}'.format(self.role_name)

    class Meta:
        managed = False
        db_table = 'tbl_role_master'


class UserRoleMap(models.Model):
    user_id = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="user_id")
    role_id = models.ForeignKey('RoleMaster', on_delete=models.CASCADE, db_column="role_id")
    is_active = models.CharField(max_length=1, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="created_by",
                                   related_name="userrole_created_user_id", blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="updated_by",
                                   related_name="userrole_updated_user_id", blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_user_role_map'


class CompanyMaster(models.Model):
    company_code = models.CharField(max_length=45, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    company_type = models.CharField(max_length=45, blank=True, null=True)
    admin_user_id = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=10, blank=True, null=True)
    company_logo = models.CharField(max_length=255, blank=True, null=True)
    company_address_line1 = models.CharField(max_length=255, blank=True, null=True)
    company_address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    country = models.CharField(max_length=45, blank=True, null=True)
    zip_code = models.CharField(max_length=15, blank=True, null=True)
    time_zone = models.CharField(max_length=150, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="created_by",
                                   related_name="company_created_user_id", blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="updated_by",
                                   related_name="company_updated_user_id", blank=True, null=True)
    work_flow_id = models.ForeignKey('WorkflowTypeMaster', on_delete=models.CASCADE, db_column="work_flow_id"
                                     , blank=True, null=True)
    company_website = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return u'{0}'.format(self.company_name)

    class Meta:
        managed = False
        db_table = 'tbl_company_master'


class WorkflowTypeMaster(models.Model):
    workflow_title = models.CharField(max_length=45, blank=True, null=True)

    def __str__(self):
        return self.workflow_title

    class Meta:
        managed = False
        db_table = 'tbl_workflow_type_master'


class BrokerageCompanyMaster(models.Model):
    brokerage_company = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.CharField(max_length=255, blank=True, null=True)
    company_id = models.ForeignKey(CompanyMaster, on_delete=models.CASCADE, db_column="company_id",
                                   blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="created_by",
                                   related_name='create_user_broker', blank=True, null=True)
    updated_date = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('UserMaster', on_delete=models.CASCADE, db_column="updated_by",
                                   related_name='update_user_broker', blank=True, null=True)
    work_flow_id = models.ForeignKey(WorkflowTypeMaster, on_delete=models.CASCADE, db_column="work_flow_id",
                                     blank=True, null=True)

    def __str__(self):
        return self.brokerage_company

    class Meta:
        managed = False
        db_table = 'tbl_brokerage_company_master'
