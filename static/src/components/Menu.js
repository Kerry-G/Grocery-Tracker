import React, { Component } from 'react';

class Menu extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(i){
        this.props.setActiveComponent(i)
        this.props.hideMenu()
    }

    render() {
        let visible = this.props.show ? " visible": ""
        let menuList = ["New Entry", "To be paid", "Petit message"]
        let renderMenu = menuList.map((menuElement,index)=>{
            let style = this.props.activeComponent === index ? " active" : ""
            return (<a 
                className={"menu-element" + style}
                key={index} 
                onClick={() =>this.handleClick(index)}
            >
                {menuElement}
            </a>)
        })
        return (
        <aside className={"menu" + visible}>
        <div className="menu-list">
            {renderMenu}
        </div>
        </aside>
        )
    }
}

export default Menu;
