from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from . import models
from accounts.serializers import UserSerializer


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'


class PlaidItemIdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlaidItemIds
        fields = '__all__'
        extra_kwargs = {
            'access_token': {
                'required': True,
                'validators': [
                    UniqueValidator(
                        queryset=models.PlaidAccessToken.objects.all())
                ]
            }
        }


class PlaidAccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlaidAccessToken
        fields = '__all__'
