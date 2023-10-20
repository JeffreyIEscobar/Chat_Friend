from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key below
openai.api_key = "INPUT_API_KEY_HERE"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.form['user_input']
    response = ask_openai(user_input)
    return jsonify({'response': response})

def ask_openai(question):
    messages = [{'role': 'system', 'content': 'You are a chatbot.'}, {'role': 'user', 'content': question}]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    return response.choices[0].message['content']

if __name__ == '__main__':
    app.run(debug=True)
