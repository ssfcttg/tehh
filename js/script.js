// Получаем элементы header__shop и cart
const headerShopButton = document.querySelector('.header__shop');
const cart = document.querySelector('.cart');

// Добавляем обработчик события click к элементу header__shop
headerShopButton.addEventListener('click', () => {
  // Добавляем класс open к элементу cart
  cart.classList.toggle('open');
  document.body.classList.toggle('hide');
  document.querySelector(".header").classList.toggle('active');

  // Добавляем и удаляем класс active с кнопки
  headerShopButton.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
  var searchIcon = document.querySelector('.header__search-icon');
  var searchBlock = document.querySelector('.header__mobile-search');

  searchIcon.addEventListener('click', function(event) {
    // Проверяем ширину экрана
    if (window.innerWidth < 945) {
      event.preventDefault();
      searchBlock.classList.toggle('active');
    }
  });
});


var openSliderPreview = new Swiper('.products__open-previewslider', {
  direction: 'vertical',
  spaceBetween: 20,
  slidesPerView: 3,
});

var openSlider = new Swiper('.products__open-slider', {
  loop: true,
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination',
  },
  thumbs: {
    swiper: openSliderPreview,
  },
});

let head__img = new Swiper('.head__slider', {
    loop: true,
    navigation: {
        prevEl: '.head__slider-prev',
        nextEl: '.head__slider-next'
    },
    pagination: {
        el: '.head__subslider-pagination',
        clickable: true
      },
    autoplay: {
      delay: 1500,
      speed: 5000,
      disableOnInteraction: true,
    },
});


let head__text = new Swiper('.head__subslider', {
    loop: true,
    spaceBetween: 24,
    // navigation: {
    //     prevEl: '.categories__slider-prev',
    //     nextEl: '.categories__slider-next'
    // },
});

head__img.controller.control = head__text;
head__text.controller.control = head__img;


var categories__slider = new Swiper('.categories__slider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
        prevEl: '.categories__slider-prev',
        nextEl: '.categories__slider-next'
    },
    autoplay: {
      delay: 2000,
      speed: 5000,
      disableOnInteraction: true,
    },
});

const checkWindowSize = () => {
    if (window.innerWidth < 945) {
      if (categories__slider && categories__slider.destroy) {
        categories__slider.destroy();
      }
    } else {
      if (categories__slider && categories__slider.init) {
        categories__slider.init();
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", checkWindowSize);
  window.addEventListener('resize', checkWindowSize);
  

let apl_img = new Swiper('.appliances__slider', {
    loop: true,
    spaceBetween: 24,
    clickable: true,
    navigation: {
        prevEl: '.appliances__slider-prev',
        nextEl: '.appliances__slider-next'
    },
    autoplay: {
      delay: 4000,
      speed: 5000,
      disableOnInteraction: true,
    },
});
let apl_text = new Swiper('.appliances__subslider', {
    loop: true,
    spaceBetween: 24,
    pagination: {
        el: '.appliances__subslider-pagination',
        clickable: true
      },
});

apl_img.controller.control = apl_text;
apl_text.controller.control = apl_img;


function initializeSlider(productSelector) {
  var previewSlider = new Swiper(productSelector + ' .products__slider-preview', {
    slidesPerView: 3,
    direction: 'vertical',
    spaceBetween: 12,
  });

  var mainSlider = new Swiper(productSelector + ' .products__slider', {
    loop: true,
    spaceBetween: 24,
    navigation: {
      prevEl: productSelector + ' .card__prev',
      nextEl: productSelector + ' .card__next'
    },
    thumbs: {
      swiper: previewSlider,
    },
  });
}

initializeSlider('#product1');
initializeSlider('#product2');
initializeSlider('#product3');
initializeSlider('#product4');
initializeSlider('#product5');
initializeSlider('#product6');
initializeSlider('#product7');
initializeSlider('#product8');
initializeSlider('#product9');
initializeSlider('#product10');
initializeSlider('#product11');
initializeSlider('#product12');









// Анимация стрелки ебаной


// CATALOG


document.addEventListener("DOMContentLoaded", function () {
  // Добавляем обработчик события для кнопки вызывающей открытие окна с табами
  document.getElementById("catalog_open").addEventListener("click", function() {
    openCatalogWindow();
  });

  // Добавляем обработчик события для всех кнопок с ID head__catalog-button
  document.querySelectorAll('#head__catalog-button').forEach(function(button) {
    button.addEventListener('click', function() {
      openCatalogWindow();
    });
  });

  // Добавляем обработчик события для кнопки закрытия каталога
  document.querySelector('.catalog__close').addEventListener('click', function() {
    closeCatalogWindow();
  });
});

function openCatalogWindow() {
  document.body.classList.toggle('hide');
  document.querySelector(".catalog").classList.toggle('active');
  document.querySelector(".header").classList.toggle('active');
  document.querySelector(".footer").classList.toggle('active');

  // Проверяем ширину экрана
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Вызываем openPage только если ширина экрана больше 820 пикселей
  if (screenWidth > 820) {
    openPage(null, 'PC');
  }

  // Изменяем текст во всех элементах с классом "catalog__content-title" при ширине экрана меньше 820 пикселей
  if (screenWidth < 820) {
    var catalogTitles = document.querySelectorAll('.catalog__content-title');
    catalogTitles.forEach(function(title) {
      title.textContent = 'Каталог';
    });
  }
}

function closeCatalogWindow() {
  document.body.classList.toggle('hide');
  document.querySelector(".catalog").classList.toggle('active');
  document.querySelector(".header").classList.toggle('active');
  document.querySelector(".footer").classList.toggle('active');

  // Проверяем ширину экрана
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Вызываем openPage только если ширина экрана больше 820 пикселей
  if (screenWidth > 820) {
    openPage(null, 'PC');
  }

  // Изменяем текст во всех элементах с классом "catalog__content-title" при ширине экрана меньше 820 пикселей
  if (screenWidth < 820) {
    var catalogTitles = document.querySelectorAll('.catalog__content-title');
    catalogTitles.forEach(function(title) {
      title.textContent = 'Каталог';
    });
  }
}

// Получаем ссылку на кнопку "Назад"
var backButton = document.querySelector('.catalog__back');

// Получаем ссылку на элемент "catalog__content"
var catalogContent = document.querySelector('.catalog__content');

// Добавляем обработчик события "click" к кнопке
backButton.addEventListener('click', function() {
  // Изменяем стиль отображения элемента "catalog__content"
  catalogContent.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
  // Добавляем обработчик события для родительского элемента табов
  document.querySelector('.catalog__tab').addEventListener('click', function(event) {
    // Проверяем, клик на кнопке
    if(event.target.classList.contains('catalog__tab-button')) {
      openPage(event, event.target.dataset.tab);
    }
  });

  // Проверяем ширину экрана при загрузке страницы
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Вызываем openPage для первого таба только если ширина экрана больше 820 пикселей
  if (screenWidth > 820) {
    openPage(null, 'PC');
  }
});

function openPage(evt, pageName) {
  var i, catalog__content, catalog__button;

  catalog__content = document.getElementsByClassName("catalog__content");
  for (i = 0; i < catalog__content.length; i++) {
    catalog__content[i].style.display = "none";
  }

  catalog__button = document.getElementsByClassName("catalog__tab-button");
  for (i = 0; i < catalog__button.length; i++) {
    catalog__button[i].classList.remove("active");
  }

  document.getElementById(pageName).style.display = "block";

  if (evt) {
    evt.target.classList.add("active");
  }
}


// Получаем все элементы с классом "catalog__page-title"
var titles = document.getElementsByClassName("catalog__page-title");
// Получаем все элементы с классом "catalog__page-list"
var lists = document.getElementsByClassName("catalog__page-list");

// Проверяем ширину экрана при загрузке страницы и при изменении размера окна
function checkScreenWidth() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Если ширина экрана меньше 820 пикселей, применяем обработчик события к заголовкам
  if (screenWidth < 820) {
    for (var i = 0; i < titles.length; i++) {
      titles[i].addEventListener("click", toggleList);
    }
  } else {
    // Если ширина экрана больше или равна 820 пикселям, удаляем обработчик события с заголовков
    for (var i = 0; i < titles.length; i++) {
      titles[i].removeEventListener("click", toggleList);
    }
  }
}

// Вызываем функцию проверки ширины экрана при загрузке страницы
checkScreenWidth();

// Вызываем функцию проверки ширины экрана при изменении размера окна
window.addEventListener("resize", checkScreenWidth);

// Функция для открытия/закрытия списка
function toggleList() {
  // Получаем следующий элемент после заголовка
  var list = this.nextElementSibling;

  // Проверяем текущий стиль отображения списка
  if (list.style.display === "none" || list.style.display === "") {
    // Если список скрыт, отображаем его
    list.style.display = "grid";
    // Закрываем все остальные списки
    closeOtherLists(list);
  } else {
    // Если список отображается, скрываем его
    list.style.display = "none";
  }
}

// Функция для закрытия всех остальных списков, кроме указанного
function closeOtherLists(currentList) {
  for (var i = 0; i < lists.length; i++) {
    if (lists[i] !== currentList) {
      lists[i].style.display = "none";
    }
  }
}


