## Set up PostgreSQL database container in Docker
### In the root directory, run the following:

```docker compose up --build -d```


This will set up the database responsible for storing the data in this application.  Within Docker Desktop (under Containers), you should see this after running the command:


<img width="1372" height="129" alt="Screenshot 2026-09-23 at 14 30 21" src="https://github.com/user-attachments/assets/5c34cd7d-e6a6-4c97-a3f7-b65ac075b8f5" />




## Run migrations 
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/api
npx prisma migrate dev
```

You should then see something like this outputted in the terminal:

<img width="618" height="261" alt="Screenshot 2026-09-23 at 14 54 41" src="https://github.com/user-attachments/assets/448a8054-2e4b-40a4-ae78-ad2b5dc133ce" />



## Seed data
### Within the `/api` directory, run the seed command to seed the database.
```npm run db:seed```

In the terminal, you should see something like this (you can ignore the deprecation warning):

<img width="873" height="140" alt="Screenshot 2026-09-23 at 14 56 25" src="https://github.com/user-attachments/assets/c95f20b2-48f1-4a89-84e6-7b716680a140" />

Seed data can be found in `/apps/api/prisma/seed.ts`.


## Run API Server
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/api
npm run start:dev
```

  
This will start the API server, which is running on port 3000.

<img width="835" height="292" alt="Screenshot 2026-09-23 at 14 59 17" src="https://github.com/user-attachments/assets/162daae1-8053-4528-8386-1b1936b43857" />



## Run Web Server
### Open a new terminal window/tab and in the root directory, run the following:
```
cd apps/web
npm run dev
```
<img width="434" height="162" alt="Screenshot 2026-09-23 at 15 00 04" src="https://github.com/user-attachments/assets/2c829fec-84cf-4e4e-b99a-0de915ca783d" />


Visit `http://localhost:5173` in the browser and you should see this:
  
  
<img width="1797" height="995" alt="Screenshot 2026-09-23 at 14 44 38" src="https://github.com/user-attachments/assets/a0190eed-b5d5-40d0-9ba6-8c42d44657f8" />



