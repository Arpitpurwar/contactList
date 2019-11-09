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
- After registration, we will get auth-token.
- After getting auth-token we have to use it with each request to server.
- In request header key will be auth-token and value will be Recieved token after loggedin.
{"auth-token":"adsjsl%csmbvs"}

- Token will be expire after 10 minutes.


##### Routes
 - http://localhost:3000/api/user/register
     - payload - {
	    "name":"XYZ",
	    "email":"abc@gmail.com",
	    "password":"He$1ciewer"
        } 

    - curl -X POST http://localhost:3000/api/user/register -H 'Content-Type: application/json' -d '{"name": "xyz","email": "xyz@gmail.com","password": "He$1ciewer"}'
 
 - http://localhost:3000/api/user/login
     - payload - {
	    "email":"purwarap333@gmail.com",
	    "password":"Heycheci%0"
        }
    
     - curl -X POST http://localhost:3000/api/user/login -H 'Content-Type: application/json' -H 'auth-token:   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaW' -d '{"email":"purwarap333@gmail.com","password":"Heycheci%0"}'

 - http://localhost:3000/api/getContacts?page=1&pagination=10
 
    - curl -X GET 'http://localhost:3000/api/getContacts?page=1&pagination=10' -H 'Content-Type: application/json' -H 'auth-token:   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaW' 

 - http://localhost:3000/api/createContact
     - payload - {
	    "name":"xyz",
	    "email":"xyz@gmail.com",
        "phone":1234567890,
	    "address":"xyz"
        } 

    - curl -X POST http://localhost:3000/api/createContact -H 'Content-Type: application/json' -H 'auth-token:              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaW' -d '{"name":"xyz","email":"xyz@gmail.com","phone":1234567890,"address":"xyz"}'

 - http://localhost:3000/api/deleteContact/5dc68cc7ff4df11f1093fd4d
    - curl -X DELETE http://localhost:3000/api/deleteContact/5dc68cc7ff4df11f1093fd4d -H 'Content-Type: application/json' -H 'auth-token: I4NTgsImV4cCI6MTU3MzI5NjQ1OH0.dyEE3hPXsgDVAPvYvdK4f0VcuVPiHZ3MAR3ZF8_zOmk' 

 - http://localhost:3000/api/updateContact/5dc68cc7ff4df11f1093fd4d
     - payload - {
	    "name":"xyz",
	    "email":"xyz@gmail.com",
        "phone":1234567890,
	    "address":"xyz"
        } 

    - curl -X POST http://localhost:3000/api/updateContact/5dc68cc7ff4df11f1093fd4d -H 'Content-Type: application/json' -H 'auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaW' -d '{"name":"xyz","email":"xyz@gmail.com","phone":1234567890,"address":"xyz"}'
