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
      showResults(button.parentElement, Math.round(data.result.value))
    }
    if (!response.ok) {
      throw new Error('Что-то пошло не так')
    }
  })
  const block = button.parentElement
  const text = button.innerText;
  const refresh = block.querySelector('.refreshBlock')
  const plagiarized = block.querySelector('.plagiarized')
  const refreshFunction = () => {
    refresh.style = ''
    plagiarized.style = ''
    button.style = ''
    button.innerText = text;
  }
  refresh.addEventListener('click', (event) => {
    console.log(text);
    refreshFunction()
  }, true)

})