'use client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { CadastroUsuarioView } from './view/CadastroUsuarioView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';
import { useAppControl } from './control/appControl';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './estilos';
import { AntDesign, Feather, FontAwesome6, Fontisto} from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MotosView } from './view/MotosView';
import { CheckInView } from './view/CheckInView';
import { PerfilView } from './view/PerfilView';
import { useEffect } from 'react';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

    const {token, emailProfile, setProfile, loading, tokenTela, clearProfile} = useAppControl();

    if (loading) { 
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#0f4a26" />
          <Text style={{ marginTop: 10, fontSize: 16 }}>Recarregando...</Text>
        </View>
      );
    }
      
    return (
      <ContextoPrincipal.Provider value={{
        token: token??undefined, emailProfile, setProfile, clearProfile 
      }}>
        <NavigationContainer>
          <View style={styles.container}>
          <StatusBar style='auto'/>
          {tokenTela ? (
            //Usuario Logado
            <Tab.Navigator initialRouteName="CheckIn">
                <Tab.Screen name="UsuariosCadastrados" options= {{headerShown: false}} component={PerfilView}/>
                <Tab.Screen name="CheckIn" component={CheckInView}/>
                <Tab.Screen name="Motos" component={MotosView}/>
            </Tab.Navigator>
          ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginView}/>
                <Stack.Screen name="UsuarioCadastro" component={CadastroUsuarioView}/>
            </Stack.Navigator>
          )}

          </View>
        </NavigationContainer>
      </ContextoPrincipal.Provider>
    );
}