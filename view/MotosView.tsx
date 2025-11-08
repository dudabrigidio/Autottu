import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, Fontisto, FontAwesome as Icon, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMotosControl } from '../control/motosControl';
import { styles } from '../estilos/estilos';
import { Motos } from '../model/Motos';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

interface MotosViewProps {

}

const MotosView: FC<MotosViewProps> = ( props ) => {
    const  {loading, mensagem, sucesso, 
        motos, motosErro, motosLista, 
        salvarMotos, lerMotos, apagarMotos, atualizarMotos, handleMotos } = useMotosControl();
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
                <Tab.Screen name="MotosCadastro" 
                options={{
                    title: t('motos.cadastrar'),
                    headerShown: false,
                    tabBarIcon: ({size, color})=>
                    <Fontisto name="motorcycle" size={24} color="black" />,
                    }}> 
                    {()=> { return (
                        <View style={[styles.container2, { backgroundColor: cores.background2 }]}>
            
                            <StatusBar style='auto'/>

                            <Text style={{color: "red"}}>{motosErro.placa}</Text>
                            <TextInput 
                                value={motos.placa} 
                                onChangeText={(txt : string) => handleMotos(txt, "placa")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.placa')}
                                placeholderTextColor={cores.text}
                            />
                            <Text style={{color: "red"}}>{motosErro.modelo}</Text>
                            <TextInput 
                                value={motos.modelo} 
                                onChangeText={(txt : string) => handleMotos(txt, "modelo")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.modelo')}
                                placeholderTextColor={cores.text}
                            />
                            <Text style={{color: "red"}}>{motosErro.marca}</Text>
                            <TextInput 
                                value={motos.marca} 
                                onChangeText={(txt : string) => handleMotos(txt, "marca")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.marca')}
                                placeholderTextColor={cores.text}
                            />
                            <Text style={{color: "red"}}>{motosErro.ano}</Text>
                            <TextInput 
                                value={motos.ano  ? String(motos.ano) : ""} 
                                onChangeText={(txt : string) => handleMotos(txt, "ano")} 
                                keyboardType="numeric" 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.ano')}
                                placeholderTextColor={cores.text}
                            />
                            <Text style={{color: "red"}}>{motosErro.ativoChar}</Text>
                            <TextInput 
                                value={motos.ativoChar } 
                                onChangeText={(txt : string) => handleMotos(txt, "ativoChar")} 
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.ativa')}
                                placeholderTextColor={cores.text}
                            />
                            <Text style={{color: "red"}}>{motosErro.fotoUrl}</Text>
                            <TextInput 
                                value={motos.fotoUrl} 
                                onChangeText={(txt : string) => handleMotos(txt, "fotoUrl")}  
                                style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                                placeholder={t('motos.fotoUrl')}
                                placeholderTextColor={cores.text}
                            />
                        
                            <TouchableOpacity 
                                onPress={salvarMotos}
                                style={[styles.botao]}
                            >
                                <Fontisto name="motorcycle" size={20} color="white" style={{ marginRight: 10 }} />
                                <Text style={[styles.botaoTexto]}>
                                    {t('motos.cadastrar')}
                                </Text>
                            </TouchableOpacity>

                        
                        </View>
                    )}}

                </Tab.Screen>

                <Tab.Screen name="MotosLista"
                options={{
                    headerShown:false,
                    title: t('motos.visualizar'),
                    tabBarIcon: ({size, color})=>
                        <FontAwesome6 name="motorcycle" size={24} color="black" />,
                }}> 
                    {()=>{return (
                        <View style={[styles.container2, { backgroundColor: cores.background2 }]}>
                            
                            <TouchableOpacity 
                                onPress={lerMotos}
                                style={[styles.botao]}
                            >
                                <FontAwesome6 name="motorcycle" size={20} color="white" style={{ marginRight: 10 }} />
                                <Text style={[styles.botaoTexto]}>
                                    {t('motos.visualizar')}
                                </Text>
                            </TouchableOpacity>
                            <FlatList style={{flex: 1}} data={motosLista} renderItem={
                                ( {item} : ListRenderItemInfo<Motos> ) : ReactElement =>{
                                    return (
                                    <View style={[
                                        styles.card,
                                        { backgroundColor: cores.cardBg }
                                    ]}> 
                                        <Text style={{color: cores.text}}>{t('motos.idMoto')}: {item.idMoto}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.placaLabel')}: {item.placa}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.modeloLabel')}: {item.modelo}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.marcaLabel')}: {item.marca}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.anoLabel')}: {item.ano}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.statusLabel')}: {item.ativoChar}</Text>
                                        <Text style={{color: cores.text}}>{t('motos.fotoLabel')}: {item.fotoUrl}</Text>

                                        <View style={[styles.cardIcons]}>
                                        <Icon name="trash" size={20} color={cores.text}
                                            onPress={()=>apagarMotos( String(item.idMoto) )}/>

                                        <Icon name="edit" size={20} color={cores.text}
                                            onPress={()=>atualizarMotos( String(item.idMoto) )}/>
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

export {MotosView};