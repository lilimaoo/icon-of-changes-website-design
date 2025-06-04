document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".ioCPTV-grid");

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "ioCPTV-card";

    card.innerHTML = `
        <div class="ioCPTV-details">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          ${event.videoEmbed ? event.videoEmbed : ""}
          <a href="${
            event.link
          }" target="_blank" class="cta-button" style="display: inline-block;">View Event on Facebook</a>
        </div>
      `;

    container.appendChild(card);
  });
});
