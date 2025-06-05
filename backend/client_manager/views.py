from rest_framework import viewsets
from .models import Client, Interaction, Note, Transaction, ClientStatus, TransactionStatus
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

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
    
    def get_queryset(self):
        client_id = self.kwargs['client_pk']
        return Note.objects.filter(client_id=client_id)

    def perform_create(self, serializer):
        client_id = self.kwargs['client_pk']
        client = get_object_or_404(Client, id=client_id)
        serializer.save(client=client)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_pk']
        return Transaction.objects.filter(client_id=client_id)
    
    def perform_create(self, serializer):
        client_id = self.kwargs['client_pk']
        client = get_object_or_404(Client, id=client_id)
        serializer.save(client=client)

class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        client_id = self.kwargs['client_pk']
        return Interaction.objects.filter(client_id=client_id)

    def perform_create(self, serializer):
        client_id = self.kwargs['client_pk']
        client = get_object_or_404(Client, id=client_id)
        serializer.save(client=client)

class ClientStatusViewSet(viewsets.ModelViewSet):
    queryset = ClientStatus.objects.all()
    serializer_class = ClientStatusSerializer
    permission_classes = [IsAuthenticated]

class TransactionStatusViewSet(viewsets.ModelViewSet):
    queryset = TransactionStatus.objects.all()
    serializer_class = TransactionStatusSerializer
    permission_classes = [IsAuthenticated]
