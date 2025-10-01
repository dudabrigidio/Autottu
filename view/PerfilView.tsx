import { FC, ReactElement, useState } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { styles } from '../estilos';
import { Usuario } from '../model/Usuario';
import { Feather, FontAwesome6, Fontisto, FontAwesome as Icon } from '@expo/vector-icons';
import { usePerfilControl } from '../control/perfilControl';
import { AlterarPerfilView } from './AlterarPerfil';



interface PerfilViewProps {

}

const PerfilView: FC<PerfilViewProps> = ( props) => {
    const {loading, mensagem, sucesso, 
        usuario,  usuarioLista,
        lerUsuario, apagarUsuario, atualizarUsuario } = useUsuarioControl();
    const {logout} = usePerfilControl();
    const [modal, setModal] = useState<boolean>(false);

    return (
        <View style={styles.container2}>
            <Text style={styles.itens}>FUNCIONÁRIOS AUTOTTU</Text>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 18}}>{mensagem}</Text>
            <Button title="Clique para Vizualizar Usuários Cadastrados" onPress={lerUsuario}/>

            <FlatList style={{flex: 1}} data={usuarioLista} renderItem={
                ( {item} : ListRenderItemInfo<Usuario> ) : ReactElement =>{
                    return (
                    <View style={{borderWidth: 1, padding: 5,margin: 10
                    }}> 
                        <Text>Id Usuario: {item.idUsuario}</Text>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Telefone: {item.telefone}</Text>
                        
                        <Icon name="trash" size={20} color="red"
                            onPress={()=>apagarUsuario( item.idUsuario )}/>

                        
                            {modal ? (
                            <Modal visible={modal} animationType={'fade'} style={{flex:1, margin:50}}>
                            <AlterarPerfilView/>
                            <Button title="Fechar" onPress={() => setModal(false)}/>
                            </Modal>
                        ) : (
                                <Icon name="edit" size={20} color="black"
                            onPress={()=> {
                                atualizarUsuario(item.idUsuario); 
                                setModal(true);}}/>
                            )} 
                        
                    </View>)
            }}/> 


            <Button title="Logout" onPress={logout}/>

        </View>
    )
}

export { PerfilView};