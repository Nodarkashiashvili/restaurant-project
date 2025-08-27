
let cartmain = document.querySelector('.cartmain')
let plus01 = document.querySelector('.plus01')
let minus01 = document.querySelector('.minus01')
let logout = document.querySelector('.logout')


let token = localStorage.getItem('token')
if(token==undefined  || token == null){

window.location.href='login.html'
}


fetch(`https://restaurant.stepprojects.ge/api/Baskets/GetAll`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        cartshtml(resp)

    })

function cartshtml(arr) {
    let i = 0;
    arr.forEach(el => {
        console.log(el);
        cartmain.innerHTML += `
        <div class="prodcard">
            <div class="detele">
            <button class="delete1" onclick='deleteProduct(${el.product.id})'  >x</button>
            
            </div>
            <div class="divimgcart">
                <img src="${el.product.image}" alt="">
            </div>
            <div class="dekription">
                <h5>${el.product.name}</h5>
                <h5>Quantity: ${el.quantity}</h5>
                 <div class="price">
                <h5> price: ${el.price}</h5>
                
            </div>


            </div>
            
            <div class="plusminys">
                <button class="plus01" onclick='up(${el.price},${el.quantity},${el.product.id},${i})'>+</button>
                <button class="minus01" onclick='down(${el.price},${el.quantity},${el.product.id})'>-</button>
            </div>
            <div class="divsum">

            </div>
            <div class="getorders">
                <h5>total: <span id="totalprice_${i}">${el.price}</span></h5>
                <div class="linerskss"></div>
                <button class="butgetorders">Get Order</button>
            
                
            </div>



        </div>

    `
    i++;

    });


}


function up (price, quantity, productId,i) {
    let totalPriceElement = document.getElementById("totalprice_"+i);
let currentPrice = parseFloat(totalPriceElement.innerHTML);
console.log(currentPrice);


    fetch (`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
                "quantity": quantity+1,
                "price": price,
                "productId": productId,
            
          
        })
    }).then(resp => resp.text())
        .then(resp => {
            let updatedTotalPrice = currentPrice + price;
            console.log(updatedTotalPrice);
            totalPriceElement.innerHTML = updatedTotalPrice;
            console.log(resp)
            //window.location.reload()
        })

    

}
 
function down (price, quantity, productId) {
    if(quantity >2){
        console.log(price, quantity, productId)
    fetch (`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
            
                
                "quantity": quantity-1,
                "price": price,
                "productId": productId,
            
          
        })
    }).then(resp => resp.text())
        .then(resp => {
            console.log(resp)
            window.location.reload()
        })

    
    }
    else{
        alert("წაშალე პროდუქტი")
    }

}
 


function deleteProduct(productId) {

    fetch (`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`, {
        method: 'DELETE',
     
    }).then(resp => resp.text())
        .then(resp => {
            console.log(resp)
            window.location.reload()
        })

    

}

logout.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href='restorant.html'
})





///////price
// :
// 10
// product
// :
// categoryId
// :
// 1
// id
// :
// 1
// image
// :
// "https://course-jsbasic.javascript.ru/assets/products/laab_kai_chicken_salad.png"
// name
// :
// "Laab kai chicken salad"
// nuts
// :
// true
// price
// :
// 10
// spiciness
// :
// 2
// vegeterian
// :
// false