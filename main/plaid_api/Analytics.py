class Analytics:
    def __init__(self, request, accounts, transactions):
        self.request = request
        self.accounts = accounts
        self.transactions = transactions
        self.balances = None
        self.expenses_value = 0

        self.compute_balances()

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

    def compute_expenses(self):
        # Extract expenses from transactions
        expenses = list(
            filter(
                lambda transaction: self.is_income(transaction.get('category')),
                self.transactions        
            ))
        # Compute total expenses
        for expense in expenses:
            self.expenses_value += expenses.get('amount')

    def is_income(transaction_categories):
        # Check if a given transaction is an income based on transaction categories.
        # List of income category key words
        income_key_words = ["Credit", "Deposit", "Payroll"]
        # Create a temporary set of transaction categories to optimize runtime
        temp = set(transaction_categories)
        # Create an intersection of income keyword and transaction categories
        kw_found = [value for value in income_key_words if value in temp]
        # return True if intersection are not None, otherwise return False
        return True if len(kw_found) else False 