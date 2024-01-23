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
      console.log(json);
      alert(`Speaker uploaded successfully`);
  })
  .catch(err => console.error(err));
}
document.getElementById("btnSend").addEventListener('click', newSpeaker);