const KEY = 'bookDB'
const PAGE_SIZE = 5
var gPageIdx = 0;


var gBooks = [];
_createBooks();
var gCurrBookIdx;

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function backPage() {
    if (gPageIdx < 1) return;
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getBooksToShow() {
    var books = (loadFromStorage(KEY));
    if (!books || books.length === 0) {
        document.querySelector('.no-books').innerText = 'No Books to Show';
        gBooks = books;
        _saveBookToStorage();
        return books;
    };

    gBooks = books;
    return getBooks();
}

function _createBooks() {
    var books = loadFromStorage('bookDB')
    if (!books || !books.length) {
        books = [
            {
                id: makeId(), name: 'Harry Potter', price: 20, imgUrl: 'https://4.imimg.com/data4/VO/DP/MY-3816229/harry-potter-and-the-cursed-child-parts-i-500x500.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'Diary of a Wimpy Kid', price: 27, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oduzt1G3S.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'Rich Dad Poor Dad', price: 22, imgUrl: 'https://kbimages1-a.akamaihd.net/4ab648ad-b5b4-489a-82d6-ff8abf39c26f/353/569/90/False/rich-dad-poor-dad-23.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'Count The Ways: A Novel', price: 32, imgUrl: 'https://m.media-amazon.com/images/I/51pa+OPTuAL.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'The Comfort Of Monsters', price: 45, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/91uwQZB6P-L.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'Falling', price: 12, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71fTZU8p7bS.jpg', ratings: [], avgRating: 0,
            },
            {
                id: makeId(), name: 'A Familiar Sight', price: 19, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/91Scdc7FRVL._AC_UL320_SR320,320_.jpg', ratings: [], avgRating: 0,
            },
        ];
    }
    gBooks = books;
    _saveBookToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    });
    return book;
}

function addBook(name, price, imgUrl) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        ratings: [],
        avgRating: 0,
    }
    document.querySelector('.no-books').innerText = '';
    gBooks.unshift(book);
    _saveBookToStorage();
}

function updateBook(bookIdx, price) {
    var book = getBookById(bookIdx);
    book.price = price;
    _saveBookToStorage();

}

function deleteBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1);
    _saveBookToStorage();
}

function addRatingToAvg(bookIdx, rating) {
    book = getBookById(bookIdx);
    book.totalRatings++;
    book.ratings.push(rating);
    var sumOfRatings = book.ratings.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    book.avgRating = (sumOfRatings / book.ratings.length).toFixed(1);
    _saveBookToStorage();

}

function _saveBookToStorage() {
    saveToStorage(KEY, gBooks);
}

function sortById() {

    gBooks.sort(function (bookA, bookB) {
        if (bookA.id < bookB.id) { return -1 };
        if (bookA.id > bookB.id) { return 1 };
        return 0;
    });
    _saveBookToStorage();

}
function sortByName() {
    gBooks.sort(function (bookA, bookB) {

        if (bookA.name < bookB.name) { return -1 };
        if (bookA.name > bookB.name) { return 1 };
        return 0;
    });
    _saveBookToStorage();
}