import React from 'react';
import MessageApp from './components/MessageApp';

const mountNode = document.getElementById("app");
React.render(<MessageApp />, mountNode);