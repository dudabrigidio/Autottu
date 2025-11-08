import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, Image} from 'react-native';
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

const AlterarPerfilView: FC<UsuarioViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario, usuarioErro,
        salvarUsuario, handleUsuario, navigateLogin, salvarAlteracaoUsuario} = useUsuarioControl();
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const { t } = useTranslation();

    return (
        <View style={[styles.container2, { backgroundColor: cores.background2 }]}>
            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color="#0f4a26" />
                </View>
            </Modal>
            <Text style={[styles.itens, { color: cores.text }]}>{t('alterarPerfil.titulo')}</Text>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
                <Text style={{color: "red"}}>{usuarioErro.idUsuario}</Text>
                <TextInput 
                    value={usuario.idUsuario ? String(usuario.idUsuario) : ""} 
                    onChangeText={(txt:string) => handleUsuario(txt, "idUsuario")} 
                    keyboardType="numeric" 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('cadastro.idUsuario')}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.nome}</Text>
                <TextInput 
                    value={usuario.nome} 
                    onChangeText={(txt:string) => handleUsuario(txt, "nome")}  
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('alterarPerfil.nome')}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput 
                    value={usuario.email} 
                    onChangeText={(txt:string) => handleUsuario(txt, "email")}  
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('alterarPerfil.email')}
                    placeholderTextColor={cores.text}
                />
                <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
                <TextInput 
                    value={usuario.senha} 
                    onChangeText={(txt:string) => handleUsuario(txt, "senha")} 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('alterarPerfil.senha')} 
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

                <View style={styles.espaco}>
                    <Button title={t('alterarPerfil.salvar')} onPress={salvarAlteracaoUsuario}/>
                </View>
                
                <Image
                    source={require('../assets/mottu-zero.webp')}
                    style={styles.imagem}
                />
        </View>
    )
}

export { AlterarPerfilView};