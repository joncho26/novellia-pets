## Set up PostgreSQL database container in Docker
### In the root directory, run the following:

```docker compose up --build -d```

This will set up the database responsible for storing the data in this application.  Within Docker Desktop, you should see this after running the command:



## Run migrations 
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/api
npx prisma migrate dev
```

## Seed data
### Within the /api directory, run the seed command to seed the database.
```npm run db:seed```
#### You can view the seed data in `/apps/api/prisma/seed.ts`.


## Run API Server
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/api
npm run start:dev
```
#### This will start the API server, which is running on port 3000.


## Run Web Server
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/web
npm run dev
```

#### Visit http://localhost:5173 in the browser and you should see this:


