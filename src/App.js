import "./App.scss";
import SocialIcons from "./components/SocialIcons";
import NavMenu from "./components/NavMenu";
import Logo from "./images/logo_pineapple.png";
import LogoText from "./images/text_pineapple.png";
import { useState } from "react";
import clsx from "clsx";

function App() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsvalid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const className = clsx({
    subheading: true,
    "error-message": true,
    "hide-message": isValid
  });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexCo = /^[a-zA-Z0-9_.+-]+@(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.co$/g;

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!regex.test(email)) {
      setErrorMessage("Please provide a valid e-mail address");
      setIsvalid(true);
    } else {
      setErrorMessage("");
      setIsvalid(false);
      setIsDisabled(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setErrorMessage("You must accept the terms and conditions");
      setIsvalid(true);
      setIsDisabled(false);
    } else {
      setErrorMessage("");
      setIsvalid(false);
      setIsDisabled(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    /* Email validation */
    if (!email) {
      setErrorMessage("Email address is required");
      setIsvalid(false);
      setIsDisabled(true);
      return;
    }
    if (!regex.test(email)) {
      setErrorMessage("Please provide a valid e-mail address");
      setIsvalid(false);
      setIsDisabled(true);
      return;
    }
    if (regexCo.test(email)) {
      setErrorMessage(
        "We are not accepting subscriptions from Colombia emails"
      );
      setIsvalid(false);
      setIsDisabled(true);
      return;
    }
    if (!isChecked) {
      setErrorMessage("You must accept the terms and conditions");
      setIsvalid(false);
      setIsDisabled(true);
      return;
    }

    setEmail("");
    setErrorMessage("");
    setIsChecked(!isChecked);
    setIsvalid(false);
    setIsDisabled(false);
  };

  return (
    <section className='App'>
      {/* Left side */}
      <div className='section-content'>
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
          <h1 className='base__heading heading'>Subscribe to newsletter</h1>
          <p className='base__subheading subheading'>
            Subscribe to our newsletter and get 10% discount on pineapple
            glasses.
          </p>

          {/* Newsletter form */}
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
            </div>
            <p className={className}>{errorMessage}</p>
          </form>

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

          {/* Line between terms and socila icons */}
          <div className='base__line'></div>

          {/* Social icons */}
          <SocialIcons />
        </div>
      </div>

      {/* Right side with image */}
      <div className='section-image'></div>
    </section>
  );
}

export default App;
