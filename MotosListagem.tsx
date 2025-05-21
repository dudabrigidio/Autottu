
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./estilos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Motos } from "./Motos";


const MotoItem = (props : any) : React.ReactElement => {

    return (
        <View style={styles.itens}>
            <Text>Id: {props.item.id}</Text>
            <Text>Placa: {props.item.placa}</Text>
            <Text>Modelo: {props.item.modelo}</Text>
            <Text>Marca: {props.item.marca}</Text>
            <Text>Ano: {props.item.ano}</Text>
            <Text>Status: {props.item.status}</Text>
            <Text>Url foto: {props.item.urlFoto}</Text>
        </View>
    )
}


const MotosListagem = (props : any) : React.ReactElement => {

    const [listaMotos, setListaMotos] = useState<Motos[]>([]);

    const buscarDados = async () => {
        const dados = await AsyncStorage.getItem("Motos-Lista")
        const listaMoto = dados ? JSON.parse(dados) : [];
        setListaMotos(listaMoto);
    }

    useEffect(() => {
    buscarDados();
    }, [])


    console.log(listaMotos)

    return (
        <View style={styles.container}>
            <FlatList data={listaMotos} renderItem={MotoItem}/>
            <Button title="Logout" onPress={props.sair} />
            
        </View>


    )
    
}

export default MotosListagem;