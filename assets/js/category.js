const getProducts = async () => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
}
const displayProducts = async () => {
    const loader =document.querySelector(".loader-container");
    loader.classList.add("active");
    try{

        const data = await getProducts();
        const result=data.products.map((product)=>{
            return `
            <div class="product-section">
            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <span>${product.price}$</span>
            
            </div>
            `
        }).join('');
        document.querySelector(".products-info .row").innerHTML=result;
    }
    catch(e) {
        document.querySelector(".categories .row").innerHTML="<P>error loading categories</P>";
    }
    finally{
        loader.classList.remove("active");
    }
}
displayProducts();