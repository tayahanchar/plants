import './style.scss';

const message = `Plants#1
Требования к вёрстке:
1.Вёрстка валидная +10;
2.Вёрстка семантическая +20;
3.Вёрстка соответствует макету +48;
4.Требования к css + 12;
5.Интерактивность, реализуемая через css +20;
Oценка за задание 100 / 100`;

const message2 = `Plants#2
Требования к вёрстке:
1.Вёрстка соответствует макету. Ширина экрана 768px +24;
2.Вёрстка соответствует макету. Ширина экрана 380px +24;
3.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15;
4.На ширине экрана 380рх и меньше реализовано адаптивное меню +22;
Oценка за задание 75 / 75`;

const message3 = `Plants#3
Требования к функционалу:
1.При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50;
2.Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50;
3.В разделе contacts реализован select с выбором городов +25;
Oценка за задание 100 / 100`;

console.log(message);
console.log(message2);
console.log(message3);

// burger menu

const burger = document.querySelector('.burger');
const burgerList = document.querySelector('.nav__burger-list');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const line4 = document.querySelector('.line4');
const modal = document.querySelector('.modal-window');

burger.addEventListener('click', toggleBurgerMenu);

function toggleBurgerMenu() {
  if(burgerList.classList.contains('display-none')) {
    burgerList.classList.toggle('display-none');
    burgerList.classList.toggle('burger-menu__close');
    burgerList.classList.toggle('burger-menu__open');
    document.body.classList.toggle('overflow');
    modal.classList.toggle('block');
    if(!modal.classList.contains('display-none')) {
      setTimeout(() => modal.classList.toggle('display-none'), 900)
    } else {
      modal.classList.toggle('display-none');
    }
  } else {
    burgerList.classList.toggle('burger-menu__close');
    burgerList.classList.toggle('burger-menu__open');
    document.body.classList.toggle('overflow');
    modal.classList.toggle('block');
    if(!modal.classList.contains('display-none')) {
      setTimeout(() => modal.classList.toggle('display-none'), 900)
    } else {
      modal.classList.toggle('display-none');
    }
    setTimeout(() => burgerList.classList.toggle('display-none'), 900);
  }

  line1.classList.toggle('white');
  line1.classList.toggle('transform-left');

  line2.classList.toggle('white');
  line2.classList.toggle('transform-right');

  line3.classList.toggle('white');
  line3.classList.toggle('transform-left2');

  line4.classList.toggle('white');
  line4.classList.toggle('transform-right2');
}

// window.addEventListener('resize', closeModal);

function closeModal(event) {
  // if(document.documentElement.clientWidth >= 671 && burgerList.classList.contains('burger-menu__open') || event.target.classList.contains('nav__burger-link') || event.target.classList.contains('modal-window')) {
  //   toggleBurgerMenu();
  // }

  if(event.target.classList.contains('nav__burger-link') || event.target.classList.contains('modal-window')) {
    toggleBurgerMenu();
  }
}

burgerList.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);

/// service

const serviceButtons = document.querySelectorAll('.service__button');
let activeServices = [];

serviceButtons.forEach(button => button.addEventListener('click', chooseButton));

function chooseButton(event) {
  changeActiveButtons(activeServices, event.target.dataset.service);
}

function changeActiveButtons(array, atribute) {
  if(array.includes(atribute)) {
    toggleActiveButton(atribute);
    array.splice(array.indexOf(atribute), 1);
    blur();
    return;
  }

  if(!array.includes(atribute)) {
    if(array.length === 2) {
      // toggleActiveButton(array[0]);
      // array.shift();
      // blur();
      return;
    }
    array.push(atribute);
    toggleActiveButton(atribute);
    blur();
  }
}

function toggleActiveButton(atribute) {
  document.querySelector(`[data-service=${atribute}]`).classList.toggle('active-button');
}

function blur() {
  if(activeServices.length === 0) {
    document.querySelectorAll(`[data-items]`).forEach(element => {
      element.classList.remove('blur');
    })
    return;
  }

  let buttons = ['garden', 'lawn', 'planting'];
  buttons.forEach(item => {
    if(activeServices.includes(item)) {
      document.querySelectorAll(`[data-items=${item}]`).forEach(element => {
        element.classList.remove('blur');
      })
    } else {
      document.querySelectorAll(`[data-items=${item}]`).forEach(element => {
        element.classList.add('blur');
      })
    }
  })
}

/// prices
const pricesList = {
    'standard' : {
      description: 'Release of Letraset sheets containing Lorem Ipsum passages, and more recently',
      price: 25,
    },
    'pro': {
      description: 'Release of Letraset sheets containing Lorem Ipsum passages, and more recently',
      price: 35,
    },
    'basics': {
      description: 'Release of Letraset sheets containing Lorem Ipsum passages, and more recently',
      price: 15,
    }
}

const pricesContainer = document.querySelector('.prices__list');

pricesContainer.addEventListener('click', openPriceItem);

function openPriceItem(event) {
  const parent = event.target.parentElement.parentElement;
  if(event.target.classList.contains('prices-item__button')) {

    if(parent.classList.contains('open-prices')) {
      parent.classList.remove('open-prices');

      parent.classList.add('close-prices');
      setTimeout(() => parent.classList.remove('close-prices'), 300);

      event.target.innerHTML = '&or;';
      event.target.style.backgroundColor = '';

      setTimeout(() => parent.lastElementChild.remove(), 100);
    } else {
      document.querySelectorAll('.prices__item').forEach(item => {
        item.classList.remove('open-prices');
        item.firstElementChild.lastElementChild.innerHTML = '&or;';
        item.firstElementChild.lastElementChild.style.backgroundColor = '';
        if(item.lastElementChild.classList.contains('prices-body')) {
          item.lastElementChild.remove();
          item.classList.add('close-prices');
          setTimeout(() => item.classList.remove('close-prices'), 300);
        }
      })
      parent.classList.add('open-prices');
      event.target.innerHTML = '&and;';
      event.target.style.backgroundColor = '#AEA1A1';
      showPricesInformation(parent, parent.dataset.price)
    }

  }
}

function showPricesInformation(item, atr) {
  const information = document.createElement('div');
  information.classList.add('prices-body');
  information.innerHTML = `
  <p class="prices-body__descr">${pricesList[atr].description}</p>
  <p class="prices-body__price"><span class="price">$${pricesList[atr].price}</span> / per hour</p>
  <button class="prices-body__button"><a class="prices-body__button-link" href="#contacts">Order</a></button>
  `;
  item.append(information);
}

// contacts

const cityButton = document.querySelector('.input__button');
const addressCard = document.querySelector('.address');
let showCard = [];

const contactsList = {
  'Yonkers': {
    city: 'Yonkers, NY',
    phone: '+1	914	678 0003',
    address: '511 Warburton Ave',
  },
  'Canandaigua': {
    city: 'Canandaigua, NY',
    phone: '+1	585	393 0001',
    address: '151 Charlotte Street',
  },
  'Sherrill': {
    city: 'Sherrill, NY',
    phone: '+1	315	908 0004',
    address: '14 WEST Noyes BLVD',
  },
  'NYC': {
    city: 'New York City',
    phone: '+1	212	456 0002',
    address: '9 East 91st Street',
  },
}

cityButton.addEventListener('click', showCities);

function showCities(event) {
  let parent = event.target.parentElement;

  if(parent.classList.contains('contacts-open')) {
    parent.classList.remove('contacts-open');
    event.target.style.backgroundColor = '';
    event.target.innerHTML = '&or;';

    parent.parentElement.lastChild.classList.add('closeCard');

    setTimeout(() => parent.parentElement.lastChild.remove(), 100);
  
    // if(showCard.length === 1) {
    //   addressCard.style.display = 'flex';
    // }

    if(showCard.length === 1) {
      document.querySelector('.contacts__input').classList.remove('contacts-choose');
      document.querySelector('.input__button').innerHTML = '&or;';
    }

  } else {
    parent.classList.add('contacts-open');
    event.target.style.backgroundColor = '#8BA07E';
    event.target.innerHTML = '&and;';

    const citiesList = document.createElement('ul');
    citiesList.classList.add('cities');
    citiesList.innerHTML = `
              <li class="cities__item" data-city="Canandaigua">Canandaigua, NY</li>
              <li class="cities__item" data-city="NYC">New York City</li>
              <li class="cities__item" data-city="Yonkers">Yonkers, NY</li>
              <li class="cities__item" data-city="Sherrill">Sherrill, NY</li>`;
    parent.parentElement.append(citiesList);
    addressCard.style.display = 'none';

    citiesList.addEventListener('click', chooseCity);

    if(showCard.length === 1) {
      document.querySelector('.input__text').textContent = `City`;
    }
  }
}


function chooseCity(event) {

  if(event.target.classList.contains('cities__item')) {
    document.querySelector('.input__text').textContent = `${contactsList[event.target.dataset.city].city}`;

    event.target.parentElement.remove();

    document.querySelector('.contacts__input').classList.add('contacts-choose');
    document.querySelector('.contacts__input').classList.remove('contacts-open');

    document.querySelector('.input__button').innerHTML = '&or;';

    showCard = [];
    showCard.push(event.target.dataset.city);

    showContactInformation(contactsList[event.target.dataset.city]);
  }
}



function showContactInformation(item) {
  addressCard.innerHTML = `
                <ul class="address__list">
                <li><span class="addrest-item">City: </span>${item.city}</li>
                <li><span class="addrest-item">Phone: </span>${item.phone}</li>
                <li><span class="addrest-item">Office adress: </span>${item.address}</li>
              </ul>
              <button class="button-call"><a class="call" href="tel: ${item.phone}">Call us</a></button>
  `;
  addressCard.style.display = 'flex';
}

//// 
