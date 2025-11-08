import { useEffect, useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useAppControl = () => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [tokenTela, setTokenTela]= useState<boolean>(false);
    const [emailProfile, setEmailProfile] = useState<string| null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [tema, setTema] = useState<'light' | 'dark'>('light');
    const {setItem, getItem, removeItem} = useAsyncStorage("PERFIL");

    const setProfile = (tokenValue: string | null , emailValue : string| null) => {
        setToken(tokenValue);
        setEmailProfile(emailValue);

        setItem( JSON.stringify({tokenValue, emailValue}))
    }
    

    useEffect(
        () => {
            getItem()
            .then((dados: string | null)=> {
                if (dados != null) {
                    const obj = JSON.parse(dados);
                    setProfile(obj.tokenValue, obj.emailValue);
                    setTokenTela(true);
                    console.log(`email: ${obj.emailValue} profile definido`);
                } else {
                    setTokenTela(false);
                    console.log("Nenhum perfil encontrado no AsyncStorage");
                }
            })
            .catch(()=>{
                console.log("Erro ao carregar dados do AsyncStorage");
                setTokenTela(false);
            })
            .finally(()=>{
                setLoading(false);
            })
        }, 
    )

    const clearProfile = () => {
        setToken(null);
        setEmailProfile(null);
        setTokenTela(false);
        removeItem();
    }

    const defineTema = () => {
        setTema(tema === 'light' ? 'dark' : 'light');
    }

    return { token, emailProfile, setProfile, loading, tokenTela, setTokenTela, clearProfile, tema, defineTema}

}

export {useAppControl};