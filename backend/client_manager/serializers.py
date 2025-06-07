from rest_framework import serializers
from .models import Client, Interaction, Note, Transaction, TransactionStatus
from django.db.models import Sum
from datetime import timedelta
from django.utils import timezone
from dateutil.relativedelta import relativedelta

now = timezone.now().replace(tzinfo=None)  # Текущая дата и время
thirty_days_ago = now - timedelta(days=30)

class TransactionStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionStatus
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    sum = serializers.SerializerMethodField()
    
    class Meta:
        model = Client
        fields = '__all__'
        
    def get_sum(self, obj):
        return obj.transaction_set.filter(status=2).aggregate(total=Sum('value'))['total'] or 0
    
    def get_months_since_last_transaction(self, obj):
        last_transaction = obj.transaction_set.filter(date__lte=now).order_by('-date').first()

        if last_transaction:
            delta = relativedelta(now, last_transaction.date)
            months_passed = delta.years * 12 + delta.months
            return months_passed
        
        return 0
    
    def get_past_month_interactions_count(self, obj):
        return obj.interaction_set.filter(date__gte=thirty_days_ago).count()

    def get_pending_transactions_count(self, obj):
        return obj.transaction_set.filter(status=1).count()

    def get_closed_transactions_engagement(self, obj):
        return obj.transaction_set.filter(status=2).count() * 5

    def get_transactions_sum_engagement(self, obj):
        return int(self.get_sum(obj) / 10000)

    def get_engagement(self, obj):
        engagement = 0
                
        engagement += self.get_transactions_sum_engagement(obj)
        engagement += self.get_past_month_interactions_count(obj)
        engagement += self.get_pending_transactions_count(obj)
        engagement += self.get_closed_transactions_engagement(obj)
        engagement -= self.get_months_since_last_transaction(obj)
        
        return engagement
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['full_name'] = f"{instance.first_name} {instance.patronymic or ''} {instance.last_name}"

        representation['sum'] = self.get_sum(instance)
        representation['engagement'] = self.get_engagement(instance)
        
        return representation

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'created_at']

class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'content', 'date']
        read_only_fields = ['date']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'value', 'status', 'date']
        
class WeeklyTransactionSerializer(serializers.Serializer):
    week = serializers.DateField()
    total = serializers.DecimalField(max_digits=10, decimal_places=2)