import { useEffect, useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useAppControl = () => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [emailProfile, setEmailProfile] = useState<string| null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {setItem, getItem} = useAsyncStorage("PERFIL");

    const setProfile = (tokenValue: string | null , emailValue : string| null) => {
        setToken(tokenValue);
        setEmailProfile(emailValue);

        setItem( JSON.stringify({tokenValue, emailValue}))
    }
    

    useEffect(
        () => {
            console.log("useEffect app executado")
            getItem()
            .then((dados: string | null)=> {
                if (dados !=null) {
                    const obj = JSON.parse(dados);
                    setProfile(obj.tokenValue, obj.emailValue);
                    console.log("AppControl definido");
                    console.log(`email: ${obj.emailValue} profile definido`);
                }
            })
            .catch(()=>{
                console.log("Erro ao carregar dados do AsyncStorage")
            })
            .finally(()=>{
                setLoading(false);
            })
        }
    )

    return { token, emailProfile, setProfile, loading}

}

export {useAppControl};