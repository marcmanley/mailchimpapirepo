// Get form data
const form = document.querySelector("#contact-form");
const formData = new FormData(form);

// Add Mailchimp API key to request headers
const apiKey = "85f73e2ac8adcce4b665692e9e70dea7-us12";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${btoa(`apikey:${apiKey}`)}`,
};

// Construct request body
const body = {
  email_address: formData.get("email"),
  status: "subscribed",
  merge_fields: {
    FNAME: formData.get("name"),
    MESSAGE: formData.get("message"),
  },
};

// Send POST request to Mailchimp API
fetch("https://us12.api.mailchimp.com/3.0/lists/079fa5509e/members", {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Check the response status
    if (data.status === "subscribed") {
      // Display success message to user
      const form = document.querySelector("#contact-form");
      form.innerHTML = "<p>Thank you for contacting us!</p>";
    } else {
      throw new Error("Error subscribing to mailing list.");
    }
  })
  .catch((error) => {
    console.error(error);
  });
