import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()
db_password = os.getenv('MYSQL_ROOT_PASSWORD')
def get_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password=db_password,
        database='chat'
    )


def get_conversation(conversation_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('''
        SELECT role, content
        FROM messages
        WHERE conversation_id = %s
        ORDER BY id
    ''', (conversation_id, ))
    convo = cursor.fetchall() 
    conn.close()
    return  convo

def create_conversation(title):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('''
        INSERT INTO conversations (title)
        VALUES (%s)
    ''', [title])
    conn.commit()
    conn.close()
    return cursor.lastrowid

def add_message(conversation_id, role, content):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('''
        INSERT INTO messages (conversation_id, role, content)
        VALUES (%s, %s, %s)
    ''', [conversation_id, role, content])
    conn.commit()
    conn.close()
    return cursor.lastrowid
