import "./App.scss";
import Summer from "./images/image_summer.png";

function App() {
  return (
    <section className='App'>
      <div className='section-content'>
        <header className='header'>
          <div className='header__logo'>
            <i className='icon-union'></i>
            <i className='icon-pineapple'></i>
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
      </div>
      <div className='section-image'>
        <img src={Summer} alt='Summer' />
      </div>
    </section>
  );
}

export default App;
