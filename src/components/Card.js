import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import * as colors from 'themes/colors';
import _isEmpty from 'lodash/isEmpty';

class Card extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value  }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isClicked && this.props.isClicked) {
      // show card
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    if (this.props.selectedPairs.length === 2) {
      if (!this.props.completedPairs.includes(this.props.cardNumber)) {
        this.props.onFlipBack(this.props.selectedPairs[0].index, this.props.selectedPairs[1].index);
        setTimeout(() => {
          Animated.spring(this.animatedValue, {
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
          }).start();
        }, 1000);
      } else {
        this.props.onResetSelected();
      }
    }
  }

  flipCard() {
    this.props.onPress(this.props.index, this.props.cardNumber);
  }
 
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    };
    const { cardNumber, isMatch } = this.props;
    return (
      <TouchableOpacity onPress={() => this.flipCard()}>
        <View style={styles.container}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={{ color: colors.white, fontSize: 24 }}>?</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text>{cardNumber.toString()}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  flipCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    backfaceVisibility: 'hidden',
    height: '100%',
    width: '100%',
  },
  flipCardBack: {
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
  },
});

Card.propTypes = {
  onPress: PropTypes.func.isRequired,
  onFlipBack: PropTypes.func.isRequired,
  onResetSelected: PropTypes.func.isRequired,
  cardNumber: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isClicked: PropTypes.bool.isRequired,
  selectedPairs: PropTypes.array.isRequired,
  completedPairs: PropTypes.array.isRequired,
};

Card.defaultProps = {
};

export default Card;
