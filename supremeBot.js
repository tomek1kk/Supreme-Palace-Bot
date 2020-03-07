var url = window.location.href;

const MAIN_URL = "https://www.supremenewyork.com/shop/all";
const CHECKOUT_URL = "https://www.supremenewyork.com/checkout";
const API_ENDPOINT = "https://localhost:44343/api/tasks/getcurrenttask";
const ITEM_NAME = "Pocket";
const ITEM_SIZE = "Medium";
const CATEGORY = "tops_sweaters"

if (url == MAIN_URL) {
    fetch(API_ENDPOINT)
        .then(r => r.json())
        .then(r => {
            if (r.fillAddress == true) {
                sessionStorage.setItem('fillAddress', "true")
                sessionStorage.setItem('fullName', r.address.fullName);
                sessionStorage.setItem('email', r.address.email);
                sessionStorage.setItem('phoneNumber', r.address.phoneNumber);
                sessionStorage.setItem('address1', r.address.address1);
                sessionStorage.setItem('city', r.address.city);
                sessionStorage.setItem('postCode', r.address.postCode);
            }

            sessionStorage.setItem('cardNumber', r.card.number);
            sessionStorage.setItem('cvv', r.card.cvv);
            sessionStorage.setItem('cardType', r.card.type);
            sessionStorage.setItem('month', r.card.month);
            sessionStorage.setItem('year', r.card.year);

            sessionStorage.setItem('delay', r.delay);
            sessionStorage.setItem('refreshInterval', r.refreshInterval);
            sessionStorage.setItem('onlyWithEmptyBasket', r.onlyWithEmptyBasket);
            sessionStorage.setItem('anyColor', r.anyColor);

            sessionStorage.setItem('itemsLength', r.items.length);
            sessionStorage.setItem('itemsAdded', '0');
            sessionStorage.setItem('itemsUnadded', '0');
            if (document.getElementById("cart").className == "hidden")
                sessionStorage.setItem('beforeDrop', '0');
            else
                sessionStorage.setItem('beforeDrop', document.getElementById("items-count").textContent[0]);
            for (let i = 0; i < r.items.length; i++) {
                sessionStorage.setItem('item' + i.toString() + 'names', r.items[i].names);
                sessionStorage.setItem('item' + i.toString() + 'colors', r.items[i].colors);
                sessionStorage.setItem('item' + i.toString() + 'category', r.items[i].category);
                sessionStorage.setItem('item' + i.toString() + 'anyColor', r.items[i].anyColor);
                sessionStorage.setItem('item' + i.toString() + 'size', r.items[i].size);
            }
            pickCategory(r.items[0].category);
        });

}
if (parseInt(sessionStorage.getItem('itemsAdded')) + parseInt(sessionStorage.getItem('itemsUnadded')) < parseInt(sessionStorage.getItem('itemsLength'))) {
    if (url == MAIN_URL + "/" + sessionStorage.getItem('item' + (parseInt(sessionStorage.getItem('itemsAdded')) + parseInt(sessionStorage.getItem('itemsUnadded'))).toString() + 'category')) {
        pickItem();
    }
}

if (url.length > MAIN_URL.length + 15) // item selected
{
    if (document.getElementById("add-remove-buttons").children[0].value != "add to basket") {
        sessionStorage.setItem('itemsUnadded', (parseInt(sessionStorage.getItem('itemsUnadded')) + 1).toString());
        if (parseInt(sessionStorage.getItem('itemsUnadded')) + parseInt(sessionStorage.getItem('itemsAdded')) == parseInt(sessionStorage.getItem('itemsLength')))
            checkout();
        else {
            let nextIndex = parseInt(sessionStorage.getItem('itemsUnadded')) + parseInt(sessionStorage.getItem('itemsAdded'));
            pickCategory(sessionStorage.getItem('item' + +nextIndex + 'category'));
        }
    }
    else {
        let index = parseInt(sessionStorage.getItem('itemsAdded')) + parseInt(sessionStorage.getItem('itemsUnadded'));
        let x = parseInt(sessionStorage.getItem('itemsAdded')) + 1;
        sessionStorage.setItem('itemsAdded', x.toString());
        pickSize(sessionStorage.getItem('item' + index.toString() + 'size'));
        document.getElementsByName("commit")[0].click();

        let p = setInterval(
            function () {
                if (document.getElementById("cart").className != "hidden" &&
                    parseInt(document.getElementById("items-count").textContent[0]) == x + parseInt(sessionStorage.getItem('beforeDrop'))) {
                    clearInterval(p);
                    if (parseInt(sessionStorage.getItem('itemsUnadded')) + parseInt(sessionStorage.getItem('itemsAdded')) == parseInt(sessionStorage.getItem('itemsLength')))
                        checkout();
                    else
                        pickCategory(sessionStorage.getItem('item' + (index + 1).toString() + 'category'));
                }
            }, 50);
    }
}


if (url == CHECKOUT_URL) {
    autoFill();
    setTimeout("processPayment()", parseInt(sessionStorage.getItem('delay')));
}
function processPayment() {
    document.getElementsByName("commit")[0].click();
}
function pickCategory(cat) {
    let link = MAIN_URL + "/" + cat;
    chrome.runtime.sendMessage({ redirect: link });
}

function pickItem() {
    let found = false;
    let products = document.getElementsByClassName('name-link');
    let itemsAdded = parseInt(sessionStorage.getItem('itemsAdded'));
    let itemsUnadded = parseInt(sessionStorage.getItem('itemsUnadded'));
    let itemIndex = itemsAdded + itemsUnadded;
    let names = sessionStorage.getItem('item' + +itemIndex + 'names').split(',');
    let colors = sessionStorage.getItem('item' + +itemIndex + 'colors').split(',');
    let anyColor = sessionStorage.getItem('item' + +itemIndex + 'anyColor');

    for (let i = 0; i < products.length - 1; i++) {
        for (let j = 0; j < names.length; j++) {
            for (let k = 0; k < colors.length; k++) {
                if ((products[i].innerHTML.toLowerCase()).includes(names[j].toLowerCase()) && (products[i + 1].innerHTML.toLowerCase()).includes(colors[k].toLowerCase())) {
                    found = true;
                    chrome.runtime.sendMessage({ redirect: products[i].href });
                    break;
                }
            }
        }
    }
    if (anyColor == "true" && found == false) {
        for (let i = 0; i < products.length - 1; i++) {
            for (let j = 0; j < names.length; j++) {
                if ((products[i].innerHTML.toLowerCase()).includes(names[j])) {
                    found = true;
                    chrome.runtime.sendMessage({ redirect: products[i].href });
                    break;
                }
            }
        }
    }
    if (found == false)
        setTimeout(function () { location.reload(); }, parseInt(sessionStorage.getItem('refreshInterval')));
}

function autoFill() {
    if (sessionStorage.getItem('fillAddress') == "true") {
        let info = {
            "full name": sessionStorage.getItem('fullName'),
            "email": sessionStorage.getItem('email'),
            "tel": sessionStorage.getItem('phoneNumber'),
            "address": sessionStorage.getItem('address1'),
            "postcode": sessionStorage.getItem('postCode'),
            "city": sessionStorage.getItem('city'),
        }
        let inputs = document.querySelectorAll('input:not([type=submit]):not([type=hidden])');
        inputs.forEach(function (element) {
            var prev_sibling = element.previousElementSibling;
            if (prev_sibling) {
                let label_text = prev_sibling.innerHTML.toLowerCase();
                let value = info[label_text];
                if (value) {
                    setInput(element, value);
                }
            }
        });
    }


    if (sessionStorage.getItem('cardType') == "1") // MASTERCARD
        document.getElementById("credit_card_type").selectedIndex = 2;
    document.getElementById("cnb").value = sessionStorage.getItem('cardNumber');
    document.getElementById("vval").value = sessionStorage.getItem('cvv');
    document.getElementById("credit_card_month").selectedIndex = parseInt(sessionStorage.getItem('month')) - 1;
    let date = new Date();
    document.getElementById("credit_card_year").selectedIndex = parseInt(sessionStorage.getItem('year')) - date.getFullYear();
    document.getElementById("order_terms").checked = true;
    document.getElementById("order_terms").parentElement.classList.add('checked');
}
function addToBasket() {
    if (document.getElementsByName("commit")[0].value == "add to basket")
        document.getElementsByName("commit")[0].click();
}

function pickSize(size) {
    document.getElementById("size").selectedIndex = size;
    var selectbox = document.getElementById("size");
    for (var i = 0; i < selectbox.length; i++) {
        if (selectbox.options[i].label == size) {
            selectbox.selectedIndex = i;
            break;
        }
    }
}

function checkout() {
    chrome.runtime.sendMessage({ redirect: CHECKOUT_URL });
}

function setInput(element, value) {
    element.focus();
    element.value = value;
    element.blur();
}

function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}