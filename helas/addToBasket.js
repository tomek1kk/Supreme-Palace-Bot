var url = window.location.href;

var CATEGORY = "4-jackets";

const MAIN_URL = "https://helascaps.com/";
const BASKET_URL = "https://helascaps.com/cart?action=show";
const CHECKOUT_URL = "https://helascaps.com/order";


console.log(url);// + ', ' + url == MAIN_URL);
if (url == MAIN_URL) {

	fetch("https://localhost:44343/api/tasks/getcurrenttask")
    .then(r => r.json())
    .then(r => {
		console.log(r);
		sessionStorage.setItem('name', r.name);
		
		pickCategory(CATEGORY);
	});

	

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
	sessionStorage.setItem("counter", "0");
    let products = document.getElementsByClassName('middle');
	let itemName = sessionStorage.getItem('name');
	if (itemName == null)
		itemName = "DELTA JACKET RED";
    for (let i = 0; i < products.length - 1; i++) {

		console.log(products[i]);
		if (products[i].children[1].innerHTML.includes(itemName))
		{
			chrome.runtime.sendMessage({ redirect: products[i].children[0].href });
			break;
		}

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


	if (sessionStorage.getItem("counter") == "0")
	{
		sessionStorage.setItem("counter", "1");
		document.getElementsByName("confirm-addresses")[0].click();

	}
	if (sessionStorage.getItem("counter") == "1")
	{
		console.log("zaznaczam confirm delivery");
		document.getElementsByName("confirmDeliveryOption")[0].click();
		sessionStorage.setItem("counter", "2");
	}
	if (sessionStorage.getItem("counter") == "2")
	{
		//var radioButton = document.getElementById("payment-option-2");

		//radioButton.checked = true;

		//fillCard();

		//clickSubmit();
	}
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