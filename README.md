# README
Knock Every Door's Recruiter is a layer over the Action Network API to allow canvassing organizers to search for volunteers in their area. It consists of a Rails backend, used for storing some minimal data over top of Action Network and making GIS calculations to find geographically close zip codes to the user.

On the frontend, Recruiter provides a web interface for querying contacts within a 25 mile radius of the zip code the user enters. It then cycles through those contacts, giving the user a chance to call them and enter feedback.

### Installation
Recruiter is packaged up with its dependencies in Docker. To run,
1. Clone the repo:
```
$ git clone https://github.com/JonathanTR/ked-recruiter && cd ked-recruiter
```

2. Create an environment file in config/environments. Secrets should be stored in a `.env` file named after their environment in `config/environments`, ie. `config/environments/development.env`. They should be written in the format `KEY=VALUE`. You'll need to get these from one of the project owners.
3. Run using docker-compose. along with setup script:
```
$ docker-compose up -d
```

4. After spinning up a container on docker, you will need to run a setup script on the web container. This creates your database, adds the PostGIS extension, and loads in a static list of Zip Codes and their coordinates for querying user location.
```
$ docker-compose run web bin/setup
```

5. The app will be available at `localhost:4000`, with hot module reloading available.

To inspect logs, use:
```
docker logs recruiter-web
```

To run a bash session on the web box, use
```$ docker exec -it recruiter-web bash```

If you would like to run the app without Docker in development mode, you'll need to modify the database.yml file slightly. Just comment out or remove the `host` and `user` keys for your `development` environment, as Docker uses these to detect the database server.

Then you are free to use `$ foreman start` to run the client and backend together, or you can run them separatedly (you'll need to run the client from the `client` directory).

### Testing
Rails api tests can be run with
```
$ rails test
```

Client tests can be run from the `./client` folder with:
```
$ cd client && npm run test
```

### Architecture
As a general rule, development architecture and environments should match their production counterparts as closely as possible. There are some very small differences in this app that are worth noting.

##### Development
Recruiter is separated into a Rails backend api and a React frontend client. In development mode, these run in separate processes using the foreman gem. This allows the developer some of the benefits of webpack like hot module reloading and helpful error messages in the server logs. These will start up on:
*Backend API*: `localhost:3000`
*Frontend Client*: `localhost:4000`

##### Production
The app runs slightly differently in production. In production, Rails serves a compiled version of the frontend client out of our public folder (`bin/setup` and `bin/update` both compile the client and copy it to our public folder). This gives us the benefit of speed (from the compiled and minified files) and allows us to make requests from the same origin, making it slightly more secure.

Production also serves the client through the `PublicController`, which adds a basic auth username and password to the application at the time of this writing.

Fortunately, you can preview this behavior in development. All you have to do is visit `localhost:3000` and you'll see the latest compiled version of the app as you would in the production environment.
