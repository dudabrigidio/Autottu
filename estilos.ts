import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#469846ff',
        alignItems: 'stretch', 
        alignContent:'space-evenly',
        margin: 5
    },
    container2: {
        flex: 1,
        backgroundColor: '#51ab51ff',
        padding: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        
    },
    itens: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        margin: 10,
        fontWeight: 'bold',
    },
    imagem: {
        width:200,
        height:200,
        alignItems:'center'
    },
    espaco: {
        flex: 1,
        justifyContent:'flex-start',
        gap: 7,
        padding: 5,
    }
});

export { styles };