## Setup

1. Build the form by running

   ```bash
   npm i
   npm run build
   ```

   in form/.

2. Set up the sqlite database using the script database/scripts/schema.sql. Run

   ```bash
   sqlite3 data.db
   .read scripts/schema.sql
   ```

   in database/.

3. Add access tokens to the database by executing database/scripts/create_token.sql on data.db.

4. Create the server/config.json file. Make a copy of example.config.json in server/ and rename the copy to config.json.

5. Start up the node server by running

   ```bash
   npm i
   npm start
   ```

   in server/.