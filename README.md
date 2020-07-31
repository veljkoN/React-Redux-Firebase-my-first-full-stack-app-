# React-redux-firebase---full-stack-app---

Click here → **[Todo app](https://todo-app-2e1da.web.app/)** to see application hosted on web

## About
The application is created to serve more users who can create your own note with title, content, deadline, status (default is undone). One user can create more items which can be changed (undone /done) or remove from the list only by its creator. Activities like signup, create, change, remove item with author name are written in notification section. When create item, user choose date in calendar (only future days) which represent deadline. On summary page you can see the table with items sorted by done, undone and all together. Profile page contains basic information about user and created items with notifications.



## Implemented Technologies 
This is my first full stack application created with **React** as front end and **firebase (firestore)** services as back end. I also used redux with thunk middleware. Signup and Signin logic use Firebase Authentication service. Data created in the application store in Cloud Firestore and all created items trigger Cloud Firestore functions (on create a user account, and  on create, delete and change item). Using redux all information about data is reached from redux store. I implemented Bootstrap 4 to give application responsible design.
