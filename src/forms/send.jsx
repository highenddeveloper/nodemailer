const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your_email_address@gmail.com',
    pass: 'your_email_password'
  }
});

const handleSubmit = (e) => {
  e.preventDefault();

  // Create a new FormData object with the form data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("service", service);
  formData.append("message", message);

  // Send a POST request to the server with the form data
  fetch("/submit.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      // Send the email
      transporter.sendMail({
        from: 'your_email_address@gmail.com',
        to: 'recipient_email_address@example.com',
        subject: 'New Contact Form Submission',
        html: `
          <p>Hi,</p>
          <p>A new contact form submission has been received:</p>
          <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Service: ${service}</li>
            <li>Message: ${message}</li>
          </ul>
        `
      }, (error, info) => {
        if (error) {
          console.error('Error occurred while sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      // Do something with the response data, e.g. show a success message
    })
    .catch((error) => {
      console.error("There was an error with the fetch request:", error);
      // Show an error message to the user
    });
};