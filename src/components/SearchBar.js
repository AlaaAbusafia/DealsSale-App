import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { TextInput, View, StyleSheet } from 'react-native';

class SearchBar extends Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchText: PropTypes.string.isRequired
    };

    state = {
        searchText: this.props.initialSearchText,
    };
    searchDeals = (searchText) => {
        this.props.searchDeals(searchText);
        //blur
        this.inputElement.blur();
    }
    debouncedSearchDeals = debounce(this.searchDeals, 300);

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
                    ref = { (inputElement) => {this.inputElement = inputElement; }}
                    value={this.state.searchText}
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
