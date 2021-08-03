var gTrans = {
    title: {
        en: 'Welcome to Shon\'s Book Shop',
        he: 'ברוכים הבאים לחנות הספרים של שון'
    },
    name: {
        en: 'Title',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    image: {
        en: 'Image',
        he: 'תמונה'
    },
    id: {
        en: 'ID',
        he: 'מק"ט',
    },
    read: {
        en: 'Read',
        he: 'קריאה',
    },
    update: {
        en: 'Update',
        he: 'עדכון',
    },
    delete: {
        en: 'Delete',
        he: 'מחיקה',
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוספת ספר',
    },
    submit: {
        en: 'Submit',
        he: 'הוספה'
    },
    'add-rating': {
        en: 'Add Rating',
        he: 'הוספת דירוג'
    },
    'new-price': {
        en: 'Enter new price',
        he: 'הכנס מחיר מעודכן:'
    },
    'new-price-ph': {
        en: 'New Price',
        he: 'מחיר מעודכן'
    },
    'avg-rating': {
        en: 'Average Rating:',
        he: 'דירוג ממוצע: '
    },
    'book-name': {
        en: 'Book Name:',
        he: 'שם הספר: '
    },
    'book-name-ph': {
        en: 'Enter Book Name',
        he: 'הכנס את שם הספר '
    },
    'book-price': {
        en: 'Book Price:',
        he: 'מחיר הספר: '
    },
    'book-price-ph': {
        en: 'Enter Book Price',
        he: 'הכנס את מחיר הספר: '
    },
    'book-image': {
        en: 'Book Image:',
        he: 'תמונה של הספר:'
    },
    'book-image-ph': {
        en: 'Enter Book Image',
        he: 'הכנס את התמונה של הספר '
    },

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en']

    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        console.dir(el)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

function getCurrLang() {
    return gCurrLang;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num, lang) {
    if (lang === 'en') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

    } else {

        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    }
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}