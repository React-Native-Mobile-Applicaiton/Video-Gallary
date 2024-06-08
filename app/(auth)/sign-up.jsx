import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import aoralogo from "../../assets/logo/Aora.png";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Signup = () => {

  const { setUser, setIsLogged ,setLoading} = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert("Please Fill All the Fields")
    }
    setSubmitting(true)
    try {
      const result = await createUser(form.email,form.password,form.username)
      setUser(result)
      setIsLogged(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert(error.message)
    }finally{
      setSubmitting(false)
    }
  };
  return (
    <SafeAreaView className="bg-[#161622] h-full w-full">
    <ScrollView>
      <View
        className="w-full flex justify-center h-full px-4 my-6"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
        <Image
          source={aoralogo}
          resizeMode="contain"
          className="w-[115px] h-[34px]"
        />

        <Text className="text-2xl font-semibold text-white mt-10 ">
          Log in to Aora
        </Text>

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7 bg-[#FF8C00]"
          isLoading={isSubmitting}
        />
     <View className="flex justify-center pt-5 flex-row gap-2 items-center">
          <Text className="text-lg text-gray-100 font-pregular">
            Already have an account?
          </Text>
          <Link
            href="/sign-in"
            className=" text-yellow-500 font-bold text-xl"
          >
            Login
          </Link>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default Signup;
