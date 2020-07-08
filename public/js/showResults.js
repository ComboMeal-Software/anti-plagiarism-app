const showResults = (block, result) => {
  const button = block.querySelector('.compare_button')
  const textareas = document.querySelectorAll('.form_textarea');
  const plagiarized = block.querySelector('.plagiarized')
  const refresh = block.querySelector('.refreshBlock')
  button.style = `height: ${button.clientHeight}px`;
  button.innerText = ''
  plagiarized.querySelector('span').innerText = `${result}%`
  plagiarized.style = `left: 0; width: ${result}%;`
  refresh.style = `right:0; width: ${100 - result}%;`
}
