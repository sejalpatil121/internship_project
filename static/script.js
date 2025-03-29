document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('qa-form').addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent page refresh

        const formData = new FormData(this);

        fetch('/process', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server response not OK');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('response-container');
            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                container.innerHTML = `<h2>Answer:</h2><p>${data.output_text}</p>`;
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            document.getElementById('response-container').innerHTML = `<p class="error">Error fetching response. Check the console.</p>`;
        });
    });
});
