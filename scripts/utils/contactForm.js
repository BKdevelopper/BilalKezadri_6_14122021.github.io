const form = document.forms['reserve']
let FormVerificationName = /^[a-z ,.'-]+$/i

let divprenom = document.getElementById('ErrorPrenom')
let prenom = document.getElementById('first')
let erreurfirstname = divprenom.getAttribute('data-error')

let nom = document.getElementById('last')
let divnom = document.getElementById('ErrorNom')
let erreurlastname = divnom.getAttribute('data-error')

let FormVerificationEmail = /.+@.+\..+/
let email = document.getElementById('email')
let divemail = document.getElementById('ErrorEmail')
let erreuremail = divemail.getAttribute('data-error')


function FormVerification() {
    if (!FormVerificationName.test(prenom.value.trim())) {
        divprenom.textContent += erreurfirstname
        return false
    } 
    else{
        divprenom.textContent = ''
    }

    if (!FormVerificationName.test(nom.value.trim())) {
        divnom.textContent += erreurlastname
        return false
    }
    else{
        divnom.textContent = ''
    }

    if (!FormVerificationEmail.test(email.value.trim())) {
        divemail.textContent += erreuremail
        return false
    }
    else{
        divemail.textContent = ''
    }  
    return true
}
  
form.addEventListener('submit', 
    (e) => {
        e.preventDefault()  
        if(FormVerification()){
            closeModal()
        } 
        
    })


function displayModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'block'
    document.querySelectorAll('.text-control')[0].focus()    
}

function closeModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'none'
}
const closeform = document.getElementById('contact_modal')
closeform.addEventListener('keyup', (e) => {
    if (e.key === 'Escape'){
        closeModal()
        document.querySelector('.contact_button').focus()
    }   
})
$('select').on('click' , function() {  
    $(this).parent('.selectdiv').toggleClass('open')  
})
