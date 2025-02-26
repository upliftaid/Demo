document
  .getElementById("volunteer-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      availability: document.getElementById("availability").value,
      preferredActivities: document.getElementById("preferred-activities").value,
    };

    try {
      const response = await fetch("https://strapi-backend-qanu.onrender.com/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_STRAPI_API_TOKEN", // Replace with your actual Strapi API token
        },
        body: JSON.stringify({ data: formData }), // Strapi requires data to be wrapped inside an object
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        document.getElementById("volunteer-form").reset(); // Clear the form fields
      } else {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        alert("Failed to submit the application. Error: " + (errorData.error?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the application.");
    }
  });
