import React, {useEffect, useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions} from 'react-native';

import Animator from './Animator';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const BottomDrawer = forwardRef((props, ref) => {
  const [configs, setConfigs] = useState({});
  const [currentPosition, setCurrentPosition] = useState(undefined);

  function _calculateUpPosition(screenHeight, containerHeight, offset) {
    return {
      x: 0,
      y: screenHeight - (containerHeight + offset),
    };
  }

  function _calculateDownPosition(upPosition, downDisplay) {
    return {
      x: 0,
      y: upPosition.y + downDisplay,
    };
  }

  useEffect(() => {
    /**
     * TOGGLE_THRESHOLD is how much the user has to swipe the drawer
     * before its position changes between up / down.
     */
    const TOGGLE_THRESHOLD = props.containerHeight / 11;
    const DOWN_DISPLAY = props.downDisplay || props.containerHeight / 1.5;

    /**
     * UP_POSITION and DOWN_POSITION calculate the two (x,y) values for when
     * the drawer is swiped into up position and down position.
     */
    const UP_POSITION = _calculateUpPosition(
      SCREEN_HEIGHT,
      props.containerHeight,
      props.offset,
    );
    const DOWN_POSITION = _calculateDownPosition(UP_POSITION, DOWN_DISPLAY);
    const ALL_DOWN_POSITION = {x: 0, y: props.alldownDisplay};

    setCurrentPosition(props.startUp ? UP_POSITION : DOWN_POSITION);

    setConfigs({
      TOGGLE_THRESHOLD,
      DOWN_DISPLAY,
      UP_POSITION,
      DOWN_POSITION,
      ALL_DOWN_POSITION,
    });
  }, [
    props.alldownDisplay,
    props.containerHeight,
    props.downDisplay,
    props.offset,
    props.startUp,
  ]);

  return (
    currentPosition !== undefined && (
      <Animator
        ref={ref}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        toggleThreshold={configs.TOGGLE_THRESHOLD}
        upPosition={configs.UP_POSITION}
        downPosition={configs.DOWN_POSITION}
        roundedEdges={props.roundedEdges}
        shadow={props.shadow}
        containerHeight={props.containerHeight}
        backgroundColor={props.backgroundColor}
        onExpanded={() => props.onExpanded()}
        onCollapsed={() => props.onCollapsed()}
        alldownPosition={configs.ALL_DOWN_POSITION}>
        {props.children}

        <View
          style={{
            height: Math.sqrt(SCREEN_HEIGHT),
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius,
            borderBottomLeftRadius: props.borderBottomLeftRadius,
            borderBottomRightRadius: props.borderBottomRightRadius,
            borderTopLeftRadius: props.borderTopLeftRadius,
            borderTopRightRadius: props.borderTopRightRadius,
          }}
        />
      </Animator>
    )
  );
});

BottomDrawer.propTypes = {
  /**
   * Height of the drawer.
   */
  containerHeight: PropTypes.number.isRequired,

  /**
   * The amount of offset to apply to the drawer's position.
   * If the app uses a header and tab navigation, offset should equal
   * the sum of those two components' heights.
   */
  offset: PropTypes.number,

  /**
   * Set to true to have the drawer start in up position.
   */
  startUp: PropTypes.bool,

  /**
   * How much the drawer's down display falls beneath the up display.
   * Ex: if set to 20, the down display will be 20 points underneath the up display.
   */
  downDisplay: PropTypes.number,

  /**
   * The background color of the drawer.
   */
  backgroundColor: PropTypes.string,

  /**
   * Set to true to give the top of the drawer rounded edges.
   */
  roundedEdges: PropTypes.bool,

  /**
   * Set to true to give the drawer a shadow.
   */
  shadow: PropTypes.bool,

  /**
   * A callback function triggered when the drawer swiped into up position
   */
  onExpanded: PropTypes.func,

  /**
   * A callback function triggered when the drawer swiped into down position
   */
  onCollapsed: PropTypes.func,

  /**
   * Set bottom left border raidus
   */
  borderBottomLeftRadius: PropTypes.number,

  /**
   * Set bottom right border raidus
   */
  borderBottomRightRadius: PropTypes.number,

  /**
   * Set border raidus
   */
  borderRadius: PropTypes.number,

  /**
   * Set top left border raidus
   */
  borderTopLeftRadius: PropTypes.number,

  /**
   * Set top right border raidus
   */
  borderTopRightRadius: PropTypes.number,
  /**
   * Set all the way down positon
   */
  alldownDisplay: PropTypes.number,
};

BottomDrawer.defaultProps = {
  offset: 0,
  startUp: true,
  backgroundColor: '#ffffff',
  borderRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  roundedEdges: true,
  shadow: true,
  onExpanded: () => {},
  onCollapsed: () => {},
  alldownDisplay: 0,
};

export default BottomDrawer;
