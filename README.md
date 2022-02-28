# Fillow
<h1> What is Fillow? </h1>
Fillow is a simplified version of Zillow. You first will be prompted to create an account. After account creation, you will be able to view all houses listed by other users. You will be able to favorite any homes you like. 
C - You will be able to create a listing
R - You can see listings posted by other users
U - You will be able to edit any listing you posted
D - You can delete any listing that you posted

<h1> API </h1>
The api I will choose to use is map box. With map box there will be a seperate page with a map that will show the favorited listings to the right. You will be able to search your favorited listings and see the house on a map. It will give you an idea of the neighborhood of the listing you chose.

<h1> ERDs </h1>

![Screen Shot 2022-02-28 at 2 29 32 PM](https://user-images.githubusercontent.com/95590888/156069222-34e168cf-c950-4f1c-a542-b009d9b46545.png)


<h1> Restful Routing Chart </h1>

| **URL** | **HTTP Verb** |
|------------|-------------|
| /         | GET         
| /users/new         | GET         
| /users/login          | GET  
| /users/login          | POST 
| /users/logout          | POST 
| /listing      | GET   
| /listing/:id      | GET   
| /litsing/create | GET              
| /listing/create      | POST    
| /listing/edit/:id      | GET  
| /listing/edit/:id      | POST 
| /listing/delete/:id      | POST
| /listing/delete/:id      | DELETE
| /favorites      | GET 
| /favorites      | POST

<h1> Wireframes </h1>
# Home page
<img width="506" alt="Screen Shot 2022-02-27 at 11 23 16 PM" src="https://user-images.githubusercontent.com/95590888/155941290-fe3dbca0-083a-4466-abc4-d80a48aec7e4.png">

# After sign in
<img width="478" alt="Screen Shot 2022-02-27 at 11 24 45 PM" src="https://user-images.githubusercontent.com/95590888/155941361-369fb8ed-96c6-43b4-970b-41bbd5b7d7ca.png">

# Listing page
<img width="481" alt="Screen Shot 2022-02-27 at 11 25 40 PM" src="https://user-images.githubusercontent.com/95590888/155941436-f4ea8923-035b-47dd-a0ff-c18f8f5f64f2.png">

# Upload/create
<img width="467" alt="Screen Shot 2022-02-27 at 11 26 19 PM" src="https://user-images.githubusercontent.com/95590888/155941505-f9452aa0-b782-471f-a0b6-1f8f53476453.png">

# Edit page
<img width="471" alt="Screen Shot 2022-02-27 at 11 26 55 PM" src="https://user-images.githubusercontent.com/95590888/155941579-e5551557-89e3-4106-ba6e-cdd263223fae.png">

# Delete
<img width="381" alt="Screen Shot 2022-02-27 at 11 27 28 PM" src="https://user-images.githubusercontent.com/95590888/155941631-a5bca6d2-7135-45d3-9204-5462b9fb2853.png">

# Listing after link clicked
<img width="371" alt="Screen Shot 2022-02-27 at 11 27 55 PM" src="https://user-images.githubusercontent.com/95590888/155941684-a5246dbd-05d2-4adf-be62-cc37a320e432.png">

<h1> User Stories </h1>
As a user, I want to create a listing of my house for every other user to see so I can sell my property.
As a user, I want to favorite other peoples listings so I can keep track of the best properties.

<h1> MVP goals </h1>
* sign up functionality
* sign in funcionality
* favorite system
* a page that posts favorites
* database table that keeps track of all users with encrypted passwords
* a database table that keeps track of favorites per user
* a CRUD system for uploading listings

<h1> stretch goals </h1>
* comment functionality on each listing posted
* a profile page that shows all listings for one user
