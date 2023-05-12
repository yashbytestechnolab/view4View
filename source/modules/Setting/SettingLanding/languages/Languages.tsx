import { Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { colorBackGround, darkBackGround, } from '../../../../Theme';
import { InputContextProvide } from '../../../../context/CommonContext';
import { Header } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { languagesArray } from '../../../../constants/language';
import { Correct } from '../../../../assets/icons/Correct';
import { LocalStorageKeys } from '../../../../constants';
import * as LocalStorage from '../../../../services/LocalStorage';
import { languageInterface } from './interface';
import { styles } from './styles';

export const Languages = () => {
    const [languageData, setLanguageData] = useState<Array<object>>([]);
    const { t, i18n: { changeLanguage }, } = useTranslation();

    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide);

    useEffect(() => {
        updateLanguage();
    }, [setLanguageData]);

    const updateLanguage = async () => {
        let getLocalValue = await LocalStorage.getValue(LocalStorageKeys.language) || 'en';
        let update: Array<object> = languagesArray.map(
            (item: { languagesKey: string }) => {
                return { ...item, selected: getLocalValue == item.languagesKey };
            },
        );
        setLanguageData(update);
    };

    return (
        <View style={[styles.mainContainer, darkBackGround(darkModeTheme)]}>
            <Header title={t('language')} showCoin={false} showBacKIcon />
            <View style={styles.languageContainer}>
                {languageData.map((item: any) => {
                    const { onPress, languagesKey, name, id, selected }: languageInterface = item;
                    return (
                        <React.Fragment key={id}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                key={id}
                                onPress={() => {
                                    onPress(changeLanguage, languagesKey, updateLanguage);
                                }}
                                style={styles.vertical}>
                                <Text
                                    style={[styles.fontStyle, colorBackGround(darkModeTheme)]}>
                                    {name}
                                </Text>
                                {selected && <Correct darkModeTheme={darkModeTheme} />}
                            </TouchableOpacity>
                            <View style={styles.line} />
                        </React.Fragment>
                    );
                })}
            </View>
        </View>
    );
};
