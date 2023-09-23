const chatLog = document.getElementById('chat-log'),
  userInput = document.getElementById('user-input'),
  sendButton = document.getElementById('send-button'),
  buttonIcon = document.getElementById('button-icon'),
  info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  // if message = empty do nothing
  if (message === '') {
    return;
  }
  // if message = developer - show our message
  else if (message === 'developer') {
    // clear input value
    userInput.value = '';
    // append message as user - we will code it's function
    appendMessage('user', message);
    // sets a fake timeout that showing loading on send button
    setTimeout(() => {
      // send our message as bot(sender : bot)
      appendMessage('bot', 'This Chat Bot Coded By Jayson Bull');
      // change button icon to default
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }, 2000);
    return;
  }

  // else if none of above
  // appends users message to screen
  appendMessage('user', message);
  userInput.value = '';

  const url = 'https://chatgpt-api8.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '83b5a23103msh79f0ea22624709cp1a1b35jsn690d76c15fb8',
      'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com',
      // if you want use official api
      /*
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'Your Key',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            */
    },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`,
    // if you want use official api you need have this body
    // `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message}"}]}`
  };
  // official api : 'https://openai80.p.rapidapi.com/chat/completions';
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      appendMessage('bot', response.choices[0].message.content);

      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        appendMessage('bot', 'Error : Check Your Api Key!');
        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
      }
    });
}

function appendMessage(sender, message) {
  info.style.display = 'none';
  // change send button icon to loading using fontawesome
  buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
  buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

  const messageElement = document.createElement('div');
  const iconElement = document.createElement('div');
  const chatElement = document.createElement('div');
  const icon = document.createElement('i');

  chatElement.classList.add('chat-box');
  iconElement.classList.add('icon');
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  // add icons depending on who send message bot or user
  if (sender === 'user') {
    icon.classList.add('fa-regular', 'fa-user');
    iconElement.setAttribute('id', 'user-icon');
  } else {
    icon.classList.add('fa-solid', 'fa-robot');
    iconElement.setAttribute('id', 'bot-icon');
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}
