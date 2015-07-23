import React from 'react';
import MessageApp from './components/MessageApp';

window.React = React;
const mountNode = document.getElementById("app");
console.log('before render');
React.render(<MessageApp />, mountNode);