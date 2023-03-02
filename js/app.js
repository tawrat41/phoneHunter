 const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
 }


 const displayPhones = (phones, dataLimit) =>{
    const phoneConatainer = document.getElementById('phone-container')
    phoneConatainer.innerText = '';

    // no phone message
    const noPhone = document.getElementById('no-phone-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none'); 
    }

    // for displaying 20 phone
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }


    // display
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card" style="width: 18rem;"> 
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div onclick=loadPhoneDetails('${phone.slug}') id="btn-show-details" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</div>
                
            </div>
        </div>
        `

        phoneConatainer.appendChild(phoneDiv); 
    });
    // stop spinner
    toggleSpinner(false);
 }

 const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
 }

 document.getElementById('btn-search').addEventListener('click',function(){
    // spin start
    processSearch(10);
 })

//  for enter key
 document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

 const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
 }

 document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
 })

const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>${phone.releaseDate ? phone.releaseDate : 'No release date found.'}</p>
    `
}

 
 loadPhones('apple');
