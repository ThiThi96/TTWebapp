# NodeJS Demo Project

An ecommerce project built on NodeJS

Environment requirements:
- NodeJS: 14
- MySQL: 8.0.20

## How to run the project

- Remove postfix <mark style="background-color: lightblue">.example</mark> from <mark style="background-color: lightblue">.env.example</mark> file
- Fill in all the environment variables in this file


### If all environments are already set up
- Connect to your MySQL server, run the script inside src/DAL/Data called <mark style="background-color: lightblue">ShopDatabase.sql</mark> containing the database used by the project
- Open cmd and run <mark style="background-color: lightblue">npm run dev</mark>

If not, consider installing Docker and follow the below instructions:
### With Docker
- Open cmd and run <mark style="background-color: lightblue">docker-compose up</mark> to create the images and containers
- Move to src/DAL/Data
- Copy database file from your host to the container running MySQL <mark style="background-color: lightblue">docker cp ShopDatabase.sql [container-id]:/ShopDatabase.sql</mark>
- Enter the container running MySQL by <mark style="background-color: lightblue"> docker exec -it [container-id] /bin/bash</mark>
- Log in to MySQL server
```
$ mysql -u root -p
```
- Run <mark style="background-color: lightblue">source ShopDatabase.sql</mark> to run the database script

The application should be fine for you to discover.

## Testing

To test a file:
`npm run test file.spec.js`

To test all files:
`npm run test`

To test all files with coverage report:
`npm run test-cover`
