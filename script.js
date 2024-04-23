var arr = [];
var filtered = [];
var cat = '';

document.addEventListener('DOMContentLoaded',async()=>{
    const data = await axios.get("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json");
    arr = data.data.categories;
    // console.log(arr)
    const tabs = document.getElementsByClassName('tab');
    for(let i=0;i<tabs.length;i++){
        tabs[i].addEventListener('click',function(){
            Array.from(tabs).forEach((otherTabs,otherIndex)=>{
                if(otherIndex!=i){
                    otherTabs.classList.remove('active');
                }
            })
            this.classList.add('active');
            const val = this.getAttribute('data-value');
            if(cat!==val){
                cat = val;
                // console.log(arr)
                func(cat);
            }
            
        })
    };
    
})

const filter=(cat)=>{
    
    var filteredArray = arr.filter((item)=>{
        return item.category_name===cat
    })

    filtered = filteredArray[0].category_products;
}

var array = [];
const func = (cat) => {
     filter(cat)
     console.log(filtered.length)
    const products = document.getElementById('products-box');
    while(products.firstChild){
        products.removeChild(products.firstChild);
    }
    filtered.forEach((item) => {
        const product_card = document.createElement('div');
        product_card.classList.add('pcard');
        const details = document.createElement('div');

        const badge = document.createElement('div');
        badge.innerText = item.badge_text;
        badge.classList.add('badge');
        
        const info = document.createElement('div');
        info.classList.add('info');

        const priceInfo = document.createElement('div');
        priceInfo.classList.add('priceinfo')

        const image = document.createElement('img');
        image.src = item.image;
        image.classList.add('image')

        const title = document.createElement('h1');
        title.innerText = item.title;
        title.classList.add('title');

        const dot = document.createElement('div');
        dot.classList.add('dot');

        const vendor = document.createElement('span');
        vendor.innerText = item.vendor;
        vendor.classList.add('vendor')
        
        const price = document.createElement('span');
        price.innerText = `RS ${item.price}`;
        price.classList.add('price')

        const cprice = document.createElement('span');
        cprice.innerText=item.compare_at_price;
        cprice.classList.add('cprice');

        const discount = document.createElement('span');
        discount.innerText="50% Off";
        discount.classList.add('dis');

        const button = document.createElement('button');
        button.innerText = "Add to Cart";
        button.classList.add('btn');

        info.appendChild(title);
        info.appendChild(dot);
        info.appendChild(vendor);

        priceInfo.appendChild(price);
        priceInfo.appendChild(cprice);
        priceInfo.appendChild(discount);

        details.appendChild(info);
        details.appendChild(priceInfo);
        
        product_card.appendChild(badge)
        product_card.appendChild(image);
        product_card.appendChild(details);
        product_card.appendChild(button);
        products.appendChild(product_card);
    });
};

