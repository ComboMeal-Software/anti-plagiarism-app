const form = document.querySelector('.main')
const first = document.querySelectorAll('.form_textarea')[0]
const second = document.querySelectorAll('.form_textarea')[1]
let method = 'POST'
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const body = JSON.stringify({
    first: first.value,
    second: second.value,
  })
  const response = await fetch('http://localhost:3000/compare', {
    method,
    body,
  })
  const status = response.status;

  if (!response.ok) {
    throw new Error( 'Что-то пошло не так')
  }
})