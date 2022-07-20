const writeModal = document.getElementById('writeModal')
const writeInput = document.getElementById('writeModal')

writeModal.addEventListener('shown.bs.Modal', function() {
    writeInput.focus()
})