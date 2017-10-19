import { Api } from './../js/api.js';
let bikeClass = new Bike();

$(document).ready(function(){
  bikeClass.callApi().then(function(response) {
    let parsed = JSON.parse(response);
    let arr = [];
    parsed.bikes.forEach(function(bike) {
      if (bike.manufacturer_name.match(/([a-z])\w+/ig)) {
        arr.push(bike.manufacturer_name.charAt(0).toUpperCase() + bike.manufacturer_name.slice(1));
      }
      arr = arr.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
      });
      arr = arr.sort();
    });
    arr.forEach(function(bike) {
      $('#manName').append(`<li><a href='${bike}' id='${bike}' class='bikeMan'>${bike}</a></li>`);
    });
    displayManufacturer();
  });
});

function displayManufacturer() {
  $('a').click(function(event) {
    event.preventDefault();
    let manf = event.currentTarget.id;
    console.log(manf);
    bikeClass.manufacturerApi(manf).then(function(response) {
      let parsed = JSON.parse(response);
      let arr = [];
      parsed.bikes.forEach(function(bike) {
        arr.push(bike);
      });
      arr.forEach(function(bike) {
        $('#manStole').append(`<li class="details" id=${bike.id}><a>${bike.title}</a></li>`);
      });
      $('#manName').hide(800);
      $('#manStole').show(800);
      manufacturerDetails();
    });
  });
}
//not working currently
function manufacturerDetails() {
  $('.details').click(function(event) {
    event.preventDefault();
    let id = event.target.id;
    bikeClass.manufacturerId(id).then(function(response) {
      let parsed = JSON.parse(response);
      let arr = [];
      parsed.bikes.forEach(function(bike) {
        arr.push(bike.id);
        console.log(bike.id);
      });
      arr.forEach(function(bike) {
        $('#manDetails').append(`<li><a>${bike}</a></li>`);
      });
      $('#manStole').hide(800);
      $('#manDetails').show(800);
    });
  });
}
