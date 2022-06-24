const ulList = document.querySelector(".blockList");
const ulCollection = ulList.children;
const templateLi = document.querySelector("#createLi").content;
const toggleInput = document.querySelector(".toggle-all");
const toggle = document.querySelector(".toggleLabel");
const input = document.querySelector(".input_start");
const clearCompleted = document.querySelector(".clearCompleted");
const footer = document.querySelector(".footer");
const counterItems = document.querySelector(".counterItems");
const image = document.querySelector(".image");
const headerImage = document.querySelector(".header__image");
const headerTitle = document.querySelector(".superTitle");
let count = 0;
const items = JSON.parse(localStorage.getItem("items")) || [];
window.onload = () => {   
  deleteNote();  
  toggleColor(); 
  makeDoneTrue();
  visor(ulCollection);
  addToUlList(items, ulList);
  localStorage.setItem("items", JSON.stringify(items));
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value.trim()) {
    toggle.style.display = "block";
    footer.style.display = "flex";
    const createLi = templateLi
      .querySelector(".blockList__elem")
      .cloneNode(true);
    const paragraph = createLi.querySelector("p");
    const messageText = input.value;
    paragraph.textContent = messageText;    
    input.value = "";
    const item = {
      messageText,
      done: false,
    };
    items.push(item);
    editorFunction();
    deleteNote();
    addToUlList(items, ulList);
    localStorage.setItem("items", JSON.stringify(items));    
    countItemsFunction();    
    makeDoneTrue();
    visor(ulCollection);
    
  }
});

const addToUlList = (arrays = [], myList) => {
  myList.innerHTML = arrays
    .map((array, i) => {
      return `
  <li class="blockList__elem">
    <div class="check-wrapp">
      <label>
       <input class="origCheck" data-index = ${i} id= "item${i}" type="checkbox" ${
        array.done ? "checked" : ""
      }/>
        <div class="falseCheck"></div>
     </label>
    </div>
    <div class="paragraph-wrap">
      <p class = '${(array.done ? 'selectP': '')}'>${array.messageText}</p>
      <input class="editorInput" type="text">
      <button class="closeMe"></button>
      <label for = "item${i}"></label>
  </li>    
    `;
    })
    .join("");
  editorFunction();
  deleteNote();  
  toggleColorFragmentCode(); 
  footerFocus();
  selectAllMarker();
  countItemsFunction();
  fixInput();
  viewClearCompleted();
};

const deleteNote = () => {
  const liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < liElements.length; i++) {
    const btn = liElements[i].querySelector(".closeMe");
    btn.addEventListener("click", function () {      
      items.splice(i, 1);      
      addToUlList(items, ulList);
      localStorage.setItem("items", JSON.stringify(items));
      visor(ulCollection);
      toggleColorFragmentCode();
      countItemsFunction();
    });
  }
};

function visor(object) {
  if (object.length === 0) {
    toggle.style.display = "none";
    footer.style.display = "none";
  } else {
    toggle.style.display = "block";
    footer.style.display = "flex";
  }
};

const viewClearCompleted = () => {
  if (items.some(elem => elem.done)) {
    clearCompleted.style.display = "block";
  } else {
    clearCompleted.style.display = "none";
  }  
};

const selectAllMarker = () => {
  toggle.addEventListener("click", function () {
    const inputCollection = ulList.querySelectorAll(".origCheck");
    if (toggleInput.checked) {
      for (const char of inputCollection) {
        char.checked = false;
      }
      clearCompleted.style.display = "none";
    } else {
      for (const char of inputCollection) {
        char.checked = true;
      }
      clearCompleted.style.display = "block";
    }
  });
};

const toggleColor = () => {
  ulList.addEventListener("change", function () {
    const inputCollection = ulList.querySelectorAll(".origCheck");
    const arrayTogle = [];

    for (let i = 0; i < inputCollection.length; i++) {
      if (inputCollection[i].checked) {
        arrayTogle.push(inputCollection[i]);
      }
    }
    if (arrayTogle.length === inputCollection.length) {
      toggleInput.checked = true;
    } else {
      toggleInput.checked = false;
    }
  });
};

const toggleColorFragmentCode = () => {
  const inputCollection = ulList.querySelectorAll(".origCheck");
  const arrayTogle = [];
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked) {
      arrayTogle.push(inputCollection[i]);
    }
  }

  if (arrayTogle.length === inputCollection.length) {
    toggleInput.checked = true;
  } else {
    toggleInput.checked = false;
  }
};

const clearCompletedButton = () => {
  clearCompleted.addEventListener("click", function () {
    
    const clearItems = items.filter(elem => elem.done);
    
   clearItems.forEach((elem) => {
   const index = items.indexOf(elem);
   items.splice(index, 1);
   });   
    addToUlList(items, ulList);
    localStorage.setItem("items", JSON.stringify(items));
    clearCompleted.style.display = "none";
    visor(ulCollection);
  });
};

const footerMenu = () => {
  const liElement = document.querySelectorAll("ul.selectButtons li");
  for (let btn of liElement) {
    btn.addEventListener("click", function (e) {
      if (e.target.classList.contains("activeBtn")) {
        activeFunction();
      } else if (e.target.classList.contains("completedBtn")) {
        completedFunction();
      } else if (e.target.classList.contains("allBtn")) {
        allFunction();
      }
    });
  }
};

const footerFocus = () => {
  const links = document.querySelectorAll("ul.selectButtons li");
  for (const link of links) {
    link.addEventListener("click", () => {
      document.querySelector("ul.selectButtons li.focus").classList.remove('focus');
      link.classList.add("focus");
    });
  }
};

const fixInput = () => {
  const liElements = document.querySelectorAll("ul.selectButtons li");
  for (let i = 0; i < liElements.length; i++) {
    if (liElements[0].classList.contains("focus")) {
      allFunction();
    } else if (liElements[1].classList.contains("focus")) {
      activeFunction();
    } else if (liElements[2].classList.contains("focus")) {
      completedFunction();
    }
  }
};

const completedFunction = () => {
  const inputCollection = ulList.querySelectorAll(".origCheck");
  const liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < inputCollection.length; i++) {
    if (!inputCollection[i].checked) {
      liElements[i].style.display = "none";
    } else {
      liElements[i].style.display = "flex";
    }
  }
};

const activeFunction = () => {
  const inputCollection = ulList.querySelectorAll(".origCheck");
  const liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < inputCollection.length; i++) {
    if (inputCollection[i].checked) {
      liElements[i].style.display = "none";
    } else {
      liElements[i].style.display = "flex";
    }
  }
};

const allFunction = () => {
  const liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].style.display = "flex";
  }
};

const countItemsFunction = () => {
  const liElements = ulList.querySelectorAll('.blockList__elem .origCheck:not(:checked)').length;
  const inputCollection = ulList.querySelectorAll(".origCheck");
  const activeItems = [];
  for (let i = 0; i < inputCollection.length; i++) {
    if (!inputCollection[i].checked) {
      activeItems.push(liElements[i]);
    }
  }
  const text = activeItems.length === 1 ? " item" : " items";
  return (counterItems.textContent = `${activeItems.length} ${text} left`);
};

const editorFunction = () => {
  const liElements = ulList.querySelectorAll(".blockList__elem");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("dblclick", () => {
      const editorInput = liElements[i].querySelector(".editorInput");
      const paragraf = liElements[i].querySelector("p");
      editorInput.style.display = "block";
      let mouseDownHappened = false;
      editorInput.addEventListener("blur", () => {
        if (mouseDownHappened) {
          if (editorInput.value.trim()) {
            items[i].messageText = editorInput.value;
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
            editorInput.style.display = "none";
          } else {
            items.splice(i, 1);
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
            visor(ulCollection);
            countItemsFunction();
          }
        }
      });

      document.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("editorInput")) {
          mouseDownHappened = false;
        } else {
          mouseDownHappened = true;
        }
      });

      editorInput.addEventListener("focus", () => {
        editorInput.value = paragraf.textContent.trim();
      });

      editorInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          mouseDownHappened = false;
          if (editorInput.value.trim()) {
            editorInput.style.display = "none";
            items[i].messageText = editorInput.value;
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
          } else {
            items.splice(i, 1);
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
            visor(ulCollection);
            countItemsFunction();
          }
        } else if (e.key === "Escape") {
          mouseDownHappened = false;
          if (editorInput.value.trim()) {
            items[i].messageText = editorInput.value;
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
            editorInput.style.display = "none";
          } else {
            paragraf.value = editorInput.textContent;
            editorInput.style.display = "none";
            addToUlList(items, ulList);
            localStorage.setItem("items", JSON.stringify(items));
          }
        }
      });
      editorInput.focus();
    });
  }
};

const easterEgg = () => {
  headerImage.addEventListener("click", function () {
    count += 1;
    if (count === 26) {
      image.src = "images/cat.jpg";
      headerTitle.textContent = "THE EASTER CAT!";
      input.placeholder = "Congratulations! You found the Easter cat!";
    } else if (count === 30) {
      dateDead();
    }
  });
};

const dateDead = () => {
  const input = document.querySelector(".input_start");
  const now = new Date();
  const accident = 1986;
  const whereAmI = now.getFullYear();
  const whatTime = whereAmI - accident;
  if (input.value === "easter cat") {
    input.value = "It's been " + whatTime + " years";
  }
};

const makeDoneTrue = () => {
  const toggleInput = document.querySelector(".toggle-all");
  toggleInput.addEventListener("click", () => {
    if (toggleInput.checked) {
      for (let i = 0; i < items.length; i++) {
        items[i].done = true;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].done = false;
      }
    }
    localStorage.setItem("items", JSON.stringify(items));
    addToUlList(items, ulList);
  });
};

const toggleDone = (e) => {
  if (!e.target.matches(".origCheck")) return;

  const el = e.target;
  const index = el.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  addToUlList(items, ulList);
};

ulList.addEventListener("click", toggleDone);
editorFunction();
addToUlList(items, ulList);
visor(ulCollection);
clearCompletedButton();
footerMenu();
easterEgg();
dateDead();

