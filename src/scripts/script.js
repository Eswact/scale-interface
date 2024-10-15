// all data
let categories;

let selectedProductId = null;

// options
let columnCount;
let rowCount;
let barCount;
let bar2Count;
let baseFont;
let salesman; // true/false --> numpad height 680/620

// card container
let products = [];
let currentPage = 1;
let cardsPerPage;
let totalPages;

// category containers
let mainCategories = [];
let currentPageMain = 1;
let totalMainPages;
let activeMainCategory = null;

let subCategories = [];
let currentPageSub = 1;
let totalSubPages;
let activeSubCategory = null;

let backArray = [];

// css injection
var options = localStorage.getItem("options");
function getOptions() {
    if (options === undefined || options === null) {
        options = { columnCount: 4, rowCount: 3, barCount: 5, bar2Count: 5, baseFont: 16 } // default
        localStorage.setItem("options", JSON.stringify(options));
    }
    else{
        options = JSON.parse(options)
    }
    applyOptions();
}
function updateOptions(kullanici_yeni_opts) {
    Object.assign(options, kullanici_yeni_opts);
    localStorage.setItem("options", JSON.stringify(options));
    applyOptions();
    fetchCategories();
}
function applyOptions() {
    columnCount = options.columnCount;
    rowCount = options.rowCount;
    cardsPerPage = rowCount * columnCount;
    barCount = options.barCount;
    bar2Count = options.bar2Count;
    baseFont = options.baseFont;

    inject();
}
function inject() {
    $("#content_options").remove();
    let newcss = `<style id="content_options">
                        body {
                            --first-color: rgb(18, 55, 64);
                            --second-color: rgb(84, 154, 171);
                            --second-color-25: rgba(84, 154, 171, 0.25);
                            --third-color: rgb(176, 215, 225);
                            --third-color-50: rgba(176, 215, 225, 0.5);
                            --third-color-25: rgba(176, 215, 225, 0.25);
                            --active-color: rgb(241, 128, 45);
                            --active-color-25: rgb(241, 128, 45, 0.25);
                            --red: rgb(236, 54, 67);
                            --green: rgb(67, 160, 71);
                        
                            --base-font-size: ${baseFont}px;
                            --column-count: ${columnCount};
                            --row-count: ${rowCount};
                            --bar-count: ${barCount};
                            --bar2-count: ${bar2Count};
                            --salesman: "true";
                        }
                    </style>`
    $("head").append(newcss)
}

// get data
async function fetchCategories() {
    try {
        $.ajax({
            url: "./data/categories.json",
            type: "get",
            success: function(res) {
                categories = res;
                mainCategories = categories.filter(category => category.parentId === null);
                renderMainCategories(mainCategories);
                products = categories.filter(x => x.leaf == true);
                currentPage = 1;
                renderProducts(currentPage);
            },
            error: function (err) {
                console.log(err);
            }
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// render product cards
function renderProducts(page) {
    resetProductDetail();

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    $('#cardContainer').empty();
    productsToShow.forEach(product => {
        $('#cardContainer').append(`<div class="productCard" data-product="${product.id}">
                                        <img src="${product.image}" />
                                        <div>
                                            <span class="productName truncatedText2" title="${product.name}">${product.name}</span>
                                            <span class="productPrice">${convert2Price(product.price)}</span>
                                        <div>
                                        <span class="productBarcode">${product.barcode}</span>
                                    </div>`);
    });

    totalPages = Math.ceil(products.length / cardsPerPage);
    $('#totalPages').text(totalPages);
    $('#currentPage').text(page);

    $('#prevPage').prop('disabled', page === 1);
    $('#nextPage').prop('disabled', page === totalPages);
    $('#firstPage').prop('disabled', page === 1);
    $('#lastPage').prop('disabled', page === totalPages);

    $('.productCard').off('click').on('click', function(){
        $('.productCard').removeClass('selected');
        $(this).addClass('selected');
        setProductDetail($(this).data('product'));
    });
}

// render categories
function renderMainCategories(mainCategories) {
    let mainCategoriesContainer = document.getElementById("mainCategoryContainer");
    mainCategoriesContainer.innerHTML = '';
    totalMainPages = Math.ceil(mainCategories.length / barCount);

    if (totalMainPages > 1) document.getElementById("mainCategories").classList.add('carousel');
    else document.getElementById("mainCategories").classList.remove('carousel');

    let pagedMainCategories = mainCategories.slice((currentPageMain - 1) * barCount, currentPageMain * barCount);
    mainCategoriesContainer.innerHTML = pagedMainCategories.map(function (category) {
        return `<div class="mainCategory flexCenter" data-categoryid="${category.id}"><span class="threeDots">${category.name}</span></div>`;
    }).join('');

    // currentPageMain = 1;
    togglePaginationButtons(currentPageMain, totalMainPages, 'main');
}

function renderSubCategories(subCategories) {
    let subCategoriesContainer = document.getElementById('subCategoryContainer');
    subCategoriesContainer.innerHTML = '';
    totalSubPages = Math.ceil(subCategories.length / bar2Count);

    let pagedSubCategories = subCategories.slice((currentPageSub - 1) * bar2Count, currentPageSub * bar2Count);

    subCategoriesContainer.innerHTML = pagedSubCategories.map(function (subCategory) {
        return `<div data-categoryid="${subCategory.id}" class="subCategory flexCenter">
                    <img src="${subCategory.image}" />
                    <span class="threeDots">${subCategory.name}</span>
                </div>`;
    }).join('');

    // Manage navigation buttons
    togglePaginationButtons(currentPageSub, totalSubPages, 'sub');
}

function togglePaginationButtons(currentPage, totalPages, type) {
    let prevBtn = document.getElementById(`${type}PrevBtn`);
    let nextBtn = document.getElementById(`${type}NextBtn`);

    prevBtn.classList.toggle('disabled', currentPage === 1 || totalPages == 0);
    nextBtn.classList.toggle('disabled', currentPage === totalPages || totalPages == 0);
}

function changePage(type, direction) {
    if (type === 'main') {
        if (direction === 'next' && currentPageMain < totalMainPages) {
            currentPageMain++;
        } else if (direction === 'prev' && currentPageMain > 1) {
            currentPageMain--;
        }
        renderMainCategories(mainCategories);
    } else if (type === 'sub') {
        if (direction === 'next' && currentPageSub < totalSubPages) {
            currentPageSub++;
        } else if (direction === 'prev' && currentPageSub > 1) {
            currentPageSub--;
        }
        renderSubCategories(subCategories);
    }
    updateActiveCategory();
}

// category change
function handleMainCategoryClick(categoryId) {
    let newSubCategories = categories.filter(category => category.parentId === categoryId);
    subCategories = newSubCategories.filter(x => x.leaf != true);
    products = categories.filter(x => x.hierarchyPath.includes(`/${categoryId}/`) && x.leaf);
    // products = products.filter(x => x.leaf == true);
    currentPageSub = 1;
    renderSubCategories(subCategories);
    currentPage = 1;
    renderProducts(currentPage);

    activeMainCategory = categoryId;
    activeSubCategory = null
    updateActiveCategory();

    $('#goBackCategory').addClass('show');
}

function handleSubCategoryClick(categoryId) {
    let newSubCategories = categories.filter(category => category.parentId === categoryId);
    if (!newSubCategories.every(x => x.leaf == true)) {
        subCategories = newSubCategories.filter(x => x.leaf != true);
        currentPageSub = 1;
        renderSubCategories(subCategories);
    }
    products = categories.filter(x => x.hierarchyPath.includes(`/${categoryId}/`) && x.leaf);
    currentPage = 1;
    renderProducts(currentPage);

    activeSubCategory = categoryId;
    updateActiveCategory();
}

function updateActiveCategory() {
    if (activeMainCategory != null) {
        $('.mainCategory').removeClass('active');
        $(`.mainCategory[data-categoryid=${activeMainCategory}]`).addClass('active');
    }
    if (activeSubCategory != null) {
        $('.subCategory').removeClass('active');
        $(`.subCategory[data-categoryid=${activeSubCategory}]`).addClass('active');
    }
}

function goBack() {
    if (backArray.length > 1) {
        backArray.pop();
        let previousCategoryId = backArray[backArray.length - 1];
        handleSubCategoryClick(previousCategoryId);
    }
    else {
        $('.mainCategory').removeClass('active');
        products = categories.filter(x => x.leaf == true);
        currentPage = 1;
        renderProducts(currentPage);
        subCategories = [];
        renderSubCategories(subCategories);
        $('#goBackCategory').removeClass('show');
    }
    getPrevCategoryName();
}

function setProductDetail(productId) {
    selectedProductId = productId;
    $('#productDetailDiv').addClass('show');
    $('#chooseProductDiv').addClass('unshow');
    let selectedProduct = categories.find(x => x.id == selectedProductId);
    $("#productDetailImg").attr("src", selectedProduct.image);
    $('#productDetailBarcode').html(selectedProduct.barcode);
    $('#productDetailName').html(selectedProduct.name);
    $('#productDetailPrice').html(convert2Price(selectedProduct.price));
    setUnitPrice(selectedProduct.price);
}

function resetProductDetail() {
    selectedProductId = null;
    $('#productDetailDiv').removeClass('show');
    $('#chooseProductDiv').removeClass('unshow');
    setUnitPrice(0);
}

function getPrevCategoryName(){
    if (backArray.length < 1) {
        $('#goBackCategory span').html('');
    }
    else if (backArray.length == 1) {
        $('#goBackCategory span').html('Genel');
    }
    else {
        let prevCategory = categories.find(x => JSON.stringify(x.id) == JSON.stringify(backArray[backArray.length - 2]));
        $('#goBackCategory span').html(prevCategory.name);
    }
}

// ready
$(document).ready(function () {
    // get options && data
    getOptions();
    fetchCategories();

    // main category click event
    $('#mainCategoryContainer').on('click', '.mainCategory', function () {
        let categoryId = JSON.stringify($(this).data('categoryid'));
        handleMainCategoryClick(categoryId);

        backArray = [];
        backArray.push(categoryId);
        getPrevCategoryName();
    });
    // sub category click event
    $('#subCategoryContainer').on('click', '.subCategory', function () {
        let categoryId = JSON.stringify($(this).data('categoryid'));
        handleSubCategoryClick(categoryId);
        
        let thisCategory = categories.filter(x => x.id == categoryId);
        if (thisCategory[0].hierarchyPath.includes(`/${backArray[(backArray.length - 1)]}/`)) {
            backArray.push(categoryId);
        }
        else {
            backArray.pop();
            backArray.push(categoryId);
        }
        getPrevCategoryName();
    });

    // product paging buttons
    $('#prevPage').click(function () {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
        }
    });
    $('#nextPage').click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentPage);
        }
    });
    $('#firstPage').click(function () {
        currentPage = 1;
        renderProducts(currentPage);
    });
    $('#lastPage').click(function () {
        currentPage = totalPages;
        renderProducts(currentPage);
    });

    // category paging buttons
    $('#mainPrevBtn').click(function () {
        changePage('main', 'prev');
    });
    $('#mainNextBtn').click(function () {
        changePage('main', 'next');
    });
    $('#subPrevBtn').click(function () {
        changePage('sub', 'prev');
    });
    $('#subNextBtn').click(function () {
        changePage('sub', 'next');
    });
});

// setters
function setWeighed(value) {
    let weighed = convert2Kg(value);
    $('#weighed').text(weighed);
}
function setTare(value) {
    let tare = convert2Kg(value);
    $('#tare').text(tare);
}
function setUnitPrice(value) {
    let unitPrice = convert2Price(value);
    $('#unitPrice').text(unitPrice);
}
function setAmount(value) {
    let amount = convert2Price(value);
    $('#amount').text(amount);
}

// common functions
function convert2Price(value) {
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str + "₺";
    }
    else {
        return "0,00 ₺";
    }
}
function convert2Kg(value) {
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str + " kg";
    }
    else {
        return "0,000 kg";
    }
}