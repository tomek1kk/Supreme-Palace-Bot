const MAIN_URL = "https://www.supremenewyork.com/shop/all";
const CHECKOUT_URL = "https://www.supremenewyork.com/checkout";
const TIME_SERVER_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=SxiYpwxzxdmqzwTHoxfoXGZwOvhLfnIYPmnMBGWiqdQlvE4aKHXZ_n7chjoFITw7uIlzs1hsnBMBOg34RHnSH3SqoEKW_wJ-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk";
var url = window.location.href;

if (url.includes("chrome-extension"))
{
    chrome.storage.sync.get(['timer', 'serverTime', 'hour', 'minute', 'second', 'cardNumber', 'cvvNumber',
                        'month', 'year', 'checkoutDelay', 'refreshInterval', 'empty', 'items', 'cardType', 'startuj', 
                        'fillAddress', 'fullName', 'email', 'tel', 'address', 'address2', 'city', 'postcode'], function(result) 
    {
        if (result.checkoutDelay != null)
            document.getElementsByClassName("checkoutDelay")[0].value = result.checkoutDelay;
        if (result.refreshInterval != null)
            document.getElementsByClassName("refreshInterval")[0].value = result.refreshInterval;
        document.getElementsByClassName("emptyBasket")[0].checked = result.empty;
        document.getElementsByClassName("timer")[0].checked = result.timer;
        if (result.timer == true)
        {
            document.getElementById("serverTime").checked = result.serverTime;
            document.getElementById("hour").value = result.hour;
            document.getElementById("minute").value = result.minute;
            document.getElementById("second").value = result.second;
            document.getElementById("serverTime").type = "checkbox";
            document.getElementById("hour").type = "text";
            document.getElementById("minute").type = "text";
            document.getElementById("second").type = "text";
            document.getElementsByClassName("timeLabel")[0].style.display = 'block';
            document.getElementsByClassName("timeLabel")[1].style.display = 'block';
            document.getElementsByClassName("timeLabel")[2].style.display = 'block';
            document.getElementsByClassName("timeLabel")[3].style.display = 'block';
        }

        document.getElementById("fillAddress").checked = result.fillAddress;
        if (result.fillAddress == true)
        {
            document.getElementById("fullName").value = result.fullName;
            document.getElementById("email").value = result.email;
            document.getElementById("tel").value = result.tel;
            document.getElementById("address").value = result.address;
            document.getElementById("address2").value = result.address2;
            document.getElementById("city").value = result.city;
            document.getElementById("postcode").value = result.postcode;
            document.getElementById("fullName").type = "text";
            document.getElementById("email").type = "text";
            document.getElementById("tel").type = "text";
            document.getElementById("address").type = "text";
            document.getElementById("address2").type = "text";
            document.getElementById("city").type = "text";
            document.getElementById("postcode").type = "text";
            document.getElementsByClassName("addressLabel")[0].style.display = 'block';
            document.getElementsByClassName("addressLabel")[1].style.display = 'block';
            document.getElementsByClassName("addressLabel")[2].style.display = 'block';
            document.getElementsByClassName("addressLabel")[3].style.display = 'block';
            document.getElementsByClassName("addressLabel")[4].style.display = 'block';
            document.getElementsByClassName("addressLabel")[5].style.display = 'block';
            document.getElementsByClassName("addressLabel")[6].style.display = 'block';
        }

        if (result.cardNumber != null)
            document.getElementsByClassName("creditNumber")[0].value = result.cardNumber;
        if (result.cvvNumber != null)
            document.getElementsByClassName("cvvNumber")[0].value = result.cvvNumber;
        if (result.month != null)
            document.getElementsByClassName("month")[0].value = result.month;
        if (result.year != null)
        {
            if (result.year.length == 2)
            result.year = (parseInt(result.year) + 2000).toString();
            document.getElementsByClassName("year")[0].value = result.year;
        }
        document.getElementsByClassName("cardType")[0].selectedIndex = result.cardType;

        if (result.items != null)
        {
            for (var i = 0; i < result.items[0].length - 1; i++)
                document.getElementsByClassName("addField")[0].click();
            

            for (var i = 0; i < document.getElementsByClassName("itemName").length; i++)
            {
                document.getElementsByClassName("itemName")[i].value = result.items[0][i];
                document.getElementsByClassName("category")[i].value = result.items[1][i];
                document.getElementsByClassName("size")[i].value = result.items[2][i];
                document.getElementsByClassName("color")[i].value = result.items[3][i];
                document.getElementsByClassName("anyColor")[i].checked = result.items[4][i];
            }
        }
    });
}
else if (url.includes("supremenewyork.com"))
{
        if (url == MAIN_URL) // main page
        {
            chrome.storage.sync.get(['timer', 'serverTime', 'hour', 'minute', 'second', 'empty', 'items', 'startuj'], function(result) {
            if (result.startuj == "1")
            {
                chrome.storage.sync.set({startuj: "0"});
                if (document.getElementById("cart").className == "hidden" || result.empty == false)
                {
                    if (document.getElementById("cart").className == "hidden")
                        sessionStorage.setItem('beforeDrop', '0');
                    else
                        sessionStorage.setItem('beforeDrop', document.getElementById("items-count").textContent[0]);
                    sessionStorage.setItem('itemsAdded', '0');
                    sessionStorage.setItem('itemsUnadded', '0');

                    if (result.timer == true)
                    {
                        if (result.serverTime == true)
                        {
                            fetch(TIME_SERVER_URL).then(timer => timer.json())
                            .then(timer => { 
                                    var totalTime = ((result.hour - timer.hours - 2) * 3600000) + ((result.minute - timer.minutes) * 60000) + ((result.second - timer.seconds) * 1000);
                                    console.log("Program will start in " + totalTime/1000 + " seconds");
                                    setTimeout(function() { pickCategory(result.items[1][0]); }, totalTime);
                            });
                        }
                        else // LOCAL TIME
                        {
                            var today = new Date();
                            var totalTime = ((result.hour - today.getHours()) * 3600000) + ((result.minute - today.getMinutes()) * 60000) + ((result.second - today.getSeconds()) * 1000);
                            console.log("Program will start in " + totalTime/1000 + " seconds");
                            setTimeout(function() { pickCategory(result.items[1][0]); }, totalTime);
                        }
                    }
                    else
                    {
                        pickCategory(result.items[1][0]);
                    }
                }
            }
            });
        }
        else if (url.length > MAIN_URL.length + 15) // item selected
        {
            chrome.storage.sync.get(['items'], function(result) {
            var x = parseInt(sessionStorage.getItem('itemsAdded')) + 1;
            sessionStorage.setItem('itemsAdded', x.toString());

            if (document.getElementById("add-remove-buttons").children[0].value != "add to basket")
            {
                sessionStorage.setItem('itemsUnadded', (parseInt(sessionStorage.getItem('itemsUnadded')) + 1).toString());
                if (x == result.items[0].length)
                    checkout();
                else
                    pickCategory(result.items[1][x]);
            }
            else
            {
                pickSize(result.items[2][x - 1]);
                document.getElementsByName("commit")[0].click();

                var p = setInterval(
                    function() 
                    { 
                        if (document.getElementById("cart").className != "hidden" &&
                            parseInt(document.getElementById("items-count").textContent[0]) ==
                            x + parseInt(sessionStorage.getItem('beforeDrop')) - parseInt(sessionStorage.getItem('itemsUnadded')))
                        {
                            clearInterval(p);
                            if (x == result.items[0].length)
                                checkout();
                            else
                                pickCategory(result.items[1][x]);
                        }
                    }, 50);
            }
        });
        }
        else if (url == CHECKOUT_URL) // in checkout
        {
            chrome.storage.sync.get(['cardNumber', 'cvvNumber', 'month', 'year', 'checkoutDelay', 'cardType', 'fillAddress',
                                    'fullName', 'email', 'tel', 'address', 'address2', 'city', 'postcode'], function(result) {

            if (result.fillAddress == true)
            {
                var BILLING_INFO = {"full name": result.fullName, "email": result.email, "tel": result.tel,
                                    "address": result.address, "address 2": result.address2, "postcode": result.postcode, "city": result.city,
                                    "number": result.cardNumber, "cvv": result.cvvNumber};
            }
            else
                var BILLING_INFO = {"number": result.cardNumber, "cvv": result.cvvNumber};
            //console.log(BILLING_INFO);
            autoFill(BILLING_INFO, result.month, result.year, result.cardType, result.cvvNumber);
            setTimeout(function() { if (document.getElementsByName("commit")[0])
                                    document.getElementsByName("commit")[0].click(); }, result.checkoutDelay);
        });
        }
        chrome.storage.sync.get(['items', 'refreshInterval'], function(result) 
        {
            if (parseInt(sessionStorage.getItem('itemsAdded')) < result.items[0].length &&
                    url == MAIN_URL + "/" + result.items[1][sessionStorage.getItem('itemsAdded')]) // category selected
            {
                pickItem(result.items, result.items[0][sessionStorage.getItem('itemsAdded')], result.items[3][sessionStorage.getItem('itemsAdded')], 
                        result.items[4][sessionStorage.getItem('itemsAdded')], result.refreshInterval);
            }
        });
}

function pickItem(items, name, color, anycolor, refreshInterval)
{
    var found = false;
    var products = document.getElementsByClassName('name-link');
    if (anycolor == false)
    {
        for (var i = 0; i < products.length - 1; i++)
        {
            for (var j = 0; j < name.length; j++)
            {
                for (var k = 0; k < color.length; k++)
                {
                    if ((products[i].innerHTML.toLowerCase()).includes(name[j]) && (products[i+1].innerHTML.toLowerCase()).includes(color[k]))
                    {
                        found = true;
                        chrome.runtime.sendMessage({redirect: products[i].href});
                        break;
                    }
                }
            }
        }
    }
    else
    {
        for (var i = 0; i < products.length - 1; i++)
        {
            for (var j = 0; j < name.length; j++)
            {
                if ((products[i].innerHTML.toLowerCase()).includes(name[j]))
                {
                    found = true;
                    chrome.runtime.sendMessage({redirect: products[i].href});
                    break;
                }
            }
        }
    }
    if (found == false && sessionStorage.getItem('itemsAdded') != '0')
    {
        var x = parseInt(sessionStorage.getItem('itemsAdded')) + 1;
        sessionStorage.setItem('itemsAdded', x.toString());
        var y = parseInt(sessionStorage.getItem('itemsUnadded')) + 1;
        sessionStorage.setItem('itemsUnadded', y.toString());
        if (x == items[0].length)
            checkout();
        else
            pickCategory(items[1][x]);
    }
    else if (found == false)
        setTimeout(function() {location.reload();}, refreshInterval);
}

function autoFill(info, month, year, cardType, cvv)
{
    var inputs = document.querySelectorAll('input:not([type=submit]):not([type=hidden])');
    inputs.forEach(function(element) 
    {
		console.log(element);
        console.log("autofiluje!");
        var prev_sibling = element.previousElementSibling;
        if (prev_sibling != null) 
        {
            var label_text = prev_sibling.innerHTML.toLowerCase();
            var value = info[label_text];
			console.log("label_text: " + label_text);
			console.log("info[label_text]: " + info[label_text]);
			
            if (value != null)
                setInput(element, value);   
        }
    });
    if (cardType == 1) // MASTERCARD
        document.getElementById("credit_card_type").selectedIndex = 2;
    if (document.getElementById("order_billing_country").selectedIndex != 25)
        document.getElementById("order_billing_country").selectedIndex = 25;
    document.getElementById("credit_card_month").selectedIndex = month - 1;
    document.getElementById("credit_card_year").selectedIndex = year - 2019;
    document.getElementById("order_terms").checked = true;
    document.getElementById("order_terms").parentElement.classList.add('checked');
	document.getElementById("vval").value = cvv;
}

function pickCategory(cat)
{
    chrome.runtime.sendMessage({redirect: MAIN_URL + "/" + cat});
}

function setInput(element, value) 
{
    element.focus();
    element.value = value;
    element.blur();
}

function checkout()
{
     chrome.runtime.sendMessage({redirect: CHECKOUT_URL});
}

function pickSize(size)
{
    var selectbox = document.getElementById("size");
    for (var i = 0; i < selectbox.length; i++)
    {
        if (selectbox.options[i].label.toLowerCase() == size)
        {
            selectbox.selectedIndex = i;
            break;
        }
    }
}


