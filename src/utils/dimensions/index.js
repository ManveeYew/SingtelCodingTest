/*
 * @Author: Jeff Jung (c3098051@gmail.com) 
 * @Date: 2018-05-09 17:44:17 
 * @Last Modified by: Jeff Jung
 * @Last Modified time: 2018-07-03 10:32:26
 */
// @flow
import { PixelRatio, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function widthPercent(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function heightPercent(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

/**
 * @name widthPixcel
 * @description provided px is in 360 px height resolution, 
 *    and this function will convert to the value relatively to viewPort width
 */
function widthPixcel(px: number) {
  const ratio = (px / 375);
  return Math.round(ratio * viewportWidth);
}


/**
 * @name heightPixcel
 * @description  provided px is in 640 px height resolution, 
 *    and this function will convert to the value relatively to viewPort height
 */ 
function heightPixcel(px: number) {
  const ratio = (px / 667);
  return Math.round(ratio * viewportHeight);
}

/**
 * @name dpx
 * @description 
 *    each device got own dpx, and this probably the good way to manage 
 *    width, height in many devices.
 */
function dpx(v: number): number {
  // const px = PixelRatio.getPixelSizeForLayoutSize(1);
  return PixelRatio.get() * v;
}

/**
 * @name dp
 * @description 
 * @todo 
 *    still investigating if which is better measurement bw dpx and dp. 
 *    ommented by Jeff 03.Jul.2018
 */
function dp(v: number): number {
  return (1 / PixelRatio.get()) * PixelRatio.getPixelSizeForLayoutSize(v);
}

export {
  widthPercent as wp,
  heightPercent as hp,
  widthPixcel as wpx,
  heightPixcel as hpx,
  dpx,
  dp,
}
;
