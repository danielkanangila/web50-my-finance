from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from . import models
from accounts.serializers import UserSerializer
from .plaid_api.validators import UniqueInstitutionValidator


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'


class PlaidAccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlaidAccessToken
        fields = '__all__'
        extra_kwargs = {
            'access_token': {
                'required': True,
                'validators': [
                    UniqueInstitutionValidator(queryset=models.PlaidAccessToken.objects.all())
                ]
            }
        }
