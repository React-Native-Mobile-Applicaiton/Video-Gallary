import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import eye from '../assets/logo/eye.png'
import eyehide from '../assets/logo/eyehide.png'


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles} `}>
      <Text className=" text-gray-100 font-pmedium text-lg">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-xl bg-[#1E1E2D] first:rounded-2xl  border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? eye : eyehide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;