import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import App from './app';

class Main extends Component {
  componentDidMount() {
    Icon.loadFont();
  }
  componentWillMount() {
    const onComplete = () => {
      console.log('[Rehydrate] Complete');
    };
    const { store } = configureStore(onComplete);
    this.store = store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default Main;
