import datetime
from django.http import Http404
from rest_framework import generics, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import plaid_api as plaid
from .plaid_api.utils import plaid_request, get_date_from_request
from .plaid_api.analytics import Analytics
from . import serializers
from utils.permissions import GETRequestNotAllowed, CanCreate, CanRetreive, CanUpdate, CanDelete
from utils.format_error import format_error


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        GETRequestNotAllowed,
        CanCreate,
        CanUpdate,
        CanDelete
    ]

    queryset = models.Transaction.objects.all().order_by('-created_at')
    serializer_class = serializers.TransactionSerializer


class CreatePlaidLinkTokenAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        try:
            link_token = plaid.get_link_token(request.user)
            return Response(link_token)
        except plaid.plaid.errors.PlaidError as e:
            return Response(format_error(e))
        except Exception as e:
            print(e)
            return Response(data={"details": "An unknown error occurred while trying to save the access token"}, status=500)


class PlaidAccessTokenAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        try:
            # ::TODO:: ADD REQUEST BODY VALDATION 
            # ::TODO:: REMOVE ITEM IDS STORAGE STEP
            # Exchange link public token to access token
            exchange_response = plaid.get_access_token(
                public_token=request.data.get('public_token'))
            # Save exchange values to the database
            
            access_token_serializer = serializers.PlaidAccessTokenSerializer(data={
                'user': request.user.pk,
                'access_token': exchange_response['access_token']
            })
            # validate data
            access_token_serializer.is_valid(raise_exception=True)
            # save
            access_token = access_token_serializer.save()
            # return the response
            return Response({
                'access_token': access_token.access_token,
                'user': request.user.pk
            })
        except plaid.plaid.errors.PlaidError as e:
            return Response(format_error(e))
        except serializers.serializers.ValidationError as e:
            raise
        except Exception as e:
            return Response(data={"detail": "An unknown error occurred while trying to save the access token"}, status=500)


class AccountAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):
        return plaid_request(api_func=lambda: plaid.get_accounts(kwargs.get('user_id')))
       

class AccountTransactionsAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):

        def get_account_transactions():
            # Retrieve start and end date form request query params
            # if not found set default limit date
            start_date, end_date = get_date_from_request(request)
            # Get transactions related to account_id and user_id variables in the request params
            transactions = plaid.get_account_transactions(
                kwargs.get('user_id'),
                kwargs.get('account_id'),
                start_date,
                end_date
            )

            return {
                'count': len(transactions),
                'transactions': transactions,
            }
        
        return plaid_request(get_account_transactions)


class TransactionRetreiveAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):
        # ::TODO Group transactions by bank accounts
        def get_transactions():
            user_id = kwargs.get('user_id')
            # Retrieve start and end date form request query params
            # if not found set default limit date
            start_date, end_date = get_date_from_request(request)
            # Check if transaction_id exists in request query
            # if yes, get the transaction related to the transaction_id query and return
            if 'transaction_id' in request.GET:
                return plaid.get_transaction_by_id(user_id, request.GET.get('transaction_id'), start_date, end_date)
            # Otherwise, return all transactions.
            # Get plaid transactions
            transactions = plaid.get_transactions(
                user_id, start_date, end_date)
            # Get manual saved transactions
            manual_transactions = models.Transaction.objects.all().order_by('-created_at')
            # Serialize the manual transaction
            serializer = serializers.TransactionSerializer(
                instance=manual_transactions, many=True)
            # mixup all transactions
            transactions.append({
                'manual': {
                    'count': len(serializer.data),
                    'transactions': serializer.data
                }
            })

            return transactions

        return plaid_request(get_transactions)


    
class AnalyticsAPIVIew(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):
        analytics = Analytics(request, *args, **kwargs)
        
        return Response(analytics.get_data())