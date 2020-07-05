const showResults = (block, result) => {
  const refreshFunction = () => {
    refresh.style = ''
    plagiarized.style = ''
    button.style = ''
    button.innerText = text;
  }
  const textareas = document.querySelectorAll('.form_textarea');
  const refresh = block.querySelector('.refresh')
  const plagiarized = block.querySelector('.plagiarized')
  const button = block.querySelector('.compare_button')
  button.style = `height: ${button.clientHeight}px`;
  text = button.innerText
  button.innerText = ''
  plagiarized.querySelector('span').innerText = `${result}%`
  plagiarized.style = `left: 0; width: ${result}%;`
  refresh.style = `right:0; width: ${100 - result}%;`
  refresh.addEventListener('click', (event) => {
    refreshFunction()
  }, true)
  textareas.forEach(textarea => {
    textarea.addEventListener('input', (event) => {
    refreshFunction()
  }, true)
  })
}
