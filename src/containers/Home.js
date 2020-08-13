import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from 'actions';
import _debounce from 'lodash/debounce';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import * as colors from 'themes/colors';
import { wpx } from 'utils/dimensions';
import Card from 'components/Card';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const containerPaddingVertical = 42;
const cardContainerWidth = viewportWidth / 3;
const cardContainerHeight = (viewportHeight - 40 - (containerPaddingVertical * 2)) / 4;
const cardItemWidth= cardContainerWidth;
const cardItemHeight= cardContainerHeight;

class Home extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepNumber: 0,
      selectedPairs: [],
      completedPairs: [],
      isSecondClick: false,
      isFlipping: false,
    };
  }

  componentDidMount() {
    this.props.fetchRandomNumber();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.completedPairs.length !== 6 && this.state.completedPairs.length === 6) {
      setTimeout(() => {
        Alert.alert(
          'Congratulations!',
          `You win this game by ${this.state.stepNumber} steps!`,
          [
            {
              text: 'Try another round',
              onPress: () => this.restartGame()
            },
          ],
          { cancelable: false }
        );
      }, 1000);
    }
  }

  restartGame = () => {
    this.setState({ stepNumber: 0, selectedPairs: [], completedPairs: [], isSecondClick: false, isFlipping: false });
    this.props.fetchRandomNumber();
  }


  onFlipCard(index, number) {
    const newPairsValue = [...this.props.randomNumberArray];
    let newSelectedPairs = [...this.state.selectedPairs];
    let newCompletedPairs = [...this.state.completedPairs];
    if (!_isEmpty(newSelectedPairs) && newSelectedPairs[0].index === index) {
      return;
    }
    if (this.state.isFlipping) return;
    newPairsValue[index].isClicked = true;
    newSelectedPairs.push({ number: number, index });

    if (newSelectedPairs.length === 2) {
      if (newSelectedPairs[0].number === newSelectedPairs[1].number) {
        newCompletedPairs.push(newSelectedPairs[0].number);
      }
      this.props.updateRandomNumber(newPairsValue);
      this.setState({ isFlipping: true, completedPairs: newCompletedPairs, selectedPairs: newSelectedPairs, stepNumber: this.state.stepNumber + 1 });
    } else {
      this.props.updateRandomNumber(newPairsValue);
      this.setState({ selectedPairs: newSelectedPairs, stepNumber: this.state.stepNumber + 1 });
    }
  }

  onFlipBack(index, index2) {
    const newPairsValue = [...this.props.randomNumberArray];

    newPairsValue[index].isClicked = false;
    newPairsValue[index2].isClicked = false;

    this.props.updateRandomNumber(newPairsValue);
    this.setState({ selectedPairs: [] });
    setTimeout(() => {
      this.setState({ isFlipping: false });
    }, 1000);
  }

  onResetSelected() {
    this.setState({ selectedPairs: [] });
    setTimeout(() => {
      this.setState({ isFlipping: false });
    }, 1000);
  }
  
  renderCard = (data) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardItemContainer}>
          <Card
            onPress={(index, number) => this.onFlipCard(index, number)}
            onFlipBack={(index, index2) => this.onFlipBack(index, index2)}
            onResetSelected={() => this.onResetSelected()}
            cardNumber={data.item.number}
            isClicked={data.item.isClicked}
            index={data.index}
            selectedPairs={this.state.selectedPairs}
            completedPairs={this.state.completedPairs}
          />
        </View>
      </View>
    );
  }

  render() {
    const { stepNumber } = this.state;
    const { randomNumberArray } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.restartGame()}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>STEP: <Text style={styles.numberText}>{stepNumber}</Text></Text>
        </View>
        <FlatList
          data={randomNumberArray}
          keyExtractor={(item, index) => `${item.number}-${index}`}
          renderItem={this.renderCard} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: containerPaddingVertical,
    backgroundColor: colors.backgroundDark,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  restartButtonText: {
    fontSize: 18,
    color: colors.primary,
  },
  stepText: {
    fontSize: 18,
    color: colors.white,
  },
  numberText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
  cardContainer: {
    justifyContent: 'space-between',
    width: cardItemWidth,
    height: cardItemHeight,
  },
  cardItemContainer: {
    margin: 3,
  },
});

Home.propTypes = {
  fetchRandomNumber: PropTypes.func.isRequired,
  updateRandomNumber: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

const mapStateToProps = store => ({
  randomNumberArray: Actions.getRandomNumberArray(store),
});

const mapDispatchToProps = {
  fetchRandomNumber: Actions.fetchRandomNumber,
  updateRandomNumber: Actions.updateRandomNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
