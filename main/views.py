import datetime
from rest_framework import generics, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import plaid_api as plaid
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


class TransactionRetreiveAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        # ::TODO Group transactions by bank accounts
        print(args)
        try:
            # Retrieve start and end date form request query params
            # if not found set default limit date
            start_date = request.GET.get('start_date', '{:%Y-%m-%d}'.format(
                datetime.datetime.now() + datetime.timedelta(-30)))
            end_date = request.GET.get(
                'end_date', '{:%Y-%m-%d}'.format(datetime.datetime.now()))
            # Get plaid transactions
            transactions = plaid.get_transactions(
                user_id, start_date, end_date)
            # Get manual saved transactions
            manual_transactions = models.Transaction.objects.all().order_by('-created_at')
            # Serialize the manual transaction
            serializer = serializers.TransactionSerializer(
                instance=manual_transactions, many=True)
            # mixup all transactions
            transactions.append({"manual_transactions": serializer.data})
            # return all transactions
            return Response(transactions)
        except plaid.plaid.errors.PlaidError as e:
            return Response(format_error(e))
        except models.PlaidAccessToken.DoesNotExist as e:
            print(e)
            return Response(data={"detail": "No plaid account found."}, status=404)
        except Exception as e:
            print(e)
            return Response(data={"detail": "An unknown error occurred while trying to retrieve transactions"}, status=500)


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
            # ::TODO:: ADD REQUEST BODY VALDATION ::TODO::
            # Exchange link public token to access token
            exchange_response = plaid.get_access_token(
                public_token=request.data.get('public_token'))
            # Save exchange values to the database
            # save item id
            itemIds_serializer = serializers.PlaidItemIdsSerializer(
                data={'item_id': exchange_response['item_id']})
            # validate data
            itemIds_serializer.is_valid()
            # save
            item_ids = itemIds_serializer.save()
            # save access_token
            access_token_serializer = serializers.PlaidAccessTokenSerializer(data={
                'user': request.user.pk,
                'item': item_ids.pk,
                'access_token': exchange_response['access_token']
            })
            # validate data
            access_token_serializer.is_valid()
            # save
            access_token = access_token_serializer.save()
            # return the response
            return Response({
                'access_token': access_token.access_token,
                'item_id': item_ids.item_id
            })
        except plaid.plaid.errors.PlaidError as e:
            return Response(format_error(e))
        except Exception as e:
            print(e)
            return Response(data={"detail": "An unknown error occurred while trying to save the access token"}, status=500)


class AccountAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]

    def get(self, request, *args, **kwargs):
        try:
            accounts = plaid.get_accounts(kwargs.get('user_id'))
            return Response(accounts)
        except plaid.plaid.errors.PlaidError as e:
            return Response(format_error(e))
        except models.PlaidAccessToken.DoesNotExist as e:
            print(e)
            return Response(data={"detail": "No plaid account found."}, status=404)
        except Exception as e:
            print(e)
            return Response(data={"detail": "An unknown error occurred while trying to retrieve accounts data"}, status=500)
