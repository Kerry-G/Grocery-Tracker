import React, { Component } from 'react';
import Header from './components/Header'
import FormReceipts from './components/FormReceipts'
import Stats from './components/Stats'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: true
    }
  }

  render() {
    return (
      <div className="App">
        <Header onClick={()=>this.setState({stats:!this.state.stats})}/>
        <div className="container">
          {this.state.stats ? <Stats /> : <FormReceipts />}
        </div>
      </div>
    );
  }
}

export default App;
