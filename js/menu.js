import {fullMenu} from './menuArray.js'
import {hamburgerMenu } from './js.js';

//This ensures hamburgerMenu() runs only after the DOM is ready.
//without this searchbar does not apear when hamburger menu is clicked.
document.addEventListener('DOMContentLoaded', ()=>{
    hamburgerMenu();
    
});
//

    //displayItem(fullMenu), setupFilters(), and modals(); 



fullMenu.map(item =>{
    console.log(item.name)
})

const btns = [
    {name: 'All'},
    {name: 'Chicken'},
    {name: 'Pork'},
    {name: 'Seafood'},
    {name: 'Vegetarian'},
    {name: 'Noodles'},
];

//Menu Item filter
document.addEventListener('DOMContentLoaded', () => {
    const filters = btns.map((btn) => {
        return btn;
    });

    document.getElementById('btns').innerHTML = filters.map((btn) => {
        const { name } = btn;
        return `<button class='fil-p' data-category='${name}'>${name}</button>`;
    }).join('');


    //highlighted selected button 
    const filterButtons = document.querySelectorAll('#btns .fil-p')

    filterButtons.forEach(button =>{
        button.addEventListener('click', ()=>{
            filterButtons.forEach(btn => btn.classList.remove('active'))

            button.classList.add('active')

            const category = button.getAttribute('data-category');
            filterItems(category)
        })
    })

});



const categories = [...new Set(fullMenu.map(item => item.category))];

//Explicitly define filterItems on the window object, This makes filterItems globally available (i.e., attaches it to window) 
// so inline onclick='filterItems("${name}")' can find it in js.js file.
window.filterItems = function(categoryName) {
    if(categoryName === "All"){
        displayItem(fullMenu)
    }else{
        const filteredMenuItem = fullMenu.filter(product => product.category === categoryName);
        displayItem(filteredMenuItem);
    }
}


function displayItem(items){
    document.getElementById('root').innerHTML = items.map(item => {
        const {id, plateImg, name, price, comesWith} = item;
        return `
            <div class='box' id = "${id}">
                <div class='img-box'>
                    <img class='images' src='${plateImg}' />
                </div>
                <h3>${name}</h3>
                <p> ${comesWith} </p>
                <div class='bottom'>
                    <h2>$${price}</h2>
                    <button>Add to cart</button>
                </div>
            </div>
        `;
    }).join('');

    modals();
}
displayItem(fullMenu);

//Modal pop up
function modals(){
    const imgbox = document.querySelectorAll('.img-box')
    const modal = document.getElementById('mealModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');

    imgbox.forEach(img =>{
        img.addEventListener('click', ()=>{
            const cards = img.closest('.box');
            const mealId = cards.getAttribute('id');
            //Searches through an array fullMenu to find the first item where the item's id matches the value of mealId, and stores that item in the variable meal.
            const meal = fullMenu.find(item => item.id == mealId);

            modalImage.src = meal.fullImg;
            modalTitle.textContent =  meal.name;
            modalDescription.textContent = meal.description;

            modal.style.display = "block"
        })
    })

    closeBtn.addEventListener('click', ()=>{
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event)=>{
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    })

}







//testing
fullMenu.forEach(item => {
    console.log(`${item.name}: $${item.price.toFixed(2)}`);
});

