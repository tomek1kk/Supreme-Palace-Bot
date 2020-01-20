let url = window.location.href;
const main_url = "https://shop.palaceskateboards.com/";
const category = "new";
const category_url = main_url + "collections/" + category;
const cart_url = "https://shop.palaceskateboards.com/cart";
const ITEM_NAME = "ZIP IT";
const COLOR = "GREY";
const SIZES = ["Small", "Medium", "Large", "X-Large"];
const BILLING_INFO = {
        "first name": "First",
        "last name": "Last",
        "email": "email@test.com",
        "tel": "123456789",
        "address": "address test",
        "city": "City",
        "postal code": "00000",
        "phone": "123456789"
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const addToCart = async () =>
{
    for (let i = 0; i < SIZES.length; i++)
    {
        let cartCount = document.getElementsByClassName("cart-count")[0].textContent;
        for (let j = 0; j < document.getElementById("product-select").length; j++)
        {
            if (document.getElementById("product-select").options[j].textContent == SIZES[i])
            {
                document.getElementsByClassName("add cart-btn clearfix")[0].disabled = false;
                console.log("Found size " + SIZES[i]);
                document.getElementById("product-select").selectedIndex = j;
                document.getElementsByClassName("add cart-btn clearfix")[0].click();
                while (document.getElementsByClassName("cart-count")[0].textContent == cartCount)
                {
                    await delay(50);
                }
                break;
            }
        }
        
    }
    chrome.runtime.sendMessage({redirect: cart_url});
}


if (url == main_url)
{
    //chrome.runtime.sendMessage({redirect: url + "collections/" + category});
    // fetch("https://localhost:44343/api/tasks/getcurrenttask").then(r => r.json()).then(r => console.log(r));
    fetch("https://localhost:44343/api/tasks/test")//, {mode: 'no-cors'})
    .then(r => r.json())
    .then(r => console.log(r));
    const TIME_SERVER_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=SxiYpwxzxdmqzwTHoxfoXGZwOvhLfnIYPmnMBGWiqdQlvE4aKHXZ_n7chjoFITw7uIlzs1hsnBMBOg34RHnSH3SqoEKW_wJ-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";

<<<<<<< HEAD
		// TESTING SERVER TIME
	fetch(TIME_SERVER_URL).then(timer => timer.json())
    .then(timer => {
				console.log(timer);
			});
=======
        // TESTING SERVER TIME
    fetch(TIME_SERVER_URL).then(timer => timer.json()).then(timer => {
                console.log(timer);
            });
>>>>>>> 58f12c0c87624210853a3e8494cdd57ff0db6dda
    // $.ajax({
    //     url: "https://localhost:44343/api/tasks/getcurrenttask",
    //     type: "GET",
    //     success: function(response) {
    //         console.log(response);
    //     }

    //   });
    // var xmlhttp = new XMLHttpRequest();
    // var url2 = "https://localhost:44343/api/tasks/getcurrenttask";

    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         var myArr = JSON.parse(this.responseText);
    //         console.log(myArr);
    //     }
    // };
    // xmlhttp.open("GET", url2, true);
    // xmlhttp.send();
}

else if (url == category_url) // in category
{
    let scroll = setInterval(function()
    {
            document.documentElement.scrollTop = document.documentElement.scrollHeight; // scroll
            lookForItem(scroll);
    }
    , 50);
}

else if (url.includes("https://shop.palaceskateboards.com/products/")) // in product
{
    addToCart();
}

else if (url == cart_url)
{
    document.getElementById("terms-checkbox").checked = true;
    document.getElementById("checkout").click();
}

else if (url.includes("checkouts"))
{
    let inputs = document.querySelectorAll('input:not([type=submit]):not([type=hidden])');
    console.log(inputs);
    if (inputs.length > 10) {
        inputs.forEach(function(element) {
            let prev_sibling = element.previousElementSibling;
            if (prev_sibling != null) 
            {
                let label_text = prev_sibling.innerHTML.toLowerCase();
                console.log(label_text);
                let value = BILLING_INFO[label_text];
                console.log(value);
                if (value != null)
                    setInput(element, value);   
            }
        });
    }
    else {
        document.getElementsByClassName("step__footer__continue-btn")[0].click();
        
    }
}

function lookForItem(scroll)
{
    let products = document.getElementsByClassName("product-grid-item clearfix");
    for (let i = 0; i < products.length; i++)
    {
        if (products[i].innerHTML.includes(ITEM_NAME) && products[i].innerHTML.includes(COLOR))
        {
            clearInterval(scroll);
            chrome.runtime.sendMessage({redirect: products[i].children[0].href});
        }
    }

}

function wait(cartCount)
{
    let wait = setInterval(function()
    {
        console.log(cartCount + " vs " + document.getElementsByClassName("cart-count")[0].textContent);
         if (cartCount != document.getElementsByClassName("cart-count")[0].textContent)
         {
            clearInterval(wait);
            
         }
    }, 50);
}

function setInput(element, value) {
    element.focus();
    element.value = value;
    element.blur();    
}
