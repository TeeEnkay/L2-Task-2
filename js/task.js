let cart = []; //Create an empty array that we will use to store all the products created.
// Booleans used to determine whether we need to build the delivery/collection form for the first time or just hide/show
let collectionCity = false;
let deliveryRadio = false;

$(document).ready(function(){
    $("#promo").click(function(){
      $("#promo").css("color", "red").slideUp(2000).slideDown(2000);
    });

   // Click on the "How would you like to be contacted? ⌄" button on the about page
   $("#contact-options").click(function (e) {
    // If the Email and Phone buttons are visible, animate them 45 pixels and 85 pixels, respectively,  up from the bottom slowly
    if (
        $("#email").css("bottom") === "0px" &&
        $("#phone").css("bottom") === "0px"
    ) {
        $("#email").animate(
            {
                bottom: "45",
            },
            "slow"
        );
        $("#phone").animate(
            {
                bottom: "85",
            },
            "slow"
        );
        // Set the z-index of the buttons so they are hidden behind the #contact-options button
        $("#email").css("z-index", -1);
        $("#phone").css("z-index", -1);
        // Slide the dropdown up to hide the whitespace
        $(".option-dropdown").slideUp(500);
    } else {
        // Slide the dropdown dow to show the buttons within
        $(".option-dropdown").slideDown(500);
        // If the Email and Phone buttons are invisible, animate them to sit at their default positions and 
        // give them a z-index of 1 so they may be clickable
        $("#email").animate(
            {
                bottom: "0",
                "z-index": 1,
            },
            "slow"
        );
        $("#phone").animate(
            {
                bottom: "0",
                "z-index": 1,
            },
            "slow"
        );
    }
});


// If the Email button is clicked, show the Email input and hide the Phone input
$("#email").click(function (e) {
    $("#phone-group").hide();
    $("#email-group").show();
});

// If the Phone button is clicked, show the Phone input and hide the Email input
$("#phone").click(function (e) {
    $("#email-group").hide();
    $("#phone-group").show();
});

// jQuery event listener for clicking on an element with type radio
$("#collectionRadio").click(function(){
alert("No extra charges on collection");
});

//for delivery radio button
$("#deliveryRadio").click(function(){
 $("#delivery").show();
});

$("#del").click(function(){
    cart = JSON.parse(sessionStorage.getItem("cart"));
    let total = 0;
    cart.forEach((item) => {
        total = Number(item.price) + (total * 0.15) + 50; //adding delivery fee
        // Re-set the cart array to the session storage
    sessionStorage.setItem("cart", JSON.stringify(cart));
alert("Your total on delivery is R" + total);

});
});

$("#checkoutButton").click(function(){
        alert(
            "Your order was completed. Here is your reference number: " +
            generateReference()
        )
});

  });
// Logic used for both the Catalogue and Cart Pages

function loadCart() {
    // Get the number of items in the cart element from the nav bar
    let cartCount = document.getElementById("cart-count");

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        cart = JSON.parse(sessionStorage.getItem("cart")); //Get the array objects from sessionStorage and assign it to the array 'cart'
        // Display the amount of items in the cart on the nav bar
        cartCount.textContent = cart.length;

        //total amount p display   
    let shw = document.getElementById("ttal");
    let total = 0;
    cart.forEach((item) => {
        total += Number(item.price) + (total * 0.15); //adding vat
        console.log(total); 
    sessionStorage.setItem("cart", JSON.stringify(cart));
    });
    shw.innerHTML = "R" + total.toFixed(2);
    }

     /*wrapper
     function display(){
        if (wrapper.display === "none"){
            wrapper.style.display = "block";
        } else {
            wrapper.style.display = "none"
        }
    }
    display();
    */
}

// The constructor function that will be used to create all foundation objects.
function Foundation(name, price, imageSrc) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
}
// The constructor function that will be used to create all powder objects.
function Powder(name, price, imageSrc) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
}

// Initialize the different Foundation and powder objects
// Add the foundation and powder objects to an array and load the cart or catalogue page
function initializeFoundationAndPowder() {
    let Matte = new Foundation("Matte", "120", "../images/foundation1.jpg");
    let Almay = new Foundation("Almay", "80", "../images/foundation2.png");
    let Fana = new Foundation("Fana Cosmetic", "130", "../images/foundation3.jpg");
    
    let Black = new Powder("Tomato", "125", "../images/powder1.jpg");
    let It = new Powder("It cc+", "95", "../images/powder3.jpg");
    let LauraM = new Powder("LauraM", "105", "../images/poweder2.jpeg");
    
    let arrayOfProducts = [
        Matte,
        Almay,
        Fana,
        Black,
        It,
        LauraM,
    ];

    // Since both the Catalogue and Cart pages use mostly the same functions, we differentiate which to load by getting the ID of the Cart body if it exists on the page
    if (document.getElementById("cart") === null) {
        loadFoundationAndPowderToPage(arrayOfProducts);
    } else {
        loadCartProducts(arrayOfProducts);
    }
}

// Logic used for only the Cart Page

// This function generates a random string of characters as a reference for a checkout
function generateReference() {
    let result = ""; // String to return
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to build the string out of
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        // Loop though 10 times to get a string with a length of 10 characters
        // Concatenate a character over every iteration of the loop
        result = result.concat(
            characters.charAt(Math.floor(Math.random() * charactersLength)) // Multiply by charactersLength to get a value equal to or greater than 1
        );
    }
    return result;
}

// This function checks if a given string is a valid discount code
function isDiscountCodeValid(discountCode) {
    let possibleDiscounts = ["FIRSTBUY01", "FOUNDATION01", "CART01"]; // Valid discount codes
    let valid = "";
    possibleDiscounts.forEach((code) => {
        if (code === discountCode) {
            valid = code;
        }
    });
    // Return the valid code for use
    return valid;
}

// This function loads the cart page dynamically
function loadCartProducts(arrayOfProducts) {
    
    // Initialise the total costs of foundation and powders
    let totalFoundationCost = 0;
    let totalPowderCost = 0;

    arrayOfProducts.forEach((product) => {
        // Get the cart from the session storage
        cart = JSON.parse(sessionStorage.getItem("cart"));

        // Count how many of each item is in the cart
        let productTotal = 0;
        cart.forEach((item) => {
            if (item.name === product.name) {
                productTotal = productTotal + 1;
            }
        });

        // Create a table data cell to store the image and information of the product
        let td = document.createElement("td");
        td.setAttribute("class", "border rounded item");
        // For each of the products, we create an image element that will display the product's image.
        let productImg = document.createElement("img");
        productImg.src = product.imageSrc;
        productImg.alt = product.name;
        productImg.setAttribute("class", "img-thumbnail shadow");
        productImg.style.height = "200px";
        productImg.style.width = "200px";
       
        // Calculate the totalCost of the individual product
        let totalCost = productTotal * Number(product.price);

        let productP = document.createElement("p");
        productP.innerHTML =
            product.name +
            "<br/>" +
            "Price is: R" +
            product.price +
            "<br/>" +
            "In cart: " +
            productTotal +
            "<br/>" +
            "Total cost: R" +
            totalCost;
        
        let tr;
        // Depending on the type of object (Foundation/powder) use either the foundation table row or the powder table row
        // And add its cost to the total cost of either Foundation or powder
        if (product.constructor.name === "Foundation") {
            tr = document.getElementById("foundation-row");
            totalFoundationCost += totalCost;
        } else {
            tr = document.getElementById("powder-row");
            totalPowderCost += totalCost;
        }

        td.appendChild(productImg);
        td.appendChild(document.createElement("hr"));
        td.appendChild(productP);
        tr.appendChild(td);
    });

    // Set the total cost respectively to either the Foundation & powder cart
    let foundationCart = document.getElementById("foundation-cart");
    foundationCart.innerHTML =
        "Total cost for foundations: R" +
        '<label id="totalFoundationCost" style="display: initial;">' +
        totalFoundationCost +
        "</label>";
    let powderCart = document.getElementById("powder-cart");
    powderCart.innerHTML =
        "Total cost for powders: R" +
        '<label id="totalPowderCost" style="display: initial;">' +
        totalPowderCost +
        "</label>";

}

// Logic used for only the Catalogue Page

// This function loads the catalogue page dynamically
function loadFoundationAndPowderToPage(arrayOfProducts) {
    arrayOfProducts.forEach((product) => {
        let tr;
        // Depending on the type of object (Foundation/powder) use either the foundation table row or the powder table row
        if (product.constructor.name === "Foundation") {
            tr = document.getElementById("foundation-row");
        } else {
            tr = document.getElementById("powder-row");
        }

        // Create a table data cell to store the image of the Foundation/powder
        let td = document.createElement("td");
        td.setAttribute("class", "border rounded item");
        // For each of the products, we create an image element that will display the product's image.
        let productImg = document.createElement("img");
        productImg.src = product.imageSrc;
        productImg.alt = product.name;
        productImg.setAttribute("class", "img-thumbnail shadow");
        productImg.style.height = "200px";
        productImg.style.width = "200px";

        // Add a quick add to cart button
        let productQuickAdd = document.createElement("button");
        productQuickAdd.innerHTML = "Add to Cart";
        productQuickAdd.setAttribute("class", "btn btn-dark");
        productQuickAdd.setAttribute("id", "btnCart");
        productQuickAdd.addEventListener("click", function (e) {
            addToCart(product);
        });

        // Add an event listener to display the <dialog> element on click
        productImg.addEventListener("click", function (e) {
            showDialog(product);
        });

        td.appendChild(productImg);
        td.appendChild(document.createElement("hr"));
        td.appendChild(productQuickAdd);

        tr.appendChild(td);
    });
}

function showDialog(product) {
    // Create the <dialog> to allow the user to add the product to the cart
    dialog = document.createElement("DIALOG");
    // Append the <dialog> element to the body of the page.
    document.body.appendChild(dialog);

    // Create the input and the respective label prompt the user for a tip

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "border rounded item");
    // We create an image element that will display the product's image.
    let itemImg = document.createElement("img");
    itemImg.src = product.imageSrc;
    itemImg.alt = product.name;
    itemImg.setAttribute("class", "img-thumbnail shadow");
    itemImg.style.height = "200px";
    itemImg.style.width = "200px";

    // Display the price of the product
    let itemP = document.createElement("p");
    itemP.innerHTML = product.name + "<br/>" + "Price per Item: R" + product.price;

    wrapper.appendChild(itemImg);
    wrapper.appendChild(itemP);
    
    

    // Add an add to cart button
    let addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "Add to Cart";
    addToCartButton.setAttribute("class", "btn btn-dark mr-2");
    addToCartButton.addEventListener("click", function (e) {
        addToCart(product);
        // Close the dialog and remove it from the document's body or it will persist
        e.target.parentElement.close();
        document.body.removeChild(dialog);
    });
    // Create the close button on the dialog.
    let closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class", "btn btn-primary");
    closeButton.addEventListener("click", function (e) {
        // Close the dialog and remove it from the document's body or it will persist
        e.target.parentElement.close();
        document.body.removeChild(dialog);
    });
    dialog.appendChild(wrapper);
    dialog.appendChild(document.createElement("hr"));
    dialog.appendChild(addToCartButton);
    dialog.appendChild(closeButton);

    // Finally show the dialog
    window.dialog.showModal();
}


// This function adds a single product to the cart stores in the session storage
function addToCart(product) {
    cart = JSON.parse(sessionStorage.getItem("cart")); // Get the cart array of products objects from sessionStorage and assign it to the array 'cart'
    cart.push(product); // Add the product to the array

    let cartCount = document.getElementById("cart-count");
   // let totDisplay = document.getElementById("ttal");
    cartCount.textContent = cart.length; // Display the amount of items in the cart on the nav bar

    // Calculate and display the total of all the items
    let total = 0;
    cart.forEach((item) => {
        total += Number(item.price) + (total * 0.15); //adding VAT
        // Re-set the cart array to the session storage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    });
    //totDisplay.innerHTML = total;
    alert("The total of all your items is: R" + total.toFixed(2));

   
}