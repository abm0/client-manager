from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from client_manager.views import *
from django.urls import path
from users.views import CustomTokenObtainPairView, RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
clients_router = routers.NestedDefaultRouter(router, r'clients', lookup='client')
clients_router.register(r'notes', NoteViewSet, basename='client-notes')
clients_router.register(r'transactions', TransactionViewSet, basename='client-transactions')
clients_router.register(r'interactions', InteractionViewSet, basename='client-interactions')
clients_router.register(r'weekly_transactions', WeeklyTransactionView, basename='weekly-transactions')

router.register(r'transaction_statuses', TransactionStatusViewSet)

urlpatterns = [
    path('', include(router.urls + clients_router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile')
]
