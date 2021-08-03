var gRatingCounter = 0;
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function openModalForAdd() {
    var modalBg = document.querySelector('.modal-bg');
    modalBg.classList.toggle('bg-active');
    var elModal = document.querySelector('.modal');

    var str = `<label data-trans="book-name" for="book-name">Book Name:</label>
    <input data-trans="book-name-ph" name="book-name" type="text" id="book-name" placeholder="Enter Book Name">
    <label data-trans="book-price" for="book-price">Book Price:</label>
    <input data-trans="book-price-ph" name="book-price" type="number" id="book-price" placeholder="Enter Book Price">
    <label data-trans="book-image" for="book-image">Book Image:</label>
    <input data-trans="book-image-ph" name="book-image" type="url" id="book-image" placeholder="Enter Book Image URL">
    <button data-tans="submit" class="btn btn-success" onclick="onAddBook(event, this)">Submit</button>
    <span class="modal-close" onclick="closeModal()">X</span>`
    var elModal = document.querySelector('.modal');
    elModal.innerHTML = str;

    doTrans();
}

function openModalForUpdate() {
    var modalBg = document.querySelector('.modal-bg-update');
    modalBg.classList.toggle('bg-active');
}

function closeModal() {
    var modalBg = document.querySelector('.modal-bg');
    modalBg.classList.toggle('bg-active');
}



function openModalForRead(bookId) {
    var book = getBookById(bookId);
    var modalBg = document.querySelector('.modal-bg');
    modalBg.classList.toggle('bg-active');

    var str = `<p class="bookname">${book.name}</p><div class="top-container"><img src="${book.imgUrl}"><p class="avg-rating"><span data-trans="avg-rating"></span>
     ${book.avgRating}⭐️ </p></div><div class="book-price">$${book.price}</div><p class="book-desc">Lorem ipsum dolor sit amet,
     consectetur adipiscing elit. Sed sed viverra augue. Etiam sagittis, mauris in iaculis venenatis,
      nulla massa laoreet felis, ac hendrerit nisi lorem sed nunc.
      Aenean non rutrum tortor. Aenean pretium, lectus quis ornare cursus, ipsum est tempor tortor, nec commodo eros velit ac lectus.
    Aliquam dictum vitae quam ullamcorper consectetur.</p>
    <div class="rating-container"><button class=" btn btn-info minus" onclick="onLowRating()">-</button><div class="rating">0</div><button class="btn btn-info plus" onclick="onAddRating()">+</button></div>
    <button data-trans="add-rating" class=" btn btn-success submit-rating" onclick="OnAddRatingToAvg('${book.id}')">Add Rating</button>
    <span class="modal-close" onclick="closeModal()">X</span>
    `
    var elModal = document.querySelector('.modal');
    elModal.innerHTML = str;

    doTrans();
}

function onLowRating() {
    var elRating = document.querySelector('.rating');
    if (gRatingCounter === 0) return;
    gRatingCounter--;
    elRating.innerText = gRatingCounter;
}



function onAddRating() {
    var elRating = document.querySelector('.rating');
    if (gRatingCounter === 5) return;
    gRatingCounter++;
    elRating.innerText = gRatingCounter;
}

function OnAddRatingToAvg(bookIdx) {
    var elRating = document.querySelector('.rating').innerText;
    addRatingToAvg(bookIdx, +elRating);
    renderBooks();
    closeModal();
    elRating.innerText = 0;
    gRatingCounter = 0;
}



function closeModalForUpdate() {
    var modalBg = document.querySelector('.modal-bg-update');
    modalBg.classList.toggle('bg-active');
}