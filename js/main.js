let ulList = document.querySelector(".blockList");
let ulCollection = ulList.children;
let templateLi = document.querySelector("#createLi").content;
let selectLiButton = templateLi.querySelector(".origCheck");
let toggleInput = document.querySelector(".toggle-all");
let toggle = document.querySelector(".toggleLabel");
let input = document.querySelector(".input_start");
let clearCompleted = document.querySelector(".clearCompleted");
let footer = document.querySelector(".footer");
let counterItems = document.querySelector('.counterItems');
let image = document.querySelector('.image');
let headerImage = document.querySelector('.header__image');
let headerTitle = document.querySelector('.superTitle');
let paragraphWrap = document.querySelector('.paragraph-wrap');
let count = 0;

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value != "" && input.value.trim()) {
    toggle.style.display = "block";
    footer.style.display = "flex";
    let createLi = templateLi.querySelector(".blockList__elem").cloneNode(true);
    let paragraph = createLi.querySelector("p");
    let messageText = input.value;
    paragraph.textContent = messageText;
    ulList.appendChild(createLi);
    input.value = "";
    deleteNote(createLi);
    toggleColor();
    toggleColorFragmentCode();
    changeP(toggle);
    countItemsFunction(); 
    editorFunction();    
    footerMenu();    
    footerFocus();
    fixInput();
  }  
});

let deleteNote = (note) => {
  let button = note.querySelector(".closeMe");
  button.addEventListener("click", function () {
    note.remove();
    visor(ulCollection);
    toggleColorFragmentCode();
    countItemsFunction()
  });
};

function visor(object) {
  if (object.length === 0) {
    toggle.style.display = "none";
    footer.style.display = "none";
  } else {
    toggle.style.display = "block";
    footer.style.display = "flex";
  }
}

let viewClearCompleted = (nuts) => {
  nuts.addEventListener("click", function () {
    let inputCollection = nuts.querySelectorAll(".origCheck");
    for (let i = 0; i < inputCollection.length; i++) {
      if (inputCollection[i].checked) {
        clearCompleted.style.display = "block";
        break;
      } else {
        clearCompleted.style.display = "none";
      }
    }
    changeP(ulList);
  });
};

let selectAllMarker = () => {
  toggle.addEventListener("click", function () {
    let inputCollection = ulList.querySelectorAll(".origCheck");
    if (toggleInput.checked) {
      for (let char of inputCollection) {
        char.checked = false;
      }
      clearCompleted.style.display = "none";
    } else {
      for (let char of inputCollection) {
        char.checked = true;
      }
      clearCompleted.style.display = "block";
    }
  });
};

let toggleColor = () => {
  ulList.addEventListener("change", function () {
    let inputCollection = ulList.querySelectorAll(".origCheck");
    let mass = [];
    for (let i = 0; i < inputCollection.length; i++) {
      if (inputCollection[i].checked === true) {
        mass.push(inputCollection[i]);
      }
    }
    if (mass.length === inputCollection.length) {
      toggleInput.checked = true;
    } else {
      toggleInput.checked = false;
    }
  });
};

let toggleColorFragmentCode = () => {
  let inputCollection = ulList.querySelectorAll(".origCheck");
  let mass = [];
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked === true) {
      mass.push(inputCollection[i]);
    }
  }

  if (mass.length === inputCollection.length) {
    toggleInput.checked = true;
  } else {
    toggleInput.checked = false;
  }
};

let changeP = (ponchik) => {
  ponchik.addEventListener("click", function () {
    let inputCollection = ulList.querySelectorAll(".origCheck");
    let liElements = ulList.querySelectorAll(".blockList__elem");
    for (let i = 0; i < inputCollection.length; i++) {
      if (inputCollection[i].checked === true) {
        let paragraf = liElements[i].querySelector("p");
        paragraf.classList.add("selectP");
        fixInput();
      } else {
        let paragraf = liElements[i].querySelector("p");
        paragraf.classList.remove("selectP");
        fixInput();
      }
    }
    countItemsFunction();    
  });
};

let clearCompletedButton = () => {
  clearCompleted.addEventListener("click", function () {
    let inputCollection = ulList.querySelectorAll(".origCheck");
    let liElements = ulList.querySelectorAll(".blockList__elem");
    for (let i = 0; i < inputCollection.length; i++) {
      if (inputCollection[i].checked) {
        liElements[i].remove();
      }
    }
    clearCompleted.style.display = "none";
    visor(ulCollection);
  });
};

let footerMenu = () => {
  let selectButtons = document.querySelector(".selectButtons");
  selectButtons.addEventListener("click", function (e) {
    if (e.target.classList.contains("activeBut")) {
      activeFunction();
    } else if (e.target.classList.contains("completedBut")) {
      completedFunction();
    } else if (e.target.classList.contains("allBut")) {
      allFunction();
    }
  });
};

let footerFocus = () => {
  const links = document.querySelectorAll("ul.selectButtons a");
  for (const link of links) {
    link.addEventListener("click", (e) => {
     for (const link of links) {
       link.parentElement.classList.remove("focus");
     };
     link.parentElement.classList.add("focus");
    })
  }
};

let fixInput = () => {
  let liElements = document.querySelectorAll("ul.selectButtons li");
  for (let i = 0; i < liElements.length; i++ ) {
    if (liElements[0].classList.contains("focus")) {
      allFunction();
    } else if (liElements[1].classList.contains("focus")) {
      activeFunction();
    } else if (liElements[2].classList.contains("focus")) {
      completedFunction();
    }
  }
};


let completedFunction = () => {
  let inputCollection = ulList.querySelectorAll(".origCheck");
  let liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked === false) {
      liElements[i].style.display = "none";
    } else {
      liElements[i].style.display = "flex";
    }
  }
};

let activeFunction = () => {
  let inputCollection = ulList.querySelectorAll(".origCheck");
  let liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked) {
      liElements[i].style.display = "none";
    } else {
      liElements[i].style.display = "flex";
    }
  }
};

let allFunction = () => {
  let liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].style.display = "flex";
  }
};

let countItemsFunction = () => {
  let liElements = ulList.querySelectorAll(".blockList__elem");
  let inputCollection = ulList.querySelectorAll(".origCheck");
  let activeItems = [];  
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked === false) {
      activeItems.push(liElements[i]);
    }    
  }
  let text = (activeItems.length === 1) ? ' item' : ' items';
  return counterItems.textContent = activeItems.length + text + ' left';
};

let editorFunction = () => {
  let liElements = ulList.querySelectorAll(".blockList__elem");  
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("dblclick", () => {
     let editorInput = liElements[i].querySelector('.editorInput');
     let paragraf = liElements[i].querySelector("p");
      editorInput.style.display = 'block';          
      editorInput.focus();
      editorInput.value = paragraf.textContent.trim();
      liElements[i].addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "Escape") {          
            if (editorInput.value !== '' && editorInput.value.trim())    {          
              editorInput.style.display = 'none';
              paragraf.textContent = editorInput.value;    
              editorInput.style.outline = '1px solid #16d0ff66';      
            }  else {
              liElements[i].remove();
              visor(ulCollection);              
            }           
        }
      })         
    })
  } 
};




let easterEgg = () => {
  headerImage.addEventListener('click', function() {    
    count++;
    if (count === 26) {
      image.src = 'images/cat.jpg';      
      headerTitle.textContent = 'THE EASTER CAT!';
      input.placeholder = 'Congratulations! You found the Easter cat!';
    } else if (count === 30) {
      dateDead();      
    }
  })
};

let dateDead = () => {
  let input = document.querySelector(".input_start");
  let now = new Date();
  let accident = 1986;
  let whereAmI = now.getFullYear();
  let whatTime = whereAmI - accident;
  if (input.value === "easter cat") {
    input.value = "It's been " + whatTime + " years";
  }
};

clearCompletedButton();
viewClearCompleted(ulList);
selectAllMarker();
footerMenu();
countItemsFunction();
easterEgg();
dateDead();