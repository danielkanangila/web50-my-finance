# CS50's  WEB - Final Project "myFinance"

My Finance is a web application that help people to manage all of their bank accounts in one place. The application is built-in Python/Django Framework, JavaScript/React.js and [Plaid API](https://plaid.com/).

The backend application is a RESTFull API built-in Django and the frontend application is built-in JavaScript/React.

## Application Main Features
- User can link her/his bank account(s)
- User can view her/his bank account(s) balance(s)
- User can view her/his bank account(s) transaction(s)
- User can view the total balance, total expenses and total incomes in her/his bank account(s)

## Dependencies
All backend application dependencies is listed in the `requirements.txt` file in the `./backend/my_finance` directory and, the frontend application dependencies are listed in the `package.json` in the `./frontend/` directory.

The main dependency of this project is Plaid API. We used [Plaid API](https://plaid.com/) to connect and link users bank account(s) and retrieve the balances and transactions.

## Projects Directories

```
- backend (all python files)
    |- my_finance
        |- accounts # Contain the authentication and authorization application and, user model
        |- api # Contain the code that handle all requests to the Plaid API and data manipulation
        |- my_finance # Django application main directory
        |- utils # Contain helper functions
- frontend (all JavaScript files)
    |- public # Contain static file
    |- src # Contain all React components | frontend application main directory
```

## Run In Local
**Note:** Before to start, make sure you have `python3.*` and `npm 6.*` installed in your computer.

You will need a Plaid API Key in order to run the backend application, so go to the [Plaid API Website](https://dashboard.plaid.com/signup?email=&referrer_url=) to generate an API Key.

1. Clone this repository
2. cd into the `./frontend` directory run `npm install` to install dependencies
3. cd into the `./backend/my_finance` and run `pip install -r requirements.txt` to install dependencies required in the backend application.
4. create an `.env` file and save the following environment variable
```
SECRET_KEY=YOUR_APP_SECRET_KEY
DATABASE_URL=YOUR_DATABASE_URL
PLAID_CLIENT_ID=YOUR_PLAID_API_CLIENT_ID
PLAID_SECRET=YOUR_PLAID_API_SECRET_KEY
PLAID_ENV=sandbox|development|production
PLAID_PRODUCTS=transactions
PLAID_COUNTRY_CODES=US,CA
PLAID_REDIRECT_URI=
```
**Note:** We are using the PostgreSQL Database in this application, so the DATABASE_URL must be the a URL to your PostgreSQL Database formatted like this `postgres://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME`
5. In the `./backend/my_finance` run `python manage.py makemigration` then  `python manage.py migrate` to migrate all models to the database.

After installed all dependencies and set all environment variables like describe above, in the `./backend/my_finance` directory run `python manage.py runserver` to start the backend application and then, in the `./frontend` directory run `npm start` to start the frontend application.

The frontend application will start on `http://localhost:3000` and make sure that the backend application run on `http://127.0.0.1:8080`.

You can access the application via your web browser on `http://localhost:3000`.

**Note:** If you're using Plaid in the sandbox environment `PLAID_ENV=sandbox`, use the following credential to link any banks:
```
username=user_good
password=pass_good
```
If you set a different Plaid environment, you should use your real bank credential in order to link your bank(s).


