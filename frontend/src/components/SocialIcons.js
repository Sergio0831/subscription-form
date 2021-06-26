import React from "react";

const SocialIcons = () => {
  return (
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
  );
};

export default SocialIcons;
