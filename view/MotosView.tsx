import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, Fontisto, FontAwesome as Icon } from '@expo/vector-icons';
import { useMotosControl } from '../control/motosControl';
import { styles } from '../estilos';
import { Motos } from '../model/Motos';

const Tab = createBottomTabNavigator();

interface MotosViewProps {

}

const MotosView: FC<MotosViewProps> = ( props ) => {
    const  {loading, mensagem, sucesso, 
        motos, motosErro, motosLista, 
        salvarMotos, lerMotos, apagarMotos, atualizarMotos, handleMotos } = useMotosControl();

    return(
        <View style={styles.container}>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
            <Tab.Navigator>
                <Tab.Screen name="MotosCadastro" 
                options={{
                    title: "Cadastrar moto",
                    tabBarIcon: ({size, color})=>
                    <Fontisto name="motorcycle" size={24} color="black" />,
                    }}> 
                    {()=> { return (
                        <View style={styles.container2}>
            
                            <Text style={{color: "red"}}>{motosErro.idMoto}</Text>
                            <TextInput value={motos.idMoto ? String(motos.idMoto) : ""} 
                            onChangeText={(txt : string) => handleMotos(txt, "idMoto")} keyboardType="numeric" style={styles.input} placeholder="Id da Moto:"/>
                            <Text style={{color: "red"}}>{motosErro.placa}</Text>
                            <TextInput value={motos.placa} 
                            onChangeText={(txt : string) => handleMotos(txt, "placa")} style={styles.input} placeholder="Placa:"/>
                            <Text style={{color: "red"}}>{motosErro.modelo}</Text>
                            <TextInput value={motos.modelo} 
                            onChangeText={(txt : string) => handleMotos(txt, "modelo")} style={styles.input} placeholder="Modelo:"/>
                            <Text style={{color: "red"}}>{motosErro.marca}</Text>
                            <TextInput value={motos.marca} 
                            onChangeText={(txt : string) => handleMotos(txt, "marca")} style={styles.input} placeholder="Marca:"/>
                            <Text style={{color: "red"}}>{motosErro.ano}</Text>
                            <TextInput value={motos.ano  ? String(motos.ano) : ""} 
                            onChangeText={(txt : string) => handleMotos(txt, "ano")} keyboardType="numeric" style={styles.input} placeholder="Ano:"/>
                            <Text style={{color: "red"}}>{motosErro.ativoChar}</Text>
                            <TextInput value={motos.ativoChar } 
                            onChangeText={(txt : string) => handleMotos(txt, "ativoChar")} style={styles.input} placeholder="Ativa: (s/n) "/>
                            <Text style={{color: "red"}}>{motosErro.fotoUrl}</Text>
                            <TextInput value={motos.fotoUrl} 
                            onChangeText={(txt : string) => handleMotos(txt, "fotoUrl")}  style={styles.input} placeholder="URL da foto:"/>
                        
                            <Button title="Cadastrar Moto" onPress={salvarMotos}/>

                        
                        </View>
                    )}}

                </Tab.Screen>

                <Tab.Screen name="MotosLista"
                options={{
                    headerShown:false,
                    title: "Visualizar motos",
                    tabBarIcon: ({size, color})=>
                        <FontAwesome6 name="motorcycle" size={24} color="black" />,
                }}> 
                    {()=>{return (
                        <View style={styles.container2}>
                            <Button title="Vizualizar Motos" onPress={lerMotos}/>
                            <FlatList style={{flex: 1}} data={motosLista} renderItem={
                                ( {item} : ListRenderItemInfo<Motos> ) : ReactElement =>{
                                    return (
                                    <View style={{borderWidth: 1, padding: 5,margin: 10
                                    }}> 
                                        <Text>Id Moto: {item.idMoto}</Text>
                                        <Text>Placa: {item.placa}</Text>
                                        <Text>Modelo: {item.modelo}</Text>
                                        <Text>Marca: {item.marca}</Text>
                                        <Text>Ano: {item.ano}</Text>
                                        <Text>Status: {item.ativoChar}</Text>
                                        <Text>Foto: {item.fotoUrl}</Text>
                                        <Icon name="trash" size={20} color="red"
                                            onPress={()=>apagarMotos( item.idMoto )}/>
                                        <Icon name="edit" size={20} color="blue"
                                            onPress={()=>atualizarMotos( item.idMoto )}/>
                                    </View>)
                            }}/> 
                        </View>
                    )}}
                </Tab.Screen>

            </Tab.Navigator>
        </View>
    )

}

export {MotosView};