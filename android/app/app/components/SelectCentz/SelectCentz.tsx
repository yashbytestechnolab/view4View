
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colour } from '../../theme';
import { NotSelectCB } from '../../assets/icons/NotSelectCB';
import { Fonts } from '../../assets';
import { Plus } from '../../assets/icons/Plus';
import { SelectCB } from '../../assets/icons/SelectCB';
import { commonStyles } from '../../constants/CommonStyles';
import { TextInput } from 'react-native-gesture-handler';
interface CustomButton {
  wrapper?: object;
  title?: String;
  image?: any;
  isDisabled?: boolean;
  select?: boolean;
  onPress?: any;
  selectIndex?: any;
  toggle?: any;
  handleOtherButton?: any,
  centzItem?: any,
  otherInput?: any
}
const SelectCentz = (props: CustomButton) => {
  const {
    wrapper,
    title,
    image,
    select,
    handleOtherButton,
    centzItem,
    otherInput
  } = props;

  console.log("id", otherInput);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleOtherButton(centzItem?.id)
        }}
        activeOpacity={1}
        style={
          [commonStyles.main,
            wrapper,
          otherInput &&
          { backgroundColor: "rgba(228, 231, 236,0.3)" },
          centzItem?.id === 4 && centzItem?.isSelected
          && { backgroundColor: "white" }
          ]}
      >
        <Image
          source={image}
          style={[style.image, select ?
            { tintColor: Colour.gray300, } : null,
          otherInput && { opacity: 0.3 }]}
        />
        <Text numberOfLines={1} style={style.text}>
          {title}
        </Text>
        <TouchableOpacity
          style={[style.radioButtonWrapper]}
          onPress={() => {
            handleOtherButton(centzItem?.id)
          }}>
          {centzItem?.isSelected ?
            <SelectCB /> :
            <NotSelectCB />
          }
        </TouchableOpacity>
      </TouchableOpacity>
      {/* {
        otherInput && centzItem?.id === 4 && centzItem?.isSelected &&
        <TextInput

          style={style.textInputWrapper}
          placeholder={'add your preference'}
        />
      } */}
    </View>
  );
};
export default SelectCentz;
const style = StyleSheet.create({
  image: {
    height: 65,
    width: 65,
    flex: 0.2,
    flexWrap: 'wrap',
    display: 'flex',
    //paddingRight: 8,
  },
  text: {
    fontFamily: Fonts.QuicksandBold,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
    color: Colour.PrimaryBlue,
    textAlign: 'left',
    flex: 0.7,
    paddingLeft: 8,
    paddingRight: 8,
  },
  radioButtonWrapper: {
    flex: 0.1,
  },
  plus: {
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 30,
  },
  text2: {
    fontFamily: Fonts.Quicksand,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
    color: Colour.PrimaryBlue,
    textAlign: 'left',
    flex: 0.9,
  },
  border: {
    backgroundColor: Colour.white,
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colour.gray300,
  },

  textInputWrapper: {
    backgroundColor: Colour.white,
    height: 44,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 30,

    shadowColor: Colour.gray200,
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.23,

    paddingLeft: 14,
    paddingVertical: 10,

    paddingRight: 14,
  },
});


// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {Colour} from '../../theme';
// import {NotSelectCB} from '../../assets/icons/NotSelectCB';
// import {Fonts} from '../../assets';
// import {Plus} from '../../assets/icons/Plus';
// import {SelectCB} from '../../assets/icons/SelectCB';
// import {commonStyles} from '../../constants/CommonStyles';
// import {TextInput} from 'react-native-gesture-handler';
// interface CustomButton {
//   wrapper?: object;
//   title?: String;
//   image?: any;
//   isDisabled?: boolean;
//   select?: boolean;
//   onPress?: any;
//   selectIndex?: any;
//   toggle?: any;
// }
// const SelectCentz = (props: CustomButton) => {
//   const {wrapper, title, image, select, onPress, selectIndex, toggle} = props;
//   const [radio, setRadio]: any = useState(true);

//   console.log('radio', radio);

//   const selectCentz = () => {
//     radio ? setRadio(false) : setRadio(true);
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           selectCentz();
//         }}
//         activeOpacity={1}
//         style={[commonStyles.main, wrapper, select ? {opacity: 0.5} : null]}
//         disabled={select}>
//         <Image
//           source={image}
//           style={[style.image, select ? {tintColor: Colour.gray300} : null]}
//         />
//         <Text numberOfLines={1} style={style.text}>
//           {title}
//         </Text>
//         <TouchableOpacity
//           style={style.radioButtonWrapper}
//           onPress={() => {
//             selectCentz();
//           }}>
//           {select ? (
//             <NotSelectCB />
//           ) : radio === false ? (
//             <SelectCB />
//           ) : (
//             <NotSelectCB />
//           )}
//         </TouchableOpacity>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default SelectCentz;
// const style = StyleSheet.create({
//   image: {
//     height: 65,
//     width: 65,
//     flex: 0.2,
//     flexWrap: 'wrap',
//     display: 'flex',
//     //paddingRight: 8,
//   },
//   text: {
//     fontFamily: Fonts.QuicksandBold,
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 32,
//     color: Colour.PrimaryBlue,
//     textAlign: 'left',
//     flex: 0.7,
//     paddingLeft: 8,
//     paddingRight: 8,
//   },
//   radioButtonWrapper: {
//     flex: 0.1,
//   },
//   plus: {
//     marginLeft: 0,
//     paddingLeft: 20,
//     paddingRight: 30,
//   },
//   text2: {
//     fontFamily: Fonts.Quicksand,
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 32,
//     color: Colour.PrimaryBlue,
//     textAlign: 'left',
//     flex: 0.9,
//   },
//   border: {
//     backgroundColor: Colour.white,
//     height: 20,
//     width: 20,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: Colour.gray300,
//   },

//   textInputWrapper: {
//     backgroundColor: Colour.white,
//     height: 44,
//     width: 350,
//     borderRadius: 8,

//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginTop: 30,

//     shadowColor: Colour.gray200,
//     borderWidth: 0,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowRadius: 2,
//     shadowOpacity: 0.23,

//     paddingLeft: 14,
//     paddingVertical: 10,

//     paddingRight: 14,
//   },
// });
