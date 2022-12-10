"use strict";
const products = JSON.parse(localStorage.getItem("products") || "[]")

class Product{
  id;
  productName;
  price;
  quantity;
  constructor(id,productName,price,quantity){
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }

  getQuantity(){
    return this.quantity;
  }

  setQuantity(quantity){
    this.quantity = quantity;
  }
}

class Cart{
  cartLineArray;
  constructor(cartLineArray){
    this.cartLineArray = cartLineArray;
  }
  getShipping(){
    return this.cartLineArray.length * 10;
  }

  getSubTotal(){
    let subTotal = 0;
    this.cartLineArray.forEach((p) => {
      subTotal += p.product.price * p.product.quantity
    })
    return subTotal;
  }

  getTotal(){ return (this.getSubTotal() + this.getShipping())}
}

class CartLine{
  product;

  constructor(product){
    this.product = product;
  }

  decQuantity(){
    if(this.product.quantity > 1){
      this.product.quantity--;
      updateLocalStorage(this.product);
      renderHTML();
    }
  }

  incQuantity(){
    this.product.quantity++;
    updateLocalStorage(this.product);
    renderHTML();
  }

  remove(){
    removeFromLocalStorage(this.product);
    renderHTML();
  }

  calculateProductTotal = () =>{
    total = this.product.quantity * this.product.price;
  }
}

const createCart = () => {
  const cartLineArray = []
  products.forEach((p) => {
    let productObj = new Product(p.id, p.productName, p.price, p.quantity);
    let cartLine = new CartLine(productObj)
    cartLineArray.push(cartLine);
  })
  let cart = new Cart(cartLineArray);
  return cart
}

const updateLocalStorage = (product) => {
  const productIndex = findProductIndex(product);
  products[productIndex] = product
  localStorage.setItem("products", JSON.stringify(products));
}

const removeFromLocalStorage = (product) => {
  const productIndex = findProductIndex(product);
  products.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(products));
}

const findProductIndex = (product) => {
  return products.findIndex((x) => x.id === product.id);
}

const renderHTML = () => {
  let cart = createCart();
  document.getElementById("products").innerHTML = "";
  cart.cartLineArray.forEach((p, i) => {
    document.getElementById("products").innerHTML += getProductHTMLRow(p, i);
  });
  document.getElementById("shipping").innerHTML = `$${cart.getShipping()}`;
  document.getElementById("sub-total").innerHTML = `$${cart.getSubTotal()}`;
  document.getElementById("total").innerHTML = `$${cart.getTotal()}`;

};

const getProductHTMLRow = (p) => {
  return `
  <tr>
    <td class="align-middle"><img src="img/${
      p.product.productName
    }.jpg" alt="" style="width: 50px;"> ${p.product.productName}</td>
    <td class="align-middle">$${p.product.price}</td>
    <td class="align-middle">
        <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
                <button type="button" class="btn btn-sm btn-primary btn-minus" onclick='new CartLine(${JSON.stringify(p.product)}).decQuantity()'>
                <i class="fa fa-minus"></i>
                </button>
            </div>
            <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="${
              p.product.quantity
            }">
            <div class="input-group-btn">
                <button type="button" class="btn btn-sm btn-primary btn-plus" onclick='new CartLine(${JSON.stringify(p.product)}).incQuantity()'>
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle">$${p.product.price * p.product.quantity}</td>
    <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick='new CartLine(${JSON.stringify(p.product)}).remove()'><i class="fa fa-times"></i></button></td>
</tr>`;
};


renderHTML();