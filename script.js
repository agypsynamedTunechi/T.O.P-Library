const main = document.querySelector("main");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("#dialog");
const submitBtn = document.querySelector(".submit");
const cancelBtn = document.querySelector(".cancel");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const selectEl = document.querySelector("select");

const myLibrary = [];

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

// cancelBtn.addEventListener("click", () => {
//   dialog.close();
// });

dialog.addEventListener("close", addBookToLibrary);

submitBtn.addEventListener("click", (event) => {
  if(titleInput.value === "" || authorInput.value === "" || pagesInput.value === ""){
    return;
  }
  event.preventDefault();
  dialog.close();
});

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.uuid = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value);
  myLibrary.push(book);

  const cardDiv = document.createElement("div");
  cardDiv.classList = "card";
  cardDiv.dataset.id = book.uuid
  main.appendChild(cardDiv);

  console.log(cardDiv.dataset.id)

  const bookHeader = document.createElement("h2");
  bookHeader.classList = "title";
  cardDiv.appendChild(bookHeader);
  bookHeader.textContent = book.title;

  const authorPara = document.createElement("p");
  authorPara.classList = "author";
  cardDiv.appendChild(authorPara);
  authorPara.textContent = book.author;

  const pagePara = document.createElement("p");
  pagePara.classList = "pages";
  cardDiv.appendChild(pagePara);
  pagePara.textContent = `Pages: ${book.pages}`;

  const readDiv = document.createElement("div");
  readDiv.classList = "read";
  cardDiv.appendChild(readDiv);

  const readPara = document.createElement("p");
  readPara.textContent = `Read`;
  readDiv.appendChild(readPara);

  const checkDiv = document.createElement("div");
  checkDiv.classList = "check";
  readDiv.appendChild(checkDiv);

  const checkSpan = document.createElement("span");
  checkSpan.textContent = "No";

  checkDiv.appendChild(checkSpan);

  const label = document.createElement("label");
  label.classList = "switch";
  checkDiv.appendChild(label);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  //   checkBox.textContent = "No"
  label.appendChild(checkBox);

  const labelSpan = document.createElement("span");
  labelSpan.classList = "slider round";
  label.appendChild(labelSpan);

  checkBox.addEventListener("click", () => {
    if (checkSpan.textContent === "No" && checkBox.checked) {
      checkSpan.textContent = "Yes";
    } else {
      checkSpan.textContent = "No";
    }
  });

  if(selectEl.value === "yes"){
    checkSpan.textContent = "Yes";
    checkBox.checked = true;
  }else{
    checkSpan.textContent = "No"
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList = "del";
  cardDiv.appendChild(delBtn);

  delBtn.addEventListener("click", ()=>{
    
   for(let i = 0; i < myLibrary.length; i++){
    const index = myLibrary.indexOf(myLibrary[i]);
    if(myLibrary[i].uuid === cardDiv.dataset.id){
      myLibrary.splice(index, 1);
      cardDiv.remove()
    }
   }


  })

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  selectEl.value = "default"
}

// addBookToLibrary();
