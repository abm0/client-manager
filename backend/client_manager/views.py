from rest_framework import viewsets
from .models import Client, Interaction, Note, Transaction, TransactionStatus
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from datetime import date, timedelta
from django.db.models.functions import TruncWeek
import csv
from django.http import HttpResponse

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Client.objects.filter(user=self.request.user)
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

class TransactionStatusViewSet(viewsets.ModelViewSet):
    queryset = TransactionStatus.objects.all()
    serializer_class = TransactionStatusSerializer
    permission_classes = [IsAuthenticated]


class WeeklyTransactionView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request, client_pk=None):
        today = date.today()
        start_date = today - timedelta(days=30)

        # Получаем список недель от start_date до today
        current = start_date - timedelta(days=start_date.weekday())  # до понедельника
        weeks = []
        while current <= today:
            weeks.append(current)
            current += timedelta(weeks=1)

        # Данные из БД
        db_data = (
            Transaction.objects
            .filter(client_id=client_pk, date__gte=start_date, date__lte=today, status=2)
            .annotate(week=TruncWeek('date'))
            .values('week')
            .annotate(total=Sum('value'))
        )

        # Преобразуем в словарь для быстрого доступа
        totals_by_week = {entry['week']: entry['total'] for entry in db_data}

        # Заполняем пропущенные недели нулями
        result = []
        for week in weeks:
            result.append({
                'week': week,
                'total': totals_by_week.get(week, 0)
            })

        return Response(result)
    
class ExportClientsCSV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="clients.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Client ID', 'First Name', 'Last Name', 'Patronymic',
            'Email', 'Phone', 'Company'
        ])

        clients = Client.objects.filter(user=request.user)

        for client in clients:
            writer.writerow([
                client.id,
                client.first_name,
                client.last_name,
                client.patronymic,
                client.email,
                client.phone,
                client.company,
            ])

        return response
    
class ExportTransactionsCSV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="transactions.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Transaction ID', 'Client ID', 'Client Name',
            'Value', 'Date', 'Status'
        ])

        transactions = Transaction.objects.filter(client__user=request.user).select_related('client', 'status')

        for tx in transactions:
            client_name = f"{tx.client.first_name} {tx.client.last_name or ''}".strip()
            writer.writerow([
                tx.id,
                tx.client.id,
                client_name,
                tx.value,
                tx.date,
                tx.status.name  # раскрытое значение статуса
            ])

        return response