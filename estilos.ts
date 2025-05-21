import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7ec47e',
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
    }
});

export { styles };