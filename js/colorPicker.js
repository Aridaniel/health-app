// colors to pick
let colorList = [
            "#AF8091"
          , "#7E9B7E"
          , "#E76F51"
          , "#FFC7B8"
          , "#ABE6FF"
          , "#A074C3"
          , "#FEE873"
          , "#18D1BB"
          , "#546480"
          , "#DF5961"
          , "#EA5FC3"
          , "#A585FF"
          , "#37AF75"
          , "#FCAC5C"
          , "#CAD4D9"
          , "#8E1189"
];

// creating the divs for the colors
let colorContainer = document.getElementById('color-container');
// looping through the color list and creating div circles
for(let i = 0; i < colorList.length; i++) {
    colorContainer.innerHTML += '<div class="color-pick"></div>'
}

// class of each color div
let colorPicker = document.getElementsByClassName('color-pick');
// chosen color frame
let outputColor = document.getElementById('output-color');


// assignin colors, looping through each circle
for (let i=0; i < colorPicker.length; i++) {
    // changing the color from the colorlist
    colorPicker[i].style.backgroundColor = colorList[i];
    // listening for the click on each color and calling changecolor function
    colorPicker[i].addEventListener('click', function() {
        changeColor(colorList[i], i);
    })
}

// changing color on output by adding active class to the color-pick div
changeColor = (color, activeColor) => {
    for (let i = 0; i < colorPicker.length; i++) {
        // first remove the active class from all elements
        colorPicker[i].classList.remove('activeColor');
    }
    // then adding the active class and changing color
    colorPicker[activeColor].classList.add('activeColor');
    outputColor.style.backgroundColor = color;
}