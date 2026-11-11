from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI()

system_prompt = 'You have a nice and warm attitude'


def chat():
    memory = [{'role': 'system', 'content': system_prompt}]

    while True:
        if len(memory) > 1:
            question = input('\n' + memory[-1]['content'] + '\n')
        else:
            question = input()
        if question == 'quit':
            return
        memory.append({'role': 'user', 'content': question})
        answer = client.chat.completions.create(
            model='gpt-4o-mini',
            messages = memory
        )
        response = answer.choices[0].message.content
        memory.append({'role': 'assistant', 'content': response})
        



chat()