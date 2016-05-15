import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import Mousetrap from 'mousetrap';
import Modal from 'react-modal';

// when suggestion selected, this function tells what should be the value of the inpu
function getSuggestionValue(suggestion) {
  return suggestion.magicWords[0];
}

function renderSuggestion(suggestion) {
  if(suggestion.context.any[0] == 'react-lamp-inline') {
    return (
      <span>{suggestion.magicWords[0]}: {suggestion.action()}</span>
    );
  }

  return (
    <span>{suggestion.magicWords[0]}</span>
  );
}

const defaultStyles = {
  overlay : {
    backgroundColor   : 'transparent'
  },
  content : {
    top        : '50%',
    left       : '50%',
    right      : 'auto',
    bottom     : 'auto',
    marginRight: '-50%',
    transform  : 'translate(-50%, -50%)',
    overflow   : 'initial',
    border     : '0px',
    padding    : '0px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },

  input : {
    width: '240px',
    height: '30px',
    padding: '10px 20px',
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: '300',
    fontSize: '16px',
    border: '1px solid #aaa',
    borderRadius: '4px'
  },
  container : {
    position: 'relative'
  },
  containerOpen : {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer : {
    position: 'absolute',
    top: '51px',
    width: '280px',
    margin: '0',
    padding: '0',
    listStyleType: 'none',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: '300',
    fontSize: '16px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 2
  },
  suggestion : {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionFocused : {
    backgroundColor: '#ddd'
  }
};

class Lamp extends React.Component {
  static propTypes = {
    genie: PropTypes.func.isRequired,
    styles: PropTypes.object,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    styles: defaultStyles,
    placeholder: 'Need a hand? :)'
  };

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: this.getSuggestions(''),
      show: false,
      modalIsOpen: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.genie.getMatchingWishes(inputValue);
  }

  onChange(event, { newValue, method }) {
    if( ["up", "down"].indexOf(method) == -1 ) {
      this.setState({
        value: newValue
      });
    }
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionSelected(event, info) {
    this.props.genie.makeWish(info.suggestion, this.state.value);
    this.closeModal();
  }

  componentDidMount(){
    Mousetrap.bind('ctrl+space', this.showLamp.bind(this));
  }

  componentDidUpdate() {
    if(this.state.input) {
      this.state.input.focus();
    }
  }

  showLamp() {
    this.setState({ modalIsOpen: true });
  }

  saveInput(autosuggest) {
    // console.log('save input');
    if(autosuggest) {
      this.setState({ input: autosuggest.input});
    }
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      value: ''
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Modal isOpen={this.state.modalIsOpen}
             style={this.props.styles}
             shouldCloseOnOverlayClick={true}
             onRequestClose={this.closeModal} >
        <div id="react-lamp-container">
          <Autosuggest theme={this.props.styles}
                       ref={this.saveInput}
                       suggestions={suggestions}
                       onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                       onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                       getSuggestionValue={getSuggestionValue}
                       renderSuggestion={renderSuggestion}
                       inputProps={inputProps} />
        </div>
      </Modal>
    );
  }
}

export default Lamp;
