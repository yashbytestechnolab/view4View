import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../../Theme';
import { ROUTES, String } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { IntroductionData } from '../../../services/jsonfile';
import { styles } from './style';

export const Introduction = () => {

    const pageRef: any = useRef();
    const navigation: any = useNavigation();
    const [getCurrentIndex, setGetCurrentIndex] = useState()
    
    const buttonHandler = () => {
        let index: any = pageRef.current?.getCurrentIndex();
        if (index === IntroductionData?.length - 1) {

            navigation.reset({
                index: 0,
                routes: [{ name: ROUTES?.CREATEACCOUNT }]
            })
        } else {
            pageRef?.current?.scrollToIndex({
                index: index + 1,
                animated: true,
            });
        }
    };
    const skipHandler = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: ROUTES?.LOGIN }]
        })
    }

    const renderDesign = (item: any) => {
        return (
            <View style={styles.child}>
                <TouchableOpacity onPress={skipHandler}>
                    <Text style={styles.skipText}>{String?.introduction_swipeList?.skip}</Text>
                </TouchableOpacity>
                <View style={styles.svgWrapper}>
                    <item.svg />
                </View>
                <View style={styles.alignItems}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.subTitle}>{item?.subTitle}</Text>
                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <SwiperFlatList
                    ref={pageRef}
                    onChangeIndex={() => {
                        setGetCurrentIndex(pageRef.current?.getCurrentIndex())
                    }}
                    showPagination paginationActiveColor={Colors?.redFF5371}
                    paginationStyleItem={styles.paginationStyle}
                    paginationDefaultColor={Colors.grayCED4DA}
                    autoplayDelay={2}
                    autoplayLoop
                    index={0}
                    data={IntroductionData}
                    renderItem={({ item }) => (renderDesign(item))}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => { buttonHandler() }}
                style={styles.nextButtoun}>
                <Text style={{ color: "#FFFFFF", textAlign: "center", alignSelf: 'center' }} >
                    {getCurrentIndex == 3 ? String?.introduction_swipeList?.getStartedNow : String?.introduction_swipeList?.next}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
