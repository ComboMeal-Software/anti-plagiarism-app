const buttons = document.querySelectorAll('.compare_button')
const first = document.querySelectorAll('.form_textarea')[0]
const second = document.querySelectorAll('.form_textarea')[1]
let method = 'POST'
let headers = {}
buttons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault()
    const body = JSON.stringify({
      first: first.value,
      second: second.value,
    })
    const url = button.id;
    headers['Content-Type'] = 'application/json'
    const response = await fetch(`http://localhost:3000/compare/${url}`, {
      method,
      body,
      headers
    })
    const status = response.status;
    const data = await response.json()
    if (status === 200) {
      showResults(button.parentElement, data.result.value)
    }
    if (!response.ok) {
      throw new Error('Что-то пошло не так')
    }
  })
})