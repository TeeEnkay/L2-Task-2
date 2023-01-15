$(function () {
    loadCart();

    if (document.getElementById("catalogue") !== null || document.getElementById("cart") !== null) {
        initializeFoundationAndPowder();
    }

    // Since both the Catalogue and Cart pages use mostly the same functions, we differentiate certain logics by getting the ID of the Cart body

    // If the user is in the Cart page, make the products available for use
    if (document.getElementById("cart") !== null) {
        let foundationPrice = Number(
            document.getElementById("totalFoundationCost").textContent
        );
        let powderPrice = Number(
            document.getElementById("totalPowderCost").textContent
        );
     console.log(foundationPrice, powderPrice);   
    }
    

    // jQuery event for clicking on the discount button
    $("#discountButton").click(function (e) {
        // Boolean to determine if the discount input has been completed
        let completed = true;
        // If the discount input is empty, set 'completed' to false
        if (e.target.textContent === "") {
            completed = false;
        }

        // If the discount input is not empty, get the code in the input and change the total price accordingly, if possible
        if (completed) {
            // Get the discount code entered by the user
            let code = document.getElementById("inputDiscount").value;
            let powderPrice = 0;
            let total = 0;

            if (isDiscountCodeValid(code) === "FIRSTBUY01") {
                
                // This code reduces the total price of the foundations by 20
                cart.forEach((item) => {
                    total += Number(item.price) + (total * 0.15) - 20 //adding vat and substracting R50 discount
                    console.log(total); 
                sessionStorage.setItem("cart", JSON.stringify(cart));
                });
                
                alert("Discount applied you new total is " + total.toFixed(2) );
            } else if (isDiscountCodeValid(code) === "POWDER01") {
                // This code reduces the total price of powders by 10
                document.getElementById("totalPowderCost").textContent =
                    powderPrice - 10;
                    alert("Discount applied thank you");
            } else if (isDiscountCodeValid(code) === "CART10") {
                // This code reduces the total products by 10
                document.getElementById("totalFoundationCost").textContent = fruitPrice - 10;
                document.getElementById("totalPowderCost").textContent =
                    foundationPrice - 10;
                    alert("Discount applied thank you!");
            } else {
                alert("Invalid discount code entered");
            }
        } else {
            alert("No discount code entered");
        }
    });

    
});