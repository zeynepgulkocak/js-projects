let products = document.querySelector(".products");
let subTotal = document.querySelector("#cart-subtotal");
let tax = document.querySelector("#cart-tax");
let ship = document.querySelector("#cart-shipping");
let total = document.querySelector("#cart-total");

//form elements
let form = document.getElementById("customer-form");
let submit = document.querySelector("button[type=submit]");
let productName = document.getElementById("name");
let price = document.getElementById("price");
let productQuantity = document.getElementById("quantity");

// ------------------------ FUNCTIONS -------------------------

// ----------------- create product function -------------------

const createProduct = (pName, price, quantity) => {
  let total = (Number(price) * quantity).toFixed(2);
  return `<div class="product">
    <img src="img/new-product.png" alt="">
    <div class="product-info">
        <h2>${pName}</h2>
        <div class="product-price">
            <p><strong>${price}</strong> <span class="line-through">${price*(130/100)}</span></p>
        </div>
        <div class="quantity-controller">
            <button>
                <i class="fas fa-minus"></i>
            </button>
            <p id="product-quantity">${quantity}</p> 
            <button>
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <div class="product-removal">
            <button class="remove-product">
                Remove
            </button>
        </div>
        <div class="product-line-price">${total}</div>

    </div>
</div>`;
};

// ----------------- buy detail function -----------------------

let buyDetail = () => {
  let productTotal = document.querySelectorAll(".product-line-price");
  let sum = 0;
  productTotal.forEach((item) => 
  {(sum += Number(item.innerText))
console.log(item.innerText);

});

  subTotal.innerText = sum.toFixed(2);
  tax.innerText = (sum * 0.18).toFixed(2);
  ship.innerText = subTotal.innerText == 0 ? 0 : "15.00";
  total.innerText = (
    sum +
    Number(tax.innerText) +
    Number(ship.innerText)
  ).toFixed(2);
};
buyDetail();

// ------------ products increase-decrease-remove funtions ------------

let productsFunc = () => {
  let allProducts = document.querySelectorAll(".product");
  console.log(allProducts);
  allProducts.forEach((item) => {
    item.addEventListener("click", (e) => {
      let productTotal = item.querySelector(".product-line-price");
      let productPrice = item.querySelector("strong").innerText;
      let quantity = item.querySelector("#product-quantity");
      console.log(e.target.classList);
      switch (e.target.className) {
        case "fas fa-minus":
          quantity.innerText == 1 ? item.remove() : quantity.innerText--;
          break;
        case "fas fa-plus":
          quantity.innerText++;
          break;
        case "remove-product":
          item.remove();
          break;
        default:
          break;
      }
      productTotal.innerText = (productPrice * quantity.innerText).toFixed(2);
      buyDetail();
    });
  });
};
productsFunc();
// ----------------- form submit event -------------------------------
submit.addEventListener("click", () => {
  if (
    productName.value != "" &&
    price.value != "" &&
    productQuantity.value != ""
  ) {
    products.innerHTML += createProduct(
      productName.value,
      price.value,
      productQuantity.value
    );
    form.reset();
    buyDetail();
    productsFunc();
  } else alert("Please enter a product!");
});

