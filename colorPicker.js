// colors to pick
let colorList = [
            "#1abc9c"
          , "#2ecc71"
          , "#3498db"
          , "#9b59b6"
          , "#34495e"
          , "#16a085"
          , "#27ae60"
          , "#2980b9"
          , "#8e44ad"
          , "#2c3e50"
          , "#f1c40f"
          , "#e67e22"
          , "#e74c3c"
          , "#ecf0f1"
          , "#95a5a6"
          , "#f39c12"
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