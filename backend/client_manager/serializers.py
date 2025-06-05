from rest_framework import serializers
from .models import Client, Note, Transaction, ClientStatus, TransactionStatus
from django.db.models import Sum

class ClientStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientStatus
        fields = '__all__'

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
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['full_name'] = f"{instance.first_name} {instance.patronymic or ''} {instance.last_name}"

        
        return representation

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'created_at']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'value', 'status', 'date']
