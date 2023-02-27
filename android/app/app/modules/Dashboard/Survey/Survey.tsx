import React, {FC, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Colour } from '../../../theme';
import {Fonts, Images} from '../../../assets';
import {String} from '../../../constants';
import {commonStyles} from '../../../constants/CommonStyles';
import CentavizerLogo from '../../../components/Logo/CentavizerLogo';
import SelectCentz from '../../../components/SelectCentz/SelectCentz';
import {ButtonWithIcon} from '../../../components/ButtonWithIcon/ButtonWithIcon';

const Centz = [
  {
    id: 1,
    name: 'Domino’s Pizza',
    image: Images.dominoz,
    isSelected: false,
  },
  {
    id: 2,
    name: '  Papa John’s',
    image: Images.papaJohn,
    isSelected: false,
  },
  {
    id: 3,
    name: 'Pizza Hut',
    image: Images.pizaheart,
    isSelected: false,
  },
  {
    id: 4,
    name: 'Other',
    isSelected: false,
    // image: Images.dominoz
  },
];

const Survey: FC = () => {
  const [clickPlus, setClickPlus]: any = useState(Centz);
  const [otherInput, setOtherInput] = useState(false);
  const [otherTextValue, setOtherTextValue] = useState('');

  const handleOtherButton = (id: any) => {
    id === 4 ? setOtherInput(true) : setOtherInput(false);
    const renderSelectedItem = clickPlus?.map((item: any) => {
      return item?.id === id
        ? {...item, isSelected: true}
        : {...item, isSelected: false};
    });
    setClickPlus(renderSelectedItem);
  };
  const handleSubmitAnswer = () => {
    const handleEmptyItem = clickPlus?.find((item: any) => {
      return item?.isSelected;
    });
    if (handleEmptyItem === undefined) {
      Alert.alert('Please Select One Filed');
    } else if (otherInput && otherTextValue === '') {
      Alert.alert('Please Fill Value');
    } else {
      // handle API Function
      Alert.alert('sucess');
    }
  };
  return (
    <ScrollView style={style.blueBackGround}>
      <StatusBar backgroundColor={Colour.PrimaryBlue} barStyle={'default'} />
      <CentavizerLogo />
      <Text style={[commonStyles.title, {marginTop: 38, marginBottom: 32}]}>
        {String.surveyTitle}
      </Text>
      <View>
        {clickPlus?.length > 0 &&
          clickPlus?.map((centzItem: any, index: number) => {
            return (
              <>
                <SelectCentz
                  centzItem={centzItem}
                  image={centzItem?.image || null}
                  title={centzItem?.name}
                  wrapper={style.cardWrapper}
                  otherInput={otherInput}
                  handleOtherButton={handleOtherButton}
                />
                {centzItem?.id === 4 && centzItem?.isSelected && (
                  <>
                    <TextInput
                      onChangeText={(text: any) => {
                        setOtherTextValue(text);
                      }}
                      style={style.textInputWrapper}
                      placeholder={'add your preference'}
                    />
                  </>
                )}
              </>
            );
          })}
        <ButtonWithIcon
          buttonText={'Submit answer'}
          onPress={() => {
            handleSubmitAnswer();
          }}
          buttonStyle={[style.next, !clickPlus ? {opacity: 0.5} : null]}
        />
      </View>
    </ScrollView>
  );
};
export default Survey;
const style = StyleSheet.create({
  blueBackGround: {
    backgroundColor: Colour.PrimaryBlue,
    flex: 1,
    height: '100%',
    width: '100%',
  },

  cardWrapper: {marginBottom: 8},
  next: {
    marginTop: 150,
    marginBottom: 57,
  },
  text2: {
    fontFamily: Fonts.QuicksandBold,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
    color: Colour.PrimaryBlue,
    textAlign: 'left',
    flex: 0.9,
  },
  greenBorder: {
    borderWidth: 1,
    borderColor: Colour.primaryGreen,
  },
  plus: {
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 30,
  },
  radioButtonWrapper: {
    flex: 0.1,
  },
  textInputWrapper: {
    backgroundColor: Colour.white,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 25,
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
