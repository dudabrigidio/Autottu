import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, TouchableOpacity, ScrollView} from 'react-native';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather, FontAwesome6, Fontisto, FontAwesome as Icon } from '@expo/vector-icons';
import { useMotosControl } from '../control/motosControl';
import { styles } from '../estilos/estilos';
import { Motos } from '../model/Motos';
import { CheckIn } from '../model/CheckIn';
import { useCheckInControl } from '../control/checkInControl';
import { StatusBar } from 'expo-status-bar';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

interface CheckInViewProps {

}

const CheckInView: FC<CheckInViewProps> = ( props ) => {
    const  {loading, mensagem, sucesso, checkIn, checkInErro, 
        checkInLista, salvarCheckIn, lerCheckIn, apagarCheckIn, atualizarCheckIn, handleCheckIn} = useCheckInControl();
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const { t } = useTranslation();

    return(
        <View style={[styles.container, { backgroundColor: cores.background }]}>
            <StatusBar style='auto'/>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color="#0f4a26" />
                </View>
            </Modal>

            <Tab.Navigator>
                <Tab.Screen name="RealizarCheckIn" 
                options={{
                    title: t('checkin.realizar'),
                    headerShown: false,
                    tabBarIcon: ({size, color})=>
                    <Feather name="check-circle" size={24} color="black" />,
                    }}> 
                    {()=> { return (
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={[styles.container2, { backgroundColor: cores.background2 }]}>
            
    
                            <Text style={{color: cores.text}}>{t('checkin.idMoto')}:</Text>

                            <Text style={{color: "red"}}>{checkInErro.idMoto}</Text>
                            <TextInput 
                                value={checkIn.idMoto  ? String(checkIn.idMoto) : ""} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "idMoto")} 
                                keyboardType="numeric" 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('checkin.idMoto')}
                                placeholderTextColor={cores.text}
                            />

                            <Text style={{color: cores.text}}>{t('checkin.idUsuario')}:</Text>
                            <Text style={{color: "red"}}>{checkInErro.idUsuario}</Text>
                            <TextInput 
                                value={checkIn.idUsuario  ? String(checkIn.idUsuario) : ""} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "idUsuario")} 
                                keyboardType="numeric" 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('checkin.idUsuario')}
                                placeholderTextColor={cores.text}
                            />

                            <Text style={{color: cores.text}}>{t('checkin.violada')}</Text>
                            <Text style={{color: "red"}}>{checkInErro.ativoChar}</Text>
                            <TextInput 
                                value={checkIn.ativoChar} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "ativoChar")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder="(S/N):"
                                placeholderTextColor={cores.text}
                            />

                            <Text style={{color: cores.text}}>{t('checkin.observacao')}</Text>
                            <Text style={{color: "red"}}>{checkInErro.observacao}</Text>
                            <TextInput 
                                value={checkIn.observacao} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "observacao")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('checkin.observacao')}
                                placeholderTextColor={cores.text}
                            />
                            
                            <Text style={{color: cores.text}}>{t('checkin.data')}</Text>
                            <Text style={{color: "red"}}>{checkInErro.timeStamp}</Text>
                            <TextInput 
                                value={checkIn.timeStamp} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "timeStamp")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('checkin.formatoData')}
                                placeholderTextColor={cores.text}
                            />
                            
                            <Text style={{color: cores.text}}>{t('checkin.imagensUrl')}</Text>
                            <Text style={{color: "red"}}>{checkInErro.imagensUrl}</Text>
                            <TextInput 
                                value={checkIn.imagensUrl} 
                                onChangeText={(txt : string) => handleCheckIn(txt, "imagensUrl")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('checkin.imagensUrl')}
                                placeholderTextColor={cores.text}
                            />
                            
                            <TouchableOpacity 
                                onPress={salvarCheckIn}
                                style={[styles.botao]}
                            >
                                <Feather name="check-circle" size={20} color="white" style={{ marginRight: 10 }} />
                                <Text style={[styles.botaoTexto]}>
                                    {t('checkin.finalizar')}
                                </Text>
                            </TouchableOpacity>


                        </View>
                        </ScrollView>
                    )}}

                </Tab.Screen>

                <Tab.Screen name="CheckInLista"
                options={{
                    headerShown:false,
                    tabBarIcon: ({size, color})=>
                        <AntDesign name="eye" size={24} color="black" />,
                }}> 
                    {()=>{return (
                        <View style={[styles.container2, { backgroundColor: cores.background2 }]}>

                            <TouchableOpacity 
                                onPress={lerCheckIn}
                                style={[styles.botao]}
                            >
                                <AntDesign name="eye" size={20} color="white" style={{ marginRight: 10 }} />
                                <Text style={[styles.botaoTexto]}>
                                    {t('checkin.visualizar')}
                                </Text>
                            </TouchableOpacity>
                            <FlatList style={{flex: 1}} data={checkInLista} renderItem={
                                ( {item} : ListRenderItemInfo<CheckIn> ) : ReactElement =>{
                                    return (
                                    <View style={[styles.card,
                                        { backgroundColor: cores.cardBg }
                                    ]}> 
                                        <Text style={{color: cores.text}}>{t('checkin.idCheckin')}: {item.idCheckin}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.idMotoLabel')}: {item.idMoto}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.idUsuarioLabel')}: {item.idUsuario}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.violadaLabel')}: {item.ativoChar}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.observacaoLabel')}: {item.observacao}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.dataLabel')}: {item.timeStamp}</Text>
                                        <Text style={{color: cores.text}}>{t('checkin.imagensLabel')}: {item.imagensUrl}</Text>
                                        
                                        <View style={styles.cardIcons}>
                                            <Icon name="trash" size={20} color={cores.text}
                                            onPress={()=>apagarCheckIn( String(item.idCheckin) )}/>
                                            <Icon name="edit" size={20} color={cores.text}
                                                onPress={()=>atualizarCheckIn( String(item.idCheckin) )}/>
                                        </View>
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