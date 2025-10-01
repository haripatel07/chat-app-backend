# Chat Application Backend

A real-time chat application backend built with Node.js, Express.js, Socket.io, MongoDB, and Redis. This project enables instant messaging between users with features like user authentication, chat history, and typing indicators.

## Technologies Used

- **Node.js with Express.js** – Server-side logic and API endpoints
- **Socket.io** – Real-time WebSocket communication
- **MongoDB** – User data and chat message persistence
- **Redis** – Fast caching for chat history
- **JWT** – User authentication
- **bcryptjs** – Password hashing

## Features

- **Real-time Messaging** – Instant message exchange using WebSockets
- **User Authentication** – Secure login/registration with JWT tokens
- **Chat History** – Persistent message storage with Redis caching
- **Typing Indicators** – Visual feedback for user typing status
- **Room-based Chat** – Support for multiple chat rooms

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/haripatel07/chat-app-backend.git
   cd chat-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/chatapp
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/auth/register` – Register a new user
  - Body: `{ "username": "string", "password": "string" }`

- `POST /api/auth/login` – Login user
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: User data with JWT token

### Chat

- `GET /api/chat/:roomId` – Get chat history for a room (requires authentication)
  - Headers: `Authorization: Bearer <token>`

## Socket Events

### Client to Server

- `joinRoom` – Join a chat room
  - Data: `{ roomId: "string" }`

- `sendMessage` – Send a message
  - Data: `{ roomId: "string", content: "string", senderId: "string" }`

- `typing` – Indicate user is typing
  - Data: `{ roomId: "string", username: "string" }`

- `stopTyping` – Stop typing indicator
  - Data: `{ roomId: "string" }`

### Server to Client

- `newMessage` – New message received
  - Data: Message object

- `userTyping` – User started typing
  - Data: `{ username: "string" }`

- `userStoppedTyping` – User stopped typing

## Project Structure

```
chat-app-backend/
├── config/
│   └── db.js              # Database connection setup
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── chatController.js  # Chat history logic
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── User.js            # User schema
│   └── Message.js         # Message schema
├── routes/
│   ├── authRoutes.js      # Auth API routes
│   └── chatRoutes.js      # Chat API routes
├── services/
│   └── socket.js          # Socket.io event handlers
├── index.js               # Main server file
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.