'use strict'

const mediaOrderButton = document.querySelector('#media-button');
const reportOrderButton = document.querySelector('#report-button');
const mediasList = document.querySelector('#mediaplanes-list');
const reportsList = document.querySelector('#reports-list');

const mediasArray = [];
const reportsArray = [];
let mediaPrompt;
let reportPrompt;

let fileId = 0;

class File {
  constructor(fileName = 'Companyname', format = 'xml') {
    this.fileName = fileName ?? 'Companyname';
    this.format = format;
    this.formatImage = this.getFormatImg(this.format);
    this.Id = fileId++;
    this.fileblock;
  }

  getFormatImg(format) {
    if (format == 'xml') {
      return `${imgPath}xml.svg`
    } else return 'unnown format'
  }

  writeName() {
    console.log('this.name')
  }

  render(list) {
    this.fileBlock = document.createElement('div');
    const newLenth = list.push(this.fileBlock);
    const number = list.indexOf(this.fileBlock) + 1;
    this.fileBlock.classList.add('requests-list__list-item', 'requests-item');
    this.fileBlock.innerHTML = `
    <div class="requests-item__content">
      <div class="requests-item__content-icon">
        <img src="${this.formatImage}" alt="${this.format}">
      </div>
      <div class="requests-item__content-text">${this.fileName} <span class="${this.listName}-nubmer">${number}</span>/<span class="${this.listName}-length">${newLenth}</span></div>
    </div>
    <div class="requests-item__icon img-status">
      <img class="img-ready" src="source/images/arrow-download.svg" alt="down">
      <img class="img-in-preparation" src="source/images/refresh.svg" alt="refresh">
    </div>
    `
    return (this.fileBlock);
  }

  renderPrompt(text, image) {
    const promptBlock = document.createElement('div');
    promptBlock.classList.add('requests-list__prompt', 'icon-with-content');
    promptBlock.innerHTML = `
    <div class="requests-list__prompt-icon">
      <img src="${image}" alt="!" class="prompt-icon">
    </div>
    <div class="requests-list__prompt-text prompt-text">
      ${text}
    </div>
    `
    return promptBlock;
  }

  refreshLength(list) {
    document.querySelectorAll(`.${this.listName}-length`).forEach((el) => {
      el.innerHTML = list.length;
    })
  }

  orderFile() {
    const order = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ready');
      }, 2 * 1000);
    })
    order.then(
      result => {
        if (result === 'ready') {
          this.setReady();
        }
      }
    )
  }

  init(list) {
    this.offButton();
    this._createPrompt();
    const elem = this.render(list);
    this.listLink.prepend(elem);

    this.refreshLength(list);
    this.orderFile();
    return elem;
  }

  offButton() {
    this.button.classList.add('no-events');
  }
  onButton() {
    this.button.classList.remove('no-events');
  }

  setReady() {
    this.fileBlock.classList.add('ready');
    this.onButton();
    // this.isReadyPrompt.remove();
    this._promptReady();
  }

  returnDate(date) {
    return (date).toLocaleString('ru', {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    })
  }
}

class MediaPlan extends File {
  constructor(fileName, format, button) {
    super(fileName, format);
    this.listName = 'mediaplanes'
    this.listLink = mediasList;
    this.filesList = mediasArray;
    this.button = button;
    this.element = this.init(this.filesList);
    this.isReadyPrompt
  }

  _createPrompt() {
    if (mediaPrompt) {
      mediaPrompt.remove()
    }
    this.isReadyPrompt = this.renderPrompt(
      'Медиаплан в процессе составления', imgPath + 'subtract.svg'
    );
    this.listLink.prepend(this.isReadyPrompt);
    mediaPrompt = this.isReadyPrompt;
  }

  _promptReady() {
    const now = this.returnDate(new Date());
    this.isReadyPrompt.querySelector('.prompt-icon').setAttribute(
      'src', imgPath + 'little-ok.svg'
    )
    this.isReadyPrompt.querySelector('.prompt-text').innerHTML = `
    Медиаплан от ${now} готов
    `
  }
}

class MReport extends File {
  constructor(fileName, format, button) {
    super(fileName, format);
    this.listName = 'reports'
    this.listLink = reportsList;
    this.filesList = reportsArray;
    this.button = button;
    this.init(this.filesList);
  }

  _createPrompt() {
    if (reportPrompt) {
      reportPrompt.remove()
    }
    this.isReadyPrompt = this.renderPrompt(
      'Отчёт формируется', imgPath + 'subtract.svg'
    );
    this.listLink.prepend(this.isReadyPrompt);
    reportPrompt = this.isReadyPrompt;
  }

  _promptReady() {
    const now = this.returnDate(new Date());
    this.isReadyPrompt.querySelector('.prompt-icon').setAttribute(
      'src', imgPath + 'little-ok.svg'
    )
    this.isReadyPrompt.querySelector('.prompt-text').innerHTML = `
    Медиаплан от ${now} готов
    `
  }

}

function newMediaPlanCreate(
  companyName = 'Companyname', format = 'xml', button = mediaOrderButton) {
  const pl = new MediaPlan(companyName, format, button);
}
function newReportCreate(
  companyName = 'Companyname', format = 'xml', button = reportOrderButton) {
  const pl = new MReport(companyName, format, button);
}

mediaOrderButton.addEventListener('click', () => {
  const pl = newMediaPlanCreate();
})
reportOrderButton.addEventListener('click', () => {
  const rep = newReportCreate();
})

function hideFileCurtain() {
  document.querySelector('.requests__curtain').classList.add('d-none')
  document.querySelectorAll('.requests-list').forEach((el) => {
    el.classList.remove('d-none')
  });
  mediaOrderButton.removeEventListener('click', hideFileCurtain);
}

mediaOrderButton.addEventListener('click', hideFileCurtain)
reportOrderButton.addEventListener('click', hideFileCurtain)