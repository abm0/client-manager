from rest_framework import viewsets
from .models import Client, Note, Transaction, ClientStatus, TransactionStatus
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

class ClientStatusViewSet(viewsets.ModelViewSet):
    queryset = ClientStatus.objects.all()
    serializer_class = ClientStatusSerializer
    permission_classes = [IsAuthenticated]

class TransactionStatusViewSet(viewsets.ModelViewSet):
    queryset = TransactionStatus.objects.all()
    serializer_class = TransactionStatusSerializer
    permission_classes = [IsAuthenticated]
