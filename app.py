from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import create_conversation, add_message, get_conversation
from pydantic import BaseModel
from chat import chat

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    )



class Message(BaseModel):
    content: str

@app.get('/')
def get():
    return {'msg': 'hi'}


@app.get('/conversations/{conversation_id}')
def get_conversations(conversation_id: int):
    return get_conversation(conversation_id)


@app.post('/new_conversation')
def new_conversation(title: str= 'New chat'):
    return {'id': create_conversation(title)}


@app.post('/conversations/{conversation_id}/messages')
def new_message(conversation_id: int, message: Message):

    add_message(conversation_id, "user", message.content)

    memory = get_conversation(conversation_id)

    response = chat(memory)

    add_message(conversation_id, "assistant", response)
    return response