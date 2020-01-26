var url = window.location.href;

var CATEGORY = "4-jackets";

const MAIN_URL = "https://helascaps.com/";
const BASKET_URL = "https://helascaps.com/cart?action=show";
const CHECKOUT_URL = "https://helascaps.com/order";


console.log(url);// + ', ' + url == MAIN_URL);
if (url == MAIN_URL) {

    pickCategory(CATEGORY);


}

if(url == MAIN_URL + CATEGORY)
{
    pickItem();
}

if(url.length > MAIN_URL.length + 25) {//} && typeof document.getElementsByClassName("buttonCheckout")[0] === "undefined") {
    console.log("jest undefined");
    addToBasket();
    setTimeout("proceed()", 1000);
}

if(url.length > MAIN_URL.length + 15 && typeof document.getElementsByClassName("buttonCheckout")[0] !== "undefined" ) {
    console.log("nie jest undefined");
    proceed();
}

if(url == BASKET_URL){ // && typeof document.getElementsByName("add")[0] !== "undefined") {
    goToCheckout();
}

if(url == CHECKOUT_URL) {
    orderItem();
}

///////////////////////////////////////////////////////////////////////////

function pickCategory(cat) {
    var link = MAIN_URL + cat;
    // chrome.runtime.sendMessage({ redirect: link });
    window.location.href = link;

}


function pickItem() {
    let products = document.getElementsByClassName('product-link');

    for (let i = 0; i < products.length - 1; i++) {

        chrome.runtime.sendMessage({ redirect: products[i].href });
        break;

    }
}


function addToBasket() {
    console.log("wszedlem");
    document.getElementsByName("add")[0].click();
    // document.location.href = BASKET_URL;
}

function proceed() {
    document.location.href = BASKET_URL;
}


function goToCheckout() {
    document.getElementsByName("buttonCheckout");
    document.location.href = CHECKOUT_URL;
}


function orderItem() {
    var radioButton = document.getElementById("payment-option-2");

    radioButton.checked = true;

    fillCard();

    clickSubmit();
}

function fillCard() {
    var cardInput = document.getElementsByName("cardnumber");
    var dateInput = document.getElementsByName("exp-date");
    var cvcInput = document.getElementsByName("cvc");

    cardInput.value = "4263982640269299";
    dateInput = "0423";
    cvcInput = "738";

    console.log(cardInput.value);
    console.log(dateInput.value);
    console.log(cvcInput.value);
}


function clickSubmit() {
    var div1 = document.getElementById("payment-confirmation");
    var div2 = div1.childNodes[0];
    var button = div2.childNodes[0];

    button.click();
}

// document.getElementsByName("cardnumber").value = "4263982640269299"