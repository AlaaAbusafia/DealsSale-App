import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, StyleSheet } from 'react-native';
import {priceDisplay} from '../util';

import ajax from '../ajax';

class DealDetail extends Component {
    
    static propTypes = {
        deal: PropTypes.object.isRequired,
    };

    state = {
        deal: this.props.initialdealData,
    };
    
    async componentDidMount() {
        const fulldeal = await ajax.fetchdealDetail(this.state.deal.key);
        console.log(fulldeal);

        this.setState({
            deal: fulldeal,
        })
    }

    render() {
        const {deal} = this.state;

        return (
            <View style={styles.deals}>
                <Image source={{ uri: deal.media[0] }} style= {styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    </View>
                </View>
                { deal. user && <View style={styles.user}>
                        <Image source ={{ uri: deal.user.avatar }} style ={styles.avatar} />
                        <Text>{deal.user.name}</Text>
                    </View>
                }
                <View>
                    <Text>{deal.description}</Text>
                </View>

            </View>
            
        );
    }
}

const styles= StyleSheet.create({
    deals : {
        marginHorizontal: 12,
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#aaa',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row'
    },
    cause: {
        flex: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,

    }
});

export default DealDetail;