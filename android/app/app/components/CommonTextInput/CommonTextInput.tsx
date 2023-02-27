import React from 'react';
import {TextInput, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Colour} from '../../theme';
import {style} from './Style';

export const CommonTextInput =React.forwardRef(
   (props: any,ref:any) => {
  return (
    <View style={[style.DefaultWrapperStyle, props?.wrapperStyle]}>
      {props.svg ? (
        <TouchableOpacity onPress={props.onPress}>
          <props.svg style={style.Icon} />
        </TouchableOpacity>
      ) : null}

      <TextInput
      scrollEnabled={false}
    
        value={props?.value}
        editable={props?.isEditable}
        onChangeText={props?.onChangeText}
        style={[style.TextInputStyle, props?.style,props?.secureTextEntry===true && props?.value.length > 0 ? {paddingTop:4}:{paddingTop: props?.fromLogin ? 4 : 0} ]}
        onSubmitEditing={props?.onSubmitEditing}
        placeholder={props?.placeholder || null}
        placeholderTextColor={
          Colour.placeholderGray || props?.placeholderTextColor
        }
      
        keyboardType={props?.keyboardType}
        keyboardAppearance={props?.keyboardAppearance}
        maxLength={props?.maxLength}
        ref={ref}
        secureTextEntry={props?.secureTextEntry}
        returnKeyType={props?.returnKeyType}
        autoCapitalize={props?.autoCapitalize}
      />
    </View>
  );
}
);
