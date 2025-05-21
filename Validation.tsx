import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CheckIn from "./Checkin";
import Motos from "./Motos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DbUsuario from "./db";
import Login from "./Login";
import { styles } from "./estilos";




const Validation= (props : any) : React.ReactElement => {




    const Tab = createBottomTabNavigator();



    const verificarLogin = (email: string, senha: string) => {
        DbUsuario.forEach((usuario) => {
            if (usuario.email == email && usuario.senha == senha) {
                AsyncStorage.setItem("Email", email)
                AsyncStorage.setItem("Logado", "true")
                .then(()=>{ToastAndroid.show("Usuario logado com sucesso", 
                ToastAndroid.LONG); })
            }
        })
    }

     //AsyncStorage.setItem("Usuario-Lista", strLista)
    //   .then(()=>{ToastAndroid.show("Usuario cadastrado com sucesso", 
    //     ToastAndroid.LONG); })
    //   .catch(()=>{ToastAndroid.show("Erro ao cadastrar usuário", 
    //     ToastAndroid.LONG); })



    return(
        <View style={styles.container} >
            { props.token  ? (<View>

                <Tab.Navigator>
                    <Tab.Screen name="CheckIn" component={CheckIn} />
                    <Tab.Screen name="Visualizar Motos" component={Motos} />
                </Tab.Navigator>

            </View>) : (
            <Login onGravar={verificarLogin}/>
            )}

        </View>

    )


}


export default Validation;