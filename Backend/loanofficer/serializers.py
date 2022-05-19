from rest_framework import serializers
from .models import *


class RoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RoleMaster
        fields = ('id', 'role_name', 'role_type', 'is_active',
                  'company_id', 'work_flow_id')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserMaster
        fields = ('id', 'user_id', 'user_name', 'email', 'phone', 'password', 'is_email',
                  'is_active', 'company_id', 'nmls_id', 'officer_company', 'avatar', 'job',
                  'location', 'overview', 'created_date', 'updated_date')

    def to_representation(self, instance):
        my_fields = {'nmls_id', 'phone', 'email', 'officer_company', 'avatar', 'job', 'location',
                     'overview', 'is_active', 'is_email', 'company_id', 'created_date', 'updated_date'}
        data = super().to_representation(instance)
        for field in my_fields:
            try:
                if not data[field]:
                    if field == 'is_active' or field == 'is_email':
                        data[field] = "N"
                    else:
                        data[field] = ""
            except KeyError:
                pass
        return data


class UserRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserRoleMap
        fields = ('id', 'user_id', 'role_id', 'is_active')


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CompanyMaster
        fields = ('id', 'company_code', 'company_name', 'company_type', 'status',
                  'company_logo', 'company_website', 'company_address_line1',
                  'company_address_line2', 'city', 'country', 'zip_code', 'time_zone',
                  'created_date', 'created_by', 'updated_date', 'updated_by',
                  'work_flow_id')

    def to_representation(self, instance):
        my_fields = {'company_logo', 'company_address_line1', 'company_address_line2', 'city', 'company_website',
                     'city', 'country', 'zip_code', 'time_zone', 'status'}
        data = super().to_representation(instance)
        for field in my_fields:
            try:
                if not data[field]:
                    if field == 'status':
                        data[field] = "N"
                    else:
                        data[field] = ""
            except KeyError:
                pass
        return data


class WorkflowTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkflowTypeMaster
        fields = ('id', 'workflow_title')


class BrokerageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BrokerageCompanyMaster
        fields = ('id', 'brokerage_company', 'is_active', 'company_id', 'created_date',
                  'created_by', 'updated_date', 'updated_by', 'work_flow_id')

    def to_representation(self, instance):
        my_fields = {'created_date', 'created_by', 'updated_date', 'updated_by', 'work_flow_id'}
        data = super().to_representation(instance)
        for field in my_fields:
            try:
                if not data[field]:
                    data[field] = ""
            except KeyError:
                pass
        return data