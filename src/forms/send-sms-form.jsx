import React, { useState } from "react";

const SendSmsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("UI");
  const [message, setMessage] = useState("");

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
    fetch("/send", {
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
        // Do something with the response data, e.g. show a success message
      })
      .catch((error) => {
        console.error("There was an error with the fetch request:", error);
        // Show an error message to the user
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-envelope-open"></i>
              </span>
              <input type="text" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-phone"></i>
              </span>
              <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-book"></i>
              </span>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="UI">UI/UX</option>
                <option value="Web dev">Website Development</option>
                <option value="Web optimise">Website Optimisation</option>
                <option value="Web Design">Website Design</option>
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="input-item-textarea">
              <span>
                <i className="fas fa-pen"></i>
              </span>
              <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button type="submit" className="it-cta-form-submit border-0">
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SendSmsForm;