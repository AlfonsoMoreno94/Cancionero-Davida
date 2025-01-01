# Cancionero DaVida

#### Description:
This is a webpage which content is a songbook of Christian songs. It's made using React, Python and MySQL.

#### Structure

The folder has been created using create-react-app. This created automatically folders node-modules, public and src, along with files package-lock.json, package.json and this README.md. Folder node-modules and files package-lock.json and package.json haven't been touched, and in folder public we only added images in a folder called resources.

In the folder src I created the following folders:

    - backend: I store here all the Reducer functions and the file with the python code that calls the database.
    - components: I created here the navigation bar
    - context: I created the Context to share information across all components.
    - routers: I created the routers tree, with Router 2 handling the pages that can't be visited if you're not logged in.
    - pages: Here are all the pages that form the webpage. They will be explained in detailed now.

In this folder there is also files index.js, that hosts GoogleOAuthProvider component and the Brower Router component, App.js, that includes the component Provider and CookiesProvider, and index.css, with all the CSS of the project.

### Database set

Database is set using the library called pymysql and Flask to defines the routes. With pymysql, the app connects with the database and execute queries.

We had some difficulties here handling CORS, but we think this has been solved.

Databased has been created using MySQL and has the following tables:

        - canciones: stores title, author, lyrics and id for each song
        - usuarios: every time a new user logs in, an id is provided, and name and email are stored.
        - favoritos: here are stored together the user id and the song id that is marked as favorite.

### NavBar

The navigation bar is a component reachable in every page. We use a conditional to handle whether the user has already logged in or not.

NavBar always shows the logo of the project. This logo is clickable and navigates to "/inicio". After the logo, we can see the name of the project and the button Buscar. This button also redirects to "/inicio".

If you're not logged. You can use the button on the right side to log in using a gmail account. Afterward, the NavBar changes and shows a button Favoritos that redirects to "/favoritos" and display a welcome message with your name.

### Inicio

Just above a big logo, we can see a simple form. here, users can look for songs based on name or author. By default, users are prompt to look for song title. This step is compulsory.

### Buscar

The page Buscar uses the parameters from the previous form to search in the database and make the list "busqueda".

The search is made using the library axios to interact with the backend. In this case, we use the GET method to use both parameters. Then, we use a simple query to look for all the song that match a specific search type and the given value.

The return of this query is used in a dispatch function to update the list "busqueda". If no songs are found, the component displays the message "No se han encontrado canciones". Else both title and author are displayed. Each title is also a link to the song content.

### Cancion

This page displays the song content. Also, if you're logged in, we can see buttons that marks the song as favorite or deletes it from your favorites songs list.

Although displaying the song content was easy, I had some difficulties setting the variable that let us know if the song has been already marked as favorite or not.

We first need to get the list of all songs marked as favorite, if any. Then, use that list to see if the current song is included in that list. Depending on the result, we update a variable. This variable is used to determine which button is displayed. All this process is activated each time a button is clicked.

To mark a song as favorite, we use the data stored in the variable "perfil", where we can find the user email. Then, we look in the database the user id and post a new entry with the user id and the song id. We get the song id while searching for the title, author and lyrics.

The lyrics are displayed line by line. We use the method split to look for the scape character /n and then map the content.

### Favoritos

The page Favoritos display a list of all the songs that has been marked as favorites. It uses the same template of the page Buscar but adds a button that deletes the song from the list of favorites.

### Cookies

A cookies' system has been implemented to avoid losing information when the webpage is refreshed.


## Use of AI

Grok has been used to spot bugs and syntax errors. It also suggested the use of asyncronous functions when needed.
