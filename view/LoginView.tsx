import {View, Text, TextInput, Button, Modal, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { useLoginControl } from '../control/loginControl';
import { styles } from '../estilos/estilos';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface LoginProps { 

}

const LoginView : React.FC<LoginProps> = () => {
    const {usuario, usuarioErro, handleLogin, login, sucesso, mensagem, loading, navigateCadastro, navigateSobreApp} = useLoginControl();
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const { t } = useTranslation();
    
    return (
        <View style={[styles.container, { backgroundColor: cores.background , paddingTop: 40}]}>

            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size="large" color="#0f4a26" />
                    <Text >{t('login.carregando')}</Text>
                </View>
            </Modal>
            
            <View style={{flex: 1}}>
                {mensagem && (
                    <Text style={{
                        color: sucesso ? "green" : "red", 
                        fontSize: 18, 
                        margin: 10,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {mensagem}
                    </Text>
                )}
                
                <TextInput 
                    value={usuario.email} 
                    onChangeText={(txt)=>handleLogin(txt, "email")} 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('login.email')}
                    placeholderTextColor={cores.text}
                />
                <TextInput 
                    value={usuario.senha} 
                    onChangeText={(txt)=>handleLogin(txt, "senha")} 
                    style={[styles.input, { backgroundColor: cores.inputBg, color: cores.text }]} 
                    placeholder={t('login.senha')} 
                    secureTextEntry={true}
                    placeholderTextColor={cores.text}
                />
                
                <TouchableOpacity 
                    onPress={login}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>{t('login.entrar')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={navigateCadastro}
                    style={[styles.botao]}
                >
                    <Text style={[styles.botaoTexto]}>{t('login.cadastrar')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={navigateSobreApp}
                    style={[styles.botao, {backgroundColor: '#373d3a', marginTop: 10 }]}
                >
                    <Feather name="info" size={20} color="white" style={{ marginRight: 10 }} />
                    <Text style={[styles.botaoTexto]}>{t('sobre.titulo')}</Text>
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

export {LoginView};