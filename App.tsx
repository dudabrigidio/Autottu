'use client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { CadastroUsuarioView } from './view/CadastroUsuarioView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';
import { useAppControl } from './control/appControl';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './estilos/estilos';
import { AntDesign, Feather, FontAwesome6, Fontisto} from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MotosView } from './view/MotosView';
import { CheckInView } from './view/CheckInView';
import { PerfilView } from './view/PerfilView';
import { temas } from './estilos/temas';
import { SobreAppView } from './view/SobreAppView';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import "./i18n/config";
import { useTranslation } from 'react-i18next';
import { enviarNotificacaoPushParaDispositivo, verificarMotosAntigas } from './service/notificacaoService';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

    const {token, emailProfile, setProfile, loading, tokenTela, clearProfile, defineTema, tema} = useAppControl();
    const { t } = useTranslation();
    const cores = temas[tema];

    useEffect(() => {
      async function configurarNotificacoes() {
          verificarMotosAntigas(7);
      }
      
      const timer = setTimeout(() => {
          configurarNotificacoes();
      }, 1000);
      
      return () => clearTimeout(timer);
  }, []);


  
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('Notificação recebida:', notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      notification => {
        ToastAndroid.show("Notificação clicada", ToastAndroid.LONG);
        console.log("Notificação clicada ==> ", notification);
        
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);





  
    if (loading) { 
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#0f4a26" />
          <Text style={{ marginTop: 10, fontSize: 16 }}>{t('login.carregando')}</Text>
        </View>
      );
    }
      
    return (
      <ContextoPrincipal.Provider value={{
        token: token??undefined, emailProfile, setProfile, clearProfile, tema, defineTema
      }}>
        <NavigationContainer>
          <View style={[styles.container, { backgroundColor: cores.background, flex: 1 }]}>
            <StatusBar style='auto'/>
            
            <TouchableOpacity 
              onPress={defineTema}
              style={[styles.tema, , {backgroundColor: cores.background}]}
            >
              <Text style={{ fontSize: 24 }}>{tema === 'light' ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>

            {tokenTela ? (
              //Usuario Logado
              <Tab.Navigator initialRouteName="CheckIn" >
                  <Tab.Screen 
                    name="Usuarios" 
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="user" size={24} color="black" />
                    }} 
                    component={PerfilView}
                  />
                  <Tab.Screen 
                    name="CheckIn" 
                    options={{
                      tabBarIcon: ({size, color}) => 
                        <Feather name="check-circle" size={24} color="black" />
                    }}
                    component={CheckInView}
                  />
                  <Tab.Screen 
                    name="Motos" 
                    options={{
                      tabBarIcon: ({size, color}) => 
                        <FontAwesome6 name="motorcycle" size={24} color="black" />
                    }}
                    component={MotosView}
                  />
                  <Tab.Screen 
                    name="SobreApp" 
                    component={SobreAppView}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="info" size={24} color="black" />
                    }}
                  />
              </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginView}/>
                  <Stack.Screen name="UsuarioCadastro" component={CadastroUsuarioView}/>
                  <Stack.Screen name="SobreApp" component={SobreAppView}/>

              </Stack.Navigator>
            )}


          </View>
        </NavigationContainer>
      </ContextoPrincipal.Provider>
    );
}