import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { closeModal } from './closeModal';

function createModal(product) {
  const option = {
    handler: null,
    onShow(instance) {
      // console.log(this);
      this.handler = closeModal.bind(instance);
      document.addEventListener('keydown', this.handler);
    },

    onClose() {
      console.log(this);
      document.removeEventListener('keydown', this.handler);
    },
    // стрілочну функцію переписуємо в звичайну, тоді this буде посилатись на те що треба
  };
  const instance = basicLightbox.create(
    `
<div class="modal">
  <img src="${product.img}" alt="${product.name}" width="200" />
  <h2>${product.name}</h2>
  <h3>${product.price} грн</h3>
  <p>${product.description}</p>
  <div>
    <button class="js-favorite">Add to favorite</button>
    <button class="js-basket">Add to basket</button>
  </div>
</div>
`,
    option
  );

  instance.show();
}

export { createModal };

// закриття по ескейпу
// ми відкрили модалку - влючилось прослуховування клавіатури
// виключається вона по тику на ескейп, але ж можна відкрити по хрестику чи кліку в бекдроп!!
// тобто прослуховування клавіатури досі триває!!!
// document.addEventListener('keydown', closer);
// function closer(event) {
//   if (event.code === 'Escape') {
//     instance.close(() => document.removeEventListener('keydown', closer));
//   }
// }
