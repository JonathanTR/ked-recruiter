import React, { Component } from 'react';

import './index.css';

class LoadingIndicator extends Component {
  render () {
    return(<div data-test='loadingIndicator' className='loading-indicator' />)
  }
}

export default LoadingIndicator;
