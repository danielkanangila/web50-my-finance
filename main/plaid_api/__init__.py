import datetime
import plaid

from .settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, PLAID_API_VERSION, config
from ..models import PlaidAccessToken

client = plaid.Client(
    client_id=PLAID_CLIENT_ID,
    secret=PLAID_SECRET,
    environment=PLAID_ENV,
    api_version=PLAID_API_VERSION
)

# expose plaid error
PlaidError = plaid.errors.PlaidError


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


def get_accounts(user_pk):
    accounts = []
    try:
        for plaid_access_token in get_access_tokens(user_pk):
            account = client.Accounts.get(plaid_access_token.access_token)
            accounts.append(account)
    except Exception as e:
        print(e)
        raise
    return accounts


def get_transactions(user_pk, start_date, end_date):
    transactions = []
    try:
        for plaid_access_token in get_access_tokens(user_pk):
            _transactions = client.Transactions.get(
                plaid_access_token.access_token, start_date, end_date)
            transactions.append(_transactions)
    except Exception as e:
        raise
    return transactions


def get_access_tokens(user_pk):
    try:
        plaid_access_tokens = PlaidAccessToken.objects.filter(user=user_pk)
    except Exception as e:
        raise
    return plaid_access_tokens


def group_transactions_by_account(transactionList):
    # ::TODO Refactor to improve runtime
    # ::TODO Refactor to handle multiple bank account
    # loop through transactions response as came from the Plaid API response
    newAccounts = []
    for transaction in transactionList:
        accounts = []
        _transactions = []
        if "accounts" in transaction:
            accounts = transaction["accounts"]

        if "transactions" in transaction:
            _transactions = transaction["transactions"]
        for account in accounts:
            account["transactions"] = list(
                filter(
                    lambda tx: tx["account_id"] == account["account_id"],
                    _transactions
                ))
            newAccounts.append(account)

    return newAccounts


def get_account_transactions(user_pk, account_id, start_date, end_date):
    # get all transactions from plaid api
    transactions = get_transactions(user_pk, start_date, end_date)
    # get grouped transations by account
    groupedTransactions = group_transactions_by_account(transactions)
    # filter grouped transactions to return only transactions related to the account_id parameter
    filtered = list(
        filter(
            lambda acc: acc['account_id'] == account_id,
            groupedTransactions
        ))

    return filtered[0]['transactions']
