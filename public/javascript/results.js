window.onload = initialize();

async function initialize() {
  await sharedInitialize();
  await displayGroups();
}

function displayGroups() {
  const past = document.querySelector("#past_polls");
  const current = document.querySelector("#current_polls");

  // Iterate through groups
  for (let i = 0; i < activeGroups.length; i++) {
    const group = groups[activeGroups[i]];

    // following code modified from https://getbootstrap.com/docs/5.3/components/carousel/, with help from ChatGPT

    //creating carousel of current elections
    const groupIdCurr = "carouselGroupCurrent" + i;

    // Create carousel container for the group
    const carouselContainerCurr = document.createElement("div");
    carouselContainerCurr.id = groupIdCurr;
    carouselContainerCurr.classList.add("carousel");
    carouselContainerCurr.classList.add("slide");

    // Create carousel inner container
    const carouselInnerCurr = document.createElement("div");
    carouselInnerCurr.classList.add("carousel-inner");

    // If no current elections, display message
    if (group.polls.length === 0) {
      const noElectionsCurr = document.createElement("div");
      noElectionsCurr.innerText = "No current polls.";
      noElectionsCurr.classList.add("custom-slide");
      noElectionsCurr.classList.add("shaded-box"); // Apply shaded box style
      carouselInnerCurr.appendChild(noElectionsCurr);
    } else {
      // Iterate through polls
      for (let j = 0; j < group.polls.length; j++) {
        const pollCurr = group.polls[j];
        const pollIdCurr = groupIdCurr + "Poll" + j;

        // Create carousel item
        const carouselItemCurr = document.createElement("div");
        carouselItemCurr.classList.add("carousel-item");
        if (j === 0) {
          carouselItemCurr.classList.add("active");
        }

        // Create poll container
        const pollContainerCurr = document.createElement("div");
        pollContainerCurr.classList.add("custom-slide");
        pollContainerCurr.classList.add("shaded-box"); // Apply shaded box style
        pollContainerCurr.id = pollIdCurr;

        // Create poll title element
        const pollTitleCurr = document.createElement("h2");
        pollTitleCurr.innerText = pollCurr.pollTitle;
        pollContainerCurr.appendChild(pollTitleCurr);

        // Iterate through options
        for (let k = 0; k < pollCurr.options.length; k++) {
          const optionCurr = pollCurr.options[k];
          const optionTextCurr = document.createTextNode(optionCurr.name + " -- " + optionCurr.voteCount);
          pollContainerCurr.appendChild(optionTextCurr);
          pollContainerCurr.appendChild(document.createElement("br"));
        }

        // Append poll container to carousel item
        carouselItemCurr.appendChild(pollContainerCurr);

        // Append carousel item to carousel inner container
        carouselInnerCurr.appendChild(carouselItemCurr);
      }
      // Create carousel controls
      const carouselControlsCurr = document.createElement("div");
      carouselControlsCurr.innerHTML =
      `<button class="carousel-control-prev" type="button" data-bs-target="#${groupIdCurr}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${groupIdCurr}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`;

      // Append carousel controls to carousel container
      carouselContainerCurr.appendChild(carouselControlsCurr);

    }
    // Append carousel inner container to carousel container
    carouselContainerCurr.appendChild(carouselInnerCurr);
    // Append carousel container to the document
    current.appendChild(carouselContainerCurr);

    
    // creating carousel of past elections
    const groupIdPast = "carouselGroupPast" + i;

    // Create carousel container for the group
    const carouselContainerPast = document.createElement("div");
    carouselContainerPast.id = groupIdPast;
    carouselContainerPast.classList.add("carousel");
    carouselContainerPast.classList.add("slide");

    // Create carousel inner container
    const carouselInnerPast = document.createElement("div");
    carouselInnerPast.classList.add("carousel-inner");

    // If no current elections, display message
    if (group.completed.length === 0) {
      const noElectionsPast = document.createElement("div");
      noElectionsPast.innerText = "No past polls.";
      noElectionsPast.classList.add("custom-slide");
      noElectionsPast.classList.add("shaded-box"); // Apply shaded box style
      carouselInnerPast.appendChild(noElectionsPast);
    } else {
      // Iterate through polls
      for (let j = 0; j < group.completed.length; j++) {
        const pollPast = group.completed[j];
        const pollIdPast = groupIdPast + "Poll" + j;

        // Create carousel item
        const carouselItemPast = document.createElement("div");
        carouselItemPast.classList.add("carousel-item");
        if (j === 0) {
          carouselItemPast.classList.add("active");
        }

        // Create poll container
        const pollContainerPast = document.createElement("div");
        pollContainerPast.classList.add("custom-slide");
        pollContainerPast.classList.add("shaded-box"); // Apply shaded box style
        pollContainerPast.id = pollIdPast;

        // Create poll title element
        const pollTitlePast = document.createElement("h2");
        pollTitlePast.innerText = pollPast.pollTitle;
        pollContainerPast.appendChild(pollTitlePast);

        // Iterate through options
        for (let k = 0; k < pollPast.options.length; k++) {
          const optionPast = pollPast.options[k];
          const optionTextPast = document.createTextNode(optionPast.name + " -- " + optionPast.voteCount);
          pollContainerPast.appendChild(optionTextPast);
          pollContainerPast.appendChild(document.createElement("br"));
        }

        // Append poll container to carousel item
        carouselItemPast.appendChild(pollContainerPast);

        // Append carousel item to carousel inner container
        carouselInnerPast.appendChild(carouselItemPast);
      }

      if(group.completed.length>1) {
        // Create carousel controls
        const carouselControlsPast = document.createElement("div");
        carouselControlsPast.innerHTML =
        `<button class="carousel-control-prev" type="button" data-bs-target="#${groupIdPast}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${groupIdPast}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>`;

        // Append carousel controls to carousel container
        carouselContainerPast.appendChild(carouselControlsPast);
      }
    }
    // Append carousel inner container to carousel container
    carouselContainerPast.appendChild(carouselInnerPast);
    // Append carousel container to the document
    past.appendChild(carouselContainerPast);
  }
}
