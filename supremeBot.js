var url = window.location.href;

const MAIN_URL = "https://www.supremenewyork.com/shop/all";
const CHECKOUT_URL = "https://www.supremenewyork.com/checkout";
const API_ENDPOINT = "https://localhost:44343/api/tasks/getcurrenttask";
const ITEM_NAME = "Pocket";
const ITEM_SIZE = "Medium";
const CATEGORY = "tops_sweaters"

if (url == MAIN_URL)
{
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

        pickCategory(CATEGORY);
    });
    
}
// if (parseInt(sessionStorage.getItem('itemsAdded')) < items.length)
// {
//     if (url == MAIN_URL + "/" + items[sessionStorage.getItem('itemsAdded')][0])
//     {
//         pickItem(items[sessionStorage.getItem('itemsAdded')][1], items[sessionStorage.getItem('itemsAdded')][3]);
//     }
// }
if (url == MAIN_URL + "/" + CATEGORY)
{
    pickItem();
}
if (url.length > MAIN_URL.length + 15)
{
    //var x = parseInt(sessionStorage.getItem('itemsAdded'));
    //x++;
    //sessionStorage.setItem('itemsAdded', x.toString());
    pickSize(ITEM_SIZE);
    addToBasket();

    var p = setInterval(function() { 
        if (document.getElementById("cart").className != "hidden")// && document.getElementById("items-count").textContent[0] == x.toString())
        {
            clearInterval(p);
            checkout();
        }
    }, 50);

}


if (url == CHECKOUT_URL)
{
    autoFill();
    setTimeout("processPayment()", parseInt(sessionStorage.getItem('delay')));
}
function processPayment()
{
    document.getElementsByName("commit")[0].click();
}
function pickCategory(cat)
{
    let link = MAIN_URL + "/" + cat;
    chrome.runtime.sendMessage({redirect: link});
}

function pickItem()
{
    let found = false;
    let products = document.getElementsByClassName('name-link');
    console.log(products);
    for (let i = 0; i < products.length - 1; i++)
    {
        //for (let j = 0; j < name.length; j++)
        //{
            // for (let k = 0; k < color.length; k++)
            // {
                if ((products[i].innerHTML).includes(ITEM_NAME))// && (products[i+1].innerHTML).includes(color[k]))
                {
                    found = true;
                    chrome.runtime.sendMessage({redirect: products[i].href});
                    break;
                }
            //}
        //}
    }
    if (found == false) 
        setTimeout(function() {location.reload();}, parseInt(sessionStorage.getItem('refreshInterval')));
}

function autoFill()
 {
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
        inputs.forEach(function(element) 
        {
            var prev_sibling = element.previousElementSibling;
            if (prev_sibling) 
            {
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
function addToBasket()
{
    if (document.getElementsByName("commit")[0].value == "add to basket")
        document.getElementsByName("commit")[0].click();
}

function pickSize(size)
{
    document.getElementById("size").selectedIndex = size;
    var selectbox = document.getElementById("size");
    for (var i = 0; i < selectbox.length; i++)
    {
        if (selectbox.options[i].label == size)
        {
            selectbox.selectedIndex = i;
            break;
        }
    }
}

function checkout()
{
     chrome.runtime.sendMessage({redirect: CHECKOUT_URL});
}

function setInput(element, value) {
    element.focus();
    element.value = value;
    element.blur();
  }

  function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}