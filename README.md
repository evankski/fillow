# Fillow
<h1> What is Fillow? </h1>
Fillow is a simplified version of Zillow! When creating an account, you will have the option to browse every listing posted by already signed up users. Any user can upload a listing of their choice. Is there a listing you like? Go ahead and throw it in your favorites! Want to let someone know how beautiful their property is? Leave a comment! This is a great place for everyone to show off their properties.

# Installation Instructions
1. Fork and clone this repository
2. Run ```npm i``` to install all dependencies
<details>
<summary>Dependencies</summary>
<ul>
<li> @mapbox/mapbox-sdk</li>
<li> bcrypt</li>
<li> cookie-parser</li>
<li> dotenv</li>
<li> ejs</li>
<li> express</li>
<li> express-ejs-layouts</li>
<li> mapbox</li>
<li> mapbox-gl</li>
<li> method-override</li>
<li> sequelize</li>
</ul>
</details>


3. Run ```createdb fillow```
4. Run ```sequelize db:migrate```
5. Create an account at https://www.mapbox.com/ and sign up for a free API key
6. Create a .env file 
7. Inside of the .env
  - First put in your API key ```MAPBOX_TOKEN=exampleToken```
  - Then put your secret key in for user authentication ```SECRET=secretPhrase```
  - Lastly put in the port you want to use ```PORT=8000```

# Deployed Website 
https://fillow.herokuapp.com/

# Approach 
The first thing I did when creating this project was get all of the basic routes created to have a functioning webpage. This consisted of creating the homepage, controllers for Listings and Users. I then decided to first tackle the CRUD functionality of my site. To do this, I created all of my routes and started bulding them all up. I then decided to implement the API to each listing by having it in the show ejs. After completing this functionality, I moved onto making the favorites page. The second to last thing was creating the comments, I knew once the rest was created that this would be easier to implement. Lastly, I styled everything once I tested all of the functionality of my site.

# Post-project reflection 
I am fairly happy with how this website turned out. This project has really made clear how to properly use ERDs to create databases with connecting functionality. If I were to have made this project with zero planning, then I would most certanily have ran into a lot more bugs. The only unfixed issue I have is when a listing is created or edited with random variables in each area of the form it can occasionaliy break the webpage.

# API 
The API I chose to use was MapBox to display each listing on a map that shows its exact location.

# ERDs 

![Screen Shot 2022-03-01 at 2 56 57 PM](https://user-images.githubusercontent.com/95590888/156262978-3e554d35-c5fa-41b4-b5ba-d731e9ecbc84.png)


# Restful Routing Chart 

| **URL** | **HTTP Verb** |
|------------|-------------|
| /         | GET         
| /users/         | POST        
| /users/login          | GET  
| /users/login          | POST 
| /users/logout          | GET
| /users/profile      | POST
| /users/listings/:id      | POST 
| /users/new      | GET   
| /listings/      | POST
| /litsings/new | GET              
| /listings/create      | POST    
| /listings/:id      | GET  
| /listings/edit/:id      | PUT 
| /listings/edit/:id      | GET
| /listings/:id      | DELETE
| /listings/comments      | POST


# User Stories 
As a user, I want to create a listing of my house for every other user to see so I can sell my property.
As a user, I want to favorite other peoples listings so I can keep track of the best properties.

# MVP goals 
* sign up functionality
* sign in funcionality
* favorite system
* a page that posts favorites
* database table that keeps track of all users with encrypted passwords
* a database table that keeps track of favorites per user
* a CRUD system for uploading listings

# stretch goals
* comment functionality on each listing posted
* a profile page that shows all listings for one user
