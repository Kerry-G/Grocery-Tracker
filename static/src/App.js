import React, { Component } from 'react';
import Header from './components/Header'
import FormReceipts from './components/FormReceipts'
import Stats from './components/Stats'
import Menu from './components/Menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu:false,
      activeComponent:0
    }
    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.setActiveComponent = this.setActiveComponent.bind(this)
  }

  showMenu(){
    this.setState({menu:true})
  }

  hideMenu(){
    this.setState({ menu: false });
  }

  setActiveComponent(i){
    console.log(i)
    this.setState({activeComponent:i})
  }

  render() {
    let componentList = [<FormReceipts />,<Stats />]
    let style = this.state.menu ? " visible" : ""
    return (
      <div className="App">
        <Menu 
          show={this.state.menu}
          hideMenu={this.hideMenu}
          setActiveComponent={this.setActiveComponent}
          activeComponent = {this.state.activeComponent}
          />
        <Header 
          show={this.state.menu}
          showMenu={this.showMenu} 
          hideMenu={this.hideMenu}
          />
        <div className={"container" + style } >
          {componentList[this.state.activeComponent]}
        </div>
      </div>
    );
  }
}

export default App;
