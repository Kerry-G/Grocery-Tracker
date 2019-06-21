import React from 'react';

const Header = (props) => {
  const visible = props.show
  const style = visible ? " visible" : ""
  const handleClick = visible ? props.hideMenu : props.showMenu
  
  return (
    <header>
      <a className={"hamburger" + style} onClick={handleClick}>&#9776;</a>
      <h1 className={style}>Tracker</h1>
    </header>
  );

}

export default Header;
