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
        self.grouped_transactions = []

        self.compute_balances()
        self.extract_transactions()
        self.compute_total_expenses()
        self.compute_total_income()
        self.group_transactions()

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

    def group_transactions(self):

        for transaction in self.transactions:
            description = transaction.get('merchant_name') if transaction.get('merchant_name') != None else transaction.get('name')
            category = self.format_category(transaction.get('category'))
            amount = abs(transaction.get('amount'))
            # check if category is already exist in the grouped transactions list
            if self.is_category_exists(category):
                self.grouped_transactions = list(map(
                        lambda tx: self.update_transaction_info(
                            transaction=tx, 
                            category=category, 
                            amount_to_add=amount, 
                            description=description,
                            new_transaction=transaction
                        ),
                        self.grouped_transactions
                    ))
            else:
                self.set_grouped_transaction(
                    category=category, 
                    description=description, 
                    amount=amount, 
                    transaction_item=transaction
                )    
    
    def set_grouped_transaction(self, category, description, amount, transaction_item):
        # add new transaction in the grouped_transaction
        row = {
            'category': category,
            'description': description,
            'amount': amount,
            'total_transactions': 1,
            'transaction_type': 'Incone' if self.is_income(transaction_categories=transaction_item.get('category')) else 'Expense',
            'transactions': [self.format_transaction_item(transaction_item)]
        }
        self.grouped_transactions.append(row)

    def format_transaction_item(self, transaction):
        # Format one transaction item to return only the necessary transaction information
        return {
            'transaction_id': transaction.get('transaction_id'),
            'amount': abs(transaction.get('amount')),
            'category': transaction.get('category')[-1],
            'description': transaction.get('name') if transaction.get('name') != None else transaction.get('merchant_name'),
            'date': transaction.get('date'),
            'account': self.get_account_name(account_id=transaction.get('account_id')),
            'account_id': transaction.get('account_id')
        }

    def get_account_name(self, account_id):
        # Get account for account related to the account_id parameter
        account = {}

        for item in self.accounts:
            # print
            for acc in item.get('accounts'):
                if acc.get('account_id') == account_id:
                    account = acc

        return None if not account else f"{account.get('official_name')} - {account.get('mask')}"

    def is_category_exists(self, category):
        # Helper method used in group_transaction method to check if the category is
        # already registed in the grouped transaction
        return False if not list(
            filter(
                lambda tx: tx.get('category') == category, 
                self.grouped_transactions
        )) else True

    def format_description(self, old_description, description):
        # Helper method used in updated_transaction_info method to format the description
        # by concantenating the existing description to the new description
        if description in old_description:
            return old_description
        else:
            return f'{old_description} | {description}'

    def format_category(self, category):
        return f'{"/".join(category)}' if len(category) <= 2 \
            else f'{category[0]}/{category[1]}'

    def update_transaction_info(self, transaction, category, amount_to_add, description, new_transaction):
        # Helper method used in the update_transaction to update a transaction related to a given category
        if (transaction.get('category') == category):
            return {
                **transaction,
                'amount': transaction.get('amount') + amount_to_add,
                'description': self.format_description(old_description=transaction.get("description"), description=description),
                'total_transactions': transaction.get('total_transactions') + 1,
                'transactions': [*transaction.get('transactions'), self.format_transaction_item(new_transaction)]
            }
        else:
            return transaction

    def get_data(self):
        return { 
            'balances': self.balances,
            'total_expenses': self.total_expenses,
            'total_income': self.total_income,
            'transactions': self.grouped_transactions,
            
        }