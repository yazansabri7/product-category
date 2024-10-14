const getProducts = async () => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
}
const displayProducts = async () => {
    const data = await getProducts();
    const result=data.products.map((product)=>{
        return `
            <div class="product-section">
                <img src="${product.thumbnail}" >
                <h3>${product.title}</h3>
                <span>${product.price}$</span>
                
            </div>
        `
    }).join('');
    document.querySelector(".products-info .row").innerHTML=result;
}
displayProducts();