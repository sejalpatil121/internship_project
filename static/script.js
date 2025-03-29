document.getElementById('qa-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/process', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('response-container');
        if (data.error) {
            container.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
            container.innerHTML = `<h2>Answer:</h2><p>${data.output_text}</p>`;
        }
    })
    .catch(err => {
        console.error(err);
    });
});
