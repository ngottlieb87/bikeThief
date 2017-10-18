import { Bike } from './../js/bike.js';
let bikeClass = new Bike();

$(document).ready(function(){
  bikeClass.callApi().then(hey);
});

function displayThisShit() {
  $('a').click(function(event) {
    event.preventDefault();
    let manf = event.currentTarget.id;
    console.log(manf);
    bikeClass.manufacturerApi(manf).then(hey2);
  })
}

function hey(response) {
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
  displayThisShit();
}

function hey2(response) {
  let parsed = JSON.parse(response);
  let arr = [];
  parsed.bikes.forEach(function(bike) {
    arr.push(bike.title);
  });
  arr.forEach(function(bike) {
    $('#manName').append(`<li><a id='bikeMan'>${bike}</a></li>`);
  });
}, function(error) {
  $('#manName').html(error.message);
});
}
