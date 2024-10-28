const cart = [];
document.querySelectorAll('.add-to-cart').forEach(button =>{
    button.addEventListener('click',() =>{
        const product =
        button.parentElement.querySelector('h2').textContent;
        const price =
        button.parentElement.querySelector('p').textContent;
    
    cart.push({product,price});
    alert('${product}به سبد خرید اضافه شد!');

    console.log(cart);
    });
});