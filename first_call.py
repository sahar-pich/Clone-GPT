from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me a joke about QA engineers."},
        {"role": "assistant", "content": """
            Why do QA engineers always bring a ladder to work?
            Because they want to reach new heights in bug fixing!
            """},
            {"role": "user", "content": "Explain why that's funny."}
    ]
)

print(response.choices[0].message.content)