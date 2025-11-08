import { FC } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import { styles } from '../estilos/estilos';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { temas } from '../estilos/temas';
import { Feather } from '@expo/vector-icons';
import { gitInfo } from '../utils/gitInfo';
import { useTranslation } from 'react-i18next';

interface SobreAppViewProps {

}

const SobreAppView: FC<SobreAppViewProps> = () => {
    
    const { tema } = useContext(ContextoPrincipal);
    const cores = temas[tema];
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: cores.background, padding: 20}]}>
            <ScrollView>
                
                <Text style={[ styles.titulo, { color:'white', margin: 20}]}>
                    AUTOTTU
                </Text>

                <View style={[
                    { 
                        backgroundColor: cores.cardBg, 
                        borderRadius: 10, 
                        padding: 15, 
                        marginBottom: 15 
                    }
                ]}>
                    <Text style={[
                        { 
                            color: cores.text, 
                            fontSize: 16, 
                            lineHeight: 24,
                            textAlign: 'justify'
                        }
                    ]}>
                        {t('sobre.descricaoCompleta')}
                    </Text>
                </View>

                <View style={[
                    { 
                        backgroundColor: cores.cardBg, 
                        borderRadius: 10, 
                        padding: 15, 
                        marginBottom: 15 
                    }
                ]}>
                    <Text style={[
                        { 
                            color: cores.text, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                            marginBottom: 10
                        }
                    ]}>
                        <Feather name="info" size={18} color={cores.text} /> {t('sobre.informacoes')}
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{t('sobre.versao')}:</Text> 1.0.0
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{t('sobre.commit')}:</Text> {gitInfo.commitHash}
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{t('sobre.branch')}:</Text> {gitInfo.branch}
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{t('sobre.dataCommit')}:</Text> {gitInfo.lastCommitDate}
                    </Text>
                    
                    <View style={{marginBottom: 5, gap: 5}}>
                        <Text style={{ fontWeight: 'bold' , color: cores.text}}>{t('sobre.desenvolvedores')}:</Text> 
                        <Text style={{ color: cores.text, marginBottom: 5 }}> • André Luís Mesquita de Abreu- RM558159</Text>
                        <Text style={{ color: cores.text, marginBottom: 5 }}> • Maria Eduarda Brigidio - RM558575</Text>
                        <Text style={{ color: cores.text, marginBottom: 5 }}> • Rafael Bompadre Lima - RM556459</Text>
                    </View>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{t('sobre.ano')}:</Text> 2025
                    </Text>
                </View>

                <View style={[
                    { 
                        backgroundColor: cores.cardBg, 
                        borderRadius: 10, 
                        padding: 15, 
                        marginBottom: 15 
                    }
                ]}>
                    <Text style={[
                        { 
                            color: cores.text, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                            marginBottom: 10
                        }
                    ]}>
                        <Feather name="check-circle" size={18} color={cores.text} /> {t('sobre.funcionalidades')}
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade1')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade2')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade3')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade4')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade5')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade6')}
                    </Text>
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        • {t('sobre.funcionalidade7')}
                    </Text>
                </View>

                <View style={[
                    { 
                        backgroundColor: cores.cardBg, 
                        borderRadius: 10, 
                        padding: 15, 
                        marginBottom: 15 
                    }
                ]}>
                    <Text style={[
                        { 
                            color: cores.text, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                            marginBottom: 10
                        }
                    ]}>
                        <Feather name="mail" size={18} color={cores.text} /> {t('sobre.suporte')}
                    </Text>
                    
                    <Text style={{ color: cores.text, marginBottom: 5 }}>
                        {t('sobre.contatoSuporte')}
                    </Text>
                    <Text style={{ color: cores.text, fontWeight: 'bold' }}>
                        {t('sobre.emailSuporte')}
                    </Text>
                </View>


                <Text style={[
                    { 
                        color: cores.text, 
                        fontSize: 12, 
                        textAlign: 'center',
                        marginTop: 20,
                        opacity: 0.7
                    }
                ]}>
                    {t('sobre.direitosReservados')}
                </Text>
            </ScrollView>
        </View>
    );
}

export { SobreAppView };

