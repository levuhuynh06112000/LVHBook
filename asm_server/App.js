import React from 'react';
import 'react-native-gesture-handler';
console.disableYellowBox = true;
import { createAppContainer } from 'react-navigation';
import navigators from './src/navigators';
const NavigatorContainer = createAppContainer(navigators);
class App extends React.Component{
  render() {
    return <NavigatorContainer />
  }
}

export default App;