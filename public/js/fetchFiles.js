function showFilesResults (results, ResultTable) {
  ResultTable.style="opacity:1;"
  results.forEach((result => {
    ResultTable.insertAdjacentHTML('afterbegin',`
    <div class="result">
      <span class="firstFolderFile resultCell">${result.firstFolderFile}</span>
      <div class="resultCell plagiarizedBlock">
        <div class="plagiarized" style="width: ${result.plagiarized.value}%">
          <span>${result.plagiarized.value}%</span>
        </div>
      </div>
      <span class="secondFolderFile resultCell">${result.secondFolderFile}</span>
    </div>`)
  }))
}
function error (fileInput) {
    fileInput.classList.add('error')
    setTimeout(() => {
      fileInput.classList.remove('error') 
    }, 700)
}
function fetchFiles () {
  const compareFiles = document.querySelector('.compareFiles')
  const ResultTable = compareFiles.querySelector('.ResultTable')
  const buttons = compareFiles.querySelectorAll('.compare_button')
  const first = compareFiles.querySelector('.firstFileInput')
  const firstBlock = compareFiles.querySelector('.firstFileBlock')
  const second = compareFiles.querySelector('.secondFileInput')
  const secondBlock = compareFiles.querySelector('.secondFileBlock')
  let method = 'POST'
  let headers = {}
  let body = {}
  let invalid = true;

  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault()
      ResultTable.style = "opacity:0;"
      const firstLength = first.files.length
      const secondLength = second.files.length
      if (!(firstLength && secondLength)) {
        if (!first.files.length) {
          invalid = true
          error(firstBlock)
        }
        if (!second.files.length) {
          invalid = true
          error(secondBlock)
        }
      } else {
        invalid = false
      }
      if (!invalid) {
        body = new FormData(compareFiles)
        const url = button.getAttribute('action');
        headers['enctype'] = 'multipart/form-data'
        const response = await fetch(`http://localhost:3000/files/${url}`, {
          method,
          body,
          headers
        })
        const status = response.status;
        const data = await response.json()
        if (status === 200) {
          setTimeout(() => {
            ResultTable.innerHTML = ''
            showFilesResults(data, ResultTable)
          }, 300)
        }
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
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
      refreshFunction()
    }, true)
  }) 
}
fetchFiles()