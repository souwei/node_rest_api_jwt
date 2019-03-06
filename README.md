## SAMPLE NODE REST API with JWT AUTH

Sample node rest api that requires user to authenticate with jwt tokens.

### INSTRUCTIONS

1. npm i
2. `node index.js`
3. post to `localhost:5000/login` with `email` and `password` to get access token and refresh token
4. get `localhost:5000/protected` with access token to test token
5. post to `localhost:5000/token`


#### READING SOURCES
1. http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
2. https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c
3. https://medium.com/@paul.allies/stateless-auth-with-express-passport-jwt-7a55ffae0a5c