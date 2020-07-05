const showResults = (block, result) => {
  const refresh = block.querySelector('.refresh')
  const plagiarized = block.querySelector('.plagiarized')
  const button = block.querySelector('.compare_button')
  button.style = `height: ${button.clientHeight}px`;
  text = button.innerText
  button.innerText = ''
  plagiarized.querySelector('span').innerText = `${result}%`
  plagiarized.style = `width: ${result}%;`
  refresh.style = `right:0; width: ${100 - result}%;`
  refresh.addEventListener('click', (event) => {
    refresh.style = ''
    plagiarized.style = ''
    button.style = ''
    button.innerText = text;
  })
}
