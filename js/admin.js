const newSpeaker = () => {
  debugger
  const speaker = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    topic: document.getElementById('topic').value,
    email: document.getElementById('email').value

  };
  fetch(`http://localhost:8080/speaker2/api/speaker`,{
    method: 'POST',
    body: JSON.stringify(speaker),
  })
  .then(response => response.json()) 
  .then(json => {
      alert(`Speaker uploaded successfully`);
  })
  .catch(err => console.log(err));
}
document.getElementById("btnSend").addEventListener('click', newSpeaker);





const listSpeakers = () => { 

  const resp = fetch(`http://localhost:8080/speaker2/api/speaker`)

  resp
      .then(response => response.json())
      .then(data => processList(data))//fulfilled
      .catch(error => drawError(error))//rejected
}    

function processList(data) {

  //guardo en localStorage
  saveSpeakersInFromLocal('speakers', data);

  const listSpeakers = data;
  let rows = '';
  for(let speaker of listSpeakers) {
      console.log(speaker);
      rows += `
      <tr>
          <th scope="row">${speaker.id}</th>
          <td>${speaker.name}</td>
          <td>${speaker.surname}</td>
          <td>${speaker.topic}</td>
          <td>${speaker.email}</td>
          <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edit(${speaker.id})">
                  Edit
              </button>
              <button onclick="deleteUpdate(${speaker.id})" type="button" class="btn btn-danger">
                  Delete
              </button>
          </td>
      </tr>
      `
  }
  document.getElementById('usersRows').innerHTML = rows;
}

function drawError(error) {
  console.log(error);
  const alerta = `<div class="alert alert-danger" role="alert">
      ${error.toString()}
  </div>`;
  document.getElementById('msj').innerHTML = alerta;
}
document.getElementById("btnList").addEventListener('click', listSpeakers);



deleteUpdate = (id) => {
  if(!confirm('¿Are you sure?')) {
      return;
  }

  fetch(`http://localhost:8080/speaker2/api/speaker?id=${id}`, {
      method: "DELETE",
  })
  .then(response => response) 
  .then(json => {
      alert(`Deleted speaker id: ${id}`);
      listSpeakers();
  })
  .catch(err => console.log(err));
}




const getSpeakersFromLocal = () => {
  const speakers = localStorage.getItem('speakers')
  if(speakers) {
      return JSON.parse(speakers);
  }
  return [];
}
const getSpeakerSelected = () => {
  const obj = localStorage.getItem('speakerSearched')
  if(obj) {
      return JSON.parse(obj);
  }
  return null;
}
const removeSpeakerSelected = () => {
  localStorage.removeItem('speakerSearched');
}
const saveSpeakersInFromLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));//como texto
}


const edit = (id) => {
  const speakers = getSpeakersFromLocal();//[]
  const speakerSearched = speakers.find(s => s.id === id);
  
  document.getElementById('nameUpdate').value = speakerSearched.name;
  document.getElementById('surnameUpdate').value = speakerSearched.surname;
  document.getElementById('topicUpdate').value = speakerSearched.topic;
  document.getElementById('emailUpdate').value = speakerSearched.email;

  saveSpeakersInFromLocal('speakerSearched', speakerSearched);
}


const updateSpeaker = () => {
  const speakerSelected = getSpeakerSelected();
  if(!speakerSelected) {
      return
  }
  const name = document.getElementById('nameUpdate').value;
  const surname = document.getElementById('surnameUpdate').value;
  const topic = document.getElementById('topicUpdate').value;
  const email = document.getElementById('emailUpdate').value;

  const speaker = {
       name,
       surname,
       topic,
       email,
  };
  fetch(`http://localhost:8080/speaker2/api/speaker?id=${speakerSelected.id}`, {
      method: "PUT",
      body: JSON.stringify(speaker),
  })
  .then(response => response) //status code 200
  .then(json => {
      alert(`Edited speaker id:${speakerSelected.id}`);
      //cargar la lista 
      listSpeakers();
      removeSpeakerSelected();
      closeModal();
  })
  .catch(err => console.log(err));
}
const closeModal = () => {
  document.getElementById('btnCloseModal').click();
}