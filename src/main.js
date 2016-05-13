import React from 'react';
import {render} from 'react-dom';
import Lamp from './Lamp.js';
import Genie from 'geniejs';

const wishes = [
  {
    magicWords: ['Go to Google'],
    action: function() {
      window.location.href = 'https://www.google.com';
    }
  },
  {
    magicWords: ['Current URL'],
    action: function() {
      return window.location.href;
    },
    context: 'inline'
  },
  {
    magicWords: ['Go to tasks', 'tasks'],
    action: function() {
      console.log('tasks!');
    }
  },
  {
    magicWords: ['Submit support ticket', 'support'],
    action: function() {
      console.log('tasks!');
    }
  }
];

wishes.forEach((wish) => {
  Genie(wish);
});

render(<Lamp genie={Genie} />, document.querySelector('#app'));
