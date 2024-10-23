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
    const skip =(page -1 ) * 30 ;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return data;
}
const displayProducts = async (page =1 ) => {
    const loader =document.querySelector(".loader-container");
    loader.classList.add("active")
    try{
    const products = await getProducts(page);
    const numberOfPages =  Math.ceil(products.total / 30);
    
    const result=products.products.map((product)=>{
        return `
            <div class="product">
                <img src="${product.thumbnail}" class="images">
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
        getmodal();
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


function getmodal() {
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close");
    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");
    const images = Array.from(document.querySelectorAll(".images"));
    let currentIndex = 0;
    images.forEach(function(img){
        

    img.addEventListener("click",function(e){
            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src",e.target.src);
            
            currentIndex = images.indexOf(e.target)
          
        });
   
    })
    //close modal
    closeBtn.addEventListener("click",function(){
        modal.classList.add("d-none");
    })
    rightBtn.addEventListener("click",function(){
        currentIndex++;
        if(currentIndex >= images.length){
            currentIndex = 0;
        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
    })

    leftBtn.addEventListener("click",function(){
        currentIndex--;
        if(currentIndex<=0){
            currentIndex = images.length - 1;

        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
       
    })

    document.addEventListener("keydown",function(e){
        
        if(e.code=="ArrowRight"){
            currentIndex++;
        if(currentIndex >= images.length){
            currentIndex = 0;
        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);

        }
        if(e.code=="ArrowLeft"){
            currentIndex--;
        if(currentIndex<=0){
            currentIndex = images.length - 1;

        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);

        }
        if(e.code == "Escape"){
            modal.classList.add("d-none");
        }
    })
    
}
