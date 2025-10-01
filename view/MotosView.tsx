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
                <Tab.Screen name="Cadastro de Motos" 
                options={{
                    title: "Cadastrar moto",
                    tabBarIcon: ({size, color})=>
                    <Fontisto name="motorcycle" size={24} color="black" />,
                    }}> 
                    {()=> { return (
                        <View style={{flex:1}}>
            
                            <Text style={{color: "red"}}>{motosErro.motoId}</Text>
                            <TextInput value={motos.motoId} 
                            onChangeText={(txt : string) => handleMotos(txt, "motoId")} keyboardType="numeric" style={styles.input} placeholder="Id da Moto:"/>
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
                            <TextInput value={motos.ano} 
                            onChangeText={(txt : string) => handleMotos(txt, "ano")} keyboardType="numeric" style={styles.input} placeholder="Ano:"/>
                            <Text style={{color: "red"}}>{motosErro.status}</Text>
                            <TextInput value={motos.status} 
                            onChangeText={(txt : string) => handleMotos(txt, "status")} style={styles.input} placeholder="Status:"/>
                            <Text style={{color: "red"}}>{motosErro.foto}</Text>
                            <TextInput value={motos.foto} 
                            onChangeText={(txt : string) => handleMotos(txt, "foto")}  style={styles.input} placeholder="URL da foto:"/>
                        </View>
                    )}}

                </Tab.Screen>

                <Tab.Screen name="Motos"
                options={{
                    title: "Visualizar motos",
                    tabBarIcon: ({size, color})=>
                        <FontAwesome6 name="motorcycle" size={24} color="black" />,
                }}> 
                    {()=>{return (
                        <View style={{flex: 1}}>
                            <Button title="Vizualizar Motos" onPress={lerMotos}/>
                            <FlatList style={{flex: 1}} data={motosLista} renderItem={
                                ( {item} : ListRenderItemInfo<Motos> ) : ReactElement =>{
                                    return (
                                    <View style={{borderWidth: 1, padding: 5,margin: 10
                                    }}> 
                                        <Text>Id Moto: {item.motoId}</Text>
                                        <Text>Placa: {item.placa}</Text>
                                        <Text>Modelo: {item.modelo}</Text>
                                        <Text>Marca: {item.marca}</Text>
                                        <Text>Ano: {item.ano}</Text>
                                        <Text>Status: {item.status}</Text>
                                        <Text>Foto: {item.foto}</Text>
                                        <Icon name="trash" size={20} color="red"
                                            onPress={()=>apagarMotos( item.motosId )}/>
                                        <Icon name="edit" size={20} color="blue"
                                            onPress={()=>atualizarMotos( item.motosId )}/>
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