import plaid

from .settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, PLAID_API_VERSION, config

client = plaid.Client(
    client_id=PLAID_CLIENT_ID,
    secret=PLAID_SECRET,
    environment=PLAID_ENV,
    api_version=PLAID_API_VERSION
)


def get_link_token(user):
    try:
        response = client.LinkToken.create({
            'user': {
                'client_user_id': f"{user.pk}"
            },
            'client_name': f"{user.first_name} {user.last_name}",
            'products': PLAID_PRODUCTS,
            'country_codes': PLAID_COUNTRY_CODES,
            'language': "en",
            'redirect_uri': PLAID_REDIRECT_URI,
        })
        return response
    except plaid.errors.PlaidError as e:
        raise


def get_access_token(public_token):
    try:
        exchange_response = client.Item.public_token.exchange(public_token)
        return exchange_response
    except plaid.errors.PlaidError as e:
        raise
