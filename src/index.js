import { common } from './common';
import { createMarkup } from './helpers/createMarkup';
import { createModal } from './helpers/createModal';
import { instruments } from './helpers/instruments';

// 1. створюємо розмітку сторінки

// 2. на список вішаємо делегування f onClick() та відслідковуємо три події: клік на more іnfo і на обидві кнопки

// 3. тег а по замовчуванню прагне перезавантажити сторінку, тому preventDefault(), щоб прибрати цю поведінку

// 4. якщо обраний елемент містить в собі цей селектор  (evt.target.classList.contains('js-info')), то викликається
// функція findProduct(elem) (при виклику туди дається (evt.target)), яка шукає найближчого предка з даним селектором
// і бере в нього айдішник, який приводиться до намбера, оскільки датасет завжди повертає рядок

// 5.  якщо обраний елемент містить в собі цей селектор  (evt.target.classList.contains('js-favorite')), то викликається
// функція findProduct(elem) (при виклику туди дається (evt.target)), яка шукає найближчого предка з даним селектором
// і бере в нього айдішник, який приводиться до намбера, оскільки датасет завжди повертає рядок і пушить елемент з таким
// айдішником в масив favoriteArr (обране)

// 6. якщо обраний елемент містить в собі цей селектор  (evt.target.classList.contains('js-favorite')), то викликається
// функція findProduct(elem) (при виклику туди дається (evt.target)), яка шукає найближчого предка з даним селектором
// і бере в нього айдішник, який приводиться до намбера, оскільки датасет завжди повертає рядок і пушить елемент з таким
// айдішником в масив basketArr (кошик)
// оператор нульового поєднання ??

const searchInput = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
const favoriteArr = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? []; // якщо в локальному щось було, то розпарси це, інакше ось тобі порожній масив
const basketArr = JSON.parse(localStorage.getItem(common.KEY_BASKET)) ?? [];

list.addEventListener('click', onClick);

createMarkup(instruments, list);

function onClick(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('js-info')) {
    const product = findProduct(evt.target);
    createModal(product);
  }

  if (evt.target.classList.contains('js-favorite')) {
    const product = findProduct(evt.target);
    const inStorage = favoriteArr.some(({ id }) => id === product.id); // перевіряємо чи в масиві немає якогось (some) продукту, чиї айдішники збігаються
    if (inStorage) {
      return; // якщо є в сховищі - то перериваємо виконання функції
    }
    favoriteArr.push(product);
    localStorage.setItem(common.KEY_FAVORITE, JSON.stringify(favoriteArr));
  }

  if (evt.target.classList.contains('js-basket')) {
    const product = findProduct(evt.target);
    basketArr.push(product);
    localStorage.setItem(common.KEY_BASKET, JSON.stringify(basketArr));
  }
}

function findProduct(elem) {
  const productId = Number(elem.closest('.js-card').dataset.id);
  return instruments.find(({ id }) => id === productId);
}
