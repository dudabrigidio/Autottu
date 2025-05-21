import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./estilos";

const CadastroMoto = (props : any) : React.ReactElement =>{

    const [id, setId] = useState<string>("");
    const [placa, setPlaca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [urlFoto, setUrlFotos] = useState<string>("");


    const gravar = async () => {
    
        const dados = await AsyncStorage.getItem("Motos-Lista")
        const listaAntiga = dados ? JSON.parse(dados) : [];
        
        const moto = { id:parseInt(id), placa, modelo, marca, ano, status, urlFoto};
        const listaNova = [ ...listaAntiga, moto];
        const strLista = JSON.stringify(listaNova);

        AsyncStorage.setItem("Motos-Lista", strLista)
        .then(()=>{
            ToastAndroid.show("Moto cadastrada com sucesso", 
            ToastAndroid.LONG); 
            
        })
        
        .catch(()=>{ToastAndroid.show("Erro ao cadastrar moto", 
            ToastAndroid.LONG); })
        console.log(listaNova);    
        return listaNova;
    } 

    

    return (
        <View style={styles.container}>
                <TextInput value={id} onChangeText={setId} keyboardType="numeric" style={styles.input} placeholder="Id:"/>
                <TextInput value={placa} onChangeText={setPlaca} style={styles.input} placeholder="Placa:"/>
                <TextInput value={modelo} onChangeText={setModelo} style={styles.input} placeholder="Modelo:"/>
                <TextInput value={marca} onChangeText={setMarca} style={styles.input} placeholder="Marca:"/>
                <TextInput value={ano} onChangeText={setAno} style={styles.input} placeholder="Ano:"/>
                <TextInput value={status} onChangeText={setStatus} style={styles.input} placeholder="Status (ok/violada):"/>
                <TextInput value={urlFoto} onChangeText={setUrlFotos} style={styles.input} placeholder="Url Fotos:"/>

                <Button title="Cadastrar" onPress={gravar} />
                
                <Button title="Logout" onPress={props.sair} />

        </View>

    )
}




export default CadastroMoto;