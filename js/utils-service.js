var gRatingCounter = 0;
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
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


    var strContent = `<div class="top-container"><img src="${book.imgUrl}"><p class="avg-rating"><span data-trans="avg-rating"></span>
     ${book.avgRating}⭐️ </p></div><div class="book-price">${formatCurrency(book.price, getCurrLang())}</div><p class="book-desc">Lorem ipsum dolor sit amet,
     consectetur adipiscing elit. Sed sed viverra augue. Etiam sagittis, mauris in iaculis venenatis,
      nulla massa laoreet felis, ac hendrerit nisi lorem sed nunc.
      Aenean non rutrum tortor. Aenean pretium, lectus quis ornare cursus, ipsum est tempor tortor, nec commodo eros velit ac lectus.
    Aliquam dictum vitae quam ullamcorper consectetur.</p>
    <div class="rating-container"><button class=" btn btn-info minus" onclick="onLowRating()">-</button><div class="rating">0</div><button class="btn btn-info plus" onclick="onAddRating()">+</button></div>
    <button data-bs-dismiss="modal" data-trans="add-rating" class=" btn btn-success submit-rating" onclick="OnAddRatingToAvg('${book.id}')">Add Rating</button>
    `
    var strTitle = `${book.name}`
    var elModal = document.querySelector('.info');
    var elModalTitle = document.querySelector('.read-title');
    elModal.innerHTML = strContent;
    elModalTitle.innerText = strTitle;
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

    elRating.innerText = 0;
    gRatingCounter = 0;
}


