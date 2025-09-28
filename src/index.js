import "./styles.css";

//array to hold projects 
let projects = [];

//select the location for all the projects to live
const projectGrid = document.getElementById("rightBox");



//Checks if localStorage is available, if so pulls global ID Variable and recalls any previous projects
//if not sets up start global ID and projects variables. 
if(storageAvailable("localStorage")) {
  console.log("storage available");
  var ID = Number(localStorage.getItem("ID"));
  recallProjectsInLocalStorage();
} else {
  console.log("no storage available :'(")
  projects = [];
  var ID = 1
};




//project factory that creates projects objects, has a generic talk function for testing 
//and a complete function to alter the genre to completed
//delete functions removes project from projects array, and deletes from localStorage
function projectFactory(title, genre, description, priority, TID){
  //allows for the factory to work on older and new Projects 
  let PID = '';
  if (TID != 0){
     PID = TID
    } else {
     PID = ID;
      ID++;
      localStorage.setItem("ID", ID);
  }

    

  return {
      title: title,
      genre: genre,
      description: description, 
      priority: priority, 
      PID: PID,
      talk(){
        console.log('my title is ' + title +'. My genre is '+ genre +' and my priority is '+ priority +'. PID:' +PID);
      },
      complete(){
        this.genre = "complete";
        this.priority="done";
        console.log(projects);
      },
      delete(){
        let projIndex = projects.findIndex(projects => projects.PID === this.PID);
        projects.splice(projIndex,1);
        localStorage.removeItem(`Project ${this.PID}`);
        
      }
    };
};


//creates variables for add project dialog button
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("showButton");
const closeButton = document.querySelector("dialog button");

//Shows dialogue box on click. 
showButton.addEventListener("click", () => {
  dialog.showModal();
  
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

//function to take in arguments from modal to create a project objects using factory function
//pushes new project to array
//function then resets the DOM and adds all projects in array as cards
function createNewProject(){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let genre = document.getElementById("genre");
    let priority = document.getElementById("priority");
    

    let titleValue = title.value;
    let descriptionValue = description.value;
    let genreValue = genre.value;
    let priorityValue = priority.value;
    let tempIDValue = 0;

    let currentProject = projectFactory(titleValue,genreValue,descriptionValue,priorityValue, tempIDValue);

    projects.push(currentProject);
    setInLocalStorage(currentProject);

    populateCards();
}

//function to re-create projects from storage, as they are stored in JSON and lose functionality 
function createStoredProject(project){
  let titleValue = project.title;
  let descriptionValue = project.description;
  let genreValue = project.genre;
  let priorityValue = project.priority;
  let tempIDValue = project.thisIDValue;

  let currentProject = projectFactory(titleValue,genreValue,descriptionValue,priorityValue, tempIDValue);

  projects.push(currentProject);

  populateCards();
  
}

//set's a given project in the localStorage, with the PID as it's key. 
function setInLocalStorage(project){
  localStorage.setItem(`Project ${project.PID}`, JSON.stringify(project));
  console.log(JSON.parse(localStorage.getItem(`Project ${project.PID}`)));

}
//function to recall previous projects if viable, parses the stored JSONs and then create project cards etc. 
function recallProjectsInLocalStorage(){
  let i = 0;
  while (i <= ID){
  let testProject = JSON.parse(localStorage.getItem(`Project ${i}`));
  if (testProject === null){
    console.log("nothing here");
  } else {
    createStoredProject(testProject);
  }
  i++;
}
  console.log(projects);
};

//selects the form inside the Modal 
const projectForm = document.getElementById("projectform");

//event listening on submission of modal, also resets the form for continued usage
projectForm.addEventListener("submit", () => {
    createNewProject();
    projectForm.reset();
});



//takes a project as an argument and then creates a card with title and description.
//card takes values of genre and priority and assigns them as classes 
function createCard(project){
  const card = document.createElement('div');
  card.classList.add('card');

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = project.title;
  card.appendChild(projectTitle);

  const projectDescription = document.createElement('p');
  projectDescription.textContent = project.description;
  card.appendChild(projectDescription);

  card.classList.add(project.genre);

  card.classList.add(project.priority);

  const cardButtonBox = document.createElement('div');
  cardButtonBox.classList.add('cardButtonBox');
  card.appendChild(cardButtonBox);

  const projectComplete = document.createElement('button');
  projectComplete.textContent='Completed it mate';
  projectComplete.classList.add('completeBut');
  cardButtonBox.appendChild(projectComplete);

  projectComplete.addEventListener('click',() =>{
    project.complete();
    
    populateCards();
  })


  const projectDelete = document.createElement('button');
  projectDelete.textContent='Delete?';
  cardButtonBox.appendChild(projectDelete);

  projectDelete.addEventListener('click', () =>{
    project.delete();

    populateCards();
  })
  


  projectGrid.appendChild(card); 
};


//Function that resets DOM of projectGrid element and adds existing projects in array to Grid
function populateCards(){
  projectGrid.replaceChildren();
  projects.forEach((project) =>{
    createCard(project);

  });
}

//select buttons for different genres of projects
const selectWork = document.getElementById("work");
const selectStudy = document.getElementById("study");
const selectMisc = document.getElementById("misc");
const selectAll = document.getElementById("all");
const resetAll = document.getElementById("reset");

selectWork.addEventListener('click', () =>{
  showGenre(work.id);
});

selectStudy.addEventListener('click', () =>{
  showGenre(study.id)
});

selectMisc.addEventListener('click', () =>{
  showGenre(misc.id)
});

selectAll.addEventListener('click',() => {
  showGenre("card")
})

//big reset button, need to add an 'are you sure' modal?
resetAll.addEventListener('click', () => {
  let warning = "Are you sure?\nThis will reset everything?";
  if(confirm(warning) == true){
  localStorage.clear();
  projects = [];
  projectGrid.replaceChildren();}
  else{
    alert("Phew!");
  }
})

//shows cards based on genre, select display to none if genre/class isn't selected
function showGenre(genre) {
  const allProjects = document.querySelectorAll(".card");
  console.log(genre);

  allProjects.forEach((project) => {
    if (project.classList.contains(genre)){
      project.style.display='block';
    } else {
      project.style.display='none';
    }
  });

};


//function to check if local storage is available 
function storageAvailable(type) {
  let storage;
  try{
    storage=window[type];
    const x = "__storage_test__";
    storage.setItem(x,x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return(
      e instanceof DOMException && 
      e.name == "QuotaExceededError" &&
      storage &&
      storage.length!== 0
    );
  }
}
