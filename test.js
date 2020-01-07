var url = window.location.href;

var BILLING_INFO = {
    "full name": "name test",
    "email": "email@test.com",
    "tel": "123456789",
    "address": "address test",
    "address 2": "address2 test",
    "address 3": "address3 test",
    "postcode": "00000",
    "city": "city test",
    "number": "1234 5678 1234 5678",
    "CVV": "123"
}

var TYP_KARTY = 1;
var MIESIAC_KARTY = 12;
var ROK_KARTY = 2023;

// ----- DROP TIME -----
var hour = 23;
var minute = 59;
var seconds = 59;

const MAIN_URL = "https://www.supremenewyork.com/shop/all";
const CHECKOUT_URL = "https://www.supremenewyork.com/checkout";
const TIME_SERVER_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=SxiYpwxzxdmqzwTHoxfoXGZwOvhLfnIYPmnMBGWiqdQlvE4aKHXZ_n7chjoFITw7uIlzs1hsnBMBOg34RHnSH3SqoEKW_wJ-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";

if (url == MAIN_URL) {
    sessionStorage.setItem('testPassed', 'true');
    sessionStorage.setItem('error', 'no errors!');

    // TESTING SERVER TIME
    fetch(TIME_SERVER_URL).then(timer => timer.json())
        .then(timer => {
            let totalTime = ((hour - timer.hours - 2) * 3600000) + ((minute - timer.minutes) * 60000) + ((seconds - timer.seconds) * 1000);
            console.log("Program will start in " + totalTime / 1000 + " seconds");
            pickCategory("accessories");
        }).catch(() => {
            sessionStorage.setItem('error', 'fetch time from server error');
            sessionStorage.setItem('testPassed', 'false');
        })

    
}

if (url == MAIN_URL + "/accessories")
{
    pickItem();
}

if (url.length > MAIN_URL.length + 15) {
    addToBasket();
    var p = setInterval(function () {
        if (document.getElementById("cart") == null) {
            sessionStorage.setItem('error', 'cart not found');
            sessionStorage.setItem('testPassed', 'false');
        }
        if (document.getElementById("cart").className != "hidden") {
            clearInterval(p);
            checkout();
        }
    }, 50);

}
if (url == CHECKOUT_URL) {
    autoFill(BILLING_INFO);
    setTimeout("processPayment()", 1000);
}
function processPayment() {
    if (document.getElementsByName("commit")[0] == null) {
        sessionStorage.setItem('error', 'process payment button not found');
        sessionStorage.setItem('testPassed', 'false');
    }
    document.getElementsByName("commit")[0].click();
}
function pickCategory(cat) {
    chrome.storage.sync.get('cat', function (data) {
        var link = MAIN_URL + "/" + cat;
        chrome.runtime.sendMessage({ redirect: link });
    });
}

function pickItem() {
    let products = document.getElementsByClassName('inner-article');

    for (let i = 0; i < products.length - 1; i++) {

        let children = products[i].childNodes;
        let soldout = children[0].getElementsByClassName("sold_out_tag");

        if (soldout.length > 0) {
            continue;
        }
        else {
            let product = products[i].getElementsByClassName('name-link')[0];

            chrome.runtime.sendMessage({ redirect: product.href });
            break;
        }
    }
}

function autoFill(info) {
    if (TYP_KARTY == 1) // MASTERCARD
    {
        document.getElementById("credit_card_type").selectedIndex = 2;
    }
    var inputs = document.querySelectorAll('input:not([type=submit]):not([type=hidden])');
    console.log(inputs);
    inputs.forEach(function (element) {
        var prev_sibling = element.previousElementSibling;
        if (prev_sibling) {
            var label_text = prev_sibling.innerHTML.toLowerCase();
            var value = info[label_text];
            if (value) {
                setInput(element, value);
            }
        }
    });
    document.getElementById("vval").value = "987";
    document.getElementById("credit_card_month").selectedIndex = MIESIAC_KARTY - 1;
    document.getElementById("credit_card_year").selectedIndex = ROK_KARTY - new Date().getFullYear();
    document.getElementById("order_terms").checked = true;
    document.getElementById("order_terms").parentElement.classList.add('checked');
    testInputs();
}

function testInputs() {
    let cvv = document.getElementById("vval");
    if (cvv == null || cvv.value != "987") {
        sessionStorage.setItem('error', 'cvv not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let month = document.getElementById("credit_card_month");
    if (month == null || month.selectedIndex != MIESIAC_KARTY - 1) {
        sessionStorage.setItem('error', 'month not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let year = document.getElementById("credit_card_year");
    if (year == null || year.selectedIndex != ROK_KARTY - new Date().getFullYear()) {
        sessionStorage.setItem('error', 'year not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let number = document.getElementById("cnb");
    if (number == null || number.value != "1234 5678 1234 5678") {
        sessionStorage.setItem('error', 'card number not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let terms =  document.getElementById("order_terms");
    if (terms == null || terms.checked != true) {
        sessionStorage.setItem('error', 'terms not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let inputs = document.querySelectorAll('input:not([type=submit]):not([type=hidden])');

    let fullName = inputs[0];
    if (fullName == null || fullName.value != "name test") {
        sessionStorage.setItem('error', 'name not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let email = inputs[1];
    if (email == null || email.value != "email@test.com") {
        sessionStorage.setItem('error', 'email not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let phone = inputs[2];
    if (phone == null || phone.value != "123456789") {
        sessionStorage.setItem('error', 'telephone not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let address = inputs[3];
    if (address == null || address.value != "address test") {
        sessionStorage.setItem('error', 'address not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let address2 = inputs[4];
    if (address2 == null || address2.value != "address2 test") {
        sessionStorage.setItem('error', 'address2 not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let address3 = inputs[5];
    if (address3 == null || address3.value != "address3 test") {
        sessionStorage.setItem('error', 'address3 not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let city = inputs[6];
    if (city == null || city.value != "city test") {
        sessionStorage.setItem('error', 'city not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

    let zip = inputs[7];
    if (zip == null || zip.value != "00000") {
        sessionStorage.setItem('error', 'zip not exist or not filled');
        sessionStorage.setItem('testPassed', 'false');
    }

}

function addToBasket() {
    if (document.getElementsByName("commit")[0] == null) {
        sessionStorage.setItem('error', 'add to basket button not found');
        sessionStorage.setItem('testPassed', 'false');
    }
    if (document.getElementsByName("commit")[0].value == "add to basket")
        document.getElementsByName("commit")[0].click();
}

function checkout() {
    chrome.runtime.sendMessage({ redirect: CHECKOUT_URL });
}

function setInput(element, value) {
    element.focus();
    element.value = value;
    element.blur();
}
