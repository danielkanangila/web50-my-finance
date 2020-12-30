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


class TransactionRetreiveAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        CanRetreive
    ]
    serializer_class = serializers.TransactionSerializer
    queryset = models.Transaction.objects.all().order_by('-created_at')

    def get_queryset(self, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        return super().get_queryset(*args, **kwargs).filter(user_id=user_id)


class CreatePlaidLinkTokenAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        try:
            link_token = plaid.get_link_token(request.user)
            return Response(link_token)
        except Exception as e:
            return Response(format_error(e))


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
            return Response(data={"details": "An unknown error occurred while trying to save the access token"}, status=500)
