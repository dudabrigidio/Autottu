import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#469846ff',
        alignItems: 'stretch', 
        alignContent:'space-between'
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
        backgroundColor: '#51ab51ff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        margin: 10,
        fontWeight: 'bold',
    },
    imagem: {
        width:200,
        height:200,
    },
    espaco: {
        flex: 1,
        justifyContent:'flex-start',
        gap: 7,
        padding: 5,
    },
    tema: {
        position: 'absolute',
        top: 45,
        right: 20,
        zIndex: 1000,
        padding: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    },
    botao: {
        backgroundColor: '#376147',
        padding: 15,
        margin: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    botaoTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        borderWidth: 1, 
        padding: 20, 
        margin: 10, 
        gap: 10
    }, 
    cardIcons: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        gap: 20
    },
    cardText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    }, 
    texto: {
        fontSize: 16,
        textAlign: 'justify'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }


});

export { styles };