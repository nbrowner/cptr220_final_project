'use strict'

const form = document.querySelector('#sign-up-form')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  if (validateCustomFields()) {
    const successMessage = document.querySelector('#success-message')
    successMessage.style.display = 'block'
  } else {
    form.classList.add('was-validated')
  }
})

function validateCustomFields () {
  let isValid = true

  // Validate Name
  const nameInput = document.querySelector('#name-input')
  const nameFeedback = nameInput.nextElementSibling
  if (nameInput.value.trim() === '') {
    nameFeedback.textContent = 'Please provide your name'
    nameFeedback.style.display = 'block'
    nameFeedback.style.color = 'red'
    isValid = false
  } else {
    nameFeedback.textContent = ''
    nameFeedback.style.display = 'none'
  }

  // Validate Email
  const emailInput = document.querySelector('#email-input')
  const emailFeedback = emailInput.nextElementSibling
  const emailPattern = /^[a-zA-Z0-9._%+-]+@wallawalla\.edu$/
  if (!emailPattern.test(emailInput.value)) {
    emailFeedback.textContent = 'Please provide a valid wallawalla.edu email'
    emailFeedback.style.display = 'block'
    emailFeedback.style.color = 'red'
    isValid = false
  } else {
    emailFeedback.textContent = ''
    emailFeedback.style.display = 'none'
  }

  // Validate Phone Number
  const phoneInput = document.querySelector('#phone-input')
  const phoneFeedback = phoneInput.nextElementSibling
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/
  if (!phonePattern.test(phoneInput.value)) {
    phoneFeedback.textContent = 'Please provide a valid phone number in the format (xxx) xxx-xxxx'
    phoneFeedback.style.display = 'block'
    phoneFeedback.style.color = 'red'
    isValid = false
  } else {
    phoneFeedback.textContent = ''
    phoneFeedback.style.display = 'none'
  }

  // Validate Checkboxes
  const checkboxes = document.querySelectorAll('.form-check-input')
  const checkboxContainer = checkboxes[0].parentElement.parentElement // Parent container of checkboxes
  let checkboxFeedback = checkboxContainer.querySelector('.invalid-feedback')

  if (!checkboxFeedback) {
    checkboxFeedback = document.createElement('div')
    checkboxFeedback.className = 'invalid-feedback'
    checkboxFeedback.textContent = 'Please select at least one area to help with'
    checkboxFeedback.style.color = 'red'
    checkboxContainer.appendChild(checkboxFeedback)
  }

  const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked)

  if (!isChecked) {
    checkboxFeedback.style.display = 'block'
    isValid = false
  } else {
    checkboxFeedback.style.display = 'none'
  }

  return isValid
}

document.getElementById('phone-input').addEventListener('input', function (event) {
  let input = event.target.value.replace(/\D/g, '') // Remove all non-numeric characters

  if (input.length > 10) {
    input = input.slice(0, 10) // Limit to 10 digits
  }

  let formattedNumber = input

  if (input.length >= 6) {
    formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`
  } else if (input.length >= 3) {
    formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3)}`
  }

  event.target.value = formattedNumber
})
