var saveButton= document.querySelector(".save"); 
var newItemButton = document.querySelector(".addField");
var timer = document.querySelector(".timer");
var fillAddress = document.getElementById("fillAddress");
var removeLast = document.querySelector(".removeLast");
var start = document.querySelector(".start");

saveButton.addEventListener("click", function () {

    var itemNames = document.querySelectorAll('input[class="itemName"]');
    var categories = document.querySelectorAll('select[class="category"]');
    var sizes = document.querySelectorAll('input[class="size"]');
    var colors = document.querySelectorAll('input[class="color"]');
    var anyColors = document.querySelectorAll('input[class="anyColor"]');

    var timer = document.querySelector('input[class="timer"]');
    chrome.storage.sync.set({timer: timer.checked});
    if (timer.checked == true)
    {
      chrome.storage.sync.set({serverTime: document.getElementById("serverTime").checked});
      chrome.storage.sync.set({hour: document.getElementById("hour").value});
      chrome.storage.sync.set({minute: document.getElementById("minute").value});
      chrome.storage.sync.set({second: document.getElementById("second").value});
    }

    var items = [[], [], [], [], []];

    for (var i = 0; i < itemNames.length; i++)
    {
      items[0][i] = itemNames[i].value.toLowerCase().trim();
      items[1][i] = categories[i].children[categories[i].selectedIndex].textContent;
      var s = sizes[i].value;
      s = s.toLowerCase().trim();
      if (s == "s") s = "small";
      else if (s == "m") s = "medium";
      else if (s == "l") s = "large";
      else if (s == "xl") s = "xlarge";
      else if (s == "x-large") s = "xlarge";
      items[2][i] = s;
      items[3][i] = colors[i].value.toLowerCase().trim();
      items[4][i] = anyColors[i].checked;
    }

    for (var i = 0; i < items[0].length; i++)
    {
        items[0][i] = items[0][i].split(",");
        items[3][i] = items[3][i].split(",");
    }

    chrome.storage.sync.set({fillAddress: document.getElementById("fillAddress").checked});
    if (document.getElementById("fillAddress").checked == true)
    {
        chrome.storage.sync.set({fullName: document.getElementById("fullName").value});
        chrome.storage.sync.set({email: document.getElementById("email").value});
        chrome.storage.sync.set({tel: document.getElementById("tel").value});
        chrome.storage.sync.set({address: document.getElementById("address").value});
        chrome.storage.sync.set({address2: document.getElementById("address2").value});
        chrome.storage.sync.set({city: document.getElementById("city").value});
        chrome.storage.sync.set({postcode: document.getElementById("postcode").value});
    }

    chrome.storage.sync.set({cardType: document.querySelector('select[class="cardType"]').selectedIndex});
    chrome.storage.sync.set({cardNumber: document.querySelector('input[class="creditNumber"]').value});
    chrome.storage.sync.set({cvvNumber: document.querySelector('input[class="cvvNumber"]').value});
    chrome.storage.sync.set({month: document.querySelector('input[class="month"]').value});
    chrome.storage.sync.set({year: document.querySelector('input[class="year"]').value});
    chrome.storage.sync.set({empty: document.querySelector('input[class="emptyBasket"]').checked});
    chrome.storage.sync.set({checkoutDelay: document.querySelector('input[class="checkoutDelay"]').value});
    chrome.storage.sync.set({refreshInterval: document.querySelector('input[class="refreshInterval"]').value});

    chrome.storage.sync.set({items: items});

});

newItemButton.addEventListener("click", function()
{
  var form = document.getElementById("myForm");

  var itemNameLabel = document.createElement("label");
  itemNameLabel.textContent = "Item names: "; itemNameLabel.className = "itemNameLabel";

  var itemName = document.createElement("input");
  itemName.type = "text"; itemName.className = "itemName";

  var category = document.createElement("select");
  category.className = "category";
  var opt1 = document.createElement("option"); opt1.textContent = "jackets";
  var opt2 = document.createElement("option"); opt2.textContent = "shirts"; 
  var opt3 = document.createElement("option"); opt3.textContent = "tops_sweaters";
  var opt4 = document.createElement("option"); opt4.textContent = "sweatshirts";
  var opt5 = document.createElement("option"); opt5.textContent = "pants";
  var opt6 = document.createElement("option"); opt6.textContent = "shorts"; 
  var opt7 = document.createElement("option"); opt7.textContent = "t-shirts";
  var opt8 = document.createElement("option"); opt8.textContent = "hats";
  var opt9 = document.createElement("option"); opt9.textContent = "bags";
  var opt10 = document.createElement("option"); opt10.textContent = "accessories"; 
  var opt11 = document.createElement("option"); opt11.textContent = "skate";
  var opt12 = document.createElement("option"); opt12.textContent = "shoes";
  category.appendChild(opt1); category.appendChild(opt2); category.appendChild(opt3); category.appendChild(opt4);
  category.appendChild(opt5); category.appendChild(opt6); category.appendChild(opt7); category.appendChild(opt8);
  category.appendChild(opt9); category.appendChild(opt10); category.appendChild(opt11); category.appendChild(opt12);

  var sizeLabel = document.createElement("label");
  sizeLabel.textContent = " Size: "; sizeLabel.className = "sizeLabel";

  var size = document.createElement("input");
  size.type = "text"; size.className = "size";

  var colorLabel = document.createElement("label");
  colorLabel.textContent = "Colors: "; colorLabel.className = "colorLabel";

  var color = document.createElement("input");
  color.type = "text"; color.className = "color";

  var anyColorLabel = document.createElement("label");
  anyColorLabel.textContent = "Any color: "; anyColorLabel.className = "anyColorLabel";

  var anyColor = document.createElement("input");
  anyColor.type = "checkbox"; anyColor.className = "anyColor";

  var clear = document.createElement("div");
  clear.className = "clear";
  var br = document.createElement("br");
  br.className = "break";

  form.appendChild(itemNameLabel);
  form.appendChild(itemName);
  form.appendChild(category);
  form.appendChild(sizeLabel);
  form.appendChild(size);
  form.appendChild(colorLabel);
  form.appendChild(color);
  form.appendChild(anyColorLabel);
  form.appendChild(anyColor);
  form.appendChild(clear);
  form.appendChild(br);

});

timer.addEventListener("click", function()
{
  var time = document.querySelectorAll(".time");
  var timeLabel = document.querySelectorAll(".timeLabel");
  var serverTime = document.querySelector(".serverTime");
  if (this.checked == true)
  {
    serverTime.type = "checkbox";
    time.forEach(function(element)
    {
      element.type = "text";
    });
    timeLabel.forEach(function(element)
    {
      element.style.display = 'block';
    });
  }
  else
  {
    serverTime.type = "hidden";
    time.forEach(function(element)
    {
      element.type = "hidden";
    });
    timeLabel.forEach(function(element)
    {
      element.style.display = 'none';
    });

  }
});

fillAddress.addEventListener("click", function()
{
    var addressLabel = document.querySelectorAll(".addressLabel");
    var address = document.querySelectorAll(".address");
    if (this.checked == true)
    {
        addressLabel.forEach(function(element)
        {
            element.style.display = 'block';
        });
        address.forEach(function(element)
        {
            element.type = "text";
        });
    }
    else
    {
        addressLabel.forEach(function(element)
        {
            element.style.display = 'none';
        });
        address.forEach(function(element)
        {
            element.type = "hidden";
        });
    }
});

removeLast.addEventListener("click", function()
{
    var n = document.getElementsByClassName("itemName").length;
    if (n > 1)
    {
      console.log("usuwam przycisk!");
      var itemNameLabel = document.getElementsByClassName("itemNameLabel")[n - 1];
      itemNameLabel.parentNode.removeChild(itemNameLabel);
      var itemName = document.getElementsByClassName("itemName")[n - 1];
      itemName.parentNode.removeChild(itemName);
      var category = document.getElementsByClassName("category")[n - 1];
      category.parentNode.removeChild(category);
      var sizeLabel = document.getElementsByClassName("sizeLabel")[n - 1];
      sizeLabel.parentNode.removeChild(sizeLabel);
      var size = document.getElementsByClassName("size")[n - 1];
      size.parentNode.removeChild(size);
      var colorLabel = document.getElementsByClassName("colorLabel")[n - 1];
      colorLabel.parentNode.removeChild(colorLabel);
      var color = document.getElementsByClassName("color")[n - 1];
      color.parentNode.removeChild(color);
      var anyColorLabel = document.getElementsByClassName("anyColorLabel")[n - 1];
      anyColorLabel.parentNode.removeChild(anyColorLabel);
      var anyColor = document.getElementsByClassName("anyColor")[n - 1];
      anyColor.parentNode.removeChild(anyColor);
      var clear = document.getElementsByClassName("clear")[n - 1];
      clear.parentNode.removeChild(clear);
      var br = document.getElementsByClassName("break")[n - 2];
      br.parentNode.removeChild(br);
    }
});

start.addEventListener("click", function()
{
  chrome.storage.sync.set({startuj: "1"});
  chrome.tabs.create({ url: "https://www.supremenewyork.com/shop/all" });
});