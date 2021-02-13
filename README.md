[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Hike log
This repo is the database side to a hiking log that allows a user access to his/her own individual, private database of hikes.  They can create, search for, update, and delete hikes that they have completed.  This can be a valuable resource for anyone trying to complete a hiking challenge, recommend hikes to others, or just keep a journal of their adventures.

## Planning Story
The idea for this database came from my own personal journey of collecting the 48 4000 foot peaks in New Hampshire.  I derived the data obtained based on the requirements of the AMC and useful numbers that I used to track data.  Since the information gathered were to be specific to a user, I decided to work on the auth features first.

The auth features were very straight forward on this project.  They included sign in, sign up, sign out, and change password.  Hashing of passwords allowed for increased safety on this project.  In addition, the use of tokens allows the user to ensure that their data is protected and strictly for their use only.  A user model was created to store the user's data through mongoose and mongoDB.  This included email, hashedPassword, and token.  The token is a unique string that is generated for the user each individual session.  The hashed password is created with bcrypt and was set to 10 salt rounds for encryption.

The next goal was to create the hike model. This included the date, trails, distance, elevation, time taken, mountains climbed, trail notes, and who they hiked with.  I decided to make only the date and trails required, as that is the basic information that would be available for a hike (ie. the person may not have the technology to gather elevation or distance).  All of this data was tied to a User who created the hike.

The routes were then the next focus.  The auth routes required a post for sign up, a post for sign-in, a patch for change password, and a delete for sign-out.  Promises were used for these requests, and proper error handling was attached to each.  The use of token was used to handle each individual session.

The hike routes required get requests for index retrieval and to show by ID, a post to create a new hike, a patch to update a hike, and a delete/destroy to delete a hike.  Each route was focused on resource management for the user by using the user ID and comparing it to the owner of the hike.


### User Stories
    1. As a user, I want to be able to sign in to my own secure account so that I can track my own hikes.
    2. As a user, I want to be able to track the mountains I have climbed and take notes on them.
    3. As a user, I would like to save all of my data and return to it later so that I can fill out applications for patches.
    4. As a user, I would like to modify any input at a later date, so that I do not have to do it all at once.
    5. As a user, I want to be able to look up previous trail notes I took and data recorded so I can refer to this information when recommending hikes to others.

### Technologies used
    1. html
    2. JavaScript
    3. CSS/sass
    4. jquery
    5. Bootstrap
    6. json
    7. MongoDB
    8. Mongoose
    9. ExpressJS
    10. Bcrypt
    11. PassportJS

### Links
[Depoloyed Frontend](https://robrichardsdpt.github.io/hike-tracker-client/) <br>
[Deployed Backend](https://stormy-plains-65398.herokuapp.com/) <br>
[Frontend Github Repository](https://github.com/robrichardsdpt/hike-tracker-client)<br>
[Backend Github Repository](https://github.com/robrichardsdpt/hike-tracker-backend)  

### Unsolved Problems/Reach goals
    - Search functionality to include search by trail, mountain
    - Statistics and other data tracking methods (filling in mountains into lists to show user how many more they need to accomplish goals)

## Images
![ERD](https://i.imgur.com/Yhay5xh.jpg)
# hike-tracker-backend-v2
