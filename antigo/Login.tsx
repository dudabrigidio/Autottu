import { useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../estilos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../model/Usuario";

const Login = (props : any) : React.ReactElement => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");


    const verificarLogin = async () => {
        const dados = await AsyncStorage.getItem("Usuario-Lista")
        if (dados !== null) {
            const usuarios : Usuario[] = JSON.parse(dados);
            usuarios.forEach((usuario) => {
                if (usuario.email === email && usuario.senha === senha) {
                AsyncStorage.setItem("Logado", "true")
                .then(()=>{
                    props.token(true);
                    ToastAndroid.show("Usuario logado com sucesso", 
                ToastAndroid.LONG); })
                console.log("true");
            }
            console.log(email, senha)
            })
            }      
        }


    return (
        <View style={styles.container}>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email:"/>
            <TextInput value={senha} onChangeText={setSenha} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>
            <Button title="Logar" onPress={verificarLogin}/>
        
        </View>

    )
    
}

export default Login;