import React, { Component } from 'react';

class Header extends Component {
  render() {
    let visible = this.props.show
    let style = visible ? " visible" : ""
    let handleClick = visible ? this.props.hideMenu : this.props.showMenu
    return (
      <header>
      <a className={"hamburger" + style} onClick={handleClick}>&#9776;</a>
      <h1 className={style}>Tracker</h1>
      </header>
    );
  }
}

export default Header;
