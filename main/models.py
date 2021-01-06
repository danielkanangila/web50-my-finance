from django.db import models

from accounts.models import User


class PlaidItemIds(models.Model):
    item_id = models.CharField(max_length=250)


class PlaidAccessToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(PlaidItemIds, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=250, unique=True)


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    amount = models.FloatField()
    currency = models.CharField(max_length=3, default="USD")
    tags = models.TextField(blank=True, null=True, default=None)
    transaction_type = models.CharField(max_length=50, null=True, blank=True)
    memo = models.TextField(blank=True, null=True)
    transaction_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
