import React from 'react';

const Menu = (props) => {

    const handleClick = (i) => {
        props.setActiveComponent(i)
        props.hideMenu()
    }

    const visible = props.show ? " visible" : ""
    const menuList = ["New Entry", "To be paid", "Petit message"]
    const renderMenu = menuList.map((menuElement, index) => {
        const style = props.activeComponent === index ? " active" : ""
        return (<a
            className={"menu-element" + style}
            key={index}
            onClick={() => handleClick(index)}
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

export default Menu;
