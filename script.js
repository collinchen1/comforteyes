//to top
function toggleScrollToTopButton() {
  let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  let scrollDuration = 500;
  let scrollStep = -window.scrollY / (scrollDuration / 15);

  let scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

window.addEventListener("scroll", toggleScrollToTopButton);

document.getElementById("scrollToTopBtn").addEventListener("click", scrollToTop);

//chat
let MDSelectorBtn = document.querySelector('#MD-selector')
let userSelectorBtn = document.querySelector('#user-selector')
let chatHeader = document.querySelector('.chat-header')
let chatMessages = document.querySelector('.chat-messages')
let chatInputForm = document.querySelector('.chat-input-form')
let chatInput = document.querySelector('.chat-input')
let clearChatBtn = document.querySelector('.clear-chat-button')

let messages = JSON.parse(localStorage.getItem('messages')) || []

let createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'MD' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`
window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}
let messageSender = 'MD'
let updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'MD') {
    MDSelectorBtn.classList.add('active-person')
    userSelectorBtn.classList.remove('active-person')
  }
  if (name === 'user') {
    userSelectorBtn.classList.add('active-person')
    MDSelectorBtn.classList.remove('active-person')
  }
  chatInput.focus()
}
MDSelectorBtn.addEventListener('click', () => updateMessageSender('MD'));
userSelectorBtn.addEventListener('click', () => updateMessageSender('user'));
let sendMessage = (e) => {
  e.preventDefault()
  let timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))
  chatMessages.innerHTML += createChatMessageElement(message)
  chatInputForm.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}
chatInputForm.addEventListener('submit', sendMessage)
clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})

let highContrastBtn = document.getElementById("highContrastBtn");
let screenReaderBtn = document.getElementById("screenReaderBtn");
let body = document.body;
