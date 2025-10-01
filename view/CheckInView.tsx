import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather, FontAwesome6, Fontisto, FontAwesome as Icon } from '@expo/vector-icons';
import { useMotosControl } from '../control/motosControl';
import { styles } from '../estilos';
import { Motos } from '../model/Motos';
import { CheckIn } from '../model/CheckIn';
import { useCheckInControl } from '../control/checkInControl';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

interface CheckInViewProps {

}



const CheckInView: FC<CheckInViewProps> = ( props ) => {
    const  {loading, mensagem, sucesso, checkIn, checkInErro, 
        checkInLista, salvarCheckIn, lerCheckIn, apagarCheckIn, atualizarCheckIn, handleCheckIn} = useCheckInControl();

    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
            <Tab.Navigator>
                <Tab.Screen name="RealizarCheckIn" 
                options={{
                    title: "Realizar CheckIn",
                    headerShown: false,
                    tabBarIcon: ({size, color})=>
                    <Feather name="check-circle" size={24} color="black" />,
                    }}> 
                    {()=> { return (
                        <View style={styles.container2}>
            
                            <StatusBar style='auto'/>

                            <Text style={{color: "red"}}>{checkInErro.idMoto}</Text>
                            <TextInput value={checkIn.idMoto  ? String(checkIn.idMoto) : ""} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "idMoto")} keyboardType="numeric" style={styles.input} placeholder="Id da Moto:"/>

                            <Text>Id do usuário que realiza o checkIn:</Text>
                            <Text style={{color: "red"}}>{checkInErro.idUsuario}</Text>
                            <TextInput value={checkIn.idUsuario  ? String(checkIn.idUsuario) : ""} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "idUsuario")} keyboardType="numeric" style={styles.input} placeholder="Id do usuário:"/>

                            <Text>Motos está violada?</Text>
                            <Text style={{color: "red"}}>{checkInErro.ativoChar}</Text>
                            <TextInput value={checkIn.ativoChar} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "ativoChar")} style={styles.input} placeholder="(S/N):"/>

                            <Text>Observação</Text>
                            <Text style={{color: "red"}}>{checkInErro.observacao}</Text>
                            <TextInput value={checkIn.observacao} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "observacao")} style={styles.input} placeholder="Observações referente ao estado da moto:"/>
                            
                            <Text>Data do CheckIn</Text>
                            <Text style={{color: "red"}}>{checkInErro.timeStamp}</Text>
                            <TextInput value={checkIn.timeStamp} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "timeStamp")} style={styles.input} placeholder="(Por favor insira no formato: aaaa-mm-dd):"/>
                            
                            <Text>Url das fotos da moto</Text>
                            <Text style={{color: "red"}}>{checkInErro.imagensUrl}</Text>
                            <TextInput value={checkIn.imagensUrl} 
                            onChangeText={(txt : string) => handleCheckIn(txt, "imagensUrl")} style={styles.input} placeholder="URL:"/>
                            
                            <Button title="Finalizar CheckIn" onPress={salvarCheckIn}/>


                        </View>
                    )}}

                </Tab.Screen>

                <Tab.Screen name="CheckInLista"
                options={{
                    headerShown:false,
                    tabBarIcon: ({size, color})=>
                        <AntDesign name="eye" size={24} color="black" />,
                }}> 
                    {()=>{return (
                        <View style={styles.container2}>
                            <Button title="Vizualizar CheckIns" onPress={lerCheckIn}/>
                            <FlatList style={{flex: 1}} data={checkInLista} renderItem={
                                ( {item} : ListRenderItemInfo<CheckIn> ) : ReactElement =>{
                                    return (
                                    <View style={{borderWidth: 1, padding: 5,margin: 10
                                    }}> 
                                        <Text>Id CheckIn: {item.idCheckin}</Text>
                                        <Text>Id Moto: {item.idMoto}</Text>
                                        <Text>Id Usuario: {item.idUsuario}</Text>
                                        <Text>Violada: {item.ativoChar}</Text>
                                        <Text>Observação: {item.observacao}</Text>
                                        <Text>Data: {item.timeStamp}</Text>
                                        <Text>URL das imagens da moto: {item.imagensUrl}</Text>
                                        <Icon name="trash" size={20} color="red"
                                            onPress={()=>apagarCheckIn( item.idCheckin )}/>
                                        <Icon name="edit" size={20} color="black"
                                            onPress={()=>atualizarCheckIn( item.idCheckin )}/>
                                    </View>)
                            }}/> 
                        </View>
                    )}}
                </Tab.Screen>

            </Tab.Navigator>
        </View>
    )

}

export {CheckInView};