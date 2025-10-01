import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem, Image} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { Usuario } from '../model/Usuario';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { styles } from '../estilos';


interface UsuarioViewProps {

}

const AlterarPerfilView: FC<UsuarioViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario, usuarioErro,
        salvarUsuario, handleUsuario, navigateLogin, salvarAlteracaoUsuario} = useUsuarioControl();
    return (
        <View style={styles.container2}>
            <Text style={styles.itens}>ALTERAR DADOS DO USUÁRIO</Text>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
                <Text style={{color: "red"}}>{usuarioErro.idUsuario ? String(usuario.idUsuario) : ""}</Text>
                <TextInput value={usuario.idUsuario} onChangeText={(txt:string) => handleUsuario(txt, "idUsuario")} keyboardType="numeric" style={styles.input} placeholder="Id do usuário:"/>
                <Text style={{color: "red"}}>{usuarioErro.nome}</Text>
                <TextInput value={usuario.nome} onChangeText={(txt:string) => handleUsuario(txt, "nome")}  style={styles.input} placeholder="Nome:"/>
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput value={usuario.email} onChangeText={(txt:string) => handleUsuario(txt, "email")}  style={styles.input} placeholder="Email:"/>
                <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
                <TextInput value={usuario.senha} onChangeText={(txt:string) => handleUsuario(txt, "senha")} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>
                <Text style={{color: "red"}}>{usuarioErro.telefone}</Text>
                <TextInput value={usuario.telefone ? String(usuario.telefone) : ""} onChangeText={(txt:string) => handleUsuario(txt, "telefone")} style={styles.input} placeholder="Telefone:"/>

                <View style={styles.espaco}>
                    <Button title='ALTERAR DADOS' onPress={salvarAlteracaoUsuario}/>
                </View>
                
                <Image
                    source={require('../assets/mottu-zero.webp')}
                    style={styles.imagem}
                />
        </View>
    )
}

export { AlterarPerfilView};