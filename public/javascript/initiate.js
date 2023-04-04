formDiv=document.getElementById("formDiv");

function addCandidate() {
    formDiv.innerHTML += 
        "<input type='text' class='form-control' placeholder='First Name'>" + 
        "<input type='text' class='form-control' placeholder='Last Name'>" + 
        "<input type='text' class='form-control' placeholder='Candidate Description'>";
}