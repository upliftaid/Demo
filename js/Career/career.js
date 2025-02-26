const fetchCareers = async () => {
  try {
    const response = await fetch("https://strapi-backend-qanu.onrender.com/career", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch career data.");
    }

    const data = await response.json();
    const careerData = data.data || [];
    displayCareers(careerData);
    attachEventListeners();
  } catch (error) {
    console.error("Error fetching careers:", error.message);
  }
};

const displayCareers = (careerData) => {
  const careerContainer = document.getElementById("career-container");

  // Clear existing careers
  careerContainer.innerHTML = "";

  careerData.forEach((career) => {
    const careerElement = document.createElement("div");
    careerElement.classList.add("card", "fundraise-item");
    const imageUrl = career.images || "images/default.jpg";

    careerElement.innerHTML = `
      <img class="card-img-top" src="${imageUrl}" alt="Image placeholder">
      <div class="card-body">
        <h3>${career.title}</h3>
        <p><strong>Location:</strong> ${career.location}</p>
        <p><strong>Experience:</strong> ${career.experience}</p>
        <p><strong>Skills:</strong> ${career.skills}</p>
        <a href="#" class="job-description-link" data-description="${career.descriptionHtml}">View Job Description</a>
        <button class="btn btn-success apply-btn" data-job="${career.title}"> Apply Now </button>
      </div>
    `;

    careerContainer.appendChild(careerElement);
  });

  // Reinitialize the carousel after adding new cards
  if ($(".nonloop-block-11").length) {
    $(".nonloop-block-11").owlCarousel("destroy");
    $(".nonloop-block-11").owlCarousel({
      loop: false,
      margin: 30,
      nav: true,
      items: 3,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-md-arrow-forward'></span>",
      ],
      responsive: {
        0: { items: 1, nav: false },
        600: { items: 2, nav: false },
        1000: { items: 3, nav: true, loop: false },
      },
    });
  }

  attachEventListeners();
};

const attachEventListeners = () => {
  // Event listener for Apply Now buttons
  document.querySelectorAll(".apply-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const job = button.getAttribute("data-job");
      document.getElementById("job").value = job;
      document.getElementById("application-form").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Event listener for Job Description links
  document.querySelectorAll(".job-description-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const description = link.getAttribute("data-description");
      showJobDescriptionPopup(description);
    });
  });
};

document.addEventListener("DOMContentLoaded", fetchCareers);

const showJobDescriptionPopup = (description) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-button">&times;</span>
      <div class="description-content">
        ${description}
      </div>
    </div>
  `;

  modalOverlay.appendChild(popup);
  document.body.appendChild(modalOverlay);

  popup.querySelector(".close-button").addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });
};

// Style the modal and popup
const style = document.createElement("style");
style.innerHTML = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  .description-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .job-description-link {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);
