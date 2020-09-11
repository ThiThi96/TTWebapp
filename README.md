# NodeJS Demo Project

An ecommerce project built on NodeJS

Environment requirements:
- NodeJS: 14
- MySQL: 8.0.20

## How to run the project

- Remove postfix `.example` from `.env.example` file
- Fill in all the environment variables in this file


### If all environments are already set up
- Connect to your MySQL server, run the script inside `src/DAL/Data` called `ShopDatabase.sql` containing the database used by the project
- Open cmd and run `npm run dev`

If not, consider installing Docker and follow the below instructions:
### With Docker
- Open cmd and run `docker-compose up` to create the images and containers
- Move to `src/DAL/Data`
- Copy database file from your host to the container running MySQL `docker cp ShopDatabase.sql [container-id]:/ShopDatabase.sql`
- Enter the container running MySQL by  `docker exec -it [container-id] /bin/bash`
- Log in to MySQL server
```
$ mysql -u root -p
```
- Run `ShopDatabase.sql` to run the database script

The application should be fine for you to discover.

## Testing

To test a file:
`npm run test file.spec.js`

To test all files:
`npm run test`

To test all files with coverage report:
`npm run test-cover`
