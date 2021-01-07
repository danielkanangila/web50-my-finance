from django.urls import path
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('transactions', views.TransactionViewSet)

urlpatterns = [
    path('users/<int:user_id>/transactions',
         views.TransactionRetreiveAPIView.as_view()),
    path('create_link_token', views.CreatePlaidLinkTokenAPIView.as_view()),
    path('set_access_token', views.PlaidAccessTokenAPIView.as_view()),
    path('users/<int:user_id>/accounts', views.AccountAPIView.as_view()),
    path('users/<int:user_id>/accounts/<account_id>/transactions',
         views.AccountTransactionsAPIView.as_view()),
] + router.urls
