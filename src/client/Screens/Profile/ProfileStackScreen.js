import React,{Component} from 'react'
import { Text,Button,View,TouchableOpacity} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen'
import contactData from './mocks'
import EditProfile from './EditProfile'
const ProfileStack = createStackNavigator();
 export default function ProfileStackScreen({navigation}) {
     return (
      
         <ProfileScreen  {...contactData}/>
         
        
     )
 }
 