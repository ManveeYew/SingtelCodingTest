/*
 * @Author: Jeff Jung (c3098051@gmail.com)
 * @Date: 2018-01-02 00:21:56
 * @Last Modified by: Jeff Jung
 * @Last Modified time: 2018-09-26 14:45:06
 */
// @flow
import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View } from 'native-base';

// services
import * as Colors from 'themes/colors';

type Props ={
  processing: boolean,
  size: string,
  cleanBackground: false,
}

const Loading = ({ processing, size, cleanBackground }: Props) => {
  if (!processing) {
    return null;
  }
  return (
    <View style={{
      ...StyleSheet.absoluteFillObject,
      zIndex: 5000,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <View style={[
        { ...StyleSheet.absoluteFillObject, flex: 1 },
        cleanBackground ? null : {backgroundColor: 'black', opacity: 0.7 },
      ]}
      />
      <ActivityIndicator color={Colors.secondary} size={size ? size : 'large'} />
    </View>
  );
};
export default Loading;
