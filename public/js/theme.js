const header = document.querySelector('.header')
const body = document.querySelector('body')
const theme_button = document.querySelector('.theme_button')
const textarea = document.querySelectorAll('.form_textarea')
const formInput = document.querySelectorAll('.form_input')
let firstClick = 0;
let gachiPoints = 0;
let theme = 'light'
new InputFile({
  buttonText: 'Select a folder',
  hint: 'Or just drag it here',
  message: 'Files selected'
});
theme_button.addEventListener('click', (event) => {
  const secondClick = Date.now()
  let speed = secondClick - firstClick;
  firstClick = secondClick;
  if (speed < 200) {
    gachiPoints++;
  }
  if (gachiPoints > 10) {
    const headerText = document.querySelector('.header').querySelector('h1');
    body.style = ' background: url(../img/guchiLoad.gif) no-repeat; background-size: cover;'
    theme_button.innerText = 'GACHI TIME';
    theme_button.style = ('background-color: #a4508b; background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);')
    headerText.innerText = 'GACHI TIME'
    headerText.style = 'background: -webkit-linear-gradient(315deg, #f6f0c4 0%, #d99ec9 74%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    setTimeout(() => {
      gachiPoints = 0;
      theme = 'dark'
      theme_button.innerText = 'Light theme';
      textarea.forEach((area) => {
        area.parentElement.classList.add('textarea_dark')
        area.classList.add('textarea_dark')
      })
      formInput.forEach((field) => {
        field.classList.add('fileInput_dark')
      })
      theme_button.style = 'background-color: #f9f9f9; color:#40434c;'
      header.style = 'color:#fff'
      body.style = 'background-color: #131418'
      headerText.innerText = 'A prototype of a system for checking the source code for plagiarism'
      headerText.style = ''
    }, 6000)
  } else {
    if (theme === 'dark') {
      theme = 'light'
      theme_button.innerText = "Dark theme";
      textarea.forEach((area) => {
        area.parentElement.classList.remove('dark')
        area.classList.remove('dark')
      })
      formInput.forEach((field) => {
        field.classList.remove('dark')
      })
      theme_button.style = "background-color: #40434c; color:#f9f9f9;"
      header.style = 'color:#222429'
      body.style = 'background-color: #40434c26'
    } else {
      theme = 'dark'
      theme_button.innerText = "Light theme";
      textarea.forEach((area) => {
        area.parentElement.classList.add('dark')
        area.classList.add('dark')
      })
      formInput.forEach((field) => {
        field.classList.add('dark')
      })
      theme_button.style = "background-color: #f9f9f9; color:#40434c;"
      header.style = 'color:#fff'
      body.style = 'background-color: #131418'
    }
  }
})
