import "./styles.css";
//array to hold projects 
let projects = [{}];
//set up ID value 
let ID = 0;

//project factory that creates projects objects, maybe 
function projectFactory(title, genre, description, priority){

    const PID = ID + 1;
    ID++;

    return {
      title: title,
      genre: genre,
      description: description, 
      priority: priority, 
      PID: PID,
      talk: function(){
        console.log('my title is ' + title +'. My genre is '+ genre +'and my priority is '+ priority +'. PID:' +PID);
      },
      delete: function(){

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
//perhaps need to seperate out the DOM logic?
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

    createCard(currentProject);
    currentProject.talk();
  

    projects.push(currentProject);
}

const projectForm = document.getElementById("projectform");

//also resets the form for continued usage
projectForm.addEventListener("submit", () => {
    createProject();
    projectForm.reset();
});


const projectGrid = document.getElementById("rightBox");

//takes a project as an argument and then creates a cards with title and description.
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
  cardButtonBox.appendChild(projectComplete);

  const projectDelete = document.createElement('button');
  projectDelete.textContent='Delete?';
  cardButtonBox.appendChild(projectDelete);
  
  projectGrid.appendChild(card); 
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

//still working on this, selecting genre by class hopefully 
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