# Details Form (Practice Project)
This is a form that allows a user to submit information and upload documents to the server.
## Setup
1. Build the form by running
   ```bash
   npm i
   npm run build
   ```
   in form/.
2. Set up the sqlite database using the script database/scripts/schema.sql. Run
   ```bash
   cat scripts/schema.sql | sqlite3 data.db
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
## Usage
There is a simple authorization protocol in place which prevents unknown users from making a submission. The access_token table in the database stores known user ids and a token which permits them to use the form. To access the form visit http://{host}/?id={id}&token={token}.
E.g. using the default example.config.json which runs the server on port 3001, execute this statement on the database
```bash
echo "insert into access_token (token, person) values (123, 1);" | sqlite3 database/data.db
```
then visit http://localhost:3001/?id=1&token=123.
