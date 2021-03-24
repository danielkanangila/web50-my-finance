from rest_framework.views import exception_handler
from rest_framework.response import Response as DRF_Response
from rest_framework import status

from django.core import exceptions
from django.views import View
from django.http import response


def custom_exception_handler(exc: Exception, context: View) -> [response, None]:

    response = exception_handler(exc, context)

    if isinstance(exc, exceptions.ValidationError):
        data = exc.message_dict
        return DRF_Response(data=data, status=status.HTTP_400_BAD_REQUEST, )
   
    return response