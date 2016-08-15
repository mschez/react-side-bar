
import React from 'react';
import ReactDOM from 'react-dom';

import SideBar from '../../src/SideBar';

class SideBarExample extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'SideBarExample';
    this.state = {
      barOpened: false
    };
  }

  toggleMenu() {
    this.setState({ barOpened: !this.state.barOpened });
  }

  onOpen() {
    this.setState({ barOpened: true });
  }

  onClose() {
    this.setState({ barOpened: false });
  }

  render() {
    const bar = (<div className='side' style={{ backgroundColor: 'green' }}>
      Menu</div>
    );

    let props = {
      bar: bar,
      mode: SideBar.MODES.BEHIND,
      opened: this.state.barOpened,
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      veilStyle: {
        opacity: 0.4
      }
    };

    return (
      <SideBar {...props}>
        <div className='header' style={{ backgroundColor: 'gray' }}>
          <button onClick={this.toggleMenu.bind(this)}>Open</button>
          <span>SideBarExample</span>
        </div>
        <div className='principal' style={{ backgroundColor: 'red' }}>
          <span>
            Amazing things
          </span>
        </div>
      </SideBar>
    );
  }
}

ReactDOM.render(<SideBarExample />, document.getElementById('example'));
