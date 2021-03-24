import datetime
from django.conf import settings
from rest_framework.response import Response
import plaid

from api.models import PlaidAccessToken


def format_error(e):
    return {'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type, 'error_message': e.message}}


def get_date_from_request(request):
    # if start_date and end_date are not found in request query params,
    # set now as default end_date and (now - 30 days) as default start_date
    start_date = request.GET.get('start_date', '{:%Y-%m-%d}'.format(
        datetime.datetime.now() + datetime.timedelta(-30)))
    end_date = request.GET.get(
        'end_date', '{:%Y-%m-%d}'.format(datetime.datetime.now()))

    return start_date, end_date

# Helper to handle api call and exceptions
def plaid_request(api_func):
    try:
        # call the api helper function
        _response = api_func()
        # return the response 
        return Response(_response)
    # Handle exception to return the formated error and header
    except plaid.errors.PlaidError as e:
        print(e)
        return Response(data=format_error(e), status=400)
    except PlaidAccessToken.DoesNotExist as e:
        print(e)
        return Response(data={"detail": "No plaid account found."}, status=404)
    except Exception as e:
        if settings.DEBUG:
            raise
        else:
            print(e)
            return Response(
                data={
                    'detail': f'An unknown error occurred while trying to excute [{api_func.__name__}].'},
                status=500
            )
