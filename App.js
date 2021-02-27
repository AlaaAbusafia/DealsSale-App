
import React from 'react';

import ajax from './src/ajax';
import { Text, View, StyleSheet } from 'react-native';
import DealsList from './src/components/DealsList';
import DealDetail from './src/components/DealDetail';



class App extends React.Component {
  state = {
    deals: [],
    currentdealId: null,
  };

  async componentDidMount(){
    const deals = await ajax.fetchInitialdeals();
    this.setState({ deals });
  }

  setCurrentdeal = (dealId) => {
    this.setState({
      currentdealId: dealId
    });
  };

  currentdeal = () =>{
    this.state.deals.find(
      (deal) => deal.key === this.state.currentdealId
    );
  };

  render(){

    if(this.state.currentdealId) {
      return <DealDetail initialdealData= {this.currentdeal()} />
    }
    if(this.state.deals.length > 0){
      return ( 
        <DealsList deals={this.state.deals} onItemPress={this.setCurrentdeal} /> 
      );
      
    }
    return (
      <View style={styles.container}>
          <Text style={styles.header}>Deals</Text>
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
