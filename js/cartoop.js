class Order{
    orderDetails;
    user;
    paymentMethod;
    constructor(){
        this.orderDetails=[];
    }
    get total(){
       return this.SubTotal+this.Shipping
        
    }
    get SubTotal(){
       return this.orderDetails.map(x=>x.total).reduce((a,v)=>(a+=v),0);
    }
    get Shipping(){
        return (this.orderDetails.map(x=>x.quantity).reduce((a,v)=>(a+=v),0)*2);
    }

    addProductById(id){
        let orderDetail = this.orderDetails.find((x) => x.product.id === id);
        if (orderDetail){
            orderDetail.increaseQuantity(1);
            ;
        }
        return orderDetail;


    }
    addProduct(product){
        let orderDetail = this.addProductById(product.id)
        if (!orderDetail){
            const ids = this.orderDetails.map((x)=>x.id);
            const maxId = Math.max(...(ids.length > 0 ? ids:[0]));
            orderDetail= new OrderDetail(product);
            orderDetail.id = maxId + 1
            this.orderDetails.push(orderDetail);}
    }
    deleteProduct(id){
        let orderDetail = this.orderDetails.find(x=>x.product.id==id);
        if(orderDetail){
            if(orderDetail.quantity==1) this.removeDetail(orderDetail.id);
            else{
                orderDetail.decreaseQuantity(1);
            }
        }
    }
    removeDetail(id){
        this.orderDetails.findIndex((x)=>x.product.id==id);
        this.orderDetails.splice(index,1);
    }
    render(){this.renderTotal();
        this.renderTable();
    }
    renderTotal(){
        document.getElementById('total').innerHTML = this.total;
        document.getElementById('sub-total').innerHTML = this.SubTotal;
        document.getElementById('shipping').innerHTML = this.Shipping;
    }
    renderTable(){
        document.getElementById('products').innerHTML="";
        this.orderDetails.forEach(x=>{
            document.getElementById('products').innerHTML+= x.getHtmlRow();
        })
    }
    saveChanges(){
        const product = [];
        this.orderDetails.forEach((d) => {
            for (let i=0; i<d; i++) {
                product.push(d.product);
            }
        });
        localStorage.setItem('products',JSON.stringify(product));
    }
}

class OrderDetail{
    id;
    product;
    quantity;
    price;
    #total;
    get total(){
        return this.price* this.quantity
    }
    constructor(product){
        this.product=OrderDetail.product;
        this.quantity = OrderDetail.quantity;
        this.price = OrderDetail.price
    }
    increaseQuantity(q){
        this.quantity += q;

    }
    decreaseQuantity(q){
        if(this.quantity>q)
        this.quantity -=q;
    }
    getHtmlRow(){
        return  `<tr>
        <td class="align-middle">
        <img src="${this.product.image}" alt="" style="width: 50px;"> ${this.product.name}</td>
        <td class="align-middle">$${this.price}</td>
        <td class="align-middle">
            <div class="input-group quantity mx-auto" style="width: 100px;">
                <div class="input-group-btn">
                    <button type="button" class="btn btn-sm btn-primary btn-minus" onclick="cartObject.removeDetail(${this.id});cartObject.saveChanges();cartObject.render();">
                    <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="${
                  this.quantity
                }">
                <div class="input-group-btn">
                    <button type="button" class="btn btn-sm btn-primary btn-plus" onclick="cartObject.addProductById(${this.product.id});cartObject.saveChanges();cartObject.render();">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </td>
        <td class="align-middle">$${this.total}</td>
        <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick="cartObject.deleteProduct(${this.product.id});cartObject.render();"><i class="fa fa-times"></i></button></td>
    </tr>`
    }

}
class product{
    id;
    name;
    image;
    price;
    constructor(product){
        this.id=product.id;
        this.name=product.name;
        this.image=product.image;
        this.price=product.price;

    }

}

class user{
    firstName;
    lastName;
    address;
 
    constructor(user){
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.address=user.address;

    }
}
let order = new Order();
const products = JSON.parse(localStorage.getItem("products") ?? "[]");
products.forEach((x) => {
  order.addProduct(new product(x));
});
debugger
order.render();