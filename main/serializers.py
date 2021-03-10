from rest_framework import serializers
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from . import models
from accounts.serializers import UserSerializer


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'


class PlaidAccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlaidAccessToken
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=models.PlaidAccessToken.objects.all(),
                fields=['user', 'institution_id']
            )
        ]