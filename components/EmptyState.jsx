import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from '../components/CustomButton'
import novideo from '../assets/images/novideo.png'
import { router } from "expo-router";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image source={novideo} className="w-[270px] h-[215px]" resizeMode='contain'/> 
      <Text className="text-xl font-medium text-white mt-2">{title}</Text>
      <Text className="font-medium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
          title="Create Video"
          handlePress={() => router.push("/create")}
          containerStyles="w-full mt-7 bg-[#FF8C00]"
        />
    </View>
  );
};

export default EmptyState;
