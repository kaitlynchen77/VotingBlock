window.onload = initialize();

async function initialize() {
  await sharedInitialize();
  await renderBallots();
}

async function vote(group, poll) { // group, election are numbers
  let id;
  const options = document.getElementsByName('options' + group + ',' + poll)
  // Checks to see which if any option has been selected
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      id = i;
      break;
    }
  }
  const accounts = await web3.eth.getAccounts();
  // Votes for option if one has been selected 
  if (id != null) {
    await contract.methods.vote(group, poll, id).send({ from: accounts[0] });
    window.location.reload(); // quite a bit of lag here, although for some reason this isn't the case for any of the functions in groups.js
  }
}

function renderBallots() {
  const ballots = document.querySelector("#ballots");
  // Iterate through groups
  for (let i = 0; i < activeGroups.length; i++) {
    const group = groups[activeGroups[i]];

    // following code modified from https://getbootstrap.com/docs/5.3/components/carousel/, with help from ChatGPT

    //creating carousel of current elections
    const groupId = "carouselGroupCurrent" + i;

    // Create carousel container for the group
    const carouselContainer = document.createElement("div");
    carouselContainer.id = groupId;
    carouselContainer.classList.add("carousel");
    carouselContainer.classList.add("slide");

    // Create carousel inner container
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");

    // If no current elections, display message
    if (group.polls.length === 0) {
      const noElections = document.createElement("div");
      noElections.innerText = "No current polls.";
      noElections.classList.add("custom-slide");
      noElections.classList.add("shaded-box"); // Apply shaded box style
      carouselInner.appendChild(noElections);
    } else {
      let hasVotableElection=false;
      // Iterate through polls
      for (let j = 0; j < groups[activeGroups[i]].polls.length; j++) {
        let voted = groups[activeGroups[i]].polls[j].voted;
        let k = 0;
        for (; k < voted.length; k++) { //only displays polls that user has not voted in
          if (voted[k] == accounts[0]) {
            break;
          }
        }
        if (k == voted.length) {
          hasVotableElection=true;
          const poll = group.polls[j];
          const pollId = groupId + "Poll" + j;

          // Create carousel item
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          if (j === 0) {
            carouselItem.classList.add("active");
          }

          // Create poll container
          const pollContainer = document.createElement("div");
          pollContainer.classList.add("custom-slide");
          pollContainer.classList.add("shaded-box"); // Apply shaded box style
          pollContainer.id = pollId;

          // Create poll title element
          const pollTitle = document.createElement("h2");
          pollTitle.innerText = poll.pollTitle;
          pollContainer.appendChild(pollTitle);

          const ballot = document.createElement('div')
          ballot.id = "group" + activeGroups[i] + "poll" + j
          pollContainer.appendChild(ballot);
          // render election title
          ballot.innerHTML += '<p>' + groups[activeGroups[i]].polls[j].pollTitle + '</p>'
          //iterate through options
          for (let l = 0; l < groups[activeGroups[i]].polls[j].options.length; l++) {
            ballot.innerHTML += `
          <div>
            <label>
              <input type="radio" name="options${activeGroups[i]},${j}" value="${l}" />
              ${groups[activeGroups[i]].polls[j].options[l].name}
            </label>
          </div>
`         ;
          }
          ballot.innerHTML += `
        <div>
          <button onclick="vote(${activeGroups[i]},${j});">VOTE</button>
        </div>`

          // Append poll container to carousel item
          carouselItem.appendChild(pollContainer);

          // Append carousel item to carousel inner container
          carouselInner.appendChild(carouselItem);

        }
      }
      if (hasVotableElection) {
      // Create carousel controls
      const carouselControls = document.createElement("div");
      carouselControls.innerHTML =
        `<button class="carousel-control-prev" type="button" data-bs-target="#${groupId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${groupId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`;

      // Append carousel controls to carousel container
      carouselContainer.appendChild(carouselControls);
      } else {
        const noElections = document.createElement("div");
        noElections.innerText = "No current polls.";
        noElections.classList.add("custom-slide");
        noElections.classList.add("shaded-box"); // Apply shaded box style
        carouselInner.appendChild(noElections);
      }


    }
    // Append carousel inner container to carousel container
    carouselContainer.appendChild(carouselInner);
    // Append carousel container to the document
    ballots.appendChild(carouselContainer);
  }
}