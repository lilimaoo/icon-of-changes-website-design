document.addEventListener("DOMContentLoaded", function () {
  const events = [
    {
      title:
        "The People’s Platform: Every Candidate, Every Voice” - MAGZ MAGLANA (Congressional Candidate 1st District Davao City)",
      description: `Icons of Change invites you to an insightful discussion with Maria Victoria "Mags" Z. Maglana, veteran independent consultant in governance and sustainable development a long-time human rights and transitional justice advocate, today, March 19, 2025, from 8:30 PM to 9:30 PM.`,
      link: "https://www.facebook.com/61564663490111/videos/683031690740763",
      videoEmbed: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FIconsOfChangePhilippines%2Fvideos%2F683031690740763%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`,
    },
    {
      title:
        "The People’s Platform: Every Candidate, Every Voice” - DR. CHIE UMANDAP (AKO-OFW Partylist)",
      description: `Icons of Change invites you to an insightful discussion with Dr. Celerino "Chie" Umandap, a dedicated advocate for Overseas Filipino Workers (OFWs) and nominee of the AKO-OFW Partylist. With years of experience in migrant welfare, social services, and governance, Dr. Umandap is committed to advancing policies that support OFWs, digital workers, and their families.`,
      link: "https://www.facebook.com/61564663490111/videos/514416404719560",
      videoEmbed: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FIconsOfChangePhilippines%2Fvideos%2F514416404719560%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`,
    },
    {
      title:
        "The People’s Platform: Every Candidate, Every Voice” - NORMAN MARQUEZ (Senatorial Candidate)",
      description: `Icons of Change invites you to a compelling discussion with Norman Cordero Marquez, a dedicated animal welfare advocate, community leader, and former Barangay Kagawad of Otucan Sur, Bauko, Mountain Province. With a strong background in advocacy, governance, and legal reforms, Marquez has worked tirelessly for animal rights, social justice, and grassroots empowerment.`,
      link: "https://www.facebook.com/61564663490111/videos/1386728899360760",
      videoEmbed: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FIconsOfChangePhilippines%2Fvideos%2F1386728899360760%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`,
    },
    {
      title:
        "The People’s Platform: Every Candidate, Every Voice with Leodegario 'Ka Leody' Quitain de Guzman",
      description:
        "Icons of Change invites you to an inspiring episode featuring Leodegario 'Ka Leody' Quitain de Guzman, a tireless labor leader, advocate for workers' rights, and proponent of systemic reform. Ka Leody's vision of a fair and equitable Philippines is rooted in decades of activism and service to the working class.",
      link: "https://www.facebook.com/61564663490111/videos/1172212914282136",
      videoEmbed: `<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FIconsOfChangePhilippines%2Fvideos%2F1172212914282136%2F&show_text=false&width=560&t=0" width="100%" height="314" style="border:none;overflow:hidden; margin-top: 15px;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
    },
  ];

  const container = document.querySelector(".opportunities-grid");

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "opportunity-card";

    card.innerHTML = `
        <div class="opportunity-details">
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
