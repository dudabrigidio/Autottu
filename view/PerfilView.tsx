import { FC, ReactElement, useState } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, ScrollView, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { useUsuarioControl } from '../control/usuarioControl';
import { styles } from '../estilos/estilos';
import { Usuario } from '../model/Usuario';
import { Feather, FontAwesome6, Fontisto, FontAwesome as Icon } from '@expo/vector-icons';
import { usePerfilControl } from '../control/perfilControl';
import { AlterarPerfilView } from './AlterarPerfil';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { useTranslation } from 'react-i18next';



interface PerfilViewProps {

}

const PerfilView: FC<PerfilViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario,  usuarioLista,
        lerUsuario, apagarUsuario, atualizarUsuario } = useUsuarioControl();
    const {logout} = usePerfilControl();
    const [modal, setModal] = useState<boolean>(false);
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: cores.background }]}>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color="#4aab6f" />
                    <Text>{t('perfil.carregando')}</Text>
                </View>
            </Modal>
            
            <View style={{
                backgroundColor: 'white',
                padding: 15,
                paddingTop: 70,
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            }}>
                <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{t('perfil.funcionarios')}</Text>
            </View>

            
            <TouchableOpacity 
                onPress={lerUsuario}
                style={[styles.botao]}
            >
                <Feather name="users" size={20} color="white" style={{ marginRight: 10 }} />
                <Text style={[styles.botaoTexto]}>
                    {t('perfil.visualizarUsuarios')}
                </Text>
            </TouchableOpacity>

            
            <FlatList style={{flex: 1}} data={usuarioLista} renderItem={
                ( {item} : ListRenderItemInfo<Usuario> ) : ReactElement =>{
                    return (
                    <View style={ [styles.card,
                        { backgroundColor: cores.cardBg }
                    ]}> 
                        <Text style={[{color: cores.text}]}>{t('perfil.idUsuario')}: {item.idUsuario}</Text>
                        <Text style={{color: cores.text}}>{t('perfil.nome')}: {item.nome}</Text>
                        <Text style={{color: cores.text}}>{t('perfil.email')}: {item.email}</Text>
                        <Text style={{color: cores.text}}>{t('perfil.telefone')}: {item.telefone}</Text>
                        
                        <View style={[styles.cardIcons]}>
                            <Icon name="trash" size={20} color={cores.text}
                                onPress={()=>apagarUsuario( String(item.idUsuario) )}/>

                            <Icon name="edit" size={20} color={cores.text}
                                onPress={()=> {
                                    atualizarUsuario(String(item.idUsuario)); 
                                    setUsuarioEditando(item);
                                    setModal(true);
                                    
                                }}/>
                        </View>
                        
                    </View>)
            }}/> 

            <Modal visible={modal} animationType={'fade'}>
            <View style={[styles.container2, { backgroundColor: cores.background2 }]}>
                <AlterarPerfilView/>
                <Button title={t('perfil.fechar')} onPress={() => {
                    setModal(false);
                    setUsuarioEditando(null);
                }}/>
            </View>
            </Modal>

            {/* Logout embaixo com fundo branco */}
            <View style={{
                backgroundColor: 'white',
                padding: 15,
                borderTopWidth: 1,
                borderTopColor: '#e0e0e0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            }}>
                <Button title={t('perfil.logout')} onPress={logout}/>
            </View>

        </View>
    )
}

export { PerfilView};