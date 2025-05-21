import { Button, Text, ToastAndroid, View } from "react-native";
import { styles } from "./estilos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { CheckIn } from "./CheckIn";

const CheckInModulo = (props : any) : React.ReactElement => {

    const [checkin, setCheckIn] = useState<CheckIn[]>([])

    const [idMoto, setIdMoto] = useState<string>("");
    const [violada, setNome] = useState<string>("");
    const [observacao, setObservacaoo] = useState<string>("");
    const [data, setData] = useState<string>("");


    const [token, setToken] = useState<boolean>(true);

    const gravar = () => { 
        setCheckIn( [ ...checkin, {idMoto:parseInt(idMoto), violada, observacao, data} ] )
        setToken(false);
        limpar();
    }

    const novoCheckIn = () => {
        setToken(true);
    }
    
    const limpar = () => {
        setIdMoto("");
        setNome("");
        setObservacaoo("");
        setData("");
    }

    return (

        <View style={styles.container}>

            { token ? (

                <View>
                    <TextInput value={idMoto} onChangeText={setIdMoto} keyboardType="numeric" style={styles.input} placeholder="Id Moto:"/>
                    <TextInput value={violada} onChangeText={setNome} style={styles.input} placeholder="Violada (S/N):"/>
                    <TextInput value={observacao} onChangeText={setObservacaoo} style={styles.input} placeholder="Observação:"/>
                    <TextInput value={data} onChangeText={setData}  style={styles.input} placeholder="Data: (dd/mm/yyy)"/>

                    <Button title="Finalizar CheckIn" onPress={gravar}/>
                    <Button title="Logout" onPress={props.sair} />


                </View>
            ) : (
                <View >
                    <View style={styles.itens}>
                        <Text>Id Moto: {idMoto}</Text>
                        <Text>Violada: {violada}</Text>
                        <Text>Observação: {observacao}</Text>
                        <Text>Data: {data}</Text>
                    </View>

                    <Button title="Novo CheckIn" onPress={novoCheckIn}/>
                    <Button title="Logout" onPress={props.sair} />

                </View>
            )}


        </View>

    )
}

export default CheckInModulo;