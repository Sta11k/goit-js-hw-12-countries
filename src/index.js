import './sass/main.scss';


import  debounce  from 'lodash.debounce';
// var debounce = require('lodash.debounce');
// import  fetchCountries from './js/fetchCountries';
// import dataMenu from "./data/menu.json"
import menuMrpTemplate from "./templates/markup.hbs"
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
 

 const refs={
  inputLabel: document.querySelector(".cantry"),
  inputSearch: document.querySelector("#searchCantry"),
  printSearchCantry: document.querySelector(".list__cantry"),
   containerDell: document.querySelector(".container"),
};

const hendlerSubmin = (e) => {
  e.preventDefault()
  const value = refs.inputSearch.value

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => {
       
        return response.json();
      })
        .then(data => {
          maxCantry(data)
          console.log(data);
        })
   
      .catch(error => {
         console.log(error,"Немає данних для відправки"); 
      });
}


const maxCantry = ( data ) => {
  
  if (data.length > 10) {

   alert({
      text: ' Акунаматата... Введіть більше символів для уточнення пошуку'
    });
     return  refs.printSearchCantry.innerHTML =" "; 
   
  } if (data.length >= 2 && data.length <= 10) {
    refs.printSearchCantry.innerHTML =" "; 
   
    renderMaxColection(data)
    return  
    
  } if (data.length === 1) {

    resultCantry(data)
    
    return
  } 
}


function resultCantry(data) {
   refs.printSearchCantry.innerHTML = menuMrpTemplate(data); 
  
}


function creatElement({ name } ) {
  
  const articleFirst = `<li class="list__cantry-item">${name}</li>`

  refs.printSearchCantry.innerHTML += articleFirst;

};

function renderMaxColection(array) {
  array.forEach(el => creatElement(el));

}

refs.inputSearch.addEventListener('input', debounce(hendlerSubmin, 1000));

