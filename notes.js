const taskContainer = document.querySelector(".task__container");

let globalStore = [];

console.log(taskContainer);

const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4">
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageUrl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
   <p class="card-text">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;


const loadInitialCardData = () => {
  //localstorage to get tasky card data
const getCardData = localStorage.getItem("tasky");


  //covert to normal object
const {cards} = JSON.parse(getCardData);


  //loop over those array of task obejct to create HTML card , inject it to DOM
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update our globalStore
  globalStore.push(cardObject);
}

)

};

//delete function 

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagName = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
    
    if(tagName === "BUTTON"){
        taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }

    else{
        taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }

};



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //creates the ID uniquely and dolar is used here because date.now() changes id again which makes it dynamic so it is added for chaning dynamic data 
        // id is created because there would too many cards of notes each would be identified by those 
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDiscription: document.getElementById("taskdescription").value
    };
    

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

};
