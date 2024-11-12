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
    NOT: setWeighed(), setTare(), setUnitPrice(), setAmount() Fonksiyonları ile ekranda yukarıda bulunan değerler ayarlanabilir.
    NOT: getWeighed(), getTare(), getUnitPrice(), getAmount() Fonksiyonları ile ekranda yukarıda bulunan değerler getirilebilir.
    NOT: convert2Kg(), convert2Price(), reverseConvertFromKg() ve reverseConvertFromPrice() Fonksiyonları ile değer dönüşümleri yapılır.
    calculateTotalAmount() => Anlık olarak toplam tutarı hesaplar (birim fiyat * kg/adet)
    filterByBarcode(value) => Aldığı değere göre ürünler arasında barkod filtrelemesi yapar ve bu değeri içeren barkodları getirir.
    AsideBarButtons(containerId, buttonsPerPage) => Butonları belirtilen container'da sayfa bazlı olarak gösterir.
    loadButtonsFromJSON(jsonFilePath) => JSON dosyasından butonları yükler ve container'a ekler.
    renderButtons() => Mevcut sayfadaki butonları container'da listeler. Eksik buton varsa, boş butonlarla tamamlar.
    handlePagination(direction) => Yön tuşlarına göre sayfa değiştirme işlemi yapar. 'up' veya 'down' yönünde kullanılabilir.
    createArrows() => Aşağı ve yukarı ok butonlarını oluşturur ve container'a ekler.
    KeypadJS kullanılarak keypad oluşturuldu.
    closeModalE() => modalE sınıfına sahip modal'leri kapatmak için kullanılır.
    openAsideButtonsModal(buttonProps) => buttonProps objesine göre #asideButtonsModal modal'ini oluşturur.
    fillAsideButtonsModal(bodyHtml, footerHtml) => bodyHtml ve footerHtml değerlerine göre #asideButtonsModal modal'ini doldurur.
    resetAsideButtonsModal() => #asideButtonsModal modal'inin içeriğini temizler.
    createFavoritesSortable(swap) => swap parametresi ile sıralanabilir bir favori listesi oluşturur.
    createFavoritesList(favorites) => Favorilerden bir HTML listesi oluşturur ve giriş odak/kaydırma olaylarını ele alarak madde sırasını ayarlar.
    updateOrderNumbers(evt) => Sürükle-bırak sıralamaya göre sıra numaralarını günceller.
    saveFavoritesOrder() => Mevcut favori sırasını kaydeder ve kaldırılan öğeleri temizler.
    resetFavorites() => Tüm favorileri kaldırır.
    printProducts(products) => products Değerini konsola yazar.
    resetMemory() => Hafızayı temizler. (inMemory dizisini boşaltır)
    printMemory() => Hafızadaki (inMemory dizisindeki) öğelerin product bilgilerini printProducts(products) fonksiyonunu tetikleyerek yazdırır.
    inMemory2Suspended() => Hafızadaki öğeleri askıya alınmış öğelere taşır. inMemory --> suspendedList
    deleteMemory() => Hafızadaki öğeleri siler.
    printSuspended(id) =>  Verilen idye sahip askıya alınmış öğelerin product bilgilerini printProducts(products) fonksiyonunu tetikleyerek yazdırır.
    deleteSuspended(id) => Verilen idye sahip askıya alınmış öğeleri siler.
    resetSuspended() => Tüm askıya alınmış öğeleri kaldırır.
    fillMemoryCard() => Hafıza kartı ile ilgili içeriği doldurur.
    fillSuspendedList() => Askıya alınmış öğe listesini ilgili içerikle doldurur.

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
    NOTE: The values above the screen can be get with the functions getWeighed(), getTare(), getUnitPrice(), and getAmount().
    NOTE: Value conversions are made using the functions convert2Kg(), convert2Price(), reverseConvertFromKg() and reverseConvertFromPrice().
    calculateTotalAmount(): Calculates the total amount in real-time (unit price * weight/quantity).
    filterByBarcode(value): Filters the products based on the given value and returns the barcodes that contain this value.
    AsideBarButtons(containerId, buttonsPerPage) => Displays buttons paginated inside the specified container.
    loadButtonsFromJSON(jsonFilePath) => Loads buttons from a JSON file and appends them to the container.
    renderButtons() => Renders buttons on the current page. If there are missing buttons, fills them with empty placeholders.
    handlePagination(direction) => Handles pagination based on direction keys. Can be used with 'up' or 'down' direction.
    createArrows() => Creates up and down arrow buttons and appends them to the container.
    Keypad was created using KeypadJS.
    closeModalE() => Closes modals with the class modalE.
    openAsideButtonsModal(buttonProps) => Creates #asideButtonsModal modal based on the buttonProps object.
    fillAsideButtonsModal(bodyHtml, footerHtml) => Fills the #asideButtonsModal modal with body and footer HTML.
    resetAsideButtonsModal() => Clears the content of #asideButtonsModal modal.
    createFavoritesSortable(swap) => Creates a sortable favorites list based on the swap parameter.
    createFavoritesList(favorites) => Creates an HTML list from favorites and handles input focus/blur events to adjust item order.
    updateOrderNumbers(evt) => Updates order numbers based on drag-and-drop sorting.
    saveFavoritesOrder() => Saves the current favorites order and clears removed items.
    resetFavorites() => Removes all favorites.
    printProducts(products) => Logs products value to the console.
    resetMemory() => Clears Memory (inMemory Array). 
    printMemory() => Triggers printProducts(products) to print the product information of items in memory (inMemory Array).
    inMemory2Suspended() => Moves items from memory to suspended items. inMemory --> suspendedList
    deleteMemory() => Deletes items in memory.
    printSuspended(id) => Triggers printProducts(products) to print the product information of suspended items with the given id.
    deleteSuspended(id) => Deletes suspended items with the specified id.
    resetSuspended() => Removes all suspended items.
    fillMemoryCard() => Fills the memory card with the relevant content.
    fillSuspendedList() => Fills the suspended list with the relevant content.
*/

// enums
const scaleModes = {
    default: 0,
    sales: 1
};
const currency = {
    "TRY": {
        rate: 1,
        unit: "₺",
        icon: "fa-solid fa-turkish-lira-sign"
    },
    "USD": {
        rate: 0.029,
        unit: "$",
        icon: "fa-solid fa-dollar-sign"
    },
    "EUR": {
        rate: 0.027,
        unit: "€",
        icon: "fa-solid fa-euro-sign"
    }
};
const paymentStates = {
    waiting: { id: 0, name: 'Bekleniyor', class:"waitingState"},
    completed: { id: 1, name: 'Tamamlandı', class:"completedState"},
    canceled: { id: 2, name: 'İptal Edildi', class:"canceledState"},
};
const paymentOptions = {
    cash: {
        id: 0,
        name: "Nakit",
        image: "./public/images/cash.svg"
    },
    credit_card: {
        id: 1,
        name: "Kredi Kartı",
        image: "./public/images/credit_card.svg"
    },
    food_card: {
        id: 2,
        name: "Yemek Kartı",
        image: "./public/images/food_card.svg"
    },
    eft: {
        id: 3,
        name: "EFT",
        image: "./public/images/eft.svg"
    },
    qr_code: {
        id: 4,
        name: "Qr Kodu",
        image: "./public/images/qr_code.svg"
    }
};


// all data
let categories;

// options
let scaleMode;
let baseCurrency;
let columnCount;
let rowCount;
let barCount;
let bar2Count;
let baseFont;
let sellerman;
let buttonCount;
let basketQuantityButtons;
let basketQuantityInput;

let defaultMaxLimit = 999;

// selected product
let selectedProductId = null;

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

// asideBar
var asideBar;

// favorites
let sortableFavorites;
let swapMode = false;
let tempRemovedFavorites = [];

// memory && suspended
let inMemory = [];
let suspendedList = [];

// sales cart
let salesBasket = [];
let amount2Paid = 0;
let partialPayment = [];

// keypad
var confirmation_keypad;

// css injection
var options = localStorage.getItem("options");
var default_options = { 
    scaleMode: scaleModes.default, 
    baseCurrency: "TRY", 
    columnCount: 4, 
    rowCount: 3, 
    barCount: 5, 
    bar2Count: 5, 
    baseFont: 16, 
    sellerman: false, 
    buttonCount: 5, 
    fullScreen: true, 
    basketQuantityButtons: true, 
    basketQuantityInput: true
};
function getOptions() {
    if (options === undefined || options === null) {
        options = default_options;
        localStorage.setItem("options", JSON.stringify(options));
    }
    else{
        options = Object.assign(default_options, JSON.parse(options));
    }
    applyOptions();
}
function updateOptions(kullanici_yeni_opts) {
    Object.assign(options, kullanici_yeni_opts);
    localStorage.setItem("options", JSON.stringify(options));
    applyOptions();
    fetchCategories();
    // closeModalE();
}
function applyOptions() {
    scaleMode = options.scaleMode;
    baseCurrency = options.baseCurrency;
    setFirstKeypad();
    columnCount = options.columnCount;
    rowCount = options.rowCount;
    cardsPerPage = rowCount * columnCount;
    barCount = options.barCount;
    bar2Count = options.bar2Count;
    baseFont = options.baseFont;
    sellerman = options.sellerman ? "flex" : "none";
    options.fullScreen ? $('#content').addClass('full') : $('#content').removeClass('full');
    basketQuantityButtons = options.basketQuantityButtons ? "block" : "none";
    basketQuantityInput = options.basketQuantityInput;
    asideBar = new AsideBarButtons("#buttonsSide nav ul", options.buttonCount);
    asideBar.loadButtonsFromJSON('././data/buttons.json');

    if (scaleMode == scaleModes.sales) {
        $('#content').append(`<button onclick="openBasket()" id="openBasketButton">
                                    <i class="fa-solid fa-basket-shopping"></i>
                                    <div id="basketProductCounter"></div>
                                </button>`);
    }
    $('#unitPriceCurrency').html(`(<i class="${currency[baseCurrency].icon}"></i>)`);
    $('#totalPriceCurrency').html(`(<i class="${currency[baseCurrency].icon}"></i>)`);

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
                            --first-color-25: rgba(18, 55, 64, 0.25);
                            --first-color-75: rgba(18, 55, 64, 0.75);
                            --second-color: rgb(84, 154, 171);
                            --second-color-50: rgba(84, 154, 171, 0.55);
                            --second-color-25: rgba(84, 154, 171, 0.25);
                            --second-color-10: rgba(84, 154, 171, 0.10);
                            --third-color: rgb(176, 215, 225);
                            --third-color-50: rgba(176, 215, 225, 0.5);
                            --third-color-25: rgba(176, 215, 225, 0.25);
                            --active-color: rgb(241, 128, 45);
                            --active-color-25: rgb(241, 128, 45, 0.25);
                            --scale-color: rgb(57, 239, 57);
                            --scale-bg: rgb(41, 31, 31);
                            --red: rgb(236, 54, 67);
                            --green: rgb(67, 160, 71);
                        
                            --column-count: ${columnCount};
                            --row-count: ${rowCount};
                            --bar-count: ${barCount};
                            --bar2-count: ${bar2Count};
                            --sellerman: ${sellerman};
                            --buttonCount: ${buttonCount};
                            --basket-quantity-buttons: ${basketQuantityButtons};
                        }
                    </style>`
    $("head").append(newcss)
}

// reset view
function getFirstView() {
    currentPageMain = 1;
    currentPageSub = 1
    currentPage = 1;
    activeMainCategory = null;
    activeSubCategory = null;
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

    let favProducts = products.filter(product => product.isFav).sort((a, b) => a.favOrder - b.favOrder);
    let nonFavProducts = products.filter(product => !product.isFav);
    let sortedProducts = [...favProducts, ...nonFavProducts];

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;
    const productsToShow = sortedProducts.slice(startIndex, endIndex);

    $('#cardContainer').empty();
    productsToShow.forEach(product => {
        $('#cardContainer').append(`<div class="productCard ${(product.isFav)?'favorite':''} ${(inMemory.find(x => x.id == product.id))?'memory':''} ${(salesBasket.find(x => x.id == product.id))?'basket':''}" data-product="${product.id}">
                                        <div class="productCardIcons">
                                            <i class="fa-solid fa-heart"></i>
                                            <i class="fa-solid fa-sd-card"></i>
                                        </div>
                                        <i class="fa-solid fa-basket-shopping"></i>
                                        <img src="${product.image || './public/images/default_image.png'}" onerror="this.src='./public/images/default_image.png';" />
                                        <div>
                                            <span class="productName truncatedText2" title="${product.name}">${product.name}</span>
                                            <span class="productPrice">${convert2PriceWithUnit(product.price, currency[product.currency].unit)}</span>
                                        <div>
                                        <span class="productBarcode"><span>${product.barcode}</span><span>${product.unitName}</span></span>
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

    $('#filterValue').html(``);
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
    backArray.pop();
    if (backArray.length > 0) {
        let previousCategoryId = backArray[backArray.length - 1];
        handleSubCategoryClick(previousCategoryId);
        if (backArray.length != 1) { activeSubCategory = previousCategoryId; }
        else { activeSubCategory = null; }
    }
    else {
        activeMainCategory = null;
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

// product detail
function setProductDetail(productId) {
    selectedProductId = productId;
    $('#productDetailDiv').addClass('show');
    $('#chooseProductDiv').addClass('unshow');
    let selectedProduct = categories.find(x => x.id == selectedProductId);
    $("#productDetailImg").attr("src", selectedProduct.image || './public/images/default_image.png');
    $('#productDetailBarcode').html(selectedProduct.barcode);
    $('#productDetailName').html(selectedProduct.name);
    $('#productDetailPrice').html(convert2PriceWithUnit(selectedProduct.price, currency[selectedProduct.currency].unit));
    if (selectedProduct.isFav) { $('#productDetailDiv').addClass('favorites'); }
    else { $('#productDetailDiv').removeClass('favorites'); }
    setUnitPrice(selectedProduct.price, selectedProduct.currency);
    if ($('.keypad-header input').val() != '' && confirmation_keypad._currentState == 'default') { setWeighed(confirmation_keypad.getNumericValue(true)); }
    else { if (!selectedProduct.ponderable && scaleMode != scaleModes.sales) { setWeighed(1); } }
    calculateTotalAmount();

    if(scaleMode == scaleModes.sales) {
        add2Basket();
    }
}
function resetProductDetail() {
    selectedProductId = null;
    $('#productDetailDiv').removeClass('show');
    $('#chooseProductDiv').removeClass('unshow');
    $('.productCard').removeClass('selected');
    setUnitPrice(0);
    calculateTotalAmount();

    $('#chooseProductDiv').html('Lütfen ürün seçimi yapınız');
}

// barcode filter
function filterByBarcode(value) {
    getFirstView();
    products = categories.filter(x => JSON.stringify(x.barcode).includes(value));
    renderProducts(currentPage);
    $('#filterValue').html(`<span>${value}</span> barkoduna göre filtrelenmiştir`);

    backArray.push('');
    $('#goBackCategory').addClass('show');
    getPrevCategoryName();
}

// amount calcutor
function calculateTotalAmount() {
    setAmount(getWeighed() * getUnitPrice());
}

// modals
function closeModalE() {
    $('.modalE').removeClass('show');
}

function openAsideButtonsModal(buttonProps) {
    let currentButtonProps;
    let defaultButtonProps = {name: '', iconClass: '', modalWidth: 400, modalHeight: 400};
    if (buttonProps) { currentButtonProps = Object.assign(defaultButtonProps, buttonProps); }
    else { currentButtonProps = defaultButtonProps; }
    $('#asideButtonsModal .modalBg .modalHeader .modalInfo h2').text(currentButtonProps.name);
    $('#asideButtonsModal .modalBg .modalHeader .modalInfo i').attr('class', currentButtonProps.iconClass);
    $('#asideButtonsModal .modalBg').css({
        "width": `${currentButtonProps.modalWidth}px`,
        "height": `${currentButtonProps.modalHeight}px`
    });
    $('#asideButtonsModal').addClass('show');
}
function fillAsideButtonsModal(bodyHtml, footerHtml) {
    $('#asideButtonsModal .modalBg .modalBody').html(bodyHtml || '');
    $('#asideButtonsModal .modalBg .modalFooter').html(footerHtml || '');
}
function resetAsideButtonsModal() {
    $('#asideButtonsModal .modalBg .modalBody').html('');
    $('#asideButtonsModal .modalBg .modalFooter').html('');
}

// favorites
function createFavoritesSortable(swap) {
    sortableFavorites = Sortable.create(document.getElementById('favoritesList'), {
        animation: 150,
        swap: swap,
        swapClass: "highlight",
        handle: '.favorite-item .handle',
        ghostClass: 'ghost-item',
        filter: ".ignore-elements",
        onEnd: function(evt) {
            updateOrderNumbers(evt);
        }
    });
}

function createFavoritesList(favorites) {
    let tempFavorites = JSON.parse(JSON.stringify(favorites.sort((a, b) => a.favOrder - b.favOrder)));
    let favotireList = tempFavorites.map((fav, index) => {
        return `<li class="favorite-item" data-id="${fav.id}" data-order=${fav.favOrder}>
                    <i class="handle fa-solid fa-grip-vertical"></i>
                    <input type="number" class="fav-order-input" value="${fav.favOrder}" min="1" />
                    <div class="pageInfo">
                        <span>${Math.ceil(fav.favOrder / cardsPerPage)}/${(fav.favOrder % cardsPerPage == 0) ? cardsPerPage : fav.favOrder % cardsPerPage}</span>
                    </div>
                    <div class="itemInfoDiv">
                        <span class="fav-barcode three-dots">[${fav.barcode}]</span>
                        <span class="fav-name three-dots">${fav.name}</span>
                    </div>
                    <button class="removeFromFavoriteList ignore-elements"><i class="fa-solid fa-trash-can"></i></button>
                </li>`;
    }).join('');
    $('#favoritesList').html(favotireList);

    $('.fav-order-input').on('focus', function() {
        sortableFavorites.option('disabled', true);
    });

    $('.fav-order-input').off('blur').on('blur', function() {
        sortableFavorites.option('disabled', false);

        const input = $(this);
        const currentItemId = JSON.stringify(input.closest('.favorite-item').data('id'));
        const currentItem = tempFavorites.find(fav => fav.id == currentItemId);
        const oldOrder = currentItem.favOrder;
        const newOrder = parseInt(input.val());

        //controls
        if (isNaN(newOrder) || newOrder <= 0) {
            input.val(oldOrder);
            return;
        }
        if (newOrder > tempFavorites.length) {
            input.val(tempFavorites.length);
        }

        // current
        currentItem.favOrder = parseInt(input.val());

        // others
        tempFavorites.forEach(fav => {
            if (fav.id !== currentItemId) {
                if (currentItem.favOrder < oldOrder && fav.favOrder >= currentItem.favOrder && fav.favOrder < oldOrder) {
                    fav.favOrder += 1;
                }
                if (currentItem.favOrder > oldOrder && fav.favOrder <= currentItem.favOrder && fav.favOrder > oldOrder) {
                    fav.favOrder -= 1;
                }
            }
        });

        createFavoritesList(tempFavorites);
    });

    $('.removeFromFavoriteList').off('click').on('click', function(){
        removedId = $(this).closest('.favorite-item').data('id');
        tempRemovedFavorites.push(JSON.stringify(removedId));
        let currentFavoritesOrder = getCurrentFavoritesOrder(tempFavorites);
        removedFavOrder = currentFavoritesOrder.find(x => x.id == removedId).favOrder;
        currentFavoritesOrder.splice(currentFavoritesOrder.findIndex(x => x.id == removedId),1);
        currentFavoritesOrder.forEach(function(item,index){
            if (item.favOrder > removedFavOrder) {
                item.favOrder--;
            }
        });

        createFavoritesList(currentFavoritesOrder);
    });

    function getCurrentFavoritesOrder(tempFavorites) {
        $('.favorite-item').each(function() {
            let id = JSON.stringify($(this).data('id'));
            let favOrder = parseInt($(this).data('order'), 10);
            let category = tempFavorites.find(cat => cat.id == id);
            if (category) {
                category.favOrder = favOrder;
            }
        });
        return tempFavorites
    }

    $('#favoriteCategoryFilter input').off('change').on('change', function(){
        selectedCategoryFilter();
    });

    function selectedCategoryFilter() {
        let activeSelectedCategory = activeSubCategory || activeMainCategory;
        if ($('#favoriteCategoryFilter input').is(':checked') && activeSelectedCategory) {
            tempFavorites.forEach(function(item,index){
                if (item.hierarchyPath.includes(`/${activeSelectedCategory}/`)) {
                    $(`.favorite-item[data-id=${item.id}]`).css('display','flex');
                }
                else {
                    $(`.favorite-item[data-id=${item.id}]`).css('display','none');
                }
            });
            swapMode = true;
        }
        else {
            $(`.favorite-item`).css('display','flex');
            swapMode = false;
        }

        if (sortableFavorites) { sortableFavorites.destroy(); }
        createFavoritesSortable(swapMode);
    }

    if ($('#favoriteCategoryFilter input').is(':checked')) {
        $('#favoriteCategoryFilter input').trigger('change')
    }
}

function updateOrderNumbers(evt) {
    let oldIndex = evt.oldIndex + 1;
    let newIndex = evt.newIndex + 1;
    let $oldItem = $(`.favorite-item[data-order=${oldIndex}]`);
    let $newItem = $(`.favorite-item[data-order=${newIndex}]`);

    if (newIndex > $('.favorite-item').length) {
        newIndex = $('.favorite-item').length;
    }

    if (swapMode) {
        $oldItem.attr('data-order', newIndex).find('input').val(newIndex);
        $newItem.attr('data-order', oldIndex).find('input').val(oldIndex);
    }
    else {
        if (newIndex > oldIndex) {
            for (let i = oldIndex + 1; i <= newIndex; i++) {
                $(`.favorite-item[data-order=${i}]`).find('input').val(i - 1);
                $(`.favorite-item[data-order=${i}]`).attr('data-order', i - 1);
            }
        } 
        if (newIndex < oldIndex) {
            for (let i = oldIndex - 1; i >= newIndex; i--) {
                $(`.favorite-item[data-order=${i}]`).find('input').val(i + 1);
                $(`.favorite-item[data-order=${i}]`).attr('data-order', i + 1);
            }
        }
        $oldItem.find('input').val(newIndex);
        $oldItem.attr('data-order', newIndex);
    }

    updatePageInfo();
}

function updatePageInfo() {
    $('.favorite-item').each(function() {
        let $item = $(this);
        let order = parseInt($item.attr('data-order'), 10);
        let page = Math.ceil(order / cardsPerPage);
        let position = ((order - 1) % cardsPerPage) + 1;
        $item.find('.pageInfo span').text(`${page}/${position}`);
    });
}

function saveFavoritesOrder() {
    if (tempRemovedFavorites != '') {
        tempRemovedFavorites.forEach(function(item, index){
            let category = categories.find(cat => cat.id == item);
            if (category) {
                category.isFav = false;
                category.favOrder = null;
            }
        });
    }
    tempRemovedFavorites = [];

    $('.favorite-item').each(function() {
        let id = JSON.stringify($(this).data('id'));
        let favOrder = parseInt($(this).data('order'), 10);
        let category = categories.find(cat => cat.id == id);
        if (category) {
            category.favOrder = favOrder;
        }
    });
    
    currentPage = 1;
    renderProducts(currentPage);
    closeModalE();
    alert("Değişiklikler gerçekleşti.");
}

function resetFavorites() {
    if (confirm("Emin misiniz?") == true) {
        categories.forEach(function(category, index) {
            category.isFav = false;
            category.favOrder = null;
        });

        currentPage = 1;
        renderProducts(currentPage);
        closeModalE();
        alert("Tüm favoriler kaldırıldı.");
    }
}

function isFavoritesChanged() {
    return categories
        .filter(x => x.isFav)
        .sort((a, b) => a.favOrder - b.favOrder)
        .some((item, index) => {
            return !$(`.favorite-item[data-id=${item.id}]`).is(':visible') || 
                   $(`.favorite-item[data-id=${item.id}]`).attr('data-order') != item.favOrder;
        });
}

// print && memory && suspended
function printProducts(products){
    console.log(products);
}

function resetMemory() {
    inMemory = [];
    $('.productCard').removeClass('memory');
    fillMemoryCard();
}
function printMemory() {
    if (confirm("Emin misiniz?") == true) {
        printProducts(inMemory);
        resetMemory();
        closeModalE();
        alert("Yazdırma işlemi gerçekleşti.");
    }
}
function printMemoryFromKeypad() {
    if (confirm("Emin misiniz?") == true) {
        printProducts(inMemory);
        resetMemory();
        alert("Yazdırma işlemi gerçekleşti.");
    }
    else {
        let removedItem = inMemory.pop();
        $(`.productCard[data-product=${removedItem.id}]`).removeClass('memory');
    }
}
function inMemory2Suspended() {
    if (confirm("Emin misiniz?") == true) {
        if (inMemory != '') {
            let maxId = (suspendedList.length > 0) ? Math.max(...suspendedList.map(item => item.id)) + 1 : 1;
            suspendedList.push({
                id: maxId,
                products: inMemory
            });
        }
        resetMemory();
        fillMemoryCard();
        fillSuspendedList();
        alert("Hafıza askıya alındı.");
        $('#resetSuspended').attr('disabled', false);
    }
}
function deleteMemory() {
    if (confirm("Emin misiniz?") == true) {
        inMemory = [];
        $('.productCard').removeClass('memory');
        fillMemoryCard();
    }
}

function printSuspended(id) {
    if (confirm("Emin misiniz?") == true) {
        printProducts(suspendedList.find(x => x.id = id).products);
        suspendedList.splice(suspendedList.findIndex(x => x.id = id), 1);
        if (suspendedList == '') {
            if (inMemory == '') {
                closeModalE();
            }
            else {
                $('#resetSuspended').attr('disabled', true);
                fillSuspendedList();
            }
        }
        else {
            fillSuspendedList();
        }
    }
}
function deleteSuspended(id) {
    if (confirm("Emin misiniz?") == true) {
        suspendedList.splice(suspendedList.findIndex(x => x.id = id), 1);
        if (suspendedList == '') {
            if (inMemory == '') {
                closeModalE();
            }
            else {
                $('#resetSuspended').attr('disabled', true);
                fillSuspendedList();
            }
        }
        else {
            fillSuspendedList();
        }
    }
}
function resetSuspended() {
    if (confirm("Emin misiniz?") == true) {
        suspendedList = [];
        if (inMemory == '') {
            closeModalE();
        }
        else {
            $('#resetSuspended').attr('disabled', true);
            fillSuspendedList();
        }
        alert("Askı listesi sıfırlandı.");
    }
}

function toggleListVis(id) {
    $(`.suspendedCard[data-id=${id}] .liCard`).toggleClass('showFull');
}
function fillMemoryCard() {
    $('#memoryCardDiv').html('');
    if (inMemory != '') {
        let sumPrice = inMemory.reduce((total, item) => total + item.amount, 0);
        let shortList = inMemory.slice(0, 2).map(function(item, index) {
            return `<li>
                        <span class="liBarcode">[${item.barcode}]</span>
                        <span class="liPrice">(${(item.ponderable) ? convert2Kg(item.weighed) : item.weighed} x ${convert2PriceWithUnit(item.unitPrice)} = <span class="singleAmount">${convert2PriceWithUnit(item.amount)}</span>)</span>
                        <span class="liName">${item.name}</span>
                        <span class="liUnit">${item.unitName}</span>
                    </li>`
        }).join('');
        let longList = inMemory.map(function(item, index) {
            return `<li>
                        <span class="liBarcode">[${item.barcode}]</span>
                        <span class="liPrice">(${(item.ponderable) ? convert2Kg(item.weighed) : item.weighed} x ${convert2PriceWithUnit(item.unitPrice)} = <span class="singleAmount">${convert2PriceWithUnit(item.amount)}</span>)</span>
                        <span class="liName">${item.name}</span>
                        <span class="liUnit">${item.unitName}</span>
                    </li>`
        }).join('');

        $('#memoryCardDiv').html(`<h3>Anlık Hafıza</h3>
                                    <div id="memoryCard" class="suspendedCard" data-id="0">
                                        <div class="liCard">
                                            <div class="productLists">
                                                <ul class="shortList">
                                                    ${shortList}
                                                    ${inMemory.length > 2 ? `<li><button onclick="toggleListVis(0)" class="showFullListButton"><i class="fa-solid fa-chevron-down"></i></button></li>` : ''}
                                                </ul>
                                                <ul class="longList">
                                                    ${longList}
                                                     ${inMemory.length > 2 ? `<li><button onclick="toggleListVis(0)" class="showShortListButton"><i class="fa-solid fa-chevron-up"></i></button></li>` : ''}
                                                </ul>
                                                <div>
                                                    <span>Kalem: ${inMemory.length}</span>
                                                    <span>Yekün: ${convert2PriceWithUnit(sumPrice)}</span>
                                                </div>
                                            </div>
                                            <div class="actionButtons">
                                                <button onclick="deleteMemory()" class="deleteLiButton"><i class="fa-solid fa-trash-can"></i></button>
                                                <button onclick="inMemory2Suspended()" class="suspendLiButton"><i class="fa-regular fa-clock"></i></button>
                                                <button onclick="printMemory()" class="printLiButton"><i class="fa-solid fa-print"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="hrSpace"/>`);
    }
}
function fillSuspendedList() {
    $('#suspendedListDiv').html('Askı listesi boş');
    if (suspendedList != '') {
        let suspendedListHtml = '';
        suspendedList = suspendedList.sort((a, b) => b.id - a.id);
        suspendedList.forEach(function(suspend, index) {
            let sumPrice = suspend.products.reduce((total, item) => total + item.amount, 0);
            let shortList = suspend.products.slice(0, 2).map(function(item, index) {
                return `<li>
                            <span class="liBarcode">[${item.barcode}]</span>
                            <span class="liPrice">(${convert2Kg(item.weighed)} x ${convert2PriceWithUnit(item.unitPrice)} = <span class="singleAmount">${convert2PriceWithUnit(item.amount)}</span>)</span>
                            <span class="liName">${item.name}</span>
                            <span class="liUnit">${item.unitName}</span>
                        </li>`
            }).join('');
            let longList = suspend.products.map(function(item, index) {
                return `<li>
                            <span class="liBarcode">[${item.barcode}]</span>
                            <span class="liPrice">(${item.weighed} x ${convert2PriceWithUnit(item.unitPrice)} = <span class="singleAmount">${convert2PriceWithUnit(item.amount)}</span>)</span>
                            <span class="liName">${item.name}</span>
                            <span class="liUnit">${item.unitName}</span>
                        </li>`
            }).join('');

            suspendedListHtml += `<div class="suspendedCard" data-id="${suspend.id}">
                                            <div class="liCard">
                                                <div class="productLists">
                                                    <ul class="shortList">
                                                        ${shortList}
                                                        ${suspend.products.length > 2 ? `<li><button onclick="toggleListVis(${suspend.id})" class="showFullListButton"><i class="fa-solid fa-chevron-down"></i></button></li>` : ''}
                                                    </ul>
                                                    <ul class="longList">
                                                        ${longList}
                                                        ${suspend.products.length > 2 ? `<li><button onclick="toggleListVis(${suspend.id})" class="showShortListButton"><i class="fa-solid fa-chevron-up"></i></button></li>` : ''}
                                                    </ul>
                                                    <div>
                                                        <span>Kalem: ${suspend.products.length}</span>
                                                        <span>Yekün: ${convert2PriceWithUnit(sumPrice)}</span>
                                                    </div>
                                                </div>
                                                <div class="actionButtons">
                                                    <button onclick="deleteSuspended(${suspend.id})" class="deleteLiButton"><i class="fa-solid fa-trash-can"></i></button>
                                                    <button onclick="printSuspended(${suspend.id})" class="printLiButton"><i class="fa-solid fa-print"></i></button>
                                                </div>
                                            </div>
                                        </div>`;
        });
        $('#suspendedListDiv').html(suspendedListHtml);
    }
}

// salesBasket
function add2Basket() {
    if (selectedProductId != null) {
        if (getWeighed() <= 0 && selectedProductId != null) {
            return;
        }

        let existingProduct = salesBasket.find(x => x.id == selectedProductId);
        let productLimit = categories.find(x => x.id == selectedProductId).limit || defaultMaxLimit;
        let newWeighed = (getWeighed() < productLimit) ? getWeighed() : productLimit;
        if (!existingProduct) {
            salesBasket.push({
                id: typeof selectedProductId === 'string' ? selectedProductId : JSON.stringify(selectedProductId),
                name: categories.find(x => x.id == selectedProductId).name,
                barcode: categories.find(x => x.id == selectedProductId).barcode,
                image: categories.find(x => x.id == selectedProductId).image,
                ponderable: categories.find(x => x.id == selectedProductId).ponderable,
                unitName: categories.find(x => x.id == selectedProductId).unitName,
                limit: productLimit,
                weighed: newWeighed,
                unitPrice: getUnitPrice(),
                tare: getTare(),
                amount: getAmount()
            });
        } else {
            if (existingProduct.weighed + newWeighed >= existingProduct.limit) {
                newWeighed = existingProduct.limit - existingProduct.weighed;
            }
            existingProduct.weighed += newWeighed;
            existingProduct.amount += getAmount();
        }

        let notificationText;
        if (newWeighed > 0) { notificationText = `${(categories.find(x => x.id == selectedProductId).ponderable) ? `${convert2KgWithUnit(newWeighed, categories.find(x => x.id == selectedProductId).unitName)}` : `${newWeighed} ${categories.find(x => x.id == selectedProductId).unitName}`} ${categories.find(x => x.id == selectedProductId).name} sepete eklendi.`; }
        else { notificationText = `Maksimum miktarda ${categories.find(x => x.id == selectedProductId).name} sepette bulunuyor.`}
        $(`.productCard[data-product=${selectedProductId}]`).addClass('basket');
        resetProductDetail();
        $('#chooseProductDiv').html(notificationText);
        setWeighed(0);

        basketNotification();
    }
}

function reloadBasketProductList() {
    let basketProductList = '';
    salesBasket.forEach(function(item, index){
        basketProductList += `<li data-product="${item.id}">
                                <button onclick="deleteBasketLine(${item.id})" class="deleteLine"><i class="fa-solid fa-trash-can"></i></button>
                                <div class="productInfos">
                                    <img src="${item.image || './public/images/default_image.png'}" onerror="this.src='./public/images/default_image.png';"/>
                                    <div>
                                        <span>[${item.barcode}]</span>
                                        <span title="${item.name}" class="itemName threeDots">${item.name}</span>
                                        <span>(${item.unitName})</span>
                                    </div>
                                </div>
                                <div class="payInfo">
                                    <div class="quantityInfo">
                                        <button onclick="decreaseWeigh(${item.id})"><i class="fa-solid fa-minus"></i></button>
                                        <input onblur="setCustomWeigh(${item.id})" class="quantityInput" type="number" min="0" value="${(item.ponderable) ? convert2Kg(item.weighed).replace(',','.') : item.weighed}" ${!basketQuantityInput ? 'disabled' : ''}/>
                                        <button onclick="incrementWeigh(${item.id})"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                    <div class="priceInfo">
                                        <span class="calculateSpan threeDots">${(item.ponderable) ? convert2Kg(item.weighed) : item.weighed} x ${convert2PriceWithUnit(item.unitPrice)}</span>
                                        <span class="amountSpan threeDots">${convert2PriceWithUnit(item.amount)}</span>
                                    </div>
                                </div>
                            </li>`
    });
    updateTotalPrice();
    return basketProductList;
}

function updateTotalPrice() {
    $('#lineItemCount').text(`${salesBasket.length}`);
    $('#totalPrice').text(`${convert2PriceWithUnit(salesBasket.reduce(function(total, item){ return total + item.amount },0))}`);
    updateAmount2Paid(salesBasket.reduce(function(total, item){ return total + item.amount },0));
    
}
function updateAmount2Paid(amount) {
    amount2Paid = amount;
    $('#amount2PaidSpan').text(`${convert2PriceWithUnit(amount)}`);
}

function incrementWeigh(id) {
    let currentProduct = salesBasket.find(x => x.id == id);
    if (currentProduct.weighed + 1 <= currentProduct.limit) {
        currentProduct.weighed = currentProduct.weighed + 1;
        lineWeighUpdate(currentProduct);
    }
}
function decreaseWeigh(id) {
    let currentProduct = salesBasket.find(x => x.id == id);
    if (currentProduct.weighed - 1 > 0) {
        currentProduct.weighed = currentProduct.weighed - 1;
        lineWeighUpdate(currentProduct);
    }
}
function setCustomWeigh(id) {
    let currentProduct = salesBasket.find(x => x.id == id);
    if ($(`#basketProductListSection li[data-product=${currentProduct.id}] .quantityInput`).val() > 0) {
        if ($(`#basketProductListSection li[data-product=${currentProduct.id}] .quantityInput`).val() <= currentProduct.limit) {
            currentProduct.weighed = parseFloat($(`#basketProductListSection li[data-product=${currentProduct.id}] .quantityInput`).val());
        }
        else {
            currentProduct.weighed = currentProduct.limit;
        }
    }
    else {
        currentProduct.weighed = 1;
    }
    lineWeighUpdate(currentProduct);
}
function lineWeighUpdate(currentProduct) {
    currentProduct.amount = currentProduct.weighed * currentProduct.unitPrice;
    if (currentProduct.ponderable) {
        $(`#basketProductListSection li[data-product=${currentProduct.id}] .quantityInput`).val(convert2Kg(currentProduct.weighed).replace(',','.'));
    }
    else {
        $(`#basketProductListSection li[data-product=${currentProduct.id}] .quantityInput`).val(currentProduct.weighed);
    }
    $(`#basketProductListSection li[data-product=${currentProduct.id}] .calculateSpan`).text(`${(currentProduct.ponderable) ? convert2Kg(currentProduct.weighed) : currentProduct.weighed} x ${convert2PriceWithUnit(currentProduct.unitPrice)}`);
    $(`#basketProductListSection li[data-product=${currentProduct.id}] .amountSpan`).text(`${convert2PriceWithUnit(currentProduct.amount)}`);

    updateTotalPrice();
}

function deleteBasketLine(id) {
    let productIndex = salesBasket.findIndex(x => x.id == id);
    salesBasket.splice(productIndex, 1);
    let newBasketProductList = reloadBasketProductList();
    $('#basketProductListSection ul').html(newBasketProductList);
    $(`.productCard[data-product=${id}]`).removeClass('basket');
    basketNotification();
    if (!salesBasket.length) {
        closeModalE();
    }
}
function breakBasket() {
    if (confirm("Sepet bozulacak. Emin misiniz?") == true) {
        salesBasket = [];
        basketNotification();
        $(`.productCard`).removeClass('basket');
        updateAmount2Paid(0);
        partialPayment = [];
        closeModalE();
    }
}

function basketNotification() {
    $('#basketProductCounter').html(salesBasket.length);
    if (salesBasket.length) {
        $('#basketButton').addClass('notif');
        $('#openBasketButton').addClass('show');
    }
    else {
        $('#basketButton').removeClass('notif');
        $('#openBasketButton').removeClass('show');
    }
}
function openBasket() {
    asideBar.executeButtonAction('basketButton');
    resetProductDetail();
}

function fillPaymentOptions() {
    let paymentOptionsArray = Object.keys(paymentOptions).map((key) =>  paymentOptions[key]);
    $('.paymentOptions').html(paymentOptionsArray.map(function(item) {
        return `<button data-option=${item.id} title="${item.name}"><img src="${item.image}" alt="${item.name}" /></button>`;
    }).join(''));
    $('.paymentOptions button:first-child').addClass('selected');
}

function disableBasketProductList() {
    $('#basketProductListSection ul').addClass('disabled');
    $('#basketProductListSection ul button, #basketProductListSection ul input').attr('disabled', true);
}


function completePayment(amount, option ,amountOfChange) {
    let optionName;
    (option != null && option != undefined) ? optionName = getPaymentName(option)  : optionName = getPaymentName($('#basketPaymentSection .paymentOptions button.selected').data('option'));
    if (confirm(`${optionName} yöntemi ile ${convert2PriceWithUnit(amount)} tutarında ödeme yapılacak. ${(amountOfChange) ? `para üstü: ${convert2PriceWithUnit(amountOfChange)}` : ''}`) == true) {
        salesBasket = [];
        basketNotification();
        $(`.productCard`).removeClass('basket');
        updateAmount2Paid(0);
        partialPayment = [];
        closeModalE();
    }
}

function getPaymentStateName(stateId) {
    let selectedStatus = Object.values(paymentStates).find(option => option.id === stateId);
    return selectedStatus ? selectedStatus.name : null;
}
function getPaymentStateClass(stateId) {
    let selectedStatus = Object.values(paymentStates).find(option => option.id === stateId);
    return selectedStatus ? selectedStatus.class : null;
}
function getPaymentName(optionId) {
    let selectedPayment = Object.values(paymentOptions).find(option => option.id === optionId);
    return selectedPayment ? selectedPayment.name : null;
}
function makePartialPayment(partialAmount) {
    // amount2Paid'ten büyük mü kontrolü
    if (confirm(`${getPaymentName($('#basketPaymentSection .paymentOptions button.selected').data('option'))} yöntemi ile ${convert2PriceWithUnit(partialAmount)} tutarında ödeme oluşturulacak.`)) {
        partialPayment.push({
            id: partialPayment.length > 0 ? Math.max(...partialPayment.map(payment => payment.id)) + 1 : 1,
            state: paymentStates.waiting.id,
            option: $('#basketPaymentSection .paymentOptions button.selected').data('option'),
            amount: partialAmount
        });
        createPartialPaymentList();
        // updateAmount2Paid(amount2Paid - partialAmount);
        disableBasketProductList();
    }
}
function createPartialPaymentMenuItems(itemId, state, event) {
    const menuItems = [];
    if (state === paymentStates.waiting.id) {
        menuItems.push({ name: 'Tamamla', action: `completePaymentAction(${itemId})` });
        menuItems.push({ name: 'İptal Et', action: `cancelPaymentAction(${itemId})` });
    } else if (state === paymentStates.completed.id) {
        menuItems.push({ name: 'İade Et', action: `refundPaymentAction(${itemId})` });
    }
    createContextMenu(menuItems, event);
}
function createPartialPaymentList() {
    $('.partialPaymentList ul').html(partialPayment.map(function(item) {    
        return `<li data-id="${item.id}" data-state="${item.state}" class="partialPaymentLi ${getPaymentStateClass(item.state)}">
                    <div class="partialPaymentState">${getPaymentStateName(item.state)}</div>
                    <span class="partialPaymentOption">${getPaymentName(item.option)}</span>
                    <span class="partialPaymentPrice">${convert2PriceWithUnit(item.amount)}</span>
                </li>`;
    }).join(''));

    $('li.partialPaymentLi').on('click', function(event) {
        const paymentId = $(this).data('id');
        const paymentState = $(this).data('state');
        createPartialPaymentMenuItems(paymentId, paymentState, event);
    });
}
function completePaymentAction(itemId) {
    let selectedPartialPayment = partialPayment.find(x => x.id == itemId);
    if (selectedPartialPayment.amount >= amount2Paid) {
        if (selectedPartialPayment.option != paymentOptions.cash.id) {
            alert('Ödenecek tutardan daha fazla girdiğiniz için düzeltme yapıldı.');
            completePayment(amount2Paid, selectedPartialPayment.option);
        }
        else {
            completePayment(selectedPartialPayment.amount, selectedPartialPayment.option, selectedPartialPayment.amount - amount2Paid);
        }
    }
    else {
        updateAmount2Paid(amount2Paid - selectedPartialPayment.amount);
        updatePaymentState(itemId, paymentStates.completed.id);
    }
    $('#contextMenuContainer').hide();
}
function cancelPaymentAction(itemId) {
    updatePaymentState(itemId, paymentStates.canceled.id);
    $('#contextMenuContainer').hide();
}
function refundPaymentAction(itemId) {
    let selectedPartialPayment = partialPayment.find(x => x.id == itemId);
    updateAmount2Paid(amount2Paid + selectedPartialPayment.amount);
    updatePaymentState(itemId, paymentStates.canceled.id);
    $('#contextMenuContainer').hide();
}
function updatePaymentState(itemId, newState) {
    const payment = partialPayment.find(p => p.id === itemId);
    if (payment) {
        payment.state = newState;
        createPartialPaymentList();
    }
}

const basketMenu = [
    {
        text: "Belge İptal",
        icon: "https://cdn-icons-png.flaticon.com/512/391/391247.png",
        action: function () { breakBasket(); }
    },
    {
        text: "Belge Tekrar",
        icon: "https://cdn-icons-png.flaticon.com/512/4856/4856659.png",
        action: function () { console.log("Belge Tekrar"); }
    },
    {
        text: "İndirim",
        icon: "https://cdn-icons-png.flaticon.com/512/2615/2615079.png",
        action: function () { console.log("İndirim"); }
    },
    {
        text: "Arttırım",
        icon: "https://cdn-icons-png.flaticon.com/512/7327/7327404.png",
        action: function () { console.log("Arttırım"); }
    },
    {
        text: "Cari Seç",
        icon: "https://cdn-icons-png.flaticon.com/512/3225/3225069.png",
        action: function () { console.log("Cari Seç"); }
    },
    {
        text: "Diğer",
        icon: "https://cdn-icons-png.flaticon.com/512/9970/9970242.png",
        action: null,
        subMenu: [
            {
                text: "Diğer 1",
                icon: "https://cdn-icons-png.flaticon.com/512/9970/9970242.png",
                action: function () { console.log("Diğer 1"); },
            },
            {
                text: "Diğer 2",
                icon: "https://cdn-icons-png.flaticon.com/512/9970/9970242.png",
                action: function () { console.log("Diğer 2"); },
                subMenu: [
                    {
                        text: "Diğer 2-1",
                        icon: "https://cdn-icons-png.flaticon.com/512/9970/9970242.png",
                        action: function () { console.log("Diğer 2-1"); }
                    }
                ]
            }
        ]
    }
];
function openCartTransactions() {
    openGridMenu(basketMenu);
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

    $('#calculateTareButton').click(function (){
        console.log('Dara');
    });
    $('#scaleResetButton').click(function (){
        console.log('Terazi sıfırla');
    });

    $('#memoryProductButton').click(function() {
        if ($('.keypad-header input').val() != '' && confirmation_keypad._currentState == 'default') {
            setWeighed(confirmation_keypad.getNumericValue(true));
            calculateTotalAmount();
        }
        if (selectedProductId != null) {
            if (getWeighed() <= 0 && selectedProductId != null) {
                alert('Lütfen birim sayısı giriniz.');
                return;
            }

            let existingProduct = inMemory.find(x => x.id == selectedProductId);
            if (!existingProduct) {
                inMemory.push({
                    id: typeof selectedProductId === 'string' ? selectedProductId : JSON.stringify(selectedProductId),
                    name: categories.find(x => x.id == selectedProductId).name,
                    barcode: categories.find(x => x.id == selectedProductId).barcode,
                    ponderable: categories.find(x => x.id == selectedProductId).ponderable,
                    unitName: categories.find(x => x.id == selectedProductId).unitName,
                    weighed: getWeighed(),
                    unitPrice: getUnitPrice(),
                    tare: getTare(),
                    amount: getAmount()
                });
            } else {
                existingProduct.weighed += getWeighed();
                existingProduct.amount += getAmount();
            }

            $('.productCard.selected').addClass('memory');
            resetProductDetail();
            setWeighed(0);
        }
    });
    $('#addFavoritesButton').click(function() {
        if (selectedProductId != null) {
            categories.find(x => x.id == selectedProductId).isFav = true;
            let maxFavOrder = Math.max(0, ...categories.filter(x => x.isFav).map(x => x.favOrder || 0));
            categories.find(x => x.id == selectedProductId).favOrder = maxFavOrder + 1;
            $('#productDetailDiv').addClass('favorites');
            $('.productCard.selected').addClass('favorite');

            // save new categories request
        }
    });
    $('#removeFavoritesButton').click(function() {
        if (selectedProductId != null) {
            categories.find(x => x.id == selectedProductId).isFav = false;
            let otherFavorites = categories.filter(x => parseInt(x.favOrder) > parseInt(categories.find(x => x.id == selectedProductId).favOrder));
            otherFavorites.map(function(thisCategory) { thisCategory.favOrder = parseInt(thisCategory.favOrder) - 1 });
            categories.find(x => x.id == selectedProductId).favOrder = null;
            $('#productDetailDiv').removeClass('favorites');
            $('.productCard.selected').removeClass('favorite');

            // save new categories request
        }
    });
    $('#printProductButton').click(function() {
        if (selectedProductId != null && (($('.keypad-header input').val() != '' && confirmation_keypad._currentState == 'default') || getWeighed() > 0) ) { $('#memoryProductButton').click(); }
        if (inMemory != '') { printMemoryFromKeypad(); }
        else { asideBar.executeButtonAction('suspendedButton'); }
    });
    $('#otherButtons').click(function() {
        $('#content').toggleClass('full');
        (options.fullScreen) ? options.fullScreen = false : options.fullScreen = true;
        localStorage.setItem("options", JSON.stringify(options));
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
function setUnitPrice(value, targetCurrency) {
    if (targetCurrency && value) { value = convertToBaseCurrency(value, targetCurrency); }
    let unitPrice = convert2Price(value);
    $('#unitPrice').text(unitPrice);
}
function setAmount(value) {
    let amount = convert2Price(value);
    $('#amount').text(amount);
}

// getters
function getWeighed() {
    let weighedText = $('#weighed').text();
    let weighedValue = reverseConvertFromKg(weighedText);
    return weighedValue;
}
function getTare() {
    let tareText = $('#tare').text();
    let tareValue = reverseConvertFromKg(tareText);
    return tareValue;
}
function getUnitPrice() {
    let unitPriceText = $('#unitPrice').text();
    let unitPriceValue = reverseConvertFromPrice(unitPriceText);
    return unitPriceValue;
}
function getAmount() {
    let amountText = $('#amount').text();
    let amountValue = reverseConvertFromPrice(amountText);
    return amountValue;
}


// KeypadJS
function setFirstKeypad() {
    confirmation_keypad = null;
    $("#numpadContainer").html('');
    switch (scaleMode) {
        case scaleModes.sales:
            confirmation_keypad = Keypad.generateFrom("#numpadContainer", [
                {
                    statename: "filter-mod",
                    rightActionContent: "<i class='fa fa-magnifying-glass' style=\"font-family: 'FontAwesome'; color: #fff;\"></i>",
                    // leftActionDisabled: true,
                    rightAction: function (keypad) {
                        filterByBarcode(keypad.getNumericValue(true));
                    },
                    watcher: function (keypad, char, prevVal, nextVal) {
                        if (char == 'x' || char == ',') {
                            return false;
                        }
                        if (nextVal.length < 6 || nextVal.includes(',') || nextVal.includes('x')) {
                            keypad.setState("default");
                        }

                        return true;
                    }
                },
                {
                    statename: "default",
                    rightActionContent: "<i class='fa fa-check' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
                    rightAction: function (keypad) {
                        if (!keypad.getValue().includes('x')) {
                            setWeighed(keypad.getNumericValue(true));
                            if (selectedProductId != null) {
                                calculateTotalAmount();
                                add2Basket();
                            }
                        }
                        else {
                            let currentValue = keypad.getValue(true);
                            let [leftX, rightX] = currentValue.split('x');
                            let currentQuantity = parseFloat(leftX.replace(",", "."));
                            let currentBarcode = parseInt(rightX);
                            if (categories.find(x => x.barcode == currentBarcode)) { 
                                selectedProductId = categories.find(x => x.barcode == currentBarcode).id;
                                setUnitPrice(categories.find(x => x.barcode == currentBarcode).price, categories.find(x => x.barcode == currentBarcode).currency);
                                setWeighed(currentQuantity);
                                calculateTotalAmount();
                                add2Basket();
                            }
                            else {
                                alert(`${currentBarcode} Barkodlu bir ürün bulunamadı.`)
                            }
                        }
                    },
                    watcher: function (keypad, char, prevVal, nextVal) {
                        if (nextVal.length >= 6 && !nextVal.includes(',') && !nextVal.includes('x')) {
                            keypad.setState("filter-mod");
                        }
                        if ((prevVal == '' && (char == 'x' || char == ',')) ||
                            (prevVal.includes('x') && (char == 'x' || char == ',')) ||
                            (prevVal.includes(',') && char == ',')) {
                            return false;
                        }
                        // max length ?
                        // x kullanıldıktan sonra x modu ?
                        return true;
                    }
                }
            ], {
                html_mod: 2,
            });
            confirmation_keypad.setState("default");
            break;
        default:
            confirmation_keypad = Keypad.generateFrom("#numpadContainer", [
                {
                    statename: "filter-mod",
                    rightActionContent: "<i class='fa fa-magnifying-glass' style=\"font-family: 'FontAwesome'; color: #fff;\"></i>",
                    leftActionDisabled: true,
                    rightAction: function (keypad) {
                        filterByBarcode(keypad.getNumericValue(true));
                    },
                    watcher: function (keypad, char, prevVal, nextVal) {
                        if (nextVal.length < 6 || nextVal.includes(',')) {
                            keypad.setState("default");
                        }
                        return true;
                    }
                },
                {
                    statename: "default",
                    rightActionContent: "<i class='fa fa-check' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
                    rightAction: function (keypad) {
                        setWeighed(keypad.getNumericValue(true));
                        calculateTotalAmount();
                    },
                    watcher: function (keypad, char, prevVal, nextVal) {
                        if (nextVal.length >= 6 && !nextVal.includes(',')) {
                            keypad.setState("filter-mod");
                        }
                        return true;
                    }
                },
            ], {
                html_mod: 1,
            });
            confirmation_keypad.setState("default");
            break;
    }
}

function setBasketNumpad() {
    let basket_keypad = Keypad.generateFrom("#basketNumpadContainer", [
        {
            statename: "default",
            rightActionContent: "<i class='fa fa-check' style=\"font-family: 'FontAwesome'; color: var(--green);\"></i>",
            rightAction: function (keypad) {
                if ((keypad.getNumericValue() == '' || keypad.getNumericValue() >= amount2Paid) && partialPayment == '') {
                    if (keypad.getNumericValue() >= amount2Paid) {
                        if ($('#basketPaymentSection .paymentOptions button.selected').data('option') != paymentOptions.cash.id) {
                            alert('Ödenecek tutardan daha fazla girdiğiniz için düzeltme yapıldı.');
                            completePayment(amount2Paid);
                        }
                        else {
                            completePayment(keypad.getNumericValue(), paymentOptions.cash.id, keypad.getNumericValue() - amount2Paid);
                        }
                    }
                    else {
                        completePayment(amount2Paid);
                    }
                }
                else {
                    if (keypad.getNumericValue() != '') {
                        makePartialPayment(keypad.getNumericValue(true));
                    }
                }
            },
            watcher: function (keypad, char, prevVal, nextVal) {
                return true;
            }
        },
    ], {
        html_mod: 0,
    });
    basket_keypad.setState("default");
}


// asidebar buttons
function AsideBarButtons(containerId, buttonsPerPage) {
    this.container = $(containerId);
    this.buttonsPerPage = buttonsPerPage || 5;
    this.currentPage = 0;
    this.totalPages = 0;
    this.buttonsData = [];

    this.functionMap = {
        open_favorites: async function() {
            tempRemovedFavorites = [];
            let bodyHtml;
            let footerHtml;
            let favorites = [...categories.filter(x => x.isFav).sort((a, b) => a.favOrder - b.favOrder)];
            if (favorites.length > 0) {
                bodyHtml = `<div id="favoriteCategoryFilter"><input id="categoryFilterCheck" name="categoryFilterCheck" type="checkbox" /><label for="categoryFilterCheck">Seçili olan kategorinin ürünlerini göster</label></div>
                            <ul id="favoritesList" class="sortable"></ul>`;
                footerHtml = `<button id="saveFavoritesOrder" onclick="saveFavoritesOrder()"  class="saveButton">Kaydet</button>
                              <button id="resetFavorites" onclick="resetFavorites()" class="resetButton">Tümünü Kaldır</button>`;
            }
            else {
                bodyHtml = `Favori ürününüz bulunmamaktadır.`;
                footerHtml = `<button id="saveFavoritesOrder" onclick="saveFavoritesOrder()"  class="saveButton" disabled>Kaydet</button>
                              <button id="resetFavorites" onclick="resetFavorites()" class="resetButton" disabled>Tümünü Kaldır</button>`;
            }
            fillAsideButtonsModal(bodyHtml, footerHtml);
            createFavoritesList(favorites);

            if (favorites.length > 0) {
                (activeSubCategory || activeMainCategory)
                    ? $('#favoriteCategoryFilter input').attr('disabled', false)
                    : $('#favoriteCategoryFilter input').attr('disabled', true);
                swapMode = false;
                createFavoritesSortable(swapMode);
            }
        },
        close_favorites: function() {
            if (isFavoritesChanged()){
                if (confirm("Kaydedilmemiş değişiklikler var. Emin misiniz?") == true) {
                    closeModalE();
                }
            }
            else {
                closeModalE();
            }
        },
        suspend: async function() {
            let bodyHtml;
            let footerHtml;
            if (inMemory != '' || suspendedList != '') {
                bodyHtml = `<div id="memoryCardDiv"></div>
                            <div id="suspendedListDiv"></div>`;
                footerHtml = `<button id="resetSuspended" onclick="resetSuspended()" class="resetButton" ${(suspendedList == '') ? 'disabled' : ''}>Tümünü Kaldır</button>`;
            }
            else {
                bodyHtml = `Askı listeniz boş.`;
                footerHtml = `<button id="resetSuspended" onclick="resetSuspended()" class="resetButton" disabled>Tümünü Kaldır</button>`;
            }
            fillAsideButtonsModal(bodyHtml, footerHtml);
            fillMemoryCard();
            fillSuspendedList();
        },
        open_basket: async function () {
            let basketProductList = reloadBasketProductList();
            let bodyHtml;
            let isBasketEmpty = true;
            let basketTotalPrice = 0;
            if (salesBasket.length > 0) {
                basketTotalPrice = salesBasket.reduce(function(total, item){ return total + item.amount },0);
                amount2Paid = basketTotalPrice;
                isBasketEmpty = false;
                bodyHtml = `<div id="basketModalBody">
                                <div id="basketProductListSection">
                                    <ul>
                                        ${basketProductList}
                                    </ul>
                                    <div class="productListSummary">
                                        <div class="productListButtons">
                                            <button id="cartTransactions" onclick="openCartTransactions()">İşlemler</button>
                                        </div>
                                        <div class="quantityAndTotalPrice">
                                            <div>
                                                <span>Kalem: </span>
                                                <span id="lineItemCount">${salesBasket.length}</span>
                                            </div>
                                            <div>
                                                <span>Yekün: </span>
                                                <span id="totalPrice">${convert2PriceWithUnit(basketTotalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="basketPaymentSection">
                                    <div class="basketPaymentInfo">
                                        <div class="amount2Paid">
                                            <span>Ödenecek Tutar:</span>
                                            <span id="amount2PaidSpan">${convert2PriceWithUnit(basketTotalPrice)}</span>
                                        </div>
                                        <div class="partialPaymentList">
                                            <ul></ul>
                                        </div>
                                        <div class="paymentOptions">

                                        </div>
                                    </div>
                                    <div id="basketNumpadContainer"></div>
                                </div>
                            </div>`;
            }
            else {
                bodyHtml = `<div id="emptyBasketModal">
                                <h3>Sepetinizde hiç ürün bulunmuyor.</h3>
                                <img src="./public/images/empty_basket.gif"/>
                            </div>`;
            }
            fillAsideButtonsModal(bodyHtml);
            fillPaymentOptions();
            if(!isBasketEmpty) { 
                setBasketNumpad();
                $('.paymentOptions button').off('click').on('click', function(){
                    $('.paymentOptions button').removeClass('selected');
                    $(this).addClass('selected');
                });
            }
        },
        close_basket: function() {
            if (partialPayment.length) {
                breakBasket();
            }
            else {
                closeModalE();
            }
        },
    }; 
    
    this.executeButtonAction = async function(id) {
        const button = this.buttonsData.find(b => b.domId === id);
        if (button && this.functionMap[button.onClick]) {
            let buttonProps = { name: button.name, iconClass: button.iconClass, modalWidth: button.modalWidth, modalHeight: button.modalHeight };
            fillAsideButtonsModal(); // reset
            openAsideButtonsModal(buttonProps);
            $('#asideButtonsModal').addClass('load');

            if (button.customClose) { 
                $('#asideButtonsModal .closeModalE').off('click').on('click', () => { this.functionMap[button.customClose](); }); 
            } else { 
                $('#asideButtonsModal .closeModalE').off('click').on('click', () => { closeModalE(); }); 
            }

            try {
                await this.functionMap[button.onClick]();
                $('#asideButtonsModal').removeClass('load');
            } catch (error) {
                $('#asideButtonsModal').removeClass('load');
                $('#asideButtonsModal').removeClass('show');
                console.error(error);
            }
        } else {
            console.warn('Fonksiyon bulunamadı:', buttonId);
        }
    };

    this.renderButtons = function() {
        this.container.empty();

        let startIndex = this.currentPage * this.buttonsPerPage;
        let endIndex = Math.min(startIndex + this.buttonsPerPage, this.buttonsData.length);

        for (let i = startIndex; i < endIndex; i++) {
            let button = this.buttonsData[i];
            if (button.modes.some(x => x == scaleMode)) {
                let li = $('<li></li>');
                let buttonElement = $(`<button id="${button.domId}" title="${button.name}"><div class="notificationBubble"></div>  <i class="${button.iconClass}"></i> <span class="truncatedText2">${button.name}</span></button>`);
                buttonElement.on('click', () => this.executeButtonAction(button.domId));

                li.append(buttonElement);
                this.container.append(li);
            }
        }

        let remainingButtons = this.buttonsPerPage - (endIndex - startIndex);
        for (let i = 0; i < remainingButtons; i++) {
            let li = $('<li></li>');
            let dummyButton = $('<button><i class="fa-solid fa-bolt-lightning"></i><span>.</span></button>').addClass('dummy-button');
            li.append(dummyButton);
            this.container.append(li);
        }
    };

    this.loadButtonsFromJSON = function(jsonFilePath) {
        $.ajax({
            url: jsonFilePath,
            method: 'GET',
            dataType: 'json',
            success: function(buttonsData) {
                this.container.empty();
                $(".buttonsUp, .buttonsDown").remove();

                this.buttonsData = buttonsData;
                this.totalPages = Math.ceil(this.buttonsData.length / this.buttonsPerPage);

                if (this.totalPages > 1) {
                    this.createArrows();
                }

                this.renderButtons();
            }.bind(this),
            error: function(xhr, status, error) {
                console.error("Error loading buttons JSON:", status, error);
            }
        });
    };

    this.handlePagination = function(direction) {
        if (direction === 'up' && this.currentPage > 0) {
            this.currentPage--;
        } else if (direction === 'down' && this.currentPage < this.totalPages - 1) {
            this.currentPage++;
        }
        this.renderButtons();
    };

    this.createArrows = function() {
        let upArrow = $('<button class="buttonsUp buttonsPagination"><i class="fa-solid fa-caret-up"></i></button>');
        let downArrow = $('<button class="buttonsDown buttonsPagination"><i class="fa-solid fa-caret-down"></i></button>');
        upArrow.on('click', function() {
            this.handlePagination('up');
        }.bind(this));

        downArrow.on('click', function() {
            this.handlePagination('down');
        }.bind(this));
        this.container.before(upArrow);
        this.container.after(downArrow);
    };
}


// convert functions
function convertToBaseCurrency(value, targetCurrency) {
    const baseCurrencyRate = currency[baseCurrency].rate;
    const targetCurrencyRate = currency[targetCurrency].rate;
    if (!targetCurrencyRate) {
       console.error(`Döviz kuru bulunamadı: ${targetCurrency}`);
       return null;
    }
    return (value / targetCurrencyRate) * baseCurrencyRate;
}
function convert2Price(value) {
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str;
    }
    else {
        return "0,00";
    }
}
function convert2Kg(value) {
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str;
    }
    else {
        return "0,000";
    }
}
function convert2PriceWithUnit(value, unit) {
    let unitName = currency[baseCurrency].unit;
    if (unit != null && unit != undefined) { unitName = unit };
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str + ` ${unitName}`;
    }
    else {
        return `0,00 ${unitName}`;
    }
}
function convert2KgWithUnit(value, unit) {
    let unitName = '';
    if (unit != null && unit != undefined) { unitName = unit };
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str + ` ${unitName}`;
    }
    else {
        return `0,000 ${unitName}`;
    }
}
function reverseConvertFromKg(value) {
    if (value != null && value != undefined) {
        let str = value.replace(/\./g, "");
        str = str.replace(/,/, ".");
        return parseFloat(str);
    } else {
        return 0;
    }
}
function reverseConvertFromPrice(value) {
    if (value != null && value != undefined) {
        let str = value.replace(/\./g, "");
        str = str.replace(/,/, ".");
        return parseFloat(str);
    } else {
        return 0;
    }
}

// context menu
function createContextMenu(menuItems, event) {
    const menu = $('#contextMenuContainer');
    menu.html(`
        <ul>
            ${menuItems.map(item => `<li onclick="${item.action}">${item.name}</li>`).join('')}
        </ul>
    `);
    positionContextMenu(event);

    $(document).off('mousedown.contextMenuClose').on('mousedown.contextMenuClose', function(e) {
        if (!$(e.target).closest('#contextMenuContainer').length) {
            menu.hide();
            $(document).off('mousedown.contextMenuClose');
        }
    });
}
function positionContextMenu(event) {
    const menu = $('#contextMenuContainer');
    const clickX = event.pageX;
    const clickY = event.pageY;
    const menuWidth = menu.outerWidth();
    const menuHeight = menu.outerHeight();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    let posX = clickX;
    let posY = clickY;
    if ((clickX + menuWidth) > windowWidth) {
        posX = windowWidth - menuWidth;
    }
    if ((clickY + menuHeight) > windowHeight) {
        posY = windowHeight - menuHeight;
    }
    menu.css({
        top: `${posY}px`,
        left: `${posX}px`,
        display: 'block'
    });
}

// splash screen
function showSplashScreen(splash) {
    let default_splash = { default_html: `<img class="defaultImg" src="./public/images/loading.gif" />`,  title: null,  description: null,  buttons: [] };
    if (splash) { splash = Object.assign(default_splash, splash); }
    else { splash = default_splash; }
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.innerHTML = splash.default_html;
    if (splash.title) {
        const titleElement = document.createElement("h1");
        titleElement.innerText = splash.title;
        splashScreen.appendChild(titleElement);
    }
    if (splash.description) {
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = splash.description;
        splashScreen.appendChild(descriptionElement);
    }
    if (splash.buttons.length > 0) {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.innerHTML = "";
        splash.buttons.forEach(button => {
            const buttonElement = document.createElement("button");
            buttonElement.innerText = button.text;
            buttonElement.onclick = button.action;
            if (button.type === "accept") {
                buttonElement.classList.add("acceptButton");
            }
            if (button.type === "cancel") {
                buttonElement.classList.add("cancelButton");
            }
            buttonsContainer.appendChild(buttonElement);
        });
        splashScreen.appendChild(buttonsContainer);
    }
    splashScreen.style.display = "flex";
}
function hideSplashScreen() {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
}

// grid menü
let gridMenuHistory = [];
function showGridMenu(menu) {    
    const gridContainer = document.getElementById("gridMenu");
    gridContainer.innerHTML = "";
    if (gridMenuHistory.length > 0) {
        const backButton = document.createElement("button");
        backButton.classList.add("gridMenuBackButton"); 
        backButton.innerHTML = `<i class="fa-solid fa-circle-left"></i>`
        backButton.onclick = function () {
            navigateBack();
        };
        gridContainer.appendChild(backButton);
    }
    menu.forEach(item => {
        const button = document.createElement("button");
        button.classList.add("gridMenuButton"); 
        button.innerHTML = `<img src="${item.icon}" alt="${item.text}" /><span class="truncatedText2">${item.text}</span>`;
        if (item.subMenu) {
            button.onclick = function () {
                gridMenuHistory.push(menu);
                showGridMenu(item.subMenu);
            };
        } else {
            button.onclick = function () {
                closeGridMenu();
                item.action();
            };
        }
        gridContainer.appendChild(button);
    });
}
function navigateBack() {
    if (gridMenuHistory.length > 0) {
        const previousMenu = gridMenuHistory.pop();
        showGridMenu(previousMenu);
    }
}
function openGridMenu(menu) {
    $('#gridMenuModal').addClass('show');
    showGridMenu(menu);
}
function closeGridMenu() {
    gridMenuHistory = [];
    $('#gridMenuModal').removeClass('show');
}