import "./sassStyles/App.scss";
import SocialIcons from "./components/SocialIcons";
import NavMenu from "./components/NavMenu";
import Logo from "./images/logo_pineapple.png";
import LogoText from "./images/text_pineapple.png";
import Cup from "./images/cup.png";
import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const heading = isFormSubmitted
    ? "Thanks for subscribing!"
    : "Subscribe to newsletter";

  const subHeading = isFormSubmitted
    ? "You have successfully subscribed to our email listing. Check your email for the discount code."
    : "Subscribe to our newsletter and get 10% discount on pineapple glasses.";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexCo = /^[a-zA-Z0-9_.+-]+@(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.co$/g;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (regex.test(e.target.value)) {
      setIsDisabled(false);
      setErrorMessage("");
      return;
    }
    if (email) {
      setIsDisabled(false);
      setErrorMessage("");
      return;
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDisabled(false);
      setErrorMessage("");
      return;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    /* Email validation */
    if (!email) {
      setErrorMessage("Email address is required");
      setIsDisabled(true);
      return;
    }

    /* Check if it's email */
    if (!regex.test(email)) {
      setErrorMessage("Please provide a valid e-mail address");
      setIsDisabled(true);
      return;
    }

    /* Check if email not .co */
    if (regexCo.test(email)) {
      setErrorMessage(
        "We are not accepting subscriptions from Colombia emails"
      );
      setIsDisabled(true);
      return;
    }

    /* Check if terms of services checkbox checked */
    if (!isChecked) {
      setIsDisabled(true);
      setErrorMessage("You must accept the terms and conditions");
      return;
    }

    /* Send email address to the server */

    fetch("http://localhost/php/insert.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ subscription: email })
    })
      .then((data) => {
        console.log(data);
        console.log("new subscriber is added");
        setEmail("");
        setErrorMessage("");
        setIsChecked(!isChecked);
        setIsDisabled(false);
        setIsFormSubmitted(true);
        //setError(null);
      })
      .catch((err) => console.log("Form submit error", err));
  };

  return (
    <section className='section'>
      {/* Left side */}
      <div className='section__content'>
        <header className='header'>
          <div className='header__logo'>
            <img className='logo' src={Logo} alt='Logo' />
            <img className='logo-text' src={LogoText} alt='Text' />
          </div>

          {/* Nav menu */}
          <NavMenu />
        </header>

        {/* Base */}
        <div className='base'>
          {/* Show cup image after form is submitted */}
          {isFormSubmitted && <img className='cup' src={Cup} alt='Cup' />}
          <h1 className='base__heading heading'>{heading}</h1>
          <p className='base__subheading subheading'>{subHeading}</p>

          {/* Show error */}
          {error && <h1 className='base__heading heading'>{error}</h1>}

          {/* Newsletter form */}
          {!isFormSubmitted && (
            <form action='' className='form' onSubmit={handleFormSubmit}>
              <div className='input-box'>
                <label htmlFor='email' className='email-label'></label>
                <input
                  name='email'
                  id='email'
                  value={email}
                  className='email-input'
                  placeholder='Type your email address here…'
                  onChange={handleEmailChange}
                />
                <button
                  disabled={isDisabled}
                  type='submit'
                  className='submit-btn'
                >
                  <i className='icon-ic_arrow'></i>
                </button>
                <p className='subheading error-message'>{errorMessage}</p>
              </div>
              {/* Terms of service */}
              <div className='terms'>
                <label htmlFor='checkbox' className='terms__label'>
                  <input
                    type='checkbox'
                    name='checkbox'
                    id='checkbox'
                    className='terms__checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className='custom-checkbox'></span>I agree to{" "}
                  <a href='#' className='terms__link'>
                    terms of service
                  </a>
                </label>
              </div>
            </form>
          )}

          {/* Line between terms and socila icons */}
          <div className='base__line'></div>

          {/* Social icons */}
          <SocialIcons />
        </div>
      </div>

      {/* Right side with image */}
      <div className='section__image'></div>
    </section>
  );
}

export default App;
