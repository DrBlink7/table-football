# Backend
Node backend, copy .env.example vars in .env file (you should create it) and ask me (or check email) how to fill it.

## Swagger UI
You can browse the App documentation [here](http://localhost:3001/swagger/) to be enabled to use BE APIs you need to log in with the Login API providing an email & password, the API will send you back a token, that will **Authorize** you on every SWAGGER UI call.

You can paste the code on **Authorize** lock-icon on top right of the screen or clicking on any lock you will find near the API call you want to use and then pasting the code in the Box as a Bearer Token.

The most important APIs are the 2 API calls (under Notification group) that doesn't require any authorization to ran.
These calls can be used via Swagger UI only, that's because i want to simulate the user experience of a real live match: the fact that it's not the FE user the one who "interacts scoring a goal in a live match" is a realistic user experience.
(N.B. see loom video example)

The other APIs are pretty self-explanatory but i will sum them up anyway:
- Healthcheck: (classic healthcheck from BE app)
- Login: use it with an email and a password to have a valid bearer token
- Matches: CRUD operations on Match db entity (Match have an id, a status: (preparing/ongoing/ended) and information about red and blue team)
- Notification:
  - add goal: will add a goal to teamid that is one of the 2 team of the given matchid. A goal can be added only if a match has the status ongoing and only if the teamid is a valid id (the id is the one of the red team or the blue team). You can add even a message describing the goal, this message will appear on FE toast/snack bar:
  You can send notification, from Swagger UI, even on match not started (FE will recieve it but no data will be recorded in redux store). You can send notification from Swagger UI on a match indicating a wrong team number and no goal will be registered (only the message will appear).
  I made a [loom video](https://www.loom.com/share/e3fbacadd9244d0e8310ce32d99d9310) as tutorial.
  - startmatch: i added a rule that prevent the launch of 2 matches at the same time, supposing that molo has only 1 table, removing this rule this start various matches, and updating N live matches without any issue on FE/BE.

## Test
To run the test on BE you just need to open a shell from BE folder and run
```bash
yarn run tests
```
The coverage of the tests are basically on every util function i used to manipulate db data.

## DB Migration tutorial (out of scopr guide )
This is a mini-guide if you're interested in this tool!

You can find node-pg-migrate complete guide [here](https://salsita.github.io/node-pg-migrate/#/)

### Create migration 
To generate a migration (for example a migration called "init db") you need to do these steps, from a shell running from backend folder run this command
```bash
yarn run migrate create init db
```
a file *timestamp_init-db.js* will be created, you need to open it and add a database script, ex:
```js
exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('post', {
    id: { type: 'text', notNull: true },
    text: { type: 'text', notNull: true }
  })

  pgm.addConstraint('post', 'unique_id', {
    unique: ['id']
  })
}

exports.down = pgm => {
  pgm.dropTable('post')
}
```
this script will handle the migration up (creation) down (cleaning).
After modifying (and saving) the script in the file you need to effectively run init-db migration, to do that you need to launch this command:
```bash
DATABASE_URL=postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME yarn run migrate up
```
N.B. Note that if you're running it from locale your DB_HOST will be localhost.

### Future Migrations
If you need to do another migration, for example you want to add a column *userGroup* to the table *post* just do this step:
```bash
yarn run migrate create user-group-on-post
```
then, as you did before, edit *timestamp_user-group-on-post.js* and add the column on the table with a script:
```js
exports.up = (pgm) => {
  pgm.addColumns('post', {
    userGroup: { type: 'text', notNull: false }
  })
}
exports.down = pgm => {
  pgm.dropColumn('post', 'userGroup')
}
```
after editing (and saving the file) you need to run (as usual) the command:
```bash
DATABASE_URL=postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME yarn run migrate up
```
doing that there will be a new column in post table!
