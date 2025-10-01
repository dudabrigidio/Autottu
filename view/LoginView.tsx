import {View, Text, TextInput, Button, Modal, ActivityIndicator} from 'react-native';
import { useLoginControl } from '../control/loginControl';
import { styles } from '../estilos';

interface LoginProps { 

}

const LoginView : React.FC<LoginProps> = () => {
    const {usuario, usuarioErro, handleLogin, login, sucesso, mensagem, loading, navigateCadastro} = useLoginControl();
    return (
        <View style={styles.container}>
            <Modal visible={loading} transparent={false}>
                <ActivityIndicator/>
            </Modal>
            <TextInput value={usuario.email} onChangeText={(txt)=>handleLogin(txt, "email")} style={styles.input} placeholder="Email:"/>
            <TextInput value={usuario.senha} onChangeText={(txt)=>handleLogin(txt, "senha")} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>
            <Button title="Logar" onPress={login}/>
            <Button title='Realizar cadastro' onPress={navigateCadastro}/>
            
        
        </View>
    )
}

export {LoginView};