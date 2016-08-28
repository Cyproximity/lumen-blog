console.log("React Modules");

import React from 'react';
import ReactDOM from 'react-dom';

import index from './components/index';

const coreApplication = document.getElementById('core');

class Core extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Core';
    }
    render() {
        return <div>{this.displayName}</div>;
    }
}

ReactDOM.render(<Core />, coreApplication);

export default Core;
