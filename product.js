


let cards = document.querySelector('.cards')
let allbtn = document.querySelector('.allbtn')
let ulbtn = document.querySelector('.ulbtn')
let logout = document.querySelector('.logout')
let isAuth = localStorage.getItem('token')
let regg = document.querySelector('.regg')
let logoutsk = document.querySelector('.logoutsk')
// let showLogOut = true


if (isAuth == null || isAuth == undefined) {
    logout.classList.add('hide')



}
else {
    regg.classList.add('hide')
    logoutsk.classList.add('hide')
}











allbtn.addEventListener('click',()=>{
    fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(resp => resp.json())
    .then(productss => {
        console.log(productss)
        randerHtml(productss)



    })
})
function randerHtml(dataarr) {
    cards.innerHTML = ''
    dataarr.forEach(el => {
        cards.innerHTML += `

        <div class="card">
        <div class="images">
                <img class='restoimg' src="${el.image}" alt="">
            </div>
            <h2>${el.name}</h2>
            <h3>Spiciness: </h3>
            <div class="vegans">
                <p>nuts</p>
                <p>vegan</p>
            </div>
            <div class='prais and addcart'>
                <div class="praise">
                    <h2>${el.price}$</h2>
                </div>
                <div class="adds"><button class="btn">Add to cart</button></div>
                 </div>
                 </div>

 
`
    });

}


function GetAlcategorias(categoriesarr) {
    categoriesarr.forEach(el => {
        button11.innerHTML += `
    <button class="button1">${el.name}</button>
    `

    })
}

///////////////category///////////

fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        rendetBtns(resp)

    })




function rendetBtns(arr) {
    arr.forEach(el => {
        let btn = document.createElement('button')
        btn.innerHTML = el.name
        btn.classList.add('btncategory1')
        btn.classList.add('btncategory2')   ////gasastili
        btn.addEventListener('click',()=>{
            fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${el.id}`)
            .then(resp => resp.json())
            .then(resp =>{
                console.log(resp)
                randerHtml(resp.products)
            })

            


        })
        ulbtn.appendChild(btn)
    })
}




/////////////////////////////////////////////////////////

////////////logaout////
logout.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.reload()
})