document.getElementById('load-image-button').addEventListener('click', function () {
  ajaxCall()
})

function ajaxCall () {
  fetch('https://www.wallawalla.edu/fileadmin/_processed_/5/6/csm_download-10_f0fb550bce.jpg')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      document.getElementById('footer-content').innerHTML =
        '<img src="https://www.wallawalla.edu/fileadmin/_processed_/5/6/csm_download-10_f0fb550bce.jpg" alt="Downloaded Image" id="jest-image" />'
    })
    .catch(error => console.error('Error:', error))
}
