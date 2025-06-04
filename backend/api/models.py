from django.db import models
from users.models import CustomUser

class ClientStatus(models.Model):
    id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=10)

class TransactionStatus(models.Model):
    id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=10)

class Client(models.Model):
    id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=30)
    status = models.CharField(max_length=10)
    company = models.CharField(max_length=50)
    status = models.ForeignKey(ClientStatus, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='clients', null=True)

class Note(models.Model):
    id = models.CharField(primary_key=True, max_length=32)
    content = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

class Transaction(models.Model):
    id = models.CharField(primary_key=True, max_length=32)
    value = models.IntegerField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.ForeignKey(TransactionStatus, on_delete=models.CASCADE)
