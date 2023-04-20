# ![IMAGE](./src/assets/finax.svg)  **Finax**

An Application to manage financial and personal transactions, built using **Vite** + _**React**_ + _**TypeScript**_

---

> **Warning**
> This application relies on an API service that I developed and deployed on a hosting service with limited bandwidth. Therefore, the application may experience occasional downtime or reduced functionality.

---

## **Demo**

## **About the Project**
Right Now I'm using this project to keep my financial history at one place. I built this application to revise some React concepts and Authentication process.

 
I created whole project from idea to application all by myself from backend service in node js to front end. 

I designed database ER Diagram in Whimsical, designed the UI in figma and devloped with `vite + react + typescript`.

## **Note on Performance and Availbility**
> **Warning** This application was built as an experiment to check `vite + react` performance. And this app is hosted on a free hosting service plan so availbility and performance can be affected
>

## **Librabries Used**
- Axios - for making HTTP requestes to API.
- Chart.Js - for dooughnut chart (data visualization)
  
## **Features**
- User can create new account and Login to existing account, Authenctication using JWT tokens and cookies.
- Logged in user can add new transactions (debit and credit) into their record list.
- User can view there total debits,credits and difference of both made in the account.
- Same can be visually shown as doughnut chart using chart.js
- User can view all of there transactions record and filter them based on month and(or) year and pagination is used to show records.
- User can logout or delete there account permanently (will delete all data associated with that account).

### **Running locally**
---
> **Note** - This application uses API built with Node Js and PostgreSQL database, to run locally you need to create your own API.

----

1. Clone this respository 
```
git clone https://github.com/thesevenn/expense_tracker-app_client
```

1. Move to the cloned project folder (`eg.expense_tracker_app_client`)
```
cd ./expense_tracker_app_client
```
1. Copy items from `example.env` to `.env.local`

```
 cp .env.example .env.local
```

4. install dependencies using yarn

```
 yarn install
```

5. To run the app locally using yarn 
```
yarn dev
```

See results at `http://localhost:5173`

## LICENSE
Licensed Under Standard [MIT LICENSE]('https://github.com/thesevenn/expense-tracker-app-client/blob/master/LICENSE')

All  Logos used in project are  &#169; to **Sevenn**