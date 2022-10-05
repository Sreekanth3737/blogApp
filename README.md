<h1>Devschool<h1>

![Screenshot from 2022-10-05 11-23-23](https://user-images.githubusercontent.com/88850899/193990768-4ef9308f-4ca0-4143-b26f-1dceb317fe3d.png)
<h2>Introduction</h2>
<p>devschool is a Blog website for creating blogs and helpful documentaries for developers. Developers can browse and see the posts and search the doubt topics.users chat with other users, users can see Like Dislike comments to the Other Author posts. users can manage their account details by Add Posts, changing profile pictures and profile details, and payment methods for premium. This website has an admin section. Admin can manage users like block, delete, search, etc. admin can manage Users' Blogs, give verification, give premium Access to users, etc.

</p>
<h2>Run</h2>
<p>To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:</p>
<li>JWT_KEY: This is the JWT AuthToken (string).</li>
<li>SENDER:This is the sender, who sends the mails, used for nodemailer(string)</li>
<li>EMAIL:This is the email id, used for nodemailer(string)</li>
<li>PASSWORD : This is the password, used for nodemailer(String)</li>
<li>CLOUDINARY_CLOUD_NAME : This is the cloud name to store images, Cloudinary(String)</li>
<li>CLOUDINARY_API_KEY : This is the API Key, Cloudinary(String)</li>
<li>CLOUDINARY_SECRET_KEY : This is the secret key, Cloudinary(String)</li>
<li>MONGO_DB : This is the database, Mongo DB(String)</li>
<p>After you've set these environmental variables in the .env file at the root of the project, and intsall node modules using npm installand install frontend packages.</p>
<p>Now you can run the backend using npm start in the terminal and run the frontend using npm run start, then the application should work.</p>
<h2>Technology</h2>
<p>The application is built with:</p>
<li>React js</li>
<li>Node Js</li>
<li>Express js</li>
<li>MongoDb</li>
<li>Redux toolkit</li>
<li>Bootstrap</li>
<li>Styled components</li>
<li>Rest API</li>
<li>socket.io</li>
<li>Cloudinary</li>
<h2>Features</h2>
<p>This application is a Blog website for creating blogs and helpful documentaries for developers. Which displays posts/blogs created by different authors.</p>
<h6>Users can do the following:</h6>
<li>Signup with Email verification using nodemailer.</li>
<li>User can login using the credentials.</li>
<li>Through otp verification, the user can manage forgotten passwords.</li>
<li>Users can change their password and set a new one.</li>
<li>Users can change their personal info.</li>
<li>The Topics are split into categories users can select the Topics By Category.</li>
<li>users can search particular blog</li>
<li>Loggined user can create posts, like posts, unlike posts add comments.</li>
<li>User without login can view posts only.</li>
<li>User can view single post details.</li>
<li>users can chat with other users</li>
<li>Users can follow and unfollow each other.</li>
<h6>Admins can do the following:</h6>
<li>The Admin can become a controller of the APP by using the signup option and providing his role-based credentials, which he can later use to log in.</li>
<li>Admin can log in using registered credentials username and password, and can also end the session using the logout button</li>
<li>Admin can handle user block , unblock and delete.</li>
<li>Admin can send Email Notifications to users</li>
<li>Admin can add category, edit category and delete categories.</li>
<h2>Author</h2>
<h6>Sreekanth ps</h6>
