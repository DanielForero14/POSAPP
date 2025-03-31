import { View, Text } from 'react-native'
import React from 'react'

interface CameraModalProps{
    isVisible: boolean
    image?: any;
}
export default function CamaraModal(props: CameraModalProps) {

  return (
    <View>
      <Text>CamaraModal</Text>
    </View>
  )
}