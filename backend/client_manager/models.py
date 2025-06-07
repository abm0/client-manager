from django.db import models
from users.models import CustomUser

class TransactionStatus(models.Model):
    name = models.CharField(max_length=10)

class Client(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, null=True)
    patronymic = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='clients', null=True)

class Note(models.Model):
    content = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        verbose_name_plural = "Notes"
        ordering = ['-created_at']

class Transaction(models.Model):
    value = models.IntegerField()
    date = models.DateField(null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.ForeignKey(TransactionStatus, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Transactions"
        ordering = ['-date']

class Interaction(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, null=True)
    content = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Interactions"
        ordering = ['-date']