import React from 'react'

import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    StyleSheet,
    PermissionsAndroid,
    Alert,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors } from '../Theme';

const windowWidth = Dimensions.get('window').width;

interface props {
    isVisibleModal?: boolean;
    toggleModal?: Function;
    profileImages?: Array<Text>;
    setProfileImages?: Function;
}
export const UplaodImage = (props: props) => {
    const {
        isVisibleModal,
        toggleModal,
        profileImages,
        setProfileImages,
    }: any = props;
    const requestCameraPermission = async (req: string) => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Social Pows App Camera Permission',
                        message:
                            'Social Pows App needs access to your camera ' +
                            'so you can take awesome pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    req === 'camera' ? openCamera() : openGallery();
                } else {
                    Alert.alert('Please grant camera permission');
                }
            } catch (err) {
                console.warn('wee', err);
                Alert.alert('Something went wrong..');
            }
        } else {
            req === 'camera' ? openCamera() : openGallery();
        }
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64:true,
            freeStyleCropEnabled: true,
            // useFrontCamera : true
        }).then(image => {
             console.log("iiiiiiiiimafge",image)
            //let imageDetails = profileImages || [];
            //imageDetails[selectedIndex] = image;
            setProfileImages(image?.path);
            toggleModal();
        });
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64:true,
            freeStyleCropEnabled: true,
        }).then(image => {
            console.log("iiiiiiiiimafge",image)
            setProfileImages(image);
            toggleModal();
        });
    };

    return (
        isVisibleModal && (
            <Modal
                isVisible={isVisibleModal}
                onBackdropPress={toggleModal}
                coverScreen={true}
                backdropColor={Colors.cardshadow}
            >
                <View style={styles.modelView}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => requestCameraPermission('camera')}>
                        {/* <Image source={Icons.cameraGreen} style={styles.centerView} /> */}
                        <Text style={styles.textField}>takePhoto</Text>
                    </TouchableOpacity>
                    <View style={styles.dividerView} />
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => requestCameraPermission('gallery')}>
                        {/* <Image source={Icons.uploadGallery} style={styles.centerView} /> */}
                        <Text style={styles.textField}>uploadGallery</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    );
};

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modelView: {
        position: 'absolute',
        left: -20,
        bottom: 0,
        height: '23%',
        backgroundColor: 'white',
        width: windowWidth,
        flexDirection: 'row',
    },
    itemContainer: { flex: 0.5, justifyContent: 'center' },
    centerView: { alignSelf: 'center' },
    textField: {
        textAlign: 'center',
        //fontFamily: Fonts.relewayMediam,
        fontSize: 16,
        marginTop: 22,
    },
    dividerView: {
        backgroundColor: Colors.black,
        height: '60%',
        width: 0.5,
        alignSelf: 'center',
    },
});
