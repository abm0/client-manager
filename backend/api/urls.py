from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'client_statuses', ClientStatusViewSet)
router.register(r'transaction_statuses', TransactionStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
