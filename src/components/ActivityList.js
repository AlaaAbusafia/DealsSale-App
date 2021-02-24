

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

class ActivityList extends Component {

    static propTypes ={
        activities: PropTypes.array.isRequired,
    };

    render() {
        return (
             <View style={styles.list} >
                 {this.props.activities.map((activity) => 
                    <Text key={activity.key}>{activity.title}</Text>
                 )}
            </View>
        );
        
    }
}

const styles= StyleSheet.create({
    list: {
        backgroundColor: '#aaa',
        flex: 1,
        width: '100%',
        paddingTop: 50,
        
    }
});


export default ActivityList;
