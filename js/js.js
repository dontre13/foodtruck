import {fullMenu} from './menuArray.js'

//displayItem(fullMenu), setupFilters(), modals();aren't running in mobile when going to menu.html


//Searchbar
    const cancelbtn = document.querySelector('.uil-times');
    const typingtext = document.querySelector('.searchbox input');


    typingtext.addEventListener('keyup', ()=>{
        if(typingtext.value != 0){
            cancelbtn.style.display = "block";
        }else{
            cancelbtn.style.display = "none";
        }
    })

    cancelbtn.addEventListener('click', ()=>{
        typingtext.value = '';
        cancelbtn.style.display = 'none';
    })


//hamburger menu
export function hamburgerMenu(){
    
    document.addEventListener('DOMContentLoaded', ()=> {
        const hamburger = document.querySelector('.ham-menu');
        const navlinks = document.querySelector('.nav-links');
        const searchbox = document.querySelector('.searchbox')
        const cart = document.querySelector('.uil-shopping-cart-alt');
        const outerEx =  document.querySelector('.outer-ex');

        cancelbtn.style.display = "none";
        
        outerEx.style.display = "none";
        

        if (window.innerWidth <= 768) {
            searchbox.style.display = 'none';
            outerEx.style.display = 'none';
            
        }else{
            searchbox.style.display = 'flex';
            
        }
    

        hamburger.addEventListener('click', ()=>{
            const isActive = navlinks.classList.toggle('activate');

            if (window.innerWidth <= 768) {
                searchbox.style.display = isActive ? 'flex' : 'none';

                if(isActive){
                    cart.style.display = 'none';
                    hamburger.style.display = 'none';
                    outerEx.style.display = 'block';
                    navlinks.style.display = 'flex';
                }else{
                    cart.style.display = 'block';
                    hamburger.style.display = 'block'
                }
            }  
        });

        outerEx.addEventListener('click', ()=>{
                if(outerEx){
                    outerEx.style.display = 'none';
                    searchbox.style.display = 'none';
                    cart.style.display = 'block';
                    hamburger.style.display = 'flex';
                    navlinks.style.display = 'none';
                    navlinks.classList.remove('activate')
                }
            })

        window.addEventListener('resize', ()=>{
            if(window.innerWidth > 768){
                searchbox.style.display = 'flex';
                navlinks.style.display = 'flex';
                navlinks.classList.remove('activate');
                hamburger.style.display = 'none';
                outerEx.style.display = 'none';
                cart.style.display = 'block';
            }else{
                const isNavActive = navlinks.classList.contains('activate')
                searchbox.style.display = isNavActive ? 'flex' : 'none';
                outerEx.style.display = isNavActive ? 'flex' : 'none';
                navlinks.style.display = isNavActive ? 'flex' : 'none';
                hamburger.style.display = isNavActive ? 'none' : 'flex';
            }
        })


    });
}

//since I am exporting hamburgerMenu(), this makes it work w/o directly running it.
// If there is an element with the class ham-menu on the page, then run the hamburgerMenu() function.
if (document.querySelector('.ham-menu')) {
    hamburgerMenu();
}
////



//fixed nav-bar scroll
export function setupNavBar(){
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if(scrollY > 50){
            navbar.classList.add('activate')
            
        }else{
            navbar.classList.remove('activate')
            
        }
    })
}
setupNavBar()



//////////////////////////Top picked page//////////////////////////
//Auto rotate food

const foodpanel = document.querySelector('.itemspanel');
var counter = 0;


if (foodpanel){
    setInterval(()=>{
        counter +=60
        foodpanel.style.rotate = counter + "deg";
    }, 2500)
}


//Change food name
const foodlabels = document.querySelectorAll('.foodlabel h2')
var increment = 0;

setInterval(changeName, 2500)
function changeName(){
    increment += 1;
    
    if (increment === 6){
        increment = 0;
    }

    foodlabels.forEach((item) =>{
        item.style.bottom = increment * 100 + 'px';
    })
    
}




//////////////////////////Review page//////////////////////////

function reviewSlider() {
    

    //there’s no review section in menu.js, this function returns early and never touches null elements.
    //So on pages that don’t include the review section, it fails when reviewSlider() tries to run.
    const reviewPage = document.querySelector('#review');
    if (!reviewPage) return;




    let isSmallScreen = false;
    let originalContent;

     function slider(){
        const slides = document.querySelectorAll('.slidepage');
        const prevbtn = document.querySelector('.prev');
        const nextbtn = document.querySelector('.next');
        const totalslides = slides.length;
        let slidercounter = 0;


        //There is a DOM timing issue with menu.js, this fixes it. 
        // Checks if the slides array is empty. Also checks if prevbtn/nextbtn are falsy
        if(!slides.length || !prevbtn || !nextbtn) {
        return;
        }
        /////


        function slidePage() {
                slides.forEach((slide) => {
                    slide.style.transform = `translateX(-${slidercounter * 100}%)`

                })

                //previous button highlight
                if(slidercounter === 0){
                    prevbtn.style.pointerEvents = 'none';
                    prevbtn.style.opacity = '0.5';
                }else{
                    prevbtn.style.pointerEvents = 'auto';
                    prevbtn.style.opacity = '1';
                }

                //next button highlight
                if(slidercounter === totalslides -1){
                    nextbtn.style.pointerEvents = 'none';
                    nextbtn.style.opacity = '0.5';
                }else{
                    nextbtn.style.pointerEvents = 'auto';
                    nextbtn.style.opacity = '1';
                }
            }

            prevbtn.addEventListener('click', () => {
                if (slidercounter > 0) {
                    slidercounter--;
                    slidePage();
                }
                });

            nextbtn.addEventListener('click', () => {
            if (slidercounter < totalslides - 1) {
                slidercounter++;
                slidePage();
            }
            });


            //auto slides
            setInterval(() => {
                slidercounter = (slidercounter + 1) % totalslides;
                slidePage();
            }, 5000);



            //adjusts slides
            slides.forEach((slide, index) => {
                slide.style.left = `${index * 100}%`;
            });
            slidePage();
        }

    // Rearrange DOM for small screens
    function smallLayout(){
        const wrapper = document.querySelector('#review .wrapper');
        const allUserBoxes = wrapper.querySelectorAll('.userbox');
        

        if(!originalContent){
            originalContent = wrapper.innerHTML;
        }


        // Clear existing slidepages
        wrapper.innerHTML = '';

        // Create a new slidepage for each userbox
        allUserBoxes.forEach(userBox => {
            const slide = document.createElement('div');
            slide.classList.add('slidepage');
            slide.appendChild(userBox.cloneNode(true));
            wrapper.appendChild(slide);
        });
        
        isSmallScreen = true;
        slider();
        
    }
    
    

    function resetLayout(){
        if(originalContent){
            const wrapper = document.querySelector('#review .wrapper');
            wrapper.innerHTML = originalContent;
            slider();
        }
        isSmallScreen = false;
    }


    if(window.innerWidth < 770 && !isSmallScreen){
        smallLayout()
    }else{
        slider();
    }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth <= 770 && !isSmallScreen){
            smallLayout()
        }else if(window.innerWidth > 770 && isSmallScreen){
            resetLayout()
        }
    })
    
}

reviewSlider();




// //Sidebar filter
// document.addEventListener('DOMContentLoaded', () => {
//     const filters = btns.map((btn) => {
//         return btn;
//     });

//     document.getElementById('btns').innerHTML = filters.map((btn) => {
//         const { name } = btn;
//         return `<button class='fil-p' onclick='filterItems("${name}")'>${name}</button>`;
//     }).join('');
// });



// const categories = [...new Set(fullMenu.map(item => item.category))];


// function filterItems(categoryName) {
//     if(categoryName === "All"){
//         displayItem(menuItem)
//     }else{
//         const filteredMenuItem = fullMenu.filter(product => product.category === categoryName);
//         displayItem(filteredMenuItem);
//     }
// }




// function displayItem(items){
//     document.getElementById('root').innerHTML = items.map(item => {
//         const {image, title} = item;
//         return `
//             <div class='box'>
//                 <h3>${title}</h3>
//                 <div class='img-box'>
//                     <img class='images' src='${image}' />
//                 </div>
//                 <div class='bottom'>
//                     <h2>$65</h2>
//                     <button>Add to cart</button>
//                 </div>
//             </div>
//         `;
//     }).join('');
// }


// displayItem(fullMenu);



//testing
fullMenu.forEach(item => {
    console.log(`${item.name}: $${item.price.toFixed(2)}`);
});




