'use strict'

const imgPath = 'source/images/';
const messageList = document.querySelector('.chat-messages');
const messageTextArea = document.querySelector('#chat-message-area');
const messageSendButton = document.querySelector('#chat-message-send');
const SendForm = document.querySelector('#send-form');

const mediaOrderButton = document.querySelector('#media-button');
const reportOrderButton = document.querySelector('#report-button');

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

const addClientMessage = (messageText = 'empty') => {
  const message = new Message(user, messageText, new Date(), 'question');
}

const getTimeFromDate = (innerDate) => {
  return innerDate.toLocaleString('ru', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

let isDateShowTime = 1;
let showTimer;

const showTimeTimerStart = () => {
  showTimer = setTimeout(() => isDateShowTime = 1, 3600 * 1000);
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

const messages = [
  new Message(
    helper,
    'Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt.',
    null,
    'answer'
  ),
  new Message(
    user,
    'Lörem ipsum suparad pepött då satsig och soskap metrosocial. Sapongar trenåvis i hypol innan visiskap, heterovybelt. Besav ditugen stenosade om exopagt.',
    null,
    'question',
  ),
]

SendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageTextArea.value) {
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
)

document.querySelectorAll('.order-button').forEach((el) => {
  el.addEventListener('click', {
  })
})

let summ = 0;

// let monthes = prompt('Сколько месяцев?')
// for (let i = 0; i < monthes; i++) {
//   let proc = Math.round((summ * 0.0083 * 100)) / 100
//   console.log(
//    `${i + 1}. ${summ} - проценты - ${proc}`
//   )
//   summ += proc + 12000;
// }