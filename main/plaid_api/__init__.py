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
            'client_name': "Finelth",
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
    # ::TODO add institution info in each account object
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
    # ::TODO add institution info in each account object
    accountsTransactions = []
    try:
        for plaid_access_token in get_access_tokens(user_pk):
            plaid_response = client.Transactions.get(
                plaid_access_token.access_token, start_date, end_date)
            
            accounts = plaid_response['accounts']
            transactions = plaid_response['transactions']
            # Group transactions by account and add institution's information in account
            for account in accounts:
                # filter transactions to get only transactions corresponding to the account id
                _transactions = list(
                    filter(
                        lambda tx: tx["account_id"] == account["account_id"],
                        transactions
                    ))
                # set institution's info
                account['institution_id'] = plaid_response['item']['institution_id']
                # set transactions to the accounts
                account['total_transactions'] = len(_transactions)
                account['transactions'] = _transactions

                accountsTransactions.append(account)
    except Exception as e:
        raise
    return accountsTransactions


def get_access_tokens(user_pk):
    try:
        plaid_access_tokens = PlaidAccessToken.objects.filter(user=user_pk)
    except Exception as e:
        raise
    return plaid_access_tokens


def  group_transactions_by_account(transactionList):
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
    # filter grouped transactions to return only transactions related to the account_id parameter
    filtered = list(
        filter(
            lambda acc: acc['account_id'] == account_id,
            transactions
        ))

    return filtered[0]['transactions']

def is_institution_exists(stored_access_tokens, new_access_token):
    # check if a given access token for an 
    # instution exists in a list of access tokens
    new_item = client.Item.get(new_access_token).get('item', {})
    new_institution_id = new_item.get('institution_id')

    for access_token in stored_access_tokens:
        old_item = client.Item.get(access_token).get('item', {})
        existing_institution_id = old_item.get('institution_id')

        if new_institution_id == existing_institution_id:
            return True
            break
    
    return False


