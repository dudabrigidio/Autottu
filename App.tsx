'use client';
import { StatusBar } from 'expo-status-bar';
import { Button, ToastAndroid, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from './Cadastro';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome6, Fontisto} from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CadastroMoto from './CadastroMoto';
import MotosListagem from './MotosListagem';
import CheckInModulo from './CheckInModulo';



export default function App() {
  const [token, setToken] = useState<boolean>(false);

  const Tab = createBottomTabNavigator();

  
    const login  = async ()  =>  { 
      const logado = await AsyncStorage.getItem("Logado")
      if (logado) {
        setToken(true);
      } else {
        setToken(false);
      }
  }



  console.log(token)
  console.log(AsyncStorage.getItem("Usuario-Lista"));
  useEffect(() => {
    login();
  })


  const sair = () => {
        AsyncStorage.removeItem("Logado")
        setToken(false);
  }

  

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
      { token  ? (
          <View style={{flex: 1}}>

            
            <Tab.Navigator>
              <Tab.Screen name="Cadastro moto" 
                options={{
                  title: "Cadastrar moto",
                  tabBarIcon: ({size, color})=>
                    <Fontisto name="motorcycle" size={24} color="black" />,
                  }}> 
                  {(navProps : any)=><CadastroMoto sair={sair}/>}
              </Tab.Screen>
              <Tab.Screen name="Motos" 
              options={{
                title: "Visualizar motos",
                tabBarIcon: ({size, color})=>
                  <FontAwesome6 name="motorcycle" size={24} color="black" />,
                }}> 
                {(navProps : any)=><MotosListagem sair={sair}/>}
              </Tab.Screen>

              <Tab.Screen name="CheckIn" 
              options={{
                title: "Check In",
                tabBarIcon: ({size, color})=>
                  <Feather name="check-circle" size={24} color="black" />,
                }}> 
                {(navProps : any)=><CheckInModulo sair={sair}/>}
              </Tab.Screen>
              

            </Tab.Navigator>

          </View>
        ) : (
          <View style={{flex: 1}}>
        
          <Tab.Navigator>
            <Tab.Screen name="Login" 
              options={{
                title: "Login",
                tabBarIcon: ({size, color})=>
                  <AntDesign name="login" size={24} color="black" />,
                }}> 
                {(navProps : any)=><Login token={setToken}/>}
            </Tab.Screen>

            <Tab.Screen name="Cadastro" 
            options={{
              title: "Cadastro",
              tabBarIcon: ({size, color})=>
                <AntDesign name="adduser" size={24} color="black" />,
              }}> 
              {(navProps : any)=><Cadastro {...navProps} token={setToken}/>}
              </Tab.Screen>

              
      
          </Tab.Navigator>
        <StatusBar style="auto" />
        </View>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
    
    
  );
}
