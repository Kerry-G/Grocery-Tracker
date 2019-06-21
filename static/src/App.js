import React, { useState } from 'react';
import Header from './components/Header'
import FormReceipts from './components/FormReceipts'
import Stats from './components/Stats'
import Menu from './components/Menu'
import Text from './components/Text'

const App = () => {

  const [menu, setMenu] = useState(false);
  const [activeComponent, setActiveComponent] = useState(0);

  const showMenu = () => {
    setMenu(true)
  };

  const hideMenu = () => {
    setMenu(false)
  };

  const componentList = [<FormReceipts />, <Stats />, <Text />];
  const style = menu ? " visible" : "";

  return (
    <div className="App">
      <Menu
        show={menu}
        hideMenu={hideMenu}
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <Header
        show={menu}
        showMenu={showMenu}
        hideMenu={hideMenu}
      />
      <div className={"container" + style} >
        {componentList[activeComponent]}
      </div>
    </div>
  );
}

export default App;
