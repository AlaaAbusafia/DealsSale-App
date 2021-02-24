
import React from 'react';

import ajax from './src/ajax';
import { Text, View, StyleSheet } from 'react-native';
import ActivityList from './src/components/ActivityList';



class App extends React.Component {
  state = {
    activities: [],
  };

  async componentDidMount(){
    const activities = await ajax.fetchInitialDeals();
    this.setState({ activities });
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.activities.length > 0 ? (
          <ActivityList activities={this.state.activities} />
        ) : (
          <Text style={styles.header}> Hello Bakes</Text>
        )
      } 
      </View>
  );
  }
  
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    color: "blue",
  }
});

export default App;
