# Feed Management API Based On Role

This Node.js application provides an API for logging operations, fetching logs, managing log files, and performing user and feed management operations. It supports user authentication using JWT, role-based access control, and different CRUD operations.

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- nodemon

### Installation

1. Clone the repository:

   git clone https://github.com/Alija69/feed-project.git
   cd feed-project

## Steps to start this backend service in local

1. First, we need to start a local MySQL instance for development purposes.
   Run the following command to do it.

2. Install dependencies

   ```
   npm install
   ```

3. make a file named .env and use all of the mentioned environment variables in the .env.example Below given values can be used.

   ```
   NODE_ENV=my_server
   PORT=3003
   MYSQL_HOST="127.0.0.1"
   MYSQL_USER=""
   MYSQL_PASSWORD=""
   MYSQL_DATABASE="feeds"
   JWT_SECRET="v3d&yw^lc+jj01$hpu3x47u5#ap$8koe6kakuwx&u^&"
   JWT_EXPIRATION_MINUTES=12h
   ```

4. Now start the dev server by running the below command
   ```
   nodemon index.js
   ```
5. Make a GET request to the below endpoint if you get an "OKAY" response, it means your local dev environment was setup correctly(most probably)
   ```
   //Make a GET request
   //if you get "OKAY" response most probably everything was setup correctly
   localhost:3000/
   ```

## API Documentation

https://documenter.getpostman.com/view/24229567/2s9Y5YRMoC

