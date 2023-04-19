formDiv=document.getElementById("formDiv");

function addCandidate() {
    formDiv.innerHTML += 
        "<input type='text' class='form-control w-25' placeholder='First Name'>" + 
        "<input type='text' class='form-control w-25' placeholder='Last Name'>" + 
        "<input type='text' class='form-control w-50' placeholder='Candidate Description'>";
}