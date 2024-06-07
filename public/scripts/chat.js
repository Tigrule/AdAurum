'use strict'

const imgPath = './source/images/';
const messageList = document.querySelector('.chat-messages');
const messageTextArea = document.querySelector('#chat-message-area');
const messageSendButton = document.querySelector('#chat-message-send');
const sendForm = document.querySelector('#send-form');

let isDateShowTime = 1;
let showTimer;

let enterSubmit = new Event('submit');

const helper = {
  id: 1,
  name: 'Jim',
  image: imgPath + 'jim.jpeg'
}

const user = {
  id: 2,
  name: 'User',
  image: imgPath + 'jim.jpeg'
}



const getTimeFromDate = (innerDate) => {
  return innerDate.toLocaleString('ru', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showTimeTimerStart = () => {
  showTimer = setTimeout(() => isDateShowTime = 1, 3600 * 1000);
}



const addClientMessage = (messageText = 'empty') => {
  const message = new Message(user, messageText, new Date(), 'question');
}


class Message {
  constructor(person = user, message, date, type = 'question') {
    this.date = date ?? new Date;
    console.log(this.date);
    this.person = person;
    this.message = message;
    this.time = getTimeFromDate(this.date);
    this.type = type;
    this.timeDate = this.isToday();

    this.apendMessageToList();
  };

  isToday() {
    let now = new Date();
    if (this.date.toLocaleString() == (now.toLocaleString())) {
      return 'Сегодня'
    } else {
      let timeYesterday = new Date(this.date)
      if (timeYesterday.toLocaleString() == (now.toLocaleString)) {
        return 'Вчера'
      }
      else return
    }
  }

  returnMessageBlock() {
    const messageBlock = document.createElement('div');
    messageBlock.classList.add('chat-messages__message', 'chat-message', `${this.type}`)
    let layout = `
      <div class="chat-message__avatar avatar">
        <img src="${this.person.image}" alt="face">
      </div>
      <div class="chat-message__content">
        <div class="chat-message__text">
          ${this.message}
        </div>
        <div class="chat-message__description description">
          <span class="chat-message__description-name name">${this.person.name}</span>
          <span class="chat-message__description-date">${this.time}</span>
        </div>
      </div>
    `
    messageBlock.innerHTML = layout;
    return messageBlock;
  }

  returnTimeBlock() {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('chat-messages__date')
    let layout = `
    <span class="chat-messages__date-day">${this.timeDate}</span>, <span
    class="chat-messages__date-time">${this.time}</span> 
    `
    timeBlock.innerHTML = layout;
    return timeBlock;
  }

  apendMessageToList() {
    if (isDateShowTime) {
      messageList.append(this.returnTimeBlock())
      isDateShowTime = 0;
      showTimeTimerStart();
    };
    messageList.append(this.returnMessageBlock());
  }
}

const chatSubmitFunction = (e) => {
  e.preventDefault();
  if (messageTextArea.value) {
    document.querySelector('.chat-curtain').classList.add('d-none')
    addClientMessage(messageTextArea.value);
    messageTextArea.value = '';
    const sendMessage = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          person: helper,
          message: `Мы получили ваше сообщение, работаем над вашим вопросом.`,
          date: new Date(),
          type: 'answer',
        }
        );
      }, 2000)
    }
    );
    sendMessage.then(
      result => {
        let { person, message, date, type } = result;
        new Message(person, message, date, type);
      }
    )
  } else return;
}




sendForm.addEventListener('submit', chatSubmitFunction);

document.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    if (messageTextArea.value) {
      console.log('enter was pressed');
  
      // sendForm.dispatchEvent(enterSubmit);
      chatSubmitFunction(event);
    } else {
      messageTextArea.reportValidity();
    }
    messageTextArea.value = '';
  }
});

messageTextArea.onfocus = function () {
  document.querySelector('.chat-textfield').classList.add('pink-border')
}
messageTextArea.onblur = function () {
  document.querySelector('.chat-textfield').classList.remove('pink-border')
}



document.querySelectorAll('.order-button').forEach((el) => {
  el.addEventListener('click', {
  })
})


// const messages = [
//   new Message(
//     helper,
//     'Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt.',
//     null,
//     'answer'
//   ),
//   new Message(
//     user,
//     'Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt.',
//     null,
//     'question',
//   ),
// ]
