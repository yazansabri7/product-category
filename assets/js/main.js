const getCategries = async () => {
    const{data} = await axios.get(`https://dummyjson.com/products/category-list`);
        return data;
}
const displayCategories = async () => {
    const categories = await getCategries();
    const result = categories.map((category )=> {
        return `
        <div class="categorie">
            <h2>${category}</h2>
            <a href="categoriesDetails.html?category=${category}">Details</a>
        </div>
    `

    }).join(' ');
    document.querySelector(".categories .row").innerHTML = result;
}
displayCategories();



const getProducts = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products`);
    return data;
}
const displayProducts = async () => {
    const products = await getProducts();
    const result=products.products.map((product)=>{
        return `
            <div class="product">
                <img src="${product.thumbnail}" >
                <h3>${product.title}</h3>
                <span>${product.price}$</span>
                
            </div>
        `
    }).join('');
    document.querySelector(".products .row").innerHTML=result;
}
displayProducts();