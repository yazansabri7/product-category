const getCategries = async () => {
    const{data} = await axios.get(`https://dummyjson.com/products/category-list`);
        return data;
}
const displayCategories = async () => {
    const loader =document.querySelector(".loader-container");
    loader.classList.add("active")
    try{
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
    
}catch(e){
    document.querySelector(".categories .row").innerHTML="<P>error loading categories</P>";
    
}
finally{
    loader.classList.remove("active");
}
}
displayCategories();



const getProducts = async (page) => {
    const skip =(page -1 )* 30 ;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return data;
}
const displayProducts = async (page =1 ) => {
    const loader =document.querySelector(".loader-container");
    loader.classList.add("active")
    try{
    const products = await getProducts(page);
    const numberOfPages =  Math.ceil(products.total / 30);
    console.log(page);
    const result=products.products.map((product)=>{
        return `
            <div class="product">
                <img src="${product.thumbnail}">
                <h3>${product.title}</h3>
                <span>${product.price}$</span>
                
            </div>
        `
    }).join('');
    document.querySelector(".products .row").innerHTML=result;
    let piginationLink=``;
    if(page==1){
      piginationLink += `<li class="page-item"><button class ="page-link" disabled>&laquo;</button></li>`;
    }
    else{
        piginationLink += `<li class="page-item"><button onclick=displayProducts('${page - 1}') class ="page-link">&laquo;</button></li>`;
    }
    for(let i=1; i<=numberOfPages; i++){
        piginationLink+=`<li class="page-item ${i==page?'active':''}"><button onclick=displayProducts('${i}') class="page-link">${i}</button></li>`;

    }
    if(page==numberOfPages){

        piginationLink+=`<li class="page-item"><button disabled class="page-link">&raquo;</button></li>`;
    }
    else{

        piginationLink+=`<li class="page-item"><button onclick=displayProducts('${parseInt(page) + 1}') class="page-link">&raquo;</button></li>`;
    }
    document.querySelector(".pagination").innerHTML=piginationLink;

}catch(e){
    document.querySelector(".products .row").innerHTML="<P>error loading products</P>";
    
}
finally{
    loader.classList.remove("active");
}
}
displayProducts();

window.onscroll = function() {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".products");
    if(window.scrollY > categories.offsetTop){
        nav.classList.add("scrollnavbar");
    }
    else{
        nav.classList.remove("scrollnavbar");
    }
}



const countDown = ( ) => {
    const countDownDate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days= Math.floor(distance / (1000*60*60*24));
    document.querySelector("#days").innerHTML = days;
    const hours = Math.floor((distance % 86400000) / 3600000);
    document.querySelector("#hour").innerHTML = hours;
    const minutes = Math.floor((distance % (1000*60*60)) / 60000);
    document.querySelector("#minutes").innerHTML = minutes;
    const seconds = Math.floor((distance % (1000*60)) / 1000);
    document.querySelector("#second").innerHTML = seconds;
    
}

setInterval(() => {
   countDown();
}, 1000);