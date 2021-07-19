import React, { Component } from 'react';
import India from './components/india';
import World from './components/world';
import MyNavbar from "./components/navbar"

class App extends Component {
  state = {  }
  render() { 
    return ( 
        <React.Fragment>
          <MyNavbar />
          <div className="container data">
            <India />
            <World />
          </div>
        </React.Fragment>
    );
  }
}
 
export default App;
