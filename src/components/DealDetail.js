import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View, 
    Image, 
    Text, 
    TouchableOpacity, 
    Animated, 
    PanResponder, 
    Dimensions,,
    Button,
    Linking,
    StyleSheet 
} from 'react-native';

import {priceDisplay} from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
    
    imageX = new Animated.Value(0);
    
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => { 
            this.imageX.setValue(gs, dx); 
        },
        onPanResponderRelease: () => {
            this.width = Dimensions.get('window').width - 100;
            if (Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs,dx);
                //-1 swipe to left, 1 swipe to right
                Animated.timing(this.imageX, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start( () => this.handleSwipe(-1 * direction));
            }else {
                Animated.spring(this.imageX, {
                toValue: 0,
            }).start();
            }
        },
    });

    handleSwipe = (indexDirection) =>{
        if(this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageX, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            // Next image animation 
            this.imageX.setValue(indexDirection * this.width);
            Animated.spring(this.imageX, {
                toValue: 0,
            }).start();
        });
        
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };
    
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        });
    }

    openDealUrl = () => {
        Linking.openURL(this.state.deal.url);
    }
    render() {
        const { deal } = this.state;

        return (
            <View style={styles.deals}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers}
                    source= {{uri: deal.media[this.state.imageIndex]}} 
                    style={[ {left: this.imageX}, styles.image]} 
                />
                <View style={styles.info}>
                    <View>
                        <Text style={styles.title}>{deal.title}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    </View>
                </View>
                <ScrollView>
                    { deal. user && 
                        <View style={styles.user}>
                            <Image source ={{ uri: deal.user.avatar }} style ={styles.avatar} />
                            <Text>{deal.user.name}</Text>
                        </View>
                    }
                    <View>
                        <Text>{deal.description}</Text>
                    </View>
                    <Button title="Buy this deal" onPress= {this.openDealUrl} />
                </ScrollView>
            </View>
            
        );
    }
}

const styles= StyleSheet.create({
    deals : {
        marginHorizontal: 12,
        marginBottom: 12,
       
    },
    backLink: {
        marginBottom: 10,
        color: '#0645ad',
        marginLeft: 10,
    },
    image: {
        width: 200,
        height: 150,
        backgroundColor: '#ccc',
    },
    info: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
        padding: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
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

    },
    
});

export default DealDetail;