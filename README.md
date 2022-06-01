# Library of Life 
Currently, there are many ways to find ancestry through online services, but the personal history of the people found on these services are lost to time. Library of Life is an application that enables people to create digital legacies to leave behind. Users can upload their personal story in the form of a video to be shared with friends, family, and future generations. 

Duration: 2 week sprint

## Screenshots 
<img width="1438" alt="Screen Shot 2022-06-01 at 1 16 11 PM" src="https://user-images.githubusercontent.com/92271468/171484898-d8f55ca4-bb64-4f42-9e0f-f1bef26b1e16.png">

<img width="1439" alt="Screen Shot 2022-06-01 at 1 16 49 PM" src="https://user-images.githubusercontent.com/92271468/171484909-b80f2ded-966b-404b-88d8-ab8a504b137d.png">

<img width="1436" alt="Screen Shot 2022-06-01 at 1 17 46 PM" src="https://user-images.githubusercontent.com/92271468/171484921-07a09815-a21f-4431-afab-4afe6304b912.png">

## Getting Started 
We **STRONGLY** recommend following these instructions carefully. These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites
Before you get started, make sure you have the following software installed on your computer:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


### Create database and table
Create a new database called `lol` and create the tables located in the database.sql file.

If you would like to name your database something else, you will need to change `lol` to the name of your new database name in `server/modules/pool.js`.


## Development Setup Instructions
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
 
  SERVER_SESSION_SECRET=superDuperSecret


- While you're in your new `.env` file, replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

- In the .env you need to add an AWS API Key (not included in this document)
    - 
- In the .env you need to add a TinyURL API Key (not included in this document)
    - The key needs to be called TINY_URL_KEY in the .env
    - Sign up and get a free key at: https://tinyurl.com/

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


## Usage 
1. Login/Register 

2. Customize Profile 
  Edit Profile Information:
  To change your profile information, click the pencil button near your profile image on the profile page. Here you will be able to update any personal information as well as your profile image (uploaded images must be .JPEG files), then click save. 

  Add Profile Banner Image (Uploaded images must be .JPEG files):
  To add a banner image, click the "edit banner" button located on your profile, choose the desired banner, then save. 


3. Connections
  Find connections:
  To find connections, navigate to the search bar. Here, type in the first and last name of the user you want to connect with. Once you are on their profile page, click the connect button. You will be given the option to connect with the user as a friend or family. 

  View connections: 
  To view who you are connected with, navigate to the menu dropdown. From here, you can click the "my connections" tab. On this page, you can use the toggle to switch between all of your connections, your family connections, and your friend connections.

  Accept a Connection: 
  To accept a connection, navigate to the my connections page. From here, you can use the toggle to switch to "requests". Click "accept" to accept the request and "ignore" to deny the request. 
  
  Remove a Connection:
  To remove a connection, navigate to the my connections page. From here, navigate to the connection you would like to remove. Click "delete" to remove the connection. 
  

4. Upload a Video (Uploaded videos must be .MP4 files)
  Upload Video:
  To upload the video, navigate to the upload video page using the menu bar. From here, click "add video". First, you will chose the prompt you want to answer. You will then record the video outside of the app. After you record the video, you will be able to click or drag your video into the dropbox to upload it. 

  Delete Video:
  To delete a video, click the trash icon located at the bottom of the video.


5. Share a Video 
  Share with any of your friends/family connections within app:
    Select connections from the dropdown menu with whom you want to share the video, and click send.

  Share a video link outside of the app:
    Click Share, then click Give me a Link. A shortened URL and message will be generated to copy into text or email.


6. Permissions 
  From profile page or Manage Library, use the dropdown menu on an individual video to set its viewing permissions. 
    -Set to family/friends: Only family and friends will see your video
    -Invite-only: You must specifically invite your connections to view your video


## Built With 
Node.js,
Express.js,
React,
Redux,
Redux Saga,
PostgreSQL,
Heroku,
MUI,
AWS S3

## Heroku 
See a live version of the application at:
https://fierce-dusk-71430.herokuapp.com/#/home


## Authors 
Anissa Crawford, Jason Inouye, Juliette Lelchuk, Lucas Houska, and Michael Chuinard


## Acknowledgments 
Freddy Hutt,
Tariq Azmi,
Dane Smith,
The Butler Cohort,
Prime Digital Academy, 
Our friends and family


