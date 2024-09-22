document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            loadProducts();
        }
    });
});

function loadProducts() {
    fetch('/api/products/')
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('product-table').querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

loadProducts();
