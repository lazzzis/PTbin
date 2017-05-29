new Clipboard('button.copy')

var author = document.getElementById('author')
var content = document.getElementById('content')
var form = document.getElementById('form')
var warning = document.getElementById('warning')

form.addEventListener('submit', function (e) {
  // reset
  document.querySelector('label[for="author"]').className = document.querySelector('label[for="content"]').className = ''
  warning.innerText = ''
  warning.style.visibility = 'hidden'
  if (!author.value) {
    document.querySelector('label[for="author"]').className +=
      'hint--right hint--always'
    warning.innerText = "'Author' is required"
    warning.style.visibility = 'visible'
  } else if (!content.value) {
    document.querySelector('label[for="content"]').className +=
      'hint--right hint--always'
    warning.innerText = "'content' is required"
    warning.style.visibility = 'visible'
  } else {
    return
  }
  e.preventDefault()
})
