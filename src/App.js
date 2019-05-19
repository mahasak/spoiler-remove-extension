/* global chrome */
import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  
  state = {
    banList: ['avenger', 'infinity', 'endgame', 'Promises']
  }
  componentDidMount() {
    const rule = new RegExp(this.state.banList.join('|'), 'i')
    setInterval(function () {
      console.log('checking')
      Array.from(document.querySelectorAll('[role="article"]'))
        .filter(d => rule.test(d.innerText))
        .forEach(d => d.remove())
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={() => {
              console.log(chrome)
              chrome.tabs.getCurrent(tab => {
                console.log(tab)
                chrome.tabs.update(tab.id, {
                  url: 'chrome-search://local-ntp/local-ntp.html',
                });
              });
            }}>Ban List:
            {this.state.banList.join('|')}
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    )
  }
}

export default App;
