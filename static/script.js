// Get references to HTML elements
const userInput = document.querySelector('input[type="text"]'); // Updated this line
const button = document.querySelector('button'); // Updated this line
const chatContainer = document.querySelector('.chat');

// Add event listener to the send button
button.addEventListener('click', sendMessage); // Updated this line

// Function to send a message
function sendMessage() {
  const message = userInput.value;
  if (message.trim() !== '') {
    appendUserMessage(message);
    fetchResponse(message);
    userInput.value = '';
  }
}

// Function to append a user message to the chat
function appendUserMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'user-message';
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
}

// Function to append a bot message to the chat
function appendBotMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'bot-message';
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
}

// Function to fetch response from the server
async function fetchResponse(message) {
  const response = await fetch('/get_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `user_input=${encodeURIComponent(message)}`,
  });

  const data = await response.json();
  const botResponse = data.response;
  appendBotMessage(botResponse);
  
  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
