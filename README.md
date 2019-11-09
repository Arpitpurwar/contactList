#############################################################
###   contactList - ExpressJS, MongoDB, Token Based Authorization  ###
#############################################################

# prerequisite version
- node - v10.16.0  check through node -v 
- npm - 6.7.0  check through npm -v

##### Setup
- Please take clone from this Github Repo `https://github.com/Arpitpurwar/phonebook.git`
- After taking clone, run `npm install` or `npm i` .
- Please run above command from the top level of the project, so ``npm`` has access to
    the **package.json** file where the dependencies are. 
- In order to run the application with Mongo DB, we will need a file called **.env**
    to contain the connection information.
- After creating **.env** file write data in this format
    - SECRET_KEY=write your own secret key
    - PHONEBOOK_DB_URI= write your own mongodb URL
    - PORT=3000

- Run `npm start` server will start runnning & we will see these below two messages on running console
listening on port 3000
DB Connected


####### Remember points while token authentication
- In request header key will be auth-token and value will be Recieved token after loggedin.
{"auth-token":"adsjsl%csmbvs"}

- Token will be expire after 10 minutes.
