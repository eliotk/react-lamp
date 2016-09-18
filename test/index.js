import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import ReactLamp from '../src/Lamp.js';
import Genie from 'geniejs';
import Mousetrap from 'mousetrap';
import { Simulate } from 'react-addons-test-utils';

const expect = chai.expect;
chai.use(sinonChai);

describe('The react lamp component', () => {
  let targetContainer;

  beforeEach(() => {
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

    targetContainer = document.createElement('div');
    document.body.appendChild(targetContainer);
    render(<ReactLamp genie={Genie} />, targetContainer);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(targetContainer);
    document.body.removeChild(targetContainer);
  });

  describe('after triggering it w/ the keyboard shortcut', function() {
    let lampInput;

    beforeEach(function() {
      Mousetrap.trigger('ctrl+space');
      lampInput = document.querySelector('#react-lamp-container').querySelector('input');
    });

    it('should display the prompt w/ the placeholder text', function(){
      expect(document.querySelector('#react-lamp-container').innerHTML).to.contain("Make a wish");
    });

    it('should be the active focused input', function() {
      expect(document.querySelector('#react-lamp-container').querySelector('input')).to.equal(document.activeElement);
    });

    describe('after starting to type in input', () => {
      let firstItem, targetWish;

      beforeEach(() => {
        Simulate.focus(lampInput);
        lampInput.value = 'Go';
        Simulate.change(lampInput);

        firstItem = document.querySelector('#react-autowhatever-1--item-0').innerHTML;
        targetWish = Genie.getMatchingWishes('Go to Google')[0];

        Genie.makeWish = sinon.spy();
      });

      it('should display a genie wish when starting to type', () => {
        expect(firstItem).to.contain("Go to Google");
      });

      it('should make a wish when suggestion is clicked', () => {
        Simulate.click(document.querySelector('#react-autowhatever-1--item-0'));
        expect(Genie.makeWish).to.have.been.calledWith(targetWish, 'Go');
      });
    });
  });
});
