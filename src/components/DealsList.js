

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';

import DealsItem from './DealsItem';

class DealsList extends Component {

    static propTypes ={
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={styles.list} >
                <FlatList
                    data={this.props.deals}
                    renderItem={ ({item}) => (
                        <DealsItem deal={item} onPress={this.props.onItemPress} />
                    )}
                />
            </View>
        );
        
    }
}

const styles= StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 50,  
    }
});


export default DealsList;
