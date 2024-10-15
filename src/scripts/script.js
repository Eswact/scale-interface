/*
    TR -- Dokümantasyon
    getFirstView() => İlk görünüm oluşturulur.
    fetchCategories() => tüm kategori ve ürünler çekilir ve "categories" değişkenine atanır. Ardından getFirstView() fonksiyonu çağrılır.
    getOptions() => kullanıcının kaydettiği ayar var ise, onları getirir. Kaydedilmiş bir ayar yok ise, varsayılan ayarlar kullanılır.
    updateOptions(kullanici_yeni_opts) => ayarları güncelleyip kaydetmek için kullanılır. Ardından fetchCategories() fonksiyonu çağrılır.
    NOT: kullanici_yeni_opts => columnCount, rowCount, barCount, bar2Count, baseFont değerlerini içermelidir 
    applyOptions() => inject() => css injection işlemi ile kullanıcının ayarları uygulanır.
    renderProducts(page) => "products" Dizisi içersinde bulunan ürünlere ve page değişkeni göre ürünleri kartlar halinde listeler. "rowCount" ve "columnCount" değişkenleri ile satır/sütun sayısı kullanıcın ayarladığı şekilde olur. 
    renderMainCategories(mainCategories) => parentId'si null Olan ana kategorileri "barCount" değişkenine göre listeler. Eğer barCount'tan fazla ana kategori var ise, yapıyı carousel'e dönüştürür.
    renderSubCategories(subCategories) => parentId'si null Olmayan ama leaf'i true da olmayan alt kategorileri "bar2Count" değişkenine göre listeler.
    togglePaginationButtons(currentPage, totalPages, type) => Ana kategori ve alt kategorilerin sayfalandırılmasında kullanılan bir fonksiyondur. Sayfa geçişlerinde kullanılan butonları etkinleştirir/devre dışı bırakır.
    changePage(type, direction) => Ana kategori ve alt kategorilerin sayfalandırılmasında kullanılan bir fonksiyondur. Sayfa geçişlerinde kullanılır.
    handleMainCategoryClick(categoryId) => Ana kategorilere tıklandığında, tıklanan kategori altındaki leaf'i true olanlar ile ürün kartlarının, leaf'i false olanlar ile de alt kategorilerin oluşmasını sağlar.
    handleSubCategoryClick(categoryId) => Alt kategorilere tıklandığında, tıklanan kategorinin altındaki leaf'i true olanlar ile ürün kartlarının, leaf'i false olanlar ile de alt kategorilerin oluşmasını sağlar.
    updateActiveCategory() => Aktif olan ana kategori ve alt kategorinin görünümünü değiştiren fonksiyondur.
    NOT: Kategoriler arasında geçiş yapılırken kullanıcının ilerlediği yoldaki kategorilerin id'si "backArray" dizisine eklenir.
    goBack() => "backArray" Dizisine göre bir önceki kategori durumuna geçilir. Ürünler ve kategoriler bu duruma göre güncellenir. Sadece geri dönülebilecek bir durum varken çalışır.
    getPrevCategoryName() => "backArray" Dizisinde bulunan bir önceki kategori id'si ile bu kategorinin ismi "categories" dizisinden getirilir ve gösterilir.
    setProductDetail(productId) => Gönderilen id'ye göre ürün detayı kısmını dolduran fonksiyondur.
    resetProductDetail() => Ürün detayı kısmını boşaltan fonksiyondur.
    NOT: Document hazır olduktan sonra sayfa geçişlerini sağlayacak butonlara (#prevPage, #nextPage, #firstPage, #lastPage, #mainPrevBtn, #mainNextBtn, #subPrevBtn, #subNextBtn) tıklama ataması yapılır.
    NOT: setWeighed(), setTare(), setUnitPrice(), setAmount() fonksiyonları ile ekranda yukarıda bulunan değerler ayarlanabilir.
    NOT: convert2Kg(), convert2Price() fonksiyonları ile değer dönüşümleri yapılır.

    EN -- Documentation
    getFirstView() => The first view is created.
    fetchCategories() => All categories and products are fetched and assigned to the "categories" variable. Then, the getFirstView() function is called.
    getOptions() => Retrieves the user's saved settings if available. If there are no saved settings, default settings are used.
    updateOptions(kullanici_yeni_opts) => Used to update and save the settings. Afterward, the fetchCategories() function is called.
    NOT: kullanici_yeni_opts should contain values for columnCount, rowCount, barCount, bar2Count, and baseFont.
    applyOptions() => Applies the user's settings using CSS injection (inject()).
    renderProducts(page) => Lists the products in the "products" array as cards based on the variable page. The number of rows and columns is set according to the user's settings using rowCount and columnCount.
    renderMainCategories(mainCategories) => Lists the main categories with a parentId of null according to the variable barCount. If there are more main categories than barCount, the structure is converted into a carousel.
    renderSubCategories(subCategories) => Lists the subcategories that have a non-null parentId but are not leaves (leaf is false) according to the variable bar2Count.
    togglePaginationButtons(currentPage, totalPages, type) => A function used for paginating main and subcategories. It enables/disables the buttons used for page transitions.
    changePage(type, direction) => A function used for paginating main and subcategories. It is used for page transitions.
    handleMainCategoryClick(categoryId) => When main categories are clicked, it ensures the creation of product cards with leaf=true items under the clicked category and subcategories with leaf=false items.
    handleSubCategoryClick(categoryId) => When subcategories are clicked, it ensures the creation of product cards with leaf=true items under the clicked subcategory and subcategories with leaf=false items.
    updateActiveCategory() => A function that changes the view of the active main category and subcategory.
    NOTE: When switching between categories, the IDs of the categories the user has traversed are added to the "backArray".
    goBack() => Navigates to the previous category state based on the "backArray". Products and categories are updated according to this state. It only works when there is a previous state to return to.
    getPrevCategoryName() => Retrieves the name of the previous category using the category ID found in the "backArray" from the "categories" array and displays it.
    setProductDetail(productId) => A function that fills in the product detail section based on the provided ID.
    resetProductDetail() => A function that clears the product detail section.
    NOTE: After the document is ready, event assignments are made to the buttons for page transitions (#prevPage, #nextPage, #firstPage, #lastPage, #mainPrevBtn, #mainNextBtn, #subPrevBtn, #subNextBtn).
    NOTE: The values above the screen can be set with the functions setWeighed(), setTare(), setUnitPrice(), and setAmount().
    NOTE: Value conversions are made using the functions convert2Kg() and convert2Price().
*/


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
                        :root {
                            --base-font-size: ${baseFont}px;
                        }
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
                        
                            --column-count: ${columnCount};
                            --row-count: ${rowCount};
                            --bar-count: ${barCount};
                            --bar2-count: ${bar2Count};
                            --salesman: "true";
                        }
                    </style>`
    $("head").append(newcss)
}

// 
function getFirstView() {
    currentPageMain = 1;
    currentPageSub = 1
    currentPage = 1;
    mainCategories = categories.filter(category => category.parentId === null);
    renderMainCategories(mainCategories);
    subCategories = []
    renderSubCategories(subCategories);
    products = categories.filter(x => x.leaf == true);
    renderProducts(currentPage);

    backArray = [];
    $('#goBackCategory').removeClass('show');
}
// get data
async function fetchCategories() {
    try {
        $.ajax({
            url: "./data/categories.json",
            type: "get",
            success: function(res) {
                categories = res;
                getFirstView();
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


var confirmation_keypad = Keypad.generateFrom("#numpadContainer", [
    {
        statename: "filter-mod",
        leftActionContent: "<i class='fa fa-magnifying-glass' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
        leftAction: function (keypad) {
            console.log(keypad.getNumericValue(true));
        },
        rightActionContent: "<i class='fa fa-check' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
        rightAction: function (keypad) {
            console.log(keypad.getNumericValue(true));
        },
    },
    {
        statename: "default",
        rightActionContent: "<i class='fa fa-check' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
        rightAction: function (keypad) {
            console.log(keypad.getNumericValue(true));
        }
    },
]);

confirmation_keypad.setState("default");
// confirmation_keypad.setState("filter-mod");