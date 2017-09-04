import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './CheckBoxList';
import registerServiceWorker from './registerServiceWorker';

let props ={"list":[{"id":"1","name":"aaa","number":"123","parent":"-1","list":[{"id":"1_1","name":"aaa_aaa","number":"123","parent":"1"},{"id":"1_2","name":"aaa_aaa","number":"123","parent":"1"}]},{"id":"2","name":"bbb","number":"123","parent":"-1","list":[{"id":"2_1","name":"aaa_aaa","number":"123","parent":"2"},{"id":"2_2","name":"aaa_aaa","number":"123","parent":"2"}]},{"id":"3","name":"ccc","number":"123","parent":"-1",}]};

ReactDOM.render(<App1 {...props}/>, document.getElementById('root'));
registerServiceWorker();
