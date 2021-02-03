from . import get_accounts, get_transactions
from .utils import get_date_from_request

class Analytics:
    def __init__(self, request, *args, **kwargs):
        self.context = {
            'request': request,
            'args': args,
            'kwargs': kwargs
        }
        self.accounts = get_accounts(kwargs.get('user_id'))
        self.transactions = []
        self.balances = None
        self.incomes = []
        self.expenses = []
        self.total_expenses = 0
        self.total_income = 0

        self.compute_balances()
        self.extract_transactions()
        self.compute_total_expenses()
        self.compute_total_income()

    def compute_balances(self):
        # Compute to total balance by currency 
        # get all accounts
        accounts = self.accounts
        # create balances dictionary to store the total amount of 'current' and 'available' balance
        balances = {}
        # By default, the plaid return None if the balance is zero,
        # to compute the total balance, we parse the balance to return zero if the balance is Nonw
        def parse_balance(balance):
            return 0 if not balance else balance;
        # Loop through accounts related to the access_token
        for account in accounts:
            # loop through accounts related in one institutions
            for subaccount in account["accounts"]:
                # get the balances and currency used
                _balances = subaccount['balances']
                currency = _balances['iso_currency_code']
                # check if the currency balance aleready exists in the  
                if not currency in balances:
                    balances[currency] = {}
                    balances[currency]['available'] = parse_balance(_balances['available'])
                    balances[currency]['current'] = parse_balance(_balances['current'])
                else:
                    balances[currency]['available'] += parse_balance(_balances['available'])
                    balances[currency]['current'] += parse_balance(_balances['current'])

        self.balances = balances

    def compute_total_expenses(self):
        # Extract expenses from transactions
        self.expenses = list(
            filter(
                lambda transaction: not self.is_income(transaction.get('category')),
                self.transactions        
            ))
        # Compute total expenses
        for expense in self.expenses:
            self.total_expenses += abs(expense.get('amount'))

    def compute_total_income(self):
        # Extract income from transactions
        self.incomes =  list(
            filter(
                lambda transaction: self.is_income(transaction.get('category')),
                self.transactions        
            ))
        # Compute total income
        for income in self.incomes:
            self.total_income += abs(income.get('amount'))

    def is_income(self, transaction_categories):
        # Check if a given transaction is an income based on transaction categories.
        # List of income category key words
        income_key_words = ["Credit", "Deposit", "Payroll"]
        # Create a temporary set of transaction categories to optimize runtime
        temp = set(transaction_categories)
        # Create an intersection of income keyword and transaction categories
        kw_found = [value for value in income_key_words if value in temp]
        # return True if intersection are not None, otherwise return False
        return True if len(kw_found) else False 

    def extract_transactions(self):
        # Retrieve start and end date form request query params if set otherwise use last 30 days transctions
        start_date, end_date = get_date_from_request(self.context.get('request'))
        # Get user_id from context params
        user_id = self.context.get('kwargs').get('user_id') 
        # Get account_id from request query parameter
        account_id = self.context.get('request').GET.get('account_id')
        # Retrieve accounts and transactions as return by the Plaid API response
        tx = get_transactions(user_id, start_date, end_date) 
        # self.transactions = tx
        for account in tx:
            for transaction in account.get('transactions'):
                # if account_id exists in request query, set only the transactions related to the account id
                if account_id and account_id == transaction.get('account_id'):
                    self.transactions.append(transaction)
                # if the account_id is none set all transactions
                if not account_id:
                    self.transactions.append(transaction)

    def get_data(self):
        return {
            'balances': self.balances,
            'total_expenses': self.total_expenses,
            'total_income': self.total_income,
            # 'transactions': self.transactions
        }