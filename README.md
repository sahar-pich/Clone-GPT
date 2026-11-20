# Clone-GPT

My own little ChatGPT. You chat with an AI, it remembers the conversation, and every chat is saved in a MySQL database.

GitHub: https://github.com/sahar-pich/Clone-GPT

**Stack:** React + TypeScript (Vite) · Python FastAPI · MySQL (Docker) · OpenAI API

## Project folders

- `Database/` - the database schema and export
- `Backend/` - the FastAPI server, plus the Postman collection
- `Frontend/` - the React app

## Before you start

You'll need Python 3, Node.js, Docker Desktop and an OpenAI API key.

## How to run

### 1. Environment file

Copy `Backend/.env.example` to `Backend/.env` and fill in your OpenAI key:

```
OPENAI_API_KEY=your-key-here
MYSQL_ROOT_PASSWORD=1chat4all
```

### 2. Database

From the project root:

```
docker compose --env-file ./Backend/.env up -d
```

This starts MySQL on port 3306 and creates the tables on the first run. phpMyAdmin is also available at http://localhost:8080 if you want to look at the data.

### 3. Backend

```
cd Backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
fastapi dev app.py
```

The API runs at http://127.0.0.1:8000

Interactive API docs (Swagger): http://127.0.0.1:8000/docs

### 4. Frontend

In a new terminal:

```
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173 and start chatting.

## API

| Method | Route | What it does |
| --- | --- | --- |
| POST | `/new_conversation` | Creates a new chat and returns its id |
| POST | `/conversations/{id}/messages` | Sends a message and returns the AI's reply |
| GET | `/conversations/{id}` | Returns all messages of a chat |

You can try them in Postman: import `Backend/Clone-GPT.postman_collection.json`. Run "New conversation" first, because it saves the new id for the other requests.

## Notes

- The OpenAI call happens on the server only. The key never reaches the browser.
- `.env` is in `.gitignore`, so it isn't uploaded to GitHub.
- Refreshing the page starts a fresh chat, but the old ones are still saved in the database.
