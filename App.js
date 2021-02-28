
import React from 'react';

import ajax from './src/ajax';
import { Text, View, Animated, Easing, Dimensions, StyleSheet} from 'react-native';
import DealsList from './src/components/DealsList';
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';



class App extends React.Component {

  titleX = new Animated.Value(0);

  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
    activeSearchText: ' ',
    
  };

  animateLogo = (direction = 1) =>{
    const width = Dimensions.get('window').width - 100;
     Animated.timing(this.titleX, {
       toValue: direction * (width/2),
       duration: 500,
       easing: Easing.ease
      })
      .start(( {finished} ) => {
        if (finished) {
          this.animateLogo( -1 * direction ); 
        }
        
      });
  };

  async componentDidMount(){

    this.animateLogo();
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async (searchText) =>{
    let dealsFromSearch= [];
    if(searchText){
       dealsFromSearch = await ajax.fetchSearchResults(searchText);
    }
    this.setState({ dealsFromSearch, activeSearchText: searchText });
  };



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
        <View style={styles.main}>
          <DealDetail 
            initialDealData= {this.currentDeal()}
            onBack = {this.unsetCurrentDeal}
          />
        </View>
      );
    }

    const searchDealsToDisplay = 
      this.state.dealsFromSearch.length > 0 
        ? this.state.dealsFromSearch
        : this.state.deals

    if(searchDealsToDisplay.length > 0){
      return ( 
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} initialSearchText= {this.props.activeSearchText}  />
          <DealsList deals={this.state.deals} onItemPress={this.setCurrentDeal} /> 
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.titleX}, styles.container]}>
          <Text style={styles.header}>Deals</Text>
      </Animated.View>
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
  },
  main:{
    marginTop: 30,
  },
});

export default App;
