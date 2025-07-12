
let phoneNumber = document.querySelector('.phoneNumber')
let password = document.querySelector('.password')
let btnregistr = document.querySelector('.btnregistr')



btnregistr.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(phoneNumber.value, password.value)


    fetch('https://rentcar.stepprojects.ge/api/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
            
                "phoneNumber": phoneNumber.value,
                "password": password.value,
                "email": "",
                "firstName": "",
                "lastName": "",
                "role": ""
            })
        }).then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            alert('sucess')
            localStorage.setItem('token',resp.token)
            window.location.href="./restorant.html"
        })


})
