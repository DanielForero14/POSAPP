import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface CameraModalProps {
    isVisible: boolean
    image?: any;
}
export default function CamaraModal(props: CameraModalProps) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{
                flex: 1
            }}>
                <Text>We need your permission to show the camera</Text>
            </View>
        );
    }

    return (
        <Modal
            visible={props.isVisible}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <CameraView style={{
                    flex: 1
                }}
                    facing={facing}
                >
                    <View style={{
                        flexDirection:"row"
                    }}>
                        <TouchableOpacity
                        onPress={take}
                        >
                            <Text> Take a Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={Open}
                        >
                            <Text>Open library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={flip}
                        >
                            <Text>Flip camera</Text>
                        </TouchableOpacity>
                        {/*Take a foto*/}
                        {/*Open Library */}
                        {/*Flip Camera*/}


                        
                    </View>

                </CameraView>
            </View>

        </Modal>
    )
}