# Chat Bot Assessment

This project is a Chat Bot system consisting of a backend (`chat_api`) built with Node.js, Express, and TypeScript, and a frontend built with Next.js and TypeScript. The entire project is housed in a folder named `chat_bot`.

## Project Structure

```
chat_bot-test/
│── chat_api/        # Backend service (Node.js, Express, TypeScript)
│── chat_bot/        # Frontend application (Next.js, TypeScript)
└── README.md        # Project documentation
```

## Backend - `chat_api`

### Technologies Used
- Node.js
- Express
- TypeScript
- PostgreSQL 

### Setting Up Backend
1. Navigate to the backend folder:
   ```sh
   cd chat_bot/chat_api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an `.env` file in `chat_api` and add:
   ```env
   DATABASE_URL=your_database_connection_string
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Frontend - `frontend`

### Technologies Used
- Next.js
- TypeScript
- Tailwind CSS 

### Setting Up Frontend
1. Navigate to the frontend folder:
   ```sh
   cd chat_bot/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an `.env` file in `chat_bot` and add:
   ```env
   NEXT_PUBLIC_BASE_API_URL=http://localhost:7000
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Running the Project
To run both backend and frontend:
1. Start the backend server:
   ```sh
   cd chat_bot/chat_api && npm run dev
   ```
2. Start the frontend server:
   ```sh
   cd chat_bot/frontend && npm run dev
   ```

The frontend should now be accessible at `http://localhost:3000`, and it will communicate with the backend running on `http://localhost:7000`.

## Conclusion
This project sets up a simple chatbot with a structured backend and frontend system, utilizing TypeScript for a strongly-typed development experience.
