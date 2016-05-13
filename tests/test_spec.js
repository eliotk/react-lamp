import chai from 'chai';
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import ReactLamp from '../src/Lamp.js';
import Genie from 'geniejs';
import Mousetrap from 'mousetrap';
import {click} from 'jquery';
import Keysim from 'keysim';
import { Simulate } from 'react-addons-test-utils';

window.Keysim = Keysim;

const expect = chai.expect;

describe('The react lamp component', function(){

  beforeEach(function() {
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
        context: 'react-lamp-inline'
      }
    ];

    Genie.reset();

    wishes.forEach((wish) => {
      Genie(wish);
    });

    render(<ReactLamp genie={Genie} />, document.querySelector('#app'));
  });

  afterEach(function() {
    // ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
  });

  describe('after triggering it w/ the keyboard shortcut', function() {
    let lampInput;

    beforeEach(function() {
      Mousetrap.trigger('ctrl+space');
      lampInput = document.querySelector('#react-lamp-container').querySelector('input');
    });

    it('should display the prompt w/ the placeholder text', function(){
      expect(document.querySelector('#react-lamp-container').innerHTML).to.contain("Need a hand?");
    });

    it('should be the active focused input', function() {
      expect(document.querySelector('#react-lamp-container').querySelector('input')).to.equal(document.activeElement);
    });

    it('should display a genie wish when starting to type', function() {
      lampInput.value = 'Go';
      Simulate.change(lampInput);
      expect(document.querySelector('#react-autowhatever-1--item-0').innerHTML).to.contain("Go to Google");
      debugger; // test
    });
  });
});
