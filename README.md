# README
Knock Every Door's Recruiter is a layer over the Action Network API to allow canvassing organizers to search for volunteers in their area.

### Installation
Recruiter is packaged up with its dependencies in Docker. To run,
1. Clone the repo:
```
$ git clone https://github.com/JonathanTR/ked-recruiter && cd ked-recruiter
```

2. Create an environment file in config/environments. Secrets should be stored in a `.env` file named after their environment in `config/environments`, ie. `config/environments/development.env`. They should be written in the format `KEY=VALUE`. You'll need to get these from one of the project owners.
3. Run using docker-compose, along with setup script:
```
$ docker-compose up -d && docker-compose run web bin/setup
```

4. The app will be available at `localhost:4000`, with hot module reloading.

To inspect logs, use:
```
docker logs recruiter-web
```

To run a bash session on the web box, use
```$ docker exec -it recruiter-web bash```

### Testing
Rails api tests can be run with
```
$ rails test
```

Client tests can be run from the `./client` folder with:
```
$ cd client && npm run test
```
