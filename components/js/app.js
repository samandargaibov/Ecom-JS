if(localStorage.getItem('products') === null) {
    localStorage.setItem('products',JSON.stringify([]))
}

function GetProducts(){
    fetch('https://fakestoreapi.com/products')
        .then(response=>response.json())
        .then(data=> {
            console.log(data);
            let x='';
            data.forEach(item => {
                let short_desc = item.description.length > 50 ? item.description.slice(0,50) + '...' : item.description;
                let short_title = item.title.length > 20 ? item.title.slice(0,20) + '...' : item.title;
                x+=`
            <div class="col-lg-3 text-center">
                <div class="card" id="${item.id}" style="width: 18rem;">
                    <img class="card-img-top" src="${item.image}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${short_title}</h5>
                      <p class="card-text">${short_desc}</p>
                      <p class="card-text">${item.price} AZN</p>
                      <button class="btn btn-primary">Add to card</button>
                    </div>
                  </div>
            </div>
                `
            });
            document.querySelector('#list').innerHTML += x;
        })
}
 GetProducts();

function GetCategories(){
    fetch('https://fakestoreapi.com/products/categories')
        .then(response=>response.json())
        .then(data=> {
            console.log(data);
            let x='';
            data.forEach(item => {
                x += `
                <option value = "${item}">${item}</option>
                `
            })
            document.querySelector('#select').innerHTML = x;
        })
}
GetCategories();

let select = document.querySelector('#select');

select.onchange = function() {
    let value = this.value;
    fetch(`https://fakestoreapi.com/products/category/${value}`)
    .then(response => response.json())
    .then(data => {
        let x='';
            data.forEach(item => {
                let short_desc = item.description.length > 50 ? item.description.slice(0,50) + '...' : item.description;
                let short_title = item.title.length > 20 ? item.title.slice(0,20) + '...' : item.title;
                x+=`
            <div class="col-lg-3 text-center">
                <div class="card" id="${item.id}" style="width: 18rem;">
                    <img class="card-img-top" src="${item.image}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${short_title}</h5>
                      <p class="card-text">${short_desc}</p>
                      <p class="card-text">${item.price} AZN</p>
                      <button class="btn btn-primary">Add to card</button>
                    </div>
                  </div>
            </div>
                `
        })
        document.querySelector('#list').innerHTML = x;
    })
}

let buttons = document.querySelectorAll('.btn');

for(let btn of buttons) {
    btn.onclick = function(e) {
        let id = this.parentElement.parentElement.id;
        let src = this.parentElement.previousElementSibling.src;
        let title = this.previousElementSibling.previousElementSibling.innerHTML
        let price = this.previousElementSibling.innerHTML;
       
        let product_list = JSON.parse(localStorage.getItem('products'));

        let existProd = product_list.find(item => item.Id == id);
        
        if(existProd === undefined) {
            product_list.push({
                Id: id,
                Title: title,
                Image: src,
                Price: price,
                Count: 1
            })
            document.querySelector('.toaster').innerHTML = 'Successfully added'
            document.querySelector('.toaster').style.backgroundColor = 'green'

        }
        else{
            existProd.Count += 1;
            document.querySelector('.toaster').innerHTML = 'Already added'
            document.querySelector('.toaster').style.backgroundColor = 'red'
        }

        

        localStorage.setItem('products',JSON.stringify(product_list))
        document.querySelector('.toaster').style.right = '5%'
        setTimeout(() => {
            document.querySelector('.toaster').style.right = '-20%'
        }, 1300);
        ShowCount()
    }
}


function ShowCount() {
    let items = JSON.parse(localStorage.getItem('products'))
    document.querySelector('#count').innerHTML = items.length;
}

ShowCount()