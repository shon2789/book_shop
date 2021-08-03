'use strict'



function onLoad() {
    renderBooks();
}


function renderBooks() {

    var books = getBooksToShow();


    var strHTMLs = books.map(function (book) {

        return `<tr><td>${book.id}</td><td><img class="cover-img" src="${book.imgUrl}"/></td>
        <td>${book.name}</td><td>${formatCurrency(book.price, getCurrLang())}</td>
        <td><button data-trans="read" class="btn btn-primary" onclick="openModalForRead('${book.id}')">Read</button>
        </td><td><button data-trans="update" class="btn btn-warning" onclick="onUpdateBook('${book.id}')">Update</button>
        </td><td><button data-trans="delete" class="btn btn-danger" onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`
    })
    var strHTML = `<tr>
    </div><thead class="table-dark">
    <th class="cursor" data-trans="id" onclick="onSortById()"></th></th>
    <th data-trans="image"></th>
    <th class="cursor" data-trans="name" onclick="onSortByName()"></th>
    <th data-trans="price"></th>
    <th data-trans="actions" colspan="3"></th></thead>
    </tr>`
    strHTMLs.unshift(strHTML);
    document.querySelector('table').innerHTML = strHTMLs.join('');
    doTrans();
}

function onReadBook(bookName, bookPrice, elBtn) {
    var modalBg = document.querySelector('.modal-bg');
    modalBg.classList.toggle('bg-active');
    // openModalForRead(bookName, bookPrice);

    elBtn.addEventListener('click', function () {
        modalBg.classList.add('bg-active');
    })

    modalBg.addEventListener('click', function () {
        modalBg.classList.remove('bg-active');
    })

}

function onUpdateBook(bookIdx) {
    openModalForUpdate();
    gCurrBookIdx = bookIdx;
}

function onSubmitUpdatedPrice() {
    var elPrice = document.querySelector('.updated-price').value;
    if (!elPrice) return;
    updateBook(gCurrBookIdx, elPrice);

    renderBooks();
    closeModalForUpdate();
    document.querySelector('.updated-price').value = '';
    gCurrBookIdx = null;
}

function onRemoveBook(bookIdx) {
    deleteBook(bookIdx);
    renderBooks();
}

function onAddBook(ev) {
    ev.stopPropagation();
    var bookName = document.querySelector('[name=book-name]').value;
    var bookPrice = document.querySelector('[name=book-price]').value;
    var bookImg = document.querySelector('[name=book-image]').value;

    if (!bookName || !bookPrice) return;
    addBook(bookName, bookPrice, bookImg);
    closeModal();
    renderBooks();
    bookName = '';
    bookPrice = '';
    bookImage = '';

}

function onNextPage() {
    var elPage = document.querySelector('.page');
    nextPage();
    elPage.innerText = gPageIdx + 1;
    renderBooks();
}

function onBackPage() {
    var elPage = document.querySelector('.page');
    backPage();
    elPage.innerText = gPageIdx + 1;
    renderBooks();
}

function onSortById() {
    sortById();
    renderBooks();
}

function onSortByName() {
    sortByName();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    renderBooks();
    doTrans();
}