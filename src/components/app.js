import React, { Component } from 'react';
import Trending from '../containers/trending';

export default class App extends Component {
  render() {
    return (
      <div>
          <header>
              <h1>Trending in open source</h1>
          </header>
          <div id="sidebar">
              Sidebar
          </div>
          <Trending />
          <footer>
                Footer
          </footer>
      </div>
    );
  }
}
