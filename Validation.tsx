import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CheckIn from "./Checkin";
import Motos from "./Motos";


const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

export default function Validation() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [token, setToken] = useState<string>("");


    const Tab = createBottomTabNavigator();

    return(
        <View>
            { token  ? (<View>

                <Text>Você está logado!</Text>
                <Tab.Navigator>
                    <Tab.Screen name="CheckIn" component={CheckIn} />
                    <Tab.Screen name="Visualizar Motos" component={Motos} />
                </Tab.Navigator>

            </View>) : (
             <View>
             <Text>Login</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder="Email:"/>
                <TextInput value={senha} onChangeText={setSenha} placeholder="Senha:" secureTextEntry={true}/>
            </View>
            )}

        </View>

    )
}