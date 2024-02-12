// Массив счетчиков для каждого блока
var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Функция для обновления значения счетчика на странице
function updateCounter(index) {
  const counterElement = document.querySelectorAll('.price__amount')[index];
  counterElement.innerText = counts[index];
}

function addToCart(index) {
  counts[index]++;
  updateCounter(index);
  
}

function removeFromCart(index) {
  if (counts[index] > 0) {
    counts[index]--;
    updateCounter(index);
  }
  if (counts[index] == 0) {
    document.querySelectorAll('.price__button')[index].classList.remove('hide');
    document.querySelectorAll('.price__button-active')[index].classList.add('hide');
  }
}

document.querySelectorAll('.price__button').forEach(function(button, index) {
  button.addEventListener('click', function() {
    document.querySelectorAll('.price__button')[index].classList.add('hide');
    document.querySelectorAll('.price__button-active')[index].classList.remove('hide');
  });
});

// Вызываем updateCounter() для каждого блока при загрузке страницы
document.querySelectorAll('.price__button').forEach(function(button, index) {
  updateCounter(index);
});




const productItems = document.querySelectorAll('.products__item');

productItems.forEach((item) => {
  const button = item.querySelector('.price__button');
  const availabilityElement = item.querySelector('.price__desc');
  const isAvailable = availabilityElement.getAttribute('available');

  if (isAvailable === 'true') {
    availabilityElement.textContent = 'В наличии';
    button.disabled = false;
    button.classList.remove('deactive'); // Удалить класс для неактивной кнопки
  } else {
    availabilityElement.textContent = 'Нет в наличии';
    button.disabled = true;
    button.classList.add('deactive'); // Добавить класс для неактивной кнопки
    availabilityElement.style.color = '#D9D9D9'; // Изменить цвет текста на серый
  }
});




// Сначала скрываем все элементы, кроме первых 4 (если есть класс "line")
const products = document.querySelector('.products');
const items = products.querySelectorAll('.products__item');
const showMoreButton = document.getElementById('showMoreButton');
let visibleItems = products.classList.contains('line') ? 4 : 6; // Изначально показываем 4 элемента, если есть класс "line", иначе 6 элементов

// Функция, которая обновляет текст кнопки в зависимости от режима отображения
function updateButtonText() {
  if (visibleItems >= items.length) {
    showMoreButton.textContent = 'Скрыть';
  } else {
    showMoreButton.textContent = 'Показать больше';
  }
}

// Функция, которая скрывает все элементы
function hideAllItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'none';
  }
}

// Функция, которая скрывает элементы
function hideItems() {
  for (let i = 0; i < items.length; i++) {
    if (i < visibleItems) {
      items[i].style.display = 'flex';
    } else {
      items[i].style.display = 'none';
    }
  }
}

// Функция, которая скрывает все элементы и показывает первые 4 (в режиме "line") или 6 (в режиме "block")
function toggleItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'none';
  }
  visibleItems = products.classList.contains('line') ? 4 : 6;
  for (let i = 0; i < visibleItems && i < items.length; i++) {
    items[i].style.display = 'flex';
  }
  updateButtonText();
}


// Функция, которая показывает следующие элементы
function showMoreItems() {
  const itemsToShow = products.classList.contains('line') ? 4 : 6; // Проверяем наличие класса "line" у родительского элемента "products"
  const nextVisibleItems = visibleItems + itemsToShow;
  for (let i = visibleItems; i < nextVisibleItems && i < items.length; i++) {
    items[i].style.display = 'flex';
  }
  visibleItems = nextVisibleItems;

  // Если все элементы уже показаны, меняем текст кнопки на "Скрыть"
  if (visibleItems >= items.length) {
    showMoreButton.textContent = 'Скрыть';
  } else {
    showMoreButton.textContent = 'Показать больше';
  }
  updateButtonText();
}

// Функция, которая скрывает все ранее открытые элементы
function hidePreviousItems() {
  for (let i = visibleItems - 6; i < visibleItems; i++) {
    items[i].style.display = 'none';
  }
  visibleItems -= 6;
  showMoreButton.textContent = 'Показать больше';
}
// Обновляем состояние элементов при загрузке страницы
toggleItems();

// Скрываем изначально все элементы, кроме первых 4 (если есть класс "line")
hideItems();

// Добавляем обработчик события на кнопку "Показать больше"/"Скрыть"
showMoreButton.addEventListener('click', function() {
  if (visibleItems >= items.length) {
    toggleItems();
  } else {
    showMoreItems();
  }
});



// Функция, которая обновляет количество отображаемых элементов
function updateVisibleItems() {
  visibleItems = products.classList.contains('line') ? 4 : 6;
  hideItems(visibleItems);
}

document.addEventListener('DOMContentLoaded', function() {
  // Объявляем переменные
  const lineButton = document.querySelector('.products__headerButton-buttonLine');
  const blockButton = document.querySelector('.products__headerButton-buttonBlock');
  const products = document.querySelector('.products');

  // Функция, которая обновляет количество отображаемых элементов
  function updateVisibleItems() {
    visibleItems = products.classList.contains('line') ? 4 : 6;
    hideItems();
  }

  // Добавляем обработчик события на кнопку "line"
  lineButton.addEventListener('click', function() {
    products.classList.add('line');
    lineButton.querySelectorAll('svg rect').forEach(rect => {
      rect.style.fill = '#C91111';
      rect.style.fillOpacity = '0.35';
    });
    blockButton.querySelectorAll('svg rect').forEach(rect => rect.style.fill = '#D9D9D9');
    updateVisibleItems();
    updateButtonText();
  });

  // Добавляем обработчик события на кнопку "block"
  blockButton.addEventListener('click', function() {
    products.classList.remove('line');
    lineButton.querySelectorAll('svg rect').forEach(rect => rect.style.fill = '#D9D9D9');
    blockButton.querySelectorAll('svg rect').forEach(rect => rect.style.fill = '#C91111');
    updateVisibleItems();
    updateButtonText();
  });
});



const priceButton = document.querySelector('.filter__price-button');
const priceInputs = document.querySelector('.filter__price-inputs');

priceButton.addEventListener('click', function() {
  priceInputs.classList.toggle('show');
});


const brendButton = document.querySelector('.filter__brend-button');
const brendItem = document.querySelector('.filter__brend-item');
const filterMoreButton = document.querySelector('.filter__show-more-button');
const brendList = document.querySelector('.filter__brend-list');

// Скрываем все элементы списка брендов, начиная с четвертого
for (let i = 3; i < brendList.children.length; i++) {
  brendList.children[i].style.display = 'none';
}

let brendItemOpened = false;

brendButton.addEventListener('click', () => {
  if (brendItemOpened) {
    brendItem.style.display = 'none';
    brendItemOpened = false;
  } else {
    brendItem.style.display = 'flex';
    brendItemOpened = true;
  }
});

filterMoreButton.addEventListener('click', () => {
  if (filterMoreButton.textContent === 'показать еще ..') {
    filterMoreButton.textContent = 'скрыть';
    for (let i = 3; i < brendList.children.length; i++) {
      brendList.children[i].style.display = 'flex';
    }
  } else {
    filterMoreButton.textContent = 'показать еще ..';
    for (let i = 3; i < brendList.children.length; i++) {
      brendList.children[i].style.display = 'none';
    }
  }
});


const categoriesButton = document.querySelector('.filter__categories-button');
const categoriesItem = document.querySelector('.filter__categories-item');
const categoriesMoreButton = document.querySelector('.categories-show-more-button');
const categoriesList = document.querySelector('.filter__categories-list');

// Скрываем все элементы списка категорий, начиная с четвертого
for (let i = 3; i < categoriesList.children.length; i++) {
categoriesList.children[i].style.display = 'none';
}

let categoriesItemOpened = false;

categoriesButton.addEventListener('click', () => {
if (categoriesItemOpened) {
categoriesItem.style.display = 'none';
categoriesItemOpened = false;
} else {
categoriesItem.style.display = 'flex';
categoriesItemOpened = true;
}
});

categoriesMoreButton.addEventListener('click', () => {
if (categoriesMoreButton.textContent === 'показать еще ..') {
categoriesMoreButton.textContent = 'скрыть';
for (let i = 3; i < categoriesList.children.length; i++) {
categoriesList.children[i].style.display = 'flex';
}
} else {
categoriesMoreButton.textContent = 'показать еще ..';
for (let i = 3; i < categoriesList.children.length; i++) {
categoriesList.children[i].style.display = 'none';
}
}
});