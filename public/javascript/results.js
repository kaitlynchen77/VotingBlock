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
    const groupId = "carouselGroup" + i;

    // Create carousel container for the group
    const carouselContainer = document.createElement("div");
    carouselContainer.id = groupId;
    carouselContainer.classList.add("carousel");
    carouselContainer.classList.add("slide");

    // Create carousel inner container
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");

    // Iterate through polls
    for (let j = 0; j < group.polls.length; j++) {
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

      // Iterate through options
      for (let k = 0; k < poll.options.length; k++) {
        const option = poll.options[k];
        const optionText = document.createTextNode(option.name + " -- " + option.voteCount);
        pollContainer.appendChild(optionText);
        pollContainer.appendChild(document.createElement("br"));
      }

      // Append poll container to carousel item
      carouselItem.appendChild(pollContainer);

      // Append carousel item to carousel inner container
      carouselInner.appendChild(carouselItem);
    }

    // If no current elections, display message
    if (group.polls.length === 0) {
      const noElections = document.createElement("div");
      noElections.innerText = "No current polls.";
      noElections.classList.add("custom-slide");
      noElections.classList.add("shaded-box"); // Apply shaded box style
      carouselInner.appendChild(noElections);
    }

    // Append carousel inner container to carousel container
    carouselContainer.appendChild(carouselInner);

    // Create carousel controls
    const carouselControls = document.createElement("div");
    carouselControls.innerHTML =
      `<a class="carousel-control-prev" href="#${groupId}" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#${groupId}" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>`;

    // Append carousel controls to carousel container
    carouselContainer.appendChild(carouselControls);

    // Append carousel container to the document
    current.appendChild(carouselContainer);
    var carousel = document.querySelector('#' + groupId);
    new bootstrap.Carousel(carousel, {
      interval: false,
      wrap: true,
      keyboard: false,
      pause: "hover"
    });
  }
}
