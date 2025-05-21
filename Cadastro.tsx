import { useState } from "react";
import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./estilos";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cadastro = (props : any) : React.ReactElement =>{

    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("")


    const gravar = async () => {
    
        const dados = await AsyncStorage.getItem("Usuario-Lista")
        const listaAntiga = dados ? JSON.parse(dados) : [];
        
        const usuario = { id:parseInt(id), nome, email, senha, telefone};
        const listaNova = [ ...listaAntiga, usuario];
        const strLista = JSON.stringify(listaNova);


        AsyncStorage.setItem("Usuario-Lista", strLista)
        .then(()=>{
            props.token(true);
            ToastAndroid.show("Usuario cadastrado com sucesso", 
            ToastAndroid.LONG); 
        })
        
        .catch(()=>{ToastAndroid.show("Erro ao cadastrar usuário", 
            ToastAndroid.LONG); })
        console.log(listaNova);    
        return listaNova;
    } 


    return (
        <View style={styles.container}>
                <TextInput value={id} onChangeText={setId} keyboardType="numeric" style={styles.input} placeholder="Id:"/>
                <TextInput value={nome} onChangeText={setNome} style={styles.input} placeholder="Nome:"/>
                <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email:"/>
                <TextInput value={senha} onChangeText={setSenha} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>
                <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} placeholder="Telefone:"/>

                <Button title="Cadastrar" onPress={gravar}/>
                

        </View>

    )
}




export default Cadastro;