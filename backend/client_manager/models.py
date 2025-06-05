from django.db import models
from users.models import CustomUser

class ClientStatus(models.Model):
    name = models.CharField(max_length=10)

class TransactionStatus(models.Model):
    name = models.CharField(max_length=10)

class Client(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, null=True)
    patronymic = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=50)
    status = models.ForeignKey(ClientStatus, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='clients', null=True)

class Note(models.Model):
    content = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

class Transaction(models.Model):
    value = models.IntegerField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.ForeignKey(TransactionStatus, on_delete=models.CASCADE)
