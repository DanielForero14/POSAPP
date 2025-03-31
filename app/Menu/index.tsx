import { View, Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';

export default function index() {
  const [image, setImage] = useState(undefined as any);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {/*Select Image */}
      {image ? <View>
        {/* Pintar la imagen */}
      </View> 
      : 
      <TouchableOpacity
      onPress={()=>()}
      >
      <Entypo name="camera" size={24} color="black" />
      </TouchableOpacity>
       }

      <view></view>
      {/* Title */}

      <TextInput />
      {/* Prince */}
      <TextInput />
      {/* Description */}
      <TextInput />

      {/* Los tres botones que debe tener son */}
      {/* Edid */}
      {/* Delete */}
      {/*Select Image */}
    </View>
  );
}
