import "./App.scss";
import Logo from "./images/logo_pineapple.png";
import LogoText from "./images/text_pineapple.png";

function App() {
  return (
    <section className='App'>
      {/* Left side */}
      <div className='section-content'>
        <header className='header'>
          <div className='header__logo'>
            <img className='logo' src={Logo} alt='Logo' />
            <img className='logo-text' src={LogoText} alt='Text' />
          </div>
          <nav className='nav'>
            <ul className='nav__list'>
              <li className='nav__list-item'>
                <a href='#' className='nav__list-link'>
                  About
                </a>
              </li>
              <li className='nav__list-item'>
                <a href='#' className='nav__list-link'>
                  How it works
                </a>
              </li>
              <li className='nav__list-item'>
                <a href='#' className='nav__list-link'>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className='base'>
          <h1 className='base__heading heading'>Subscribe to newsletter</h1>
          <p className='base__subheading subheading'>
            Subscribe to our newsletter and get 10% discount on pineapple
            glasses.
          </p>

          {/* Newsletter form */}
          <form action='' className='form'>
            <div className='input-box'>
              <label htmlFor='email' className='email-label'></label>
              <input
                type='email'
                name='email'
                id='email'
                className='email-input'
                placeholder='Type your email address here…'
              />
              <button type='submit' className='submit-btn'>
                <i className='icon-ic_arrow'></i>
              </button>
            </div>
          </form>

          {/* Terms of service */}
          <div className='terms'>
            <label htmlFor='checkbox' className='terms__label'>
              <input
                type='checkbox'
                name='checkbox'
                id='checkbox'
                className='terms__checkbox'
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
          <ul className='social-icons'>
            <li className='icon'>
              <a className='icon__link' href='#'>
                <i className='icon__social icon-ic_facebook'></i>
              </a>
            </li>
            <li className='icon'>
              <a className=' icon__link' href='#'>
                <i className='icon__social icon-ic_instagram'></i>
              </a>
            </li>
            <li className='icon'>
              <a className='icon__link' href='#'>
                <i className='icon__social icon-ic_twitter'></i>
              </a>
            </li>
            <li className='icon'>
              <a className='icon__link' href='#'>
                <i className='icon__social icon-ic_youtube'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side with image */}
      <div className='section-image'></div>
    </section>
  );
}

export default App;
