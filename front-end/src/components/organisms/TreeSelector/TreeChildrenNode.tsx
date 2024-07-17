import { Animated } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "@app/components/atoms";
import { Tree } from "@app/types";
import { Component, Context, ReactNode, useMemo, useState } from "react";
import { blueTheme } from "@app/theme/themes/blueTheme";
import { ThemeContext, ThemeProvider } from "@shopify/restyle";
import { Theme } from "@app/theme";

const THRESHOLD = 75;

export interface TreeChildrenNodeProps {
  onPress?(tree: Tree): void,
  onLeft?(tree: Tree): void,
  onRight?(tree: Tree): void,
  tree: Tree,
}

export class TreeChildrenNode
  extends Component<TreeChildrenNodeProps>
{
  public static override contextType = ThemeContext;
  public declare context: React.ContextType<Context<Theme>>;

  private _amount = Math.floor(Math.random() * 100);

  private _dragColor = (
      dragX: Animated.AnimatedInterpolation<number>,
      direction: "left" | "right",
    ) =>
  {
    const {
      // Foreground
      quaternary500: activeFgColor,
      primary500: inactiveFgColor,

      // Background
      primary500: activeBgColor,
      tertiary500: inactiveBgColor,
    } = this.context.colors;

    const backgroundColor = dragX.interpolate(
      direction == "left"
      ? {
        inputRange: [ 0, THRESHOLD, THRESHOLD + 1 ],
        outputRange: [ inactiveBgColor, inactiveBgColor, activeBgColor ],
        extrapolate: "clamp",
      }
      : {
        inputRange: [ -THRESHOLD - 1, -THRESHOLD, 0 ],
        outputRange: [ activeBgColor, inactiveBgColor, inactiveBgColor ],
        extrapolate: "clamp",
      }
    );

    const color = dragX.interpolate(
      direction == "left"
      ? {
        inputRange: [ 0, THRESHOLD, THRESHOLD + 1 ],
        outputRange: [ inactiveFgColor, inactiveFgColor, activeFgColor ],
        extrapolate: "clamp",
      }
      : {
        inputRange: [ -THRESHOLD - 1, -THRESHOLD, 0 ],
        outputRange: [ activeFgColor, inactiveFgColor, inactiveFgColor ],
        extrapolate: "clamp",
      }
    );

    return {
      backgroundColor,
      color,
    };
  }

  private _renderLeftAction = (
      _progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
    ) =>
  {
    const {
      color,
      backgroundColor,
    } = this._dragColor(dragX, "left");

    return (
      <Animated.View
        style={{
          backgroundColor,
          flex: 1,
        }}
      >
        <Box
          flex={1}
          flexDirection={"row"}
          paddingVertical={"1"}
          paddingHorizontal={"2"}
        >
          <Animated.Text
            style={{ color }}
          >
            Go up
          </Animated.Text>
        </Box>
      </Animated.View>
    );
  };

  private _renderRightAction = (
      _progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
    ) =>
  {
    const {
      color,
      backgroundColor,
    } = this._dragColor(dragX, "right");

    return (
      <Animated.View
        style={{
          backgroundColor,
          flex: 1,
        }}
      >
        <Box
          flex={1}
          flexDirection={"row-reverse"}
          paddingVertical={"1"}
          paddingHorizontal={"2"}
        >
          <Animated.Text
            style={{ color }}
          >
            Go down
          </Animated.Text>
        </Box>
      </Animated.View>
    );
  };

  private _onSwipeableWillOpen = (direction: "left" | "right") => {
    const { onLeft, onRight, tree } = this.props;

    if (direction == "left") {
      onLeft?.(tree);
    }
    else {
      onRight?.(tree);
    }
  };

  public override render(): ReactNode {
    // this.context.colors.primary500
    return (
      <Swipeable
        friction={2}
        useNativeAnimations={false}
        leftThreshold={THRESHOLD}
        rightThreshold={THRESHOLD}
        renderLeftActions={this._renderLeftAction}
        renderRightActions={this._renderRightAction}
        enableTrackpadTwoFingerGesture
        // onSwipeableWillOpen={this._onSwipeableWillOpen}
        onSwipeableOpen={this._onSwipeableWillOpen}
        // onSwipeableWillClose
        // onSwipeableOpen
        // onSwipeableClose
      >
        <Box
          flex={1}
          // Swipeable actions are behind this box.
          // Therefore background must be affected by the touchable opacity.
          backgroundColor={"quaternary500"}
        >
          <TouchableOpacity onPress={() => this.props.onPress?.(this.props.tree)}>
            <Box
              flex={1}
              flexDirection={"row"}
              paddingVertical={"1"}
              marginHorizontal={"2"}
              borderBottomWidth={1}
              justifyContent={"space-between"}
              gap={"2"}
            >
              <Text>{this.props.tree.label}</Text>
              <Text>{this._amount} €</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Swipeable>
    );
  }
}
