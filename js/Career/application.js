document
  .getElementById("applicationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("jobPosition", document.getElementById("job").value);
    formData.append("resume", document.getElementById("resume").files[0]);
    formData.append("coverLetter", document.getElementById("message").value);

    try {
      const response = await fetch("https://strapi-backend-qanu.onrender.com/application", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        document.getElementById("applicationForm").reset(); // Clear the form fields
      } else {
        const errorMessage = await response.text(); // Get server response for debugging
        alert(`Failed to submit the application. Server Response: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the application.");
    }
  });
