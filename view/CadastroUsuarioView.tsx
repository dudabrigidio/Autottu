import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, Image, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { useUsuarioControl } from '../control/usuarioControl';
import { Usuario } from '../model/Usuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { styles } from '../estilos/estilos';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { useTranslation } from 'react-i18next';


interface UsuarioViewProps {

}

const CadastroUsuarioView: FC<UsuarioViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario, usuarioErro,
        salvarUsuario, handleUsuario, navigateLogin} = useUsuarioControl();
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const { t } = useTranslation();
    
    return (
        <View style={[styles.container, { backgroundColor: cores.background, justifyContent: 'space-between' }]}>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color="#0f4a26" />
                    <Text>{t('cadastro.carregando')}</Text>
                </View>
            </Modal>

            <View style={{flex: 1}}>
                <Text style={{color: "red"}}>{usuarioErro.nome}</Text>
                <TextInput 
                    value={usuario.nome} 
                    onChangeText={(txt:string) => handleUsuario(txt, "nome")}  
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('cadastro.nome')}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput 
                    value={usuario.email} 
                    onChangeText={(txt:string) => handleUsuario(txt, "email")}  
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('cadastro.email')}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
                <TextInput 
                    value={usuario.senha} 
                    onChangeText={(txt:string) => handleUsuario(txt, "senha")} 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('cadastro.senha')} 
                    secureTextEntry={true}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.telefone}</Text>
                <TextInput 
                    value={usuario.telefone ? String(usuario.telefone) : ""} 
                    onChangeText={(txt:string) => handleUsuario(txt, "telefone")} 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('cadastro.telefone')}
                    placeholderTextColor={cores.text}
                />

                <TouchableOpacity 
                    onPress={salvarUsuario}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>{t('cadastro.salvar')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={navigateLogin}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>{t('cadastro.jaTenhoCadastro')}</Text>
                </TouchableOpacity>
                
            </View>

            <View style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}>
                <Image
                    source={require('../assets/mottu-zero.webp')}
                    style={styles.imagem}
                />
            </View>
        </View>
    )
}

export { CadastroUsuarioView};