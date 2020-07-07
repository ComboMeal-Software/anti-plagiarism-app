const header = document.querySelector('.header')
const body = document.querySelector('body')
const theme_button = document.querySelector('.theme_button')
const textarea = document.querySelectorAll('.form_textarea')
let firstClick = 0;
let gachiPointes = 0;
let theme = 'dark'
theme_button.addEventListener('click', (event) => {
  const secondClick = Date.now()
  let speed = secondClick - firstClick;
  firstClick = secondClick;
  if (speed < 200) {
    gachiPointes++;
  }
  if (gachiPointes > 10) {
    theme = 'dark';
    body.style = ' background: url(../img/guchiLoad.gif) no-repeat; background-size: cover;'
    console.log('GACHI TIME')
    setTimeout(() => {
      gachiPointes = 0;
      theme = 'light'
      theme_button.innerText = "Светлая тема";
      textarea.forEach((area) => { area.classList.add('textarea_light') })
      theme_button.style = "background-color: #f9f9f9; color:#40434c;"
      header.style = 'color:#fff'
      body.style = 'background-color: #131418'
    }, 6000)
  } else {
    if (theme === 'light') {
      theme = 'dark'
      theme_button.innerText = "Темная тема";
      textarea.forEach((area) => { area.classList.remove('textarea_light') })
      theme_button.style = "background-color: #40434c; color:#f9f9f9;"
      header.style = 'color:#222429'
      body.style = 'background-color: #40434c26'
    } else {
      theme = 'light'
      theme_button.innerText = "Светлая тема";
      textarea.forEach((area) => { area.classList.add('textarea_light') })
      theme_button.style = "background-color: #f9f9f9; color:#40434c;"
      header.style = 'color:#fff'
      body.style = 'background-color: #131418'
    }
  }
})
