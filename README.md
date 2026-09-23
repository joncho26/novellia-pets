## Set up PostgreSQL database container in Docker
### In the root directory, run the following:

```docker compose up --build -d```

This will set up the database responsible for storing the data in this application.  Within Docker Desktop, you should see this after running the command:

<img width="1372" height="129" alt="Screenshot 2026-09-23 at 14 30 21" src="https://github.com/user-attachments/assets/5c34cd7d-e6a6-4c97-a3f7-b65ac075b8f5" />




## Run migrations 
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/api
npx prisma migrate dev
```

## Seed data
### Within the `/api` directory, run the seed command to seed the database.
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

#### Visit `http://localhost:5173` in the browser and you should see this:

<img width="1797" height="995" alt="Screenshot 2026-09-23 at 14 44 38" src="https://github.com/user-attachments/assets/a0190eed-b5d5-40d0-9ba6-8c42d44657f8" />



