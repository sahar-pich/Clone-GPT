from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI()

system_prompt = 'You have a nice and warm attitude'


def chat(memory: list[dict]):

    memory.insert(0, {'role': 'system', 'content': system_prompt})

    answer = client.chat.completions.create(
            model='gpt-4o-mini',
            messages = memory
        )

    response = answer.choices[0].message.content
    return response

