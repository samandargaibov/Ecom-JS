function GetProducts() {
    let items = JSON.parse(localStorage.getItem('products'));

    let alertbox = document.querySelector('.alert');

    if(items.length === 0) {
        alertbox.classList.remove('d-none')
        document.querySelector('table').classList.add('d-none')
    }
    else{
        alertbox.classList.add('d-none')
        document.querySelector('table').classList.remove('d-none')
        
        let x = '';
        items.forEach(item => {
        x += `
        <tr>
            <th scope="row">${item.Id}</th>
            <td>
                <img src=${item.Image}>
            </td>
            <td>${item.Title}</td>
            <td>
                <input type="number" min="1" value=${item.Count}>
            </td>
            <td>${(item.Price) * (item.Count)} AZN</td>
            <td>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
    document.querySelector('tbody').innerHTML = x;
    }
}

GetProducts();