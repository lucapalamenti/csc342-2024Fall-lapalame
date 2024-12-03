# <img src="../images/MP5.svg" alt="" width="35" height="36" style="vertical-align: bottom"> Mini Project 5

  * [Login Page](templates/login.html)
  * [Home Page](templates/home.html)
  * [Profile Page](templates/profile.html)
  * [Error Page](templates/error.html)

  The biggest challenge I had when implementing the JWT algorithms was understanding what the expected return values were supposed to be for certain
  methods, particularly crypto.createHmac(). This method by itself isn't useful to us, and must be chainged with .update() and .digest(). The Node.js
  documentation manual was useful in explaining libraries like crypto and jwt.

  Currently every user has the same password of "password" and there is no way for a user to change their username or password. This poses a massive
  security risk! Data is also stored in files within the application. They should be moved to an external database. 