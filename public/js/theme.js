const header = document.querySelector('.header')
const body = document.querySelector('body')
const theme_button = document.querySelector('.theme_button')
const textarea = document.querySelectorAll('.form_textarea')
let theme = 'dark'
theme_button.addEventListener('click', (event) => {
  if (theme === 'light') {
    theme = 'dark'
    theme_button.innerText = "Темная тема";
    textarea.forEach((area) => { area.classList.remove('textarea_light') })
    theme_button.style = "background-color: #40434c; color:#f9f9f9;"
    header.style = 'color:#40434c'
    body.style = 'background-color: #f9f9f9'
  } else {
    theme = 'light'
    theme_button.innerText = "Светлая тема";
    textarea.forEach((area) => { area.classList.add('textarea_light') })
    theme_button.style = "background-color: #f9f9f9; color:#40434c;"
    header.style = 'color:#fff'
    body.style = 'background-color: #131418'
  }
})
