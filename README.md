# ticket-system-app

A web application which a small business can see their customers' messages and respond to them.

### Technologies used

#### Server Side

 - Node js
 - Express
 - MongoDB
 - Other small libraries (dependencies) can be found in the package.json file
 
 #### Client Side
 
 - Vue 
 - Bootstrap 4
 - Flex Box
 - Sass
 - ES6
 - Other small libraries (dependencies) can be found in the package.json file

#### How to use application

#### Client

 - Can register by name which gets stored to localStorage (simulating authentication).
 - Can send a ticket which includes subject, message and optional File
 - All tickets sent already can be viewed and edited by the customer
 - All tickets can be deleted by the customer
 - Customers can filter fields by status
 - Customers can sort fields by date (Ascending or Descending)
 - The customer's name is used to track the one who owns the project (In a real world situation this is not a good idea. This is only for testing purposes).
 - Customer can later review the reply the admin sent

 
#### Admin

 - Admin can view all tickets sent by customers around the world
 - Admin can reply to the tickets sent by customers by changing the status, writing a message, and an optional upload of a file
 - Admin can search inside the tickets page by customer's name, or by the subject of their message
 - Admins can filter fields by status
 - Admins can sort fields by date (Ascending or Descending)

#### Deployment 

 - This app can be deployed to a VPS or a PaaS
 - This is because it is a MEVN Stack app

