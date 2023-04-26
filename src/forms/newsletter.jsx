import React, { useState } from "react";

const Newsletter = () => {
  const [formData, setFormData] = useState({ email: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/news.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="it-cta-form">
        <div className="row">
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-envelope-open"></i>
              </span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" />
            </div>
          </div>
          <div className="col-12">
            <div className="input-item-textarea">
              <span>
                <i className="fas fa-pen"></i>
              </span>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message"></textarea>
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

export default Newsletter;