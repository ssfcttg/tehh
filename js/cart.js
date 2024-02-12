function toggleFormFields(checkbox) {
  var form = checkbox.closest(".cart__form-form");
  var checkboxes = form.getElementsByClassName("cart__form-checkbox");

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] === checkbox) {
      continue; // Пропустить текущий чекбокс
    }

    checkboxes[i].checked = false; // Снять выбор с другого чекбокса
  }

  var inputs = form.getElementsByTagName("input");
  var disableForm = checkbox.checked; // true, если выбран чекбокс "Физ. Лицо", иначе false
  var enableForm = !checkbox.checked; // true, если выбран чекбокс "Юр. Лицо", иначе false

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] === checkbox) {
      continue; // Пропустить чекбокс
    }

    if (disableForm) {
      inputs[i].disabled = false; // Включить поле для физических лиц
    } else if (enableForm) {
      inputs[i].disabled = true; // Выключить поле для физических лиц
      if (inputs[i].type === "text") {
        inputs[i].value = ""; // Очистить значение текстового поля
      }
    }
  }
}



document.addEventListener('DOMContentLoaded', function() {
  var deleteAllButton = document.querySelector('.cart__delete-all');
  var productElements = document.querySelectorAll('.cart__product');
  var numCountElement = document.getElementById('cart__header-numCount');
  var productNameElement = document.querySelector('.cart__product-name');
  var deleteButtons = document.querySelectorAll('.cart__product-deleteButton');

  // Обновление числа в элементе cart__header-numCount
  function updateNumCount() {
    var count = productElements.length;
    var pluralSuffix = count !== 1 ? 'а' : '';
  
    if (count === 0) {
      numCountElement.textContent = 'Нет товаров';
      document.querySelector('.cart__buyProductsSumm').textContent = 'Нет товаров';
      productNameElement.textContent = 'Нет товаров в корзине';
    } else {
      numCountElement.textContent = count + ' товар' + pluralSuffix;
      document.querySelector('.cart__buyProductsSumm').textContent = count + ' товар' + pluralSuffix;
      productNameElement.textContent = 'Ноутбук CBR LP-15102 15.6"';
    }
  
    // Обновление суммы в элементе cart__buy-summCunt
    var totalSum = 0;
    productElements.forEach(function(productElement) {
      var priceElement = productElement.querySelector('.cart__product-priceX-text');
      var price = parseFloat(priceElement.textContent.replace(/\s/g, '').replace('₽', ''));
      totalSum += price;
    });
    document.getElementById('cart__buy-summCunt').textContent = formatPrice(totalSum);
    document.getElementById('cart__buySumm').textContent = formatPrice(totalSum);
  }

  // Форматирование числа в виде цены
  function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
  }

  // Обработчик события для кнопки "Очистить корзину"
  deleteAllButton.addEventListener('click', function() {
    productElements.forEach(function(productElement) {
      productElement.remove();
    });

    productElements = document.querySelectorAll('.cart__product'); // Обновляем список элементов cart__product
    updateNumCount(); // Обновляем число и текст после удаления всех товаров
  });

  // Обработчик события для каждой кнопки "Удалить"
  deleteButtons.forEach(function(deleteButton) {
    deleteButton.addEventListener('click', function() {
      var productElement = deleteButton.closest('.cart__product');
      productElement.remove();

      productElements = document.querySelectorAll('.cart__product'); // Обновляем список элементов cart__product
      updateNumCount(); // Обновляем число и текст после удаления товара
    });
  });

  function decreaseQuantity(event) {
    var quantityElement = event.target.closest('.cart__product-cunt').querySelector('.cart__product-cuntNum');
    var quantity = parseInt(quantityElement.textContent);
  
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
      updateTotalPrice(event.target.closest('.cart__product'));
      updateNumCount(); // Обновляем общую сумму
    }
  }
  
  function increaseQuantity(event) {
    var quantityElement = event.target.closest('.cart__product-cunt').querySelector('.cart__product-cuntNum');
    var quantity = parseInt(quantityElement.textContent);
  
    quantityElement.textContent = quantity + 1;
    updateTotalPrice(event.target.closest('.cart__product'));
    updateNumCount(); // Обновляем общую сумму
  }

  var removeButtons = document.querySelectorAll('.cart__product-cuntRemove');
  var addButtons = document.querySelectorAll('.cart__product-cuntAdd');

  removeButtons.forEach(function(button) {
    button.addEventListener('click', decreaseQuantity);
  });

  addButtons.forEach(function(button) {
    button.addEventListener('click', increaseQuantity);
  });

  // Обновление числа и текста при загрузке страницы
  updateNumCount();
});

// Получаем элементы из DOM
// Получаем все элементы cart__product
const productElements = document.querySelectorAll('.cart__product');

// Функция обновления общей стоимости для конкретного элемента cart__product
function updateTotalPrice(productElement) {
  const quantityElement = productElement.querySelector('.cart__product-cuntNum');
  const priceElement = productElement.querySelector('.cart__product-price-text');
  const totalPriceElement = productElement.querySelector('.cart__product-priceX-text');

  const quantity = parseInt(quantityElement.textContent);
  const price = parseInt(priceElement.textContent.replace(/\s/g, ''));
  const totalPrice = quantity * price;
  totalPriceElement.textContent = totalPrice.toLocaleString();
}

// Функция обработки события увеличения количества товаров
function increaseQuantity(event) {
  const productElement = event.target.closest('.cart__product');
  const quantityElement = productElement.querySelector('.cart__product-cuntNum');
  updateTotalPrice(productElement);
}

// Функция обработки события уменьшения количества товаров
function decreaseQuantity(event) {
  const productElement = event.target.closest('.cart__product');
  const quantityElement = productElement.querySelector('.cart__product-cuntNum');
  const quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    updateTotalPrice(productElement);
  }
}

// Обработчики событий для кнопок увеличения и уменьшения количества товаров
productElements.forEach((productElement) => {
  productElement.querySelector('.cart__product-cuntAdd').addEventListener('click', increaseQuantity);
  productElement.querySelector('.cart__product-cuntRemove').addEventListener('click', decreaseQuantity);
});

// Инициализация общей стоимости для всех элементов cart__product
productElements.forEach(updateTotalPrice);


document.addEventListener('DOMContentLoaded', function() {
// Получаем все элементы с классом "products__item"
var productItems = document.querySelectorAll('.products__item');

// Проходимся по каждому элементу
productItems.forEach(function(item) {
  // Получаем первый элемент с классом "products__item-column" в текущем элементе
  var productItemColumn = item.querySelector('.products__item-column');

  // Проверяем наличие элемента
  if (productItemColumn) {
    // Добавляем обработчик события click
    productItemColumn.addEventListener('click', function() {
      // При клике перенаправляем на страницу products_open.html
      window.location.href = 'products_open.html';
    });
  }
});
});



document.addEventListener('DOMContentLoaded', function() {
  var deleteAllButton = document.querySelector('.cart__delete-all');
  var productElements = document.querySelectorAll('.cart__product');

  deleteAllButton.addEventListener('click', function() {
      productElements.forEach(function(productElement) {
          productElement.remove();
      });
  });
});
// Получаем кнопку и элемент fastOrder
var orderButton = document.querySelector('.product__open-orderButton');
var fastOrder = document.querySelector('.fastOrder');
var closeFormOrder = document.querySelector('.close__form');

// Добавляем обработчик события click к кнопке
orderButton.addEventListener('click', function() {
  // При клике изменяем свойство display у элемента fastOrder
  if (fastOrder.style.display === 'none') {
    fastOrder.style.display = 'flex';
  } else {
    fastOrder.style.display = 'none';
  }
});

closeFormOrder.addEventListener('click', function(){
    // При клике изменяем свойство display у элемента fastOrder
    if (fastOrder.style.display === 'flex') {
      fastOrder.style.display = 'none';
    } else {
      fastOrder.style.display = 'flex';
    }
})


function submitForm() {
  // Здесь можно добавить код для отправки формы на сервер

  // Сохраняем информацию о состоянии отправки формы в localStorage
  localStorage.setItem('formSubmitted', 'true');
}

// Проверяем, была ли форма отправлена при предыдущей загрузке страницы
if (localStorage.getItem('formSubmitted') === 'true') {
  // Открываем блок "successfully"
  document.getElementById('successfully').style.display = 'flex';

  // Удаляем информацию о состоянии отправки формы из localStorage
  localStorage.removeItem('formSubmitted');

  // Закрываем окно "successfully" через 3 секунды
  setTimeout(function() {
    document.getElementById('successfully').style.display = 'none';
  }, 2000);
}

// Получаем элементы из DOM
const countNumElement = document.querySelector('.product__open-countNum');
const priceTextElement = document.querySelector('.product__open-priceText');

// Функция для обновления значения цены
function updatePrice() {
  // Получаем текущее значение количества
  const count = parseInt(countNumElement.textContent);

  // Выполняем необходимые операции с ценой в зависимости от значения количества
  const price = 25300 * count; // Пример: умножаем базовую цену на количество

  // Обновляем текстовое содержимое элемента с ценой
  priceTextElement.textContent = price.toLocaleString() + ' ₽'; // Пример: "25,300 ₽"
}

// Обработчики событий для кнопок увеличения и уменьшения количества
const addButton = document.querySelector('.price__counter-add');
const removeButton = document.querySelector('.price__counter-remove');

addButton.addEventListener('click', function() {
  // Увеличиваем значение количества
  countNumElement.textContent = parseInt(countNumElement.textContent) + 1;

  // Обновляем цену
  updatePrice();
});

removeButton.addEventListener('click', function() {
  // Проверяем, что значение количества больше 1 перед уменьшением
  if (parseInt(countNumElement.textContent) > 1) {
    // Уменьшаем значение количества
    countNumElement.textContent = parseInt(countNumElement.textContent) - 1;

    // Обновляем цену
    updatePrice();
  }
});

