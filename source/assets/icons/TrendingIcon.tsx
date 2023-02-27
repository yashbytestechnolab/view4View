import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Path, Polyline, Svg } from 'react-native-svg';

export const TrendingIcon = (props:any) => {
    return (
        <Svg width="35px" height="35px" viewBox="0 0 512 512">
            <Polyline
                points="352 144 464 144 464 256"
                fill={props.color ? props.color : Colors?.placeHolderTextBlack}
            />
            <Path
                d="M48,368,169.37,246.63a32,32,0,0,1,45.26,0l50.74,50.74a32,32,0,0,0,45.26,0L448,160"
                fill={props.color ? props.color : Colors?.placeHolderTextBlack}
            />
        </Svg>
    );
};

const styles = StyleSheet.create({});
