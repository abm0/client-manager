from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path
from users.views import CustomTokenObtainPairView, RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'client_statuses', ClientStatusViewSet)
router.register(r'transaction_statuses', TransactionStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile')
]
