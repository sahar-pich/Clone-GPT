rows = [
    {"id": 1, "conversation_id": 7, "role": "user", "content": "Tell me a joke"},
    {"id": 2, "conversation_id": 7, "role": "assistant", "content": "I told my code..."},
]
def rows_to_messages(rows):
    messages = []
    for row in rows:
        messages.append({"role": row["role"], "content": row["content"]})
    return messages

print(rows_to_messages(rows))