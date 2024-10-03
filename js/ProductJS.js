const apiUrl = 'https://fakestoreapi.com/products';
let currentindex = 0;
let endIndex = 10;
let productListData = undefined;
let filteredProducts = undefined;

// Define showMoreButtonElem at the top
let showMoreButtonElem = `<div class="text-center showmore"><a href="javascript:void(0)">Show More</a></div>`;

let product = "";
let filterCategories = [];
let sortByPrice = "";
let searchedText = "";

// Function to update the index display
function updateIndexDisplay() {
    return `<div class="text-center index-display">Index: ${currentindex + 1}</div>`; // Display current index
}

// Initialize containers
let showMoreContainer = document.getElementById('showmoreContainer');
let productListContainer = document.getElementById('productListContainer');

// Function to fetch product list
async function renderProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        productListData = await response.json();
        filteredProducts = productListData;
        console.log(productListData); // Output the data to the console
        bindResultCount();
        addProductsToContainer(filteredProducts);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        productListContainer.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
}

// Bind total products count
function bindResultCount() {
    let resultCount = `<p class="text-nowrap ml bold">${productListContainer.children.length} Results</p>`;
    document.getElementById('resultstxt').innerHTML = resultCount;
}

// Function to add products to the container
function addProductsToContainer(data, loadMore = false) {
    if (!loadMore) product = ""; // Reset product string if not loading more
    for (let i = currentindex; i < (endIndex < data.length ? endIndex : data.length); i++) {
        product += `<div class="product" onclick="window.location.href='../../pages/product-details/product.html'">
            <img src="${data[i].image}" class="bg-secondary" alt="">
            <p class="product-title"><b>${data[i].title}</b></p>
            <p><b>${'$' + data[i].price}</b></p>
            <div class="heartImg"><i class="fa-regular fa-heart"></i></div>
        </div>`;
    }

    // Show more button logic
    if (filteredProducts.length > endIndex) {
        showMoreContainer.innerHTML = showMoreButtonElem; // Set the button
        const showMoreButton = document.querySelector('.showmore');
        if (showMoreButton) {
            showMoreButton.addEventListener('click', showMoreProducts);
        }
    } else {
        showMoreContainer.innerHTML = ''; // Remove button if no more products
    }

    productListContainer.innerHTML = product; // Update the product list
    bindResultCount();
}

// Call the fetch function to load products
renderProducts();

// Lazy loading products
function showMoreProducts() {
    currentindex = endIndex; // Update current index
    endIndex += 10; // Increase end index
    addProductsToContainer(filteredProducts, true); // Load more products
}

function searchProduct(searchText) {
    searchedText = searchText;
    filterProducts('',false,true);
}

//filter products based on category, search text
function filterProducts(categoryName, checked, searchFlag=false) {
    currentindex = 0;
    endIndex = 10;
    
    if (checked) {
        filterCategories.push(categoryName);
    } else {
        !searchFlag && filterCategories.splice(filterCategories.indexOf(categoryName), 1);
    }

    filteredProducts = filterCategories.length === 0 
    ? productListData 
    : productListData.filter(productObj => filterCategories.includes(productObj.category));

    if (searchedText) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchedText.toLowerCase()));
    }
    
    sortProducts(sortByPrice);
};

//ascending sort
const sortByPriceAsc = (items) => {
    return items.slice().sort((a, b) => a.price - b.price);
};

//descending sort
const sortByPriceDesc = (items) => {
    return items.slice().sort((a, b) => b.price - a.price);
};

//sort products based on price
function sortProducts(sortType) {
    sortByPrice = sortType;
    currentindex = 0;
    endIndex = 10;
    if (sortType === 'asc') {
        filteredProducts = sortByPriceAsc(filteredProducts);
    } else if (sortType === 'desc') {
        filteredProducts = sortByPriceDesc(filteredProducts);
    }
    addProductsToContainer(filteredProducts);
}

//lazy loading products
function showMoreProducts() {
    currentindex = endIndex;
    endIndex += 10;
    addProductsToContainer(filteredProducts, true);
}

document.getElementById('toggleFilterSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
});

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('errorModal').style.display = 'none';
}

document.getElementById('retry-button').onclick = function() {
    document.getElementById('errorModal').style.display = 'none';
    productListContainer.innerHTML = loader;
    renderProducts();
}

document.getElementById('cancel-button').onclick = function() {
    document.getElementById('errorModal').style.display = 'none';
}


const mobileMenu = document.getElementById("hamburger");
const navList = document.getElementById("nav-menu");

mobileMenu.addEventListener("click", () => {
    navList.classList.toggle("active");
});

document.getElementById("hamburger").addEventListener("click", function() {
    const navLinks = document.getElementById("nav-menu");
    navLinks.classList.toggle("active"); // Toggle the active class
});

mobileMenu.addEventListener("click", () => {
    console.log("Hamburger menu clicked!"); // Log when clicked
    navList.classList.toggle("active");
});
