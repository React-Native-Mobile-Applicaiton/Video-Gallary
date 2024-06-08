import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import uploadlogo from "../../assets/logo/upload.png";
import CustomButton from "../../components/CustomButton";
import * as Documentpicker from 'expo-document-picker'
import { router } from "expo-router";
import {createVideo} from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
const Create = () => {
  const [uploading, setuploading] = useState(false);
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [form, setform] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const openPicker=async(selectType)=>{
    const result = await Documentpicker.getDocumentAsync(
      {
        type:selectType === 'image'?
        ['image/png','image/jpg','image/jpeg']:
        ['video/mp4','video/gif','video/mkv']
      }
    )
    if(!result.canceled){
      if(selectType === 'image'){
        setform({...form,thumbnail:result.assets[0]})
      }
      if(selectType === 'video'){
        setform({...form,video:result.assets[0]})
      }
      
      else{
        setTimeout(()=>{
          Alert.alert('Document Picked',JSON.stringify(result,null,2))
        },100)
      }
    }
  }
  const submit = async() => {
    if(!form.prompt || !form.thumbnail || !form.thumbnail || !form.video){
      return Alert.alert("Please Fill in all the fields")
    }
    setuploading(true)
    try {
      
      await createVideo({
        ...form,userId:user.$id
      },user)
      Alert.alert('Success','Post Uploaded Succesfully')
      router.push('/home')
    } catch (error) {
      console.log(error.message)
      Alert.alert('Error',error.message)
    }finally{
      setform({ title: "",
        video: null,
        thumbnail: null,
        prompt: "",})
        setuploading(false)
    }
  };
  return (
    <SafeAreaView className="bg-[#161622] h-full ">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-medium">Upload Video</Text>
        <FormField
          title="video title"
          value={form.title}
          placeholder="Give your video a catch title...."
          handleChangeText={(e) => setform({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-medium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
               
                resizeMode={ResizeMode.COVER}
            
              />
            ) : (
              <View className="w-full h-40 px-4 bg-[#1E1E2D] bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border  border-dashed justify-center items-center">
                  <Image
                    source={uploadlogo}
                    resizeMode="contain"
                    className="w-14 h-14"
                  ></Image>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-medium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={()=>openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMethod="cover"
              />
            ) : (
              <View className="w-full  h-16 flex-row  space-x-2 px-4 bg-[#1E1E2D] bg-black-100 rounded-2xl justify-center items-center">
                <Image
                  source={uploadlogo}
                  resizeMode="contain"
                  className="w-8 h-8"
                ></Image>
                <Text className="text-sm text-gray-100 font-medium">
                  Choose a File{" "}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The Prompt you used to create this video"
          handleChangeText={(e) => setform({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="w-full mt-7 bg-[#FF8C00]"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
