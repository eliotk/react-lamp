# react-lamp

A react UI package for working with the genie keyboard control library (https://github.com/kentcdodds/genie)

Demo: http://www.eliotk.net/react-lamp/demo

## Usage

First istall the package:

`npm install react-lamp --save`

You also need install the GenieJS package separately if you haven't already:

`npm install geniejs --save`

And a basic approach for using the component with some wishes loaded into GenieJS:

```
import ReactDOM from 'react-dom';
import Lamp from 'react-lamp';
import Genie from 'geniejs';

const wishes = [
  {
    magicWords: ['Go to google'],
    action: function() {
      window.location.href = 'https://www.google.com';
    }
  }
];

wishes.forEach((wish) => {
  Genie(wish);
});

ReactDOM.render(<Lamp genie={Genie} />, document.getElementById('root'));
```

The key combo that shows and hides the lamp UI is: `ctrl+space`

## Development

`npm install`

`npm start`

Go to `localhost:8080`

## Testing with karma runner

`npm test`

## Distributing

`webpack --config webpack.dist.config.js`

## Updating the demo dist files

```
webpack --config webpack.demo.config.js --optimize-minimize
```
