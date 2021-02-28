import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { TextInput, View, StyleSheet } from 'react-native';

class SearchBar extends Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    };

    state = {
        searchText: '',
    };

    debouncedSearchDeals = debounce(this.props.searchDeals, 300);

    handleChange = (searchText) =>{
        this.setState({ searchText }, () => {
            // debounce ...
            this.debouncedSearchDeals(this.state.searchText);
        });
    };

    render() {
        return (
            <View style={styles.search}>
                <TextInput
                    placeholder ="Search All Deals"
                    onChangeText = {this.handleChange}
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    search:{
        marginHorizontal: 10,
    },
    input: {
        height: 40,        
    }

});

export default SearchBar;
