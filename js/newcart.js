  
  class product {
    productName;
    quantity;
    price;
    index;
    constructor(productName,quantity,price,index){
    productName=this.productName;
    quantity = this.quantity;
    price = this.price;
    index= this.index;
}
  
  }
  
  class cartline{
    product
    remove; 
    decQuantity;
    incQuantity;
    constructor(product){
        product = this.product
    }
    

    decQuantity = (i) => {
        if (products[i].quantity > 1) products[i].quantity--;
        renderHTML();
    };
    incQuantity = (i) => {
        products[i].quantity++;
        renderHTML();
    };
    remove = (i) => {
        products.splice(i, 1);
        renderHTML();
      };

 
  
  }

  class cart{
    cartlines
    getShipping;
    getSubTotal;
    getTotal;
    constructor(cartlines){
        cartlines=this.cartlines
    }
    getShipping = () => {
        return this.cartlines.length * 10;
      };
    getSubTotal = () => {
        return this.cartlines.map((p) => p.price * p.quantity).reduce((a, e) => (a += e));
      };
    getTotal = () => getShipping() + getSubTotal();

  }


const createCart = () => {
    const cartlines = []
    products.forEach((p) => {
      let new_product = new product(p.productName,p.quantity,p.price,p.index);
      let new_cartLine = new cartline(new_product)
      cartlines.push(new_cartLine);
    })
    let cart_obj = new cart(cartlines);
    return cart_obj
  }

  const renderHTML = () => {
    
    document.getElementById("products").innerHTML = "";
    let new_cart = createCart()
    new_cart.cartlines.forEach((p, i) => {
      document.getElementById("products").innerHTML += getProductHTMLRow(p, i);
    });
    document.getElementById("shipping").innerHTML = `$${getShipping()}`;
    document.getElementById("sub-total").innerHTML = `$${getSubTotal()}`;
    document.getElementById("total").innerHTML = `$${getTotal()}`;
  };
  
  const getProductHTMLRow = (cartline, i) => {
    return `
    <tr>
      <td class="align-middle"><img src="img/${
        cartline.productName
      }.jpg" alt="" style="width: 50px;"> ${cartline.productName}</td>
      <td class="align-middle">$${p.price}</td>
      <td class="align-middle">
          <div class="input-group quantity mx-auto" style="width: 100px;">
              <div class="input-group-btn">
                  <button type="button" class="decBtn btn btn-sm btn-primary btn-minus" onclick="decQuantity(${i})">
                  <i class="fa fa-minus"></i>
                  </button>
              </div>
              <input type="text" class="quantityVal form-control form-control-sm bg-secondary border-0 text-center" value="${
                cartline.quantity
              }">
              <div class="input-group-btn">
                  <button type="button" class="incBtn btn btn-sm btn-primary btn-plus" onclick="incQuantity(${i})">
                      <i class="fa fa-plus"></i>
                  </button>
              </div>
          </div>
      </td>
      <td class="align-middle">$${cartline.price * cartline.quantity}</td>
      <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick="remove(${i})"><i class="fa fa-times"></i></button></td>
  </tr>`;
  };
  
const products = JSON.parse(localStorage.getItem("products") || "[]");

  renderHTML();