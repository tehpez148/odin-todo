import "./styles.css";
//array to hold projects 
let projects = [];
//set up ID value 
let ID = 0;

//project factory that creates projects objects, has a generic talk function for testing and a complete function to alter
//the genre to completed hopefully 
function projectFactory(title, genre, description, priority){

    const PID = ID + 1;
    ID++;

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
function createProject(){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let genre = document.getElementById("genre");
    let priority = document.getElementById("priority");
    

    let titleValue = title.value;
    let descriptionValue = description.value;
    let genreValue = genre.value;
    let priorityValue = priority.value;

    let currentProject = projectFactory(titleValue,genreValue,descriptionValue,priorityValue);

    
  

    projects.push(currentProject);
    console.log(projects);
    populateCards();
}

const projectForm = document.getElementById("projectform");

//event listening on submission of modal, also resets the form for continued usage
projectForm.addEventListener("submit", () => {
    createProject();
    projectForm.reset();
});


const projectGrid = document.getElementById("rightBox");

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

/*

Don't think this is working because this const is being created on pageload so has nothing to fill it
as project cards haven't been made yet
const complete_buts = document.querySelectorAll(".completeBut");

complete_buts.forEach((button) =>{
  button.addEventListener('click', () =>{
    console.log('a completion has happened');
    populateCards();
  })
})

*/
