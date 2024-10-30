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
*/


// all data
let categories;

// options
let columnCount;
let rowCount;
let barCount;
let bar2Count;
let baseFont;
let sellerman;
let buttonCount;

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

let printMemory = [];

let sortableFavorites;
let tempRemovedFavorites = [];

// css injection
var options = localStorage.getItem("options");
var default_options = { columnCount: 4, rowCount: 3, barCount: 5, bar2Count: 5, baseFont: 16, sellerman: false, buttonCount: 5, fullScreen: true };
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
}
function applyOptions() {
    columnCount = options.columnCount;
    rowCount = options.rowCount;
    cardsPerPage = rowCount * columnCount;
    barCount = options.barCount;
    bar2Count = options.bar2Count;
    baseFont = options.baseFont;
    sellerman = options.sellerman ? "flex" : "none";
    options.fullScreen ? $('#content').addClass('full') : $('#content').removeClass('full');
    const asideBar = new AsideBarButtons("#buttonsSide nav ul", options.buttonCount);
    asideBar.loadButtonsFromJSON('././data/buttons.json');

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
                        }
                    </style>`
    $("head").append(newcss)
}

// 
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
        $('#cardContainer').append(`<div class="productCard ${(product.isFav)?'favorite':''}" data-product="${product.id}">
                                        <i class="fa-solid fa-heart"></i>
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
        activeSubCategory = previousCategoryId;
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

function setProductDetail(productId) {
    selectedProductId = productId;
    $('#productDetailDiv').addClass('show');
    $('#chooseProductDiv').addClass('unshow');
    let selectedProduct = categories.find(x => x.id == selectedProductId);
    $("#productDetailImg").attr("src", selectedProduct.image);
    $('#productDetailBarcode').html(selectedProduct.barcode);
    $('#productDetailName').html(selectedProduct.name);
    $('#productDetailPrice').html(convert2Price(selectedProduct.price));
    if (selectedProduct.isFav) { $('#productDetailDiv').addClass('favorites'); }
    else { $('#productDetailDiv').removeClass('favorites'); }
    setUnitPrice(selectedProduct.price);
    if ($('.keypad-header input').val() != '' && confirmation_keypad._currentState == 'default') $('.keypad-action-button-right').click();
    calculateTotalAmount();
}

function resetProductDetail() {
    selectedProductId = null;
    $('#productDetailDiv').removeClass('show');
    $('#chooseProductDiv').removeClass('unshow');
    setUnitPrice(0);
    calculateTotalAmount();
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


function filterByBarcode(value) {
    getFirstView();
    products = categories.filter(x => JSON.stringify(x.barcode).includes(value));
    renderProducts(currentPage);
    $('#filterValue').html(`<span>${value}</span> barkoduna göre filtrelenmiştir`);

    backArray.push('');
    $('#goBackCategory').addClass('show');
    getPrevCategoryName();
}

function calculateTotalAmount() {
    setAmount(getWeighed() * getUnitPrice());
}

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

function createFavoritesList(favorites) {
    favorites = favorites.sort((a, b) => a.favOrder - b.favOrder);
    let favotireList = favorites.map((fav, index) => {
        return `<li class="favorite-item" data-id="${fav.id}" data-order=${fav.favOrder}>
                    <input type="number" class="fav-order-input" value="${fav.favOrder}" min="1" />
                    <div>
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
        const currentItem = favorites.find(fav => fav.id == currentItemId);
        const oldOrder = currentItem.favOrder;
        const newOrder = parseInt(input.val());

        //controls
        if (isNaN(newOrder) || newOrder <= 0) {
            input.val(oldOrder);
            return;
        }
        if (newOrder > favorites.length) {
            input.val(favorites.length);
        }

        // current
        currentItem.favOrder = parseInt(input.val());

        // others
        favorites.forEach(fav => {
            if (fav.id !== currentItemId) {
                if (currentItem.favOrder < oldOrder && fav.favOrder >= currentItem.favOrder && fav.favOrder < oldOrder) {
                    fav.favOrder += 1;
                }
                if (currentItem.favOrder > oldOrder && fav.favOrder <= currentItem.favOrder && fav.favOrder > oldOrder) {
                    fav.favOrder -= 1;
                }
            }
        });

        createFavoritesList(favorites);
    });

    $('.removeFromFavoriteList').off('click').on('click', function(){
        removedId = $(this).closest('.favorite-item').data('id');
        tempRemovedFavorites.push(JSON.stringify(removedId));
        currentFavoritesOrder = getCurrentFavoritesOrder(favorites);
        removedFavOrder = currentFavoritesOrder.find(x => x.id == removedId).favOrder;
        currentFavoritesOrder.splice(currentFavoritesOrder.findIndex(x => x.id == removedId),1);
        currentFavoritesOrder.forEach(function(item,index){
            if (item.favOrder > removedFavOrder) {
                item.favOrder--;
            }
        });

        createFavoritesList(currentFavoritesOrder);
    });

    function getCurrentFavoritesOrder(favorites) {
        $('.favorite-item').each(function() {
            let id = JSON.stringify($(this).data('id'));
            let favOrder = parseInt($(this).data('order'), 10);
            let category = favorites.find(cat => cat.id == id);
            if (category) {
                category.favOrder = favOrder;
            }
        });
        return favorites
    }
}

function updateOrderNumbers(evt) {
    let oldIndex = evt.oldIndex + 1;
    let newIndex = evt.newIndex + 1;
    let $thisIndex = $(`.favorite-item[data-order=${oldIndex}]`);

    if (newIndex > $('.favorite-item').length) {
        newIndex = $('.favorite-item').length;
    }
    
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
    
    $thisIndex.find('input').val(newIndex);
    $thisIndex.attr('data-order', newIndex);
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
        if (selectedProductId != null && printMemory.every(x => x != selectedProductId)) {
            printMemory.push(selectedProductId);
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
        if (selectedProductId != null && printMemory.every(x => x != selectedProductId)) {
            printMemory.push(selectedProductId);
        }
        console.log(printMemory);
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
function setUnitPrice(value) {
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

// common functions
function convert2Price(value) {
    if (value != null && value != undefined) {
        let str = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        str = str.replace(/\./, "x");
        str = str.replace(/,/g, ".");
        str = str.replace(/x/, ",");
        return str + " ₺";
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
function reverseConvertFromKg(value) {
    if (value != null && value != undefined) {
        let str = value.replace(" kg", "");
        str = str.replace(/\./g, "");
        str = str.replace(/,/, ".");
        return parseFloat(str);
    } else {
        return 0;
    }
}
function reverseConvertFromPrice(value) {
    if (value != null && value != undefined) {
        let str = value.replace(" ₺", "");
        str = str.replace(/\./g, "");
        str = str.replace(/,/, ".");
        return parseFloat(str);
    } else {
        return 0;
    }
}

// KeypadJS
var confirmation_keypad = Keypad.generateFrom("#numpadContainer", [
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
            let favorites = categories.filter(x => x.isFav == true).sort((a, b) => a.favOrder - b.favOrder);
            console.log(favorites.length  > 0);
            if (favorites.length > 0) {
                bodyHtml = `<ul id="favoritesList" class="sortable"></ul>`;
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
                sortableFavorites = Sortable.create(document.getElementById('favoritesList'), {
                    animation: 150,
                    // swap: true,
                    // swapClass: "highlight",
                    handle: '.favorite-item',
                    ghostClass: 'ghost-item',
                    filter: ".ignore-elements",
                    onEnd: function(evt) {
                        updateOrderNumbers(evt);
                    }
                });
            }
        },
        suspend: async function() {
            console.log(printMemory);
        },
    };    

    this.renderButtons = function() {
        this.container.empty();

        let startIndex = this.currentPage * this.buttonsPerPage;
        let endIndex = Math.min(startIndex + this.buttonsPerPage, this.buttonsData.length);

        for (let i = startIndex; i < endIndex; i++) {
            let button = this.buttonsData[i];
            let li = $('<li></li>');
            let buttonElement = $('<button></button>')
                .attr('title', button.name)
                .append(`<i class="${button.iconClass}"></i> <span class="threeDots">${button.name}</span>`);

            if (this.functionMap[button.onClick]) {
                if (button.isModal) {
                    buttonElement.on('click', (function(button) {
                        return async () => {
                            let buttonProps = { name: button.name, iconClass: button.iconClass, modalWidth: button.modalWidth, modalHeight: button.modalHeight }
                            openAsideButtonsModal(buttonProps);
                            $('#asideButtonsModal').addClass('load');
    
                            try {
                                await this.functionMap[button.onClick]();
                                $('#asideButtonsModal').removeClass('load');
                            } catch (error) {
                                $('#asideButtonsModal').removeClass('load');
                                $('#asideButtonsModal').removeClass('show');
                                console.error(error);
                            }
                        };
                    }).bind(this)(button));
                }
                else { buttonElement.on('click', this.functionMap[button.onClick].bind(this)); }
            } 
            else { console.warn('Function not found for:', button.onClick); }

            li.append(buttonElement);
            this.container.append(li);
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