

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
    let currentColor = document.getElementById("colorPick").value;
    $(saveDiv).css('background-color', currentColor);
    $(saveDiv).css('min-height', "5vw");
    $(saveDiv).css('border', "1px solid black");
    $(".color-grid").append(saveDiv);
  })
})