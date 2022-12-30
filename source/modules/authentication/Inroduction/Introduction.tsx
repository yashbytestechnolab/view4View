import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../../Theme';
import { ROUTES, String } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { IntroductionData } from '../../../services/jsonfile';
import { styles } from './style';
import { ButtonComponent } from '../../../components';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Introduction = () => {

    const pageRef: React.MutableRefObject<undefined>  = useRef();
    const navigation:any = useNavigation();
    const [getCurrentIndex, setGetCurrentIndex] = useState<number>()

    const buttonHandler = () => {
        const index: number = pageRef.current?.getCurrentIndex();
        
        if (index === IntroductionData?.length - 1) {

            navigation.reset({
                index: 0,
                routes: [{ name: ROUTES?.LOGIN }]
            })
        } else {
            pageRef.current.scrollToIndex({
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

    const renderDesign = (item:  { svg: JSX.IntrinsicAttributes|object; title: string ; subTitle: string  }) => {
        return (
            <View style={styles.child}>
                <TouchableOpacity onPress={skipHandler}>
                    <Text style={styles.skipText}>{String?.introduction_swipeList?.skip}</Text>
                </TouchableOpacity>
                {/* <View style={styles.svgWrapper}>
                    <item.svg />
                </View> */}
                <item.svg height={height -480} />
                <View style={styles.alignItems}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.subTitle}>{item?.subTitle}</Text>
                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <View >
                <SwiperFlatList
                    ref={pageRef}
                    onChangeIndex={() => {
                        setGetCurrentIndex(pageRef.current?.getCurrentIndex())
                    }}
                    showPagination paginationActiveColor={Colors?.primaryRed}
                    paginationStyleItem={styles.paginationStyle}
                    paginationDefaultColor={Colors.paginationGray}
                    autoplayDelay={2}
                    autoplayLoop
                    index={0}
                    data={IntroductionData}
                    renderItem={({ item }) => (renderDesign(item))}
                />
            </View>
            <ButtonComponent onPrees={() => { buttonHandler() }} wrapperStyle={styles.nextButtoun} buttonTitle={getCurrentIndex == 3 ? String?.introduction_swipeList?.getStartedNow : String?.introduction_swipeList?.next}
            />
        </SafeAreaView>
    )
}
// const renderDesign = (item:  { svg: JSX.IntrinsicAttributes|object; title: string ; subTitle: string  }) => {
//     return (
//         <View style={styles.child}>
//             <TouchableOpacity onPress={skipHandler}>
//                 <Text style={styles.skipText}>{String?.introduction_swipeList?.skip}</Text>
//             </TouchableOpacity>
//             <View style={styles.svgWrapper}>
//                 <item.svg />
//             </View>
//             <View style={styles.alignItems}>
//                 <Text style={styles.title}>{item?.title}</Text>
//                 <Text style={styles.subTitle}>{item?.subTitle}</Text>
//             </View>

//         </View>
//     )
// }


{/* <SafeAreaView style={styles.container}>
<StatusBar barStyle={'dark-content'} />
<View >
    <SwiperFlatList
        ref={pageRef}
        onChangeIndex={() => {
            setGetCurrentIndex(pageRef.current?.getCurrentIndex())
        }}
        showPagination paginationActiveColor={Colors?.primaryRed}
        paginationStyleItem={styles.paginationStyle}
        paginationDefaultColor={Colors.paginationGray}
        autoplayDelay={2}
        autoplayLoop
        index={0}
        data={IntroductionData}
        renderItem={({ item }) => (renderDesign(item))}
    />
</View>
<ButtonComponent onPrees={() => { buttonHandler() }} wrapperStyle={styles.nextButtoun} buttonTitle={getCurrentIndex == 3 ? String?.introduction_swipeList?.getStartedNow : String?.introduction_swipeList?.next}
/>
</SafeAreaView> */}