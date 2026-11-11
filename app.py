from fastapi import FastAPI
from db import create_conversation, add_message, get_conversation
from pydantic import BaseModel

app = FastAPI()

class Message(BaseModel):
    content: str

@app.get('/')
def get():
    return {'msg': 'hi'}

@app.post('/conversations')
def new_conversations(title: str= 'New chat'):
    return {'id': create_conversation(title)}

@app.post('/conversations/{conversation_id}/messages')
def new_message(conversation_id: int, message: Message):
    add_message(conversation_id, "user", message.content)
    return get_conversation(conversation_id)