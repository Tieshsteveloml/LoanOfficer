from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'role', views.RoleViewSet)
router.register(r'user-role', views.UserRoleViewSet)
router.register(r'user', views.UserViewSet)
router.register(r'company', views.CompanyViewSet)
router.register(r'brokerage', views.BrokerageViewSet)
router.register(r'workflow', views.WorkflowTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]