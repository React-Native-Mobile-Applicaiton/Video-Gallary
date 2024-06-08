import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import aoralogo from "../assets/logo/Aora.png";
import tagline from "../assets/logo/line.png";
import gall from "../assets/images/gall1.png";
import longtagline from "../assets/logo/longtagline.png";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { getCurrentUser } from "../lib/appwrite";
const HomeScreen = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  const { loading, isLogged,setLoading,setIsLogged,setUser } = useGlobalContext();
  
  
  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         console.log(res)
  //         setIsLogged(true);
  //         setUser(res);
  //       } else {
  //         console.log("Not FOund")
  //         setIsLogged(false);
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-[#161622] h-full w-full ">
      <View className="w-full flex justify-center items-center h-full px-4">
        <Image
          source={aoralogo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
        />
        <Image
          source={gall}
          className="max-w-[380px] w-full h-[298px]"
          resizeMode="contain"
        />
        <Image
          source={tagline}
          className="max-w-[380px] w-full "
          resizeMode="contain"
        />
        <Image
          source={longtagline}
          className="max-w-[380px] w-full "
          resizeMode="contain"
        />
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full mt-7 bg-[#FF8C00]"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
