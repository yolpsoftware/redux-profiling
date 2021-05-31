import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  var now = new Date().getTime();
  while (new Date().getTime() - now < 4000) {
    now.toString();
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// A very simple store
let store = createStore(combineReducers({ count: counter }));

// A screen!
class Counter extends React.Component {
  static navigationOptions = {
    title: 'Counter!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.props.count}</Text>
        <Button
          title="Increment"
          onPress={() => this.props.dispatch({ type: 'INCREMENT' })}
        />
        <Button
          title="Decrement"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />
      </View>
    );
  }
}

// Another screen!
class StaticCounter extends React.Component {
  static navigationOptions = {
    title: `Same number, wow!`,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.props.count}</Text>
      </View>
    );
  }
}

// Connect the screens to Redux
let CounterContainer = connect(state => ({ count: state.count }))(Counter);
let StaticCounterContainer = connect(state => ({ count: state.count }))(
  StaticCounter
);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
