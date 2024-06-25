## ChatApp

### [Live Demo](#)

ChatApp is a full-stack web application developed using modern technologies. It provides real-time messaging functionality implemented with Socket.IO.

### Features:
- **Real-time messaging** : ChatApp allows users to send and receive messages in real-time, creating seamless communication experiences.
- **Online users display** : See which users are currently online.
- **User search** : Search for users to start chatting with in real-time.
- **Last message display** : Display the last message in each conversation.
- **Call and video call feature (Coming soon)** : Connect with other users via audio and video calls.
- **Notification support** : Receive notifications for new messages.
- **Unread message indicator** : Display unread message indicators for conversations.

### Technologies Used :
#### Backend Technologies :
- **TypeScript** : A superset of JavaScript that adds static typing to the language, enhancing code quality and developer productivity.
- **Postgres** : An open-source relational database management system used for storing and managing data in ChatApp.
- **Drizzle-orm** : An Object-Relational Mapping (ORM) tool used for interacting with the database and managing data in Node.js projects.
- **Redis** : An in-memory data store used as a secondary database for caching data and managing sessions in ChatApp.
- **Express.js** : A web application framework for Node.js used to build the backend server and APIs for ChatApp.
- **Bun** : A JavaScript runtime used for running the backend server code.
- **Socket.IO** : A library that enables real-time, bidirectional communication between web clients and servers.
- **Docker** : Docker is used to containerize the entire backend stack, ensuring a consistent and reproducible environment. This setup simplifies deployment and scaling by encapsulating all dependencies and configurations.

#### Frontend Technologies :
- **React.js** : A JavaScript library for building user interfaces, utilized for creating the frontend of ChatApp.
- **State management** : Zustand is used for state management in ChatApp.
- **Tailwind CSS** : A utility-first CSS framework used for styling the frontend of ChatApp, providing customizable and responsive design options.
- **Node.js** : A JavaScript runtime used for executing frontend code.

### Dependencies :
- **react-hot-toast** : Toast notifications for React apps.
- **react-icons** : Icons for React applications.
- **react-router-dom** : Routing library for React applications.
- **socket.io-client** : Client-side library for Socket.IO.
- **zustand** : State management for React.

### Getting Started :
#### To run ChatApp locally, follow these steps :

1. Clone the repository to your local machine.
2. Navigate to the project directory.

#### Setting up the backend
3. Install dependencies of backend using : `cd backend bun install`
4. Run the database using Docker : `docker-compose --env-file .env up -d`
5. Generate database schema with Drizzle : `bun run db:generate` 
6. Apply database migrations with Drizzle : `bun run db:migrate` 
7. Start the backend using `bun run dev:v3`
8. `Optional` : Creating a Docker image : `docker build -t chatapp-backend .` 
9. `Optional` : Running a Docker container : `docker run -p 7319:7319 chatapp-backend` 
10. `Optional` : Open Drizzle Studio for database management : `bun run db:studio` 
11. `Optional` : Populate the database with initial data : `bun run db:seed`

#### Setting up the frontend
10. Install dependencies of frontend using : `cd frontend & npm install`
11. Start the frontend using : `npm run dev`.

#### Credits:
- **Backend Development**: [AshkanHaghdost](https://github.com/AshkanHagh)
- **Frontend Development**: [ShahinFallah](https://github.com/ShahinFallah)

#### License:
This project is licensed under the [MIT License](link-to-license).
