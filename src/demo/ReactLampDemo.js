import Lamp from '../Lamp.js';
import Genie from 'geniejs';
import React from 'react';

const wishes = [
  {
    magicWords: ['Go to Genie JS Github'],
    action: function() {
      window.location.href = 'https://github.com/kentcdodds/genie';
    }
  },
  {
    magicWords: ['Log something tasty in the console'],
    action: function() {
      console.log('Ice Cream Sundae');
    }
  },
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
    context: 'react-lamp-inline'
  },
  {
    magicWords: ['Today\'s date'],
    action: function() {
      return new Date().toLocaleDateString();
    },
    context: 'react-lamp-inline'
  }
];

wishes.forEach((wish) => {
  Genie(wish);
});

class ReactLampDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      showLamp: false
    };

    this.lampRubbed = this.lampRubbed.bind(this);
  }

  lampRubbed() {
    this.setState({
      showLamp: true
    });
  }

  render() {
    return (
      <div>
        <Lamp genie={Genie} show={this.state.showLamp} />
        <button onClick={this.lampRubbed}>Rub the lamp</button>
        <p>Wishes available in the demo:</p>
        <ul>
        {Genie.getMatchingWishes().map(function(wish, idx){
          return <li key={idx}>{wish.magicWords[0]}</li>;
        })}
        </ul>
      </div>
    );
  }
}

export default ReactLampDemo;
