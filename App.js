
import React from 'react';

import ajax from './src/ajax';
import { Text, View, StyleSheet } from 'react-native';
import DealsList from './src/components/DealsList';
import DealDetail from './src/components/DealDetail';



class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    });
  };

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
    });
  };

  currentDeal = () =>{
    this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };

  render(){

    if(this.state.currentDealId) {
      return (
        <DealDetail 
          initialDealData= {this.currentDeal()}
          onBack = {this.unsetCurrentDeal}
        />
      );
    }
    if(this.state.deals.length > 0){
      return ( 
        <DealsList deals={this.state.deals} onItemPress={this.setCurrentDeal} /> 
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
