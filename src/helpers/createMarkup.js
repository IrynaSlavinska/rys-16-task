function createMarkup(arr, list) {
  let markup;
  if (arr.length) {
    markup = arr
      .map(
        ({ name, img, id }) =>
          `
  <li data-id="${id}" class="js-card">
  <img src="${img}" alt="${name}" width="300" />
  <h2>${name}</h2>
  <p><a href="#" class="js-info">More information</a></p>
  <div>
    <button class="js-favorite">Add to favorite</button>
    <button class="js-basket">Add to basket</button>
  </div>
</li>
`
      )
      .join('');
  } else {
    markup = `<li>
  <img src="http://img.picturequotes.com/2/665/664742/feeling-empty-quote-6-picture-quote-1.jpg" alt="404" width="600" />
</li>
`;
  }
  list.innerHTML = markup;
}

export { createMarkup };
