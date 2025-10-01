'use client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

    const {token, emailProfile, setProfile, loading} = useAppControl();

    if (loading) { 
      return
    }
      
    return (
      <ContextoPrincipal.Provider value={{
        token: token??undefined, emailProfile, setProfile
      }}>
        <NavigationContainer>
          <View style={styles.container}>
          <StatusBar style='auto'/>
          {token ? (
            //Usuario Logado
            <Tab.Navigator initialRouteName="CheckIn">
                <Tab.Screen name="Perfil" component={CadastroUsuarioView}/>
                <Tab.Screen name="CheckIn" component={CadastroUsuarioView}/>
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