console.log("Using the correct contact.js");
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("https://strapi-backend-qanu.onrender.com/api/contacts", {  // Correct Strapi URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer STRAPI_API_TOKEN" // If required
        },
        body: JSON.stringify({ data: formData }), // Strapi expects data to be nested
      });

      if (response.ok) {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset(); // Clear the form fields
      } else {
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending the message.");
    }
});
