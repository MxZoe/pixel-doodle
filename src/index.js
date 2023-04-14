
//utility functions
//function to check if a color is in the given array and to return how many times it is
function numberInArray(hexArray, color){
  let occurances = 0;
  hexArray.forEach(function(element){
    if(element === color){
      occurances++;
    }
  });
  return occurances
}
function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

function colorCell(id){
  let currentColor = document.getElementById("colorPick").value;
    $("#"+id).css('background-color', currentColor)
}

function updateColorPick(id){
  let colorValue = rgb2hex(document.getElementById(id).style.backgroundColor);
  document.getElementById("colorPick").value = colorValue;
}

//creates an array of random hex numbers with no repeating values
function randomHex(number){
  let hexArray = [];
  for(let i = 0; i < number; i++){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    occurances = numberInArray(hexArray, randomColor);
    //check if the newest color is already in the array
    while(occurances > 1){
      randomColor = Math.floor(Math.random()*16777215).toString(16);
      occurances = numberInArray(hexArray, randomColor);
    }
    hexArray.push(randomColor);
  }
  hexArray.sort();
  const symbolArray = hexArray.map(function(color){
      return "#" + color;
  });
  return symbolArray;
}


$(function(){
  let counter = 0;
  $("#theme-change").on("change", function(){
    if ($('#theme-change').is(":checked")) {
      $("body").toggleClass("dark-theme");
      $(".cell").css("border-color", "rgb(221,214,214)"); //classList problems

      
     
   } else {
      $("body").toggleClass("dark-theme");
      $(".cell").css("border-color", "black");
   }
  })
  $("#paletteButton").on("click", function(){
    let colorArray = randomHex(6);
    $('#p-color-1').css('background-color', colorArray[0])
    $('#p-color-2').css('background-color', colorArray[1])
    $('#p-color-3').css('background-color', colorArray[2])
    $('#p-color-4').css('background-color', colorArray[3])
    $('#p-color-5').css('background-color', colorArray[4])
    $('#p-color-6').css('background-color', colorArray[5])
  })

  $("#saveButton").on("click", function(){
    let saveDiv = document.createElement("div");
    let IdToAdd = "save" + counter;
    counter++;
    saveDiv.setAttribute('id', IdToAdd);
    saveDiv.setAttribute('onclick', "updateColorPick(this.id)")

    let currentColor = document.getElementById("colorPick").value;
    $(saveDiv).css('background-color', currentColor);
    $(saveDiv).css('min-height', "5vw");
    $(saveDiv).css('border', "1px solid black");
    $(".color-grid").append(saveDiv);
  })

  $(".lines-div").on("change", function(){
    let options = document.getElementsByName("line-options");
    let selected;
    let doodleCollection = document.getElementById("doodle-grid").children;
    for(let i = 0; i < 3; i++){
      if( options[i].checked){
        selected = options[i].value;
      }
    }
    for(let i = 0; i < doodleCollection.length; i++){
     let currentDiv = document.getElementById((doodleCollection[i]).id)
     $(currentDiv).css("border", "1px " + selected + " black")
    }
  })
})