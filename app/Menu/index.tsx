import { View, Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import CamaraModal from "@/components/CamaraModal";

export default function index() {
  const [image, setImage] = useState(undefined as any);
  const [isVisible, setIsVisible] = useState(false);

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
        onPress={()=> setIsVisible(true)}
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
      {/* Guardar */}
      <CamaraModal
          isVisible={isVisible}
          image={image}
      />
    </View>
  );
}
