# 🚀 Guia Completo - Entrega Final AutoTTU

Este guia detalha passo a passo como implementar todos os requisitos da entrega final.

---

## 📋 ÍNDICE

- [🎯 PASSO A PASSO - ONDE COMEÇAR](#-passo-a-passo---onde-começar) → Ver [PASSO_A_PASSO.md](./PASSO_A_PASSO.md) para guia detalhado

1. [Implementação Funcional de Todas as Telas](#1-implementação-funcional-de-todas-as-telas)
2. [Publicação do App](#2-publicação-do-app)
3. [Notificação via Push](#3-notificação-via-push)
4. [Integração com API](#4-integração-com-api)
5. [Localização e Internacionalização](#5-localização-e-internacionalização)
6. [Estilização com Tema](#6-estilização-com-tema)
7. [Arquitetura de Código](#7-arquitetura-de-código)
8. [Documentação e Apresentação](#8-documentação-e-apresentação)

---

## 📊 RESUMO DO STATUS ATUAL

### ✅ **IMPLEMENTADO E COMPLETO:**
- ✅ **Telas Funcionais:** LoginView, CadastroUsuarioView, CheckInView, MotosView, PerfilView, AlterarPerfil, SobreAppView (7/7) - **TODAS IMPLEMENTADAS**
- ✅ **CRUDs Completos:** Motos e CheckIn com todas as operações (CREATE, READ, UPDATE, DELETE)
- ✅ **Validações:** Formulários com validação e mensagens de erro
- ✅ **Feedback Visual:** Indicadores de carregamento, mensagens de sucesso/erro
- ✅ **Tela SobreAppView:** Implementada com informações do app, versão, hash do commit e desenvolvedores
- ✅ **Tema Básico:** Modo claro e escuro funcionando (implementado via `appControl.ts` e `contextoPrincipal.ts`)
- ✅ **Navegação:** Tab Navigator e Stack Navigator implementados
- ✅ **Tratamento de Erros:** Try/catch nos fetchers

### ⚠️ **PARCIALMENTE IMPLEMENTADO:**
- ⚠️ **Sistema de Tema:** Funciona (light/dark) mas falta modo automático e TemaContext completo (opcional)
- ⚠️ **app.json:** Configurado parcialmente, falta `package` Android e configurações de notificações

### ❌ **FALTA IMPLEMENTAR:**
- ❌ **Notificações Push:** Não implementado (dependências, service, listeners)
- ❌ **Internacionalização (i18n):** Não implementado (dependências, traduções, seletor)
- ❌ **Publicação:** Build e publicação no Firebase App Distribution
- ❌ **ESLint/Prettier:** Configuração de linting (opcional)

### 📝 **PRÓXIMOS PASSOS PRIORITÁRIOS:**
1. ✅ ~~Implementar Tela "Sobre o App"~~ - **CONCLUÍDO**
2. Implementar Notificações Push (crítico)
3. Implementar Internacionalização i18n (crítico)
4. Configurar app.json para publicação (adicionar package Android)
5. Publicar no Firebase App Distribution
6. Completar sistema de tema com modo automático (opcional)

---

## 🎯 PASSO A PASSO - ONDE COMEÇAR

> 📄 **Para um guia passo a passo detalhado e priorizado, consulte o arquivo [PASSO_A_PASSO.md](./PASSO_A_PASSO.md)**

O arquivo `PASSO_A_PASSO.md` contém:
- ✅ Ordem priorizada de implementação (Fase 1, 2 e 3)
- ✅ Tempo estimado para cada passo
- ✅ Explicação do porquê da ordem
- ✅ Checklist rápido de progresso
- ✅ Dicas importantes

**Resumo rápido:**
1. ✅ ~~**PASSO 1:** Tela "Sobre o App"~~ - **CONCLUÍDO**
2. **PASSO 2:** Notificações Push (~1-2h)
3. **PASSO 3:** Internacionalização i18n (~2-3h)
4. **PASSO 4:** Configurar app.json para publicação (~15 min)
5. **PASSO 5:** Publicar no Firebase (~1-2h)
6. **PASSO 6:** Completar Sistema de Tema com modo automático (opcional, ~1h)
7. **PASSO 7:** ESLint/Prettier (opcional, ~30 min)

---

## 1. IMPLEMENTAÇÃO FUNCIONAL DE TODAS AS TELAS

### 1.1 Verificar Telas Existentes
- ✅ LoginView - **IMPLEMENTADO**
- ✅ CadastroUsuarioView - **IMPLEMENTADO**
- ✅ CheckInView - **IMPLEMENTADO**
- ✅ MotosView - **IMPLEMENTADO**
- ✅ PerfilView - **IMPLEMENTADO**
- ✅ AlterarPerfil - **IMPLEMENTADO**

### 1.2 Criar Tela "Sobre o App"
**Arquivo:** `view/SobreAppView.tsx`

**Status:** ✅ **IMPLEMENTADO E COMPLETO**

**Funcionalidades Implementadas:**
- ✅ Exibir nome do app (AUTOTTU)
- ✅ Exibir versão (1.0.0)
- ✅ Exibir hash do commit atual (usando `utils/gitInfo.ts`)
- ✅ Exibir branch e data do último commit
- ✅ Exibir informações dos desenvolvedores (RM e nomes)
- ✅ Exibir funcionalidades do app
- ✅ Rota adicionada na navegação (Tab Navigator e Stack Navigator)
- ✅ Estilização com tema (light/dark)

**Observações:**
- A tela está totalmente funcional e integrada
- Usa `gitInfo` para obter informações do Git
- Estilizada com tema dinâmico

### 1.3 Garantir Funcionalidade Completa

**Para cada tela, verificar:**
- ✅ Validação de formulários - **IMPLEMENTADO** (campos de erro sendo exibidos)
- ✅ Mensagens de erro claras - **IMPLEMENTADO** (mensagens de sucesso/erro)
- ✅ Feedback visual ao usuário - **IMPLEMENTADO** (cores verde/vermelho)
- ✅ Indicadores de carregamento - **IMPLEMENTADO** (Modal com ActivityIndicator)
- ✅ Tratamento de erros de rede - **IMPLEMENTADO** (try/catch nos fetchers)
- ✅ Navegação fluida - **IMPLEMENTADO** (Tab Navigator e Stack Navigator)

**Checklist por Tela:**
- ✅ Login: validação de email/senha, loading, erro - **COMPLETO**
- ✅ Cadastro: validação completa, feedback - **COMPLETO**
- ✅ CheckIn: formulário completo, validações - **COMPLETO**
- ✅ Motos: listagem, CRUD completo - **COMPLETO**
- ✅ Perfil: exibição e edição de dados - **COMPLETO**
- ✅ Sobre: informações do app e commit hash - **COMPLETO**

---

## 2. PUBLICAÇÃO DO APP

### 2.1 Configurar Firebase App Distribution

**Passo 1: Instalar Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

**Passo 2: Inicializar Firebase no Projeto**
```bash
cd autottu
firebase init
# Selecionar: App Distribution
```

**Passo 3: Configurar EAS Build (Expo)**

1. Instalar EAS CLI:
```bash
npm install -g eas-cli
eas login
```

2. Configurar projeto:
```bash
eas build:configure
```

3. Criar arquivo `eas.json`:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    },
    "development": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

**Passo 4: Configurar app.json para Android**
**Status:** ⚠️ **PARCIALMENTE CONFIGURADO**

**✅ Já existe:**
- ✅ `adaptiveIcon` configurado - **IMPLEMENTADO**

**❌ Falta:**
- ❌ `package` Android (`com.autottu.app`) - **FALTA ADICIONAR**
- ❌ `versionCode` - **FALTA ADICIONAR**

**Atualizar `app.json`:**
```json
{
  "expo": {
    "android": {
      "package": "com.autottu.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

**Passo 5: Build do APK**
```bash
eas build --platform android --profile production
```

**Passo 6: Publicar no Firebase App Distribution**

1. Após o build, fazer upload:
```bash
firebase appdistribution:distribute [caminho-do-apk] \
  --app [APP-ID] \
  --groups "testers" \
  --release-notes "Versão final - Entrega completa"
```

2. Adicionar email do professor como tester:
```bash
firebase appdistribution:distribute [caminho-do-apk] \
  --app [APP-ID] \
  --testers "email.professor@fiap.com.br"
```

**Alternativa via Console Firebase:**
1. Acessar Firebase Console
2. App Distribution > Upload APK
3. Adicionar testers manualmente

### 2.2 Obter Hash do Commit

**Implementação na Tela "Sobre o App":**

```typescript
import Constants from 'expo-constants';
import { execSync } from 'child_process';

// Obter hash do commit atual
const getCommitHash = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch {
    return Constants.manifest?.extra?.commitHash || 'N/A';
  }
};
```

**Ou usar variável de ambiente:**
1. Adicionar script no `package.json`:
```json
{
  "scripts": {
    "build": "COMMIT_HASH=$(git rev-parse HEAD) expo build"
  }
}
```

---

## 3. NOTIFICAÇÃO VIA PUSH

**Status:** ❌ **NÃO IMPLEMENTADO**

### 3.1 Instalar Dependências
**Status:** ❌ **FALTA INSTALAR**

```bash
npx expo install expo-notifications
npx expo install expo-device
```

**✅ Já instalado:**
- ✅ `expo-constants` - **JÁ INSTALADO** (usado em outras partes)

### 3.2 Configurar Permissões

**Arquivo:** `service/notificacaoService.ts` - ❌ **NÃO EXISTE - CRIAR**

```typescript
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permissões
export async function solicitarPermissoes() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Permissão para notificações negada!');
      return false;
    }
    
    // Configurar token para Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return true;
  } else {
    alert('Deve usar dispositivo físico para Push Notifications');
    return false;
  }
}

// Obter token de push
export async function obterTokenPush() {
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: 'seu-project-id', // Obter do app.json ou expo
  });
  return token.data;
}

// Enviar notificação local
export async function enviarNotificacaoLocal(
  titulo: string,
  corpo: string,
  dados?: any
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      data: dados,
    },
    trigger: null, // Enviar imediatamente
  });
}
```

### 3.3 Implementar Cenários de Notificação

**Cenários sugeridos:**
1. **Nova Moto Cadastrada:** Quando uma nova moto é adicionada
2. **Check-in Realizado:** Confirmação de check-in
3. **Lembrete:** Notificação periódica (ex: verificar pátio)

**Exemplo de uso em MotosView:**
```typescript
import { enviarNotificacaoLocal } from '../service/notificacaoService';

// Após salvar moto com sucesso
await enviarNotificacaoLocal(
  'Nova Moto Cadastrada',
  `A moto ${moto.placa} foi cadastrada com sucesso!`,
  { tipo: 'moto', id: moto.id }
);
```

### 3.4 Configurar Listener de Notificações

**No App.tsx ou componente principal:**
```typescript
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';

export default function App() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Listener para notificações recebidas
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    // Listener para quando usuário toca na notificação
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Usuário tocou na notificação:', response);
      // Navegar para tela específica se necessário
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // ... resto do código
}
```

### 3.5 Configurar app.json
**Status:** ❌ **NÃO CONFIGURADO**

**Ação necessária:**
Adicionar plugin de notificações e configuração EAS:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#ffffff"
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "seu-project-id"
      }
    }
  }
}
```

**⚠️ Nota:** Substituir `"seu-project-id"` pelo ID real do projeto Expo.

---

## 4. INTEGRAÇÃO COM API

### 4.1 Verificar Funcionalidades Existentes

**✅ Já implementadas:**
- ✅ Login (POST) - **IMPLEMENTADO** (`loginFetcher.ts`)
- ✅ Cadastro de Usuário (POST) - **IMPLEMENTADO** (`usuarioFetcher.ts`)
- ✅ CheckIn (POST/GET/UPDATE/DELETE) - **CRUD COMPLETO** (`checkinFetcher.ts`)
- ✅ Motos (POST/GET/UPDATE/DELETE) - **CRUD COMPLETO** (`motosFetcher.ts`)

### 4.2 Completar CRUDs

**Status:** ✅ **CRUDs COMPLETOS - Motos e CheckIn têm todas as operações**

#### 4.2.1 CRUD de Motos

**Fetcher:** `fetcher/motosFetcher.ts` - ✅ **IMPLEMENTADO**

**Operações disponíveis:**
- ✅ CREATE: `motoFetcherSalvar` - **IMPLEMENTADO**
- ✅ READ: `motoFetcherLer` - **IMPLEMENTADO**
- ✅ UPDATE: `motoFetcherAtualizar` - **IMPLEMENTADO**
- ✅ DELETE: `motoFetcherApagar` - **IMPLEMENTADO**

**⚠️ Observação:** Os fetchers não estão usando token de autenticação nos headers. Se a API exigir autenticação, será necessário adicionar:
```typescript
headers: { Authorization: `Bearer ${token}` }
```

#### 4.2.2 CRUD de CheckIn

**Fetcher:** `fetcher/checkinFetcher.ts` - ✅ **IMPLEMENTADO**

**Operações disponíveis:**
- ✅ CREATE: `checkInFetcherSalvar` - **IMPLEMENTADO**
- ✅ READ: `checkInFetcherLer` - **IMPLEMENTADO**
- ✅ UPDATE: `checkInFetcherAtualizar` - **IMPLEMENTADO**
- ✅ DELETE: `checkInFetcherApagar` - **IMPLEMENTADO**

**⚠️ Observação:** Os fetchers não estão usando token de autenticação nos headers. Se a API exigir autenticação, será necessário adicionar.

### 4.3 Tratamento de Formulários

**Para cada formulário:**

1. **Validação com Yup:**
```typescript
import * as yup from 'yup';

const schemaMoto = yup.object().shape({
  placa: yup.string().required('Placa é obrigatória'),
  modelo: yup.string().required('Modelo é obrigatório'),
  // ... outros campos
});
```

2. **Feedback Visual:**
```typescript
const [erro, setErro] = useState<string>('');
const [sucesso, setSucesso] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(false);

// Ao submeter
setLoading(true);
salvarMoto(dados, token, (sucesso, mensagem) => {
  setLoading(false);
  if (sucesso) {
    setSucesso(true);
    Alert.alert('Sucesso', mensagem);
  } else {
    setErro(mensagem);
    Alert.alert('Erro', mensagem);
  }
});
```

3. **Indicadores de Carregamento:**
```typescript
{loading && <ActivityIndicator size="large" color="#0f4a26" />}
```

### 4.4 Tratamento de Erros de Rede

**Criar utilitário:** `utils/errorHandler.ts`
```typescript
export const tratarErroAPI = (erro: any): string => {
  if (erro.response) {
    // Erro da API
    return erro.response.data?.message || 'Erro ao comunicar com servidor';
  } else if (erro.request) {
    // Sem resposta do servidor
    return 'Sem conexão com servidor. Verifique sua internet.';
  } else {
    // Erro na requisição
    return erro.message || 'Erro desconhecido';
  }
};
```

---

## 5. LOCALIZAÇÃO E INTERNACIONALIZAÇÃO

**Status:** ❌ **NÃO IMPLEMENTADO**

### 5.1 Instalar Dependências
**Status:** ❌ **FALTA INSTALAR**

```bash
npm install i18next react-i18next
```

**✅ Já instalado:**
- ✅ `@react-native-async-storage/async-storage` - **JÁ INSTALADO** (usado em outras partes)

### 5.2 Estrutura de Pastas
**Status:** ❌ **NÃO EXISTE - CRIAR**

```
autottu/
  locales/
    pt/
      translation.json
    es/
      translation.json
  i18n/
    config.ts
```

### 5.3 Configurar i18n

**Arquivo:** `i18n/config.ts`
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import pt from '../locales/pt/translation.json';
import es from '../locales/es/translation.json';

const LANGUAGE_KEY = '@autottu:language';

// Detectar idioma salvo ou do dispositivo
const detectLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      return savedLanguage;
    }
    const deviceLanguage = Localization.locale.split('-')[0];
    return deviceLanguage === 'es' ? 'es' : 'pt';
  } catch {
    return 'pt';
  }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      pt: { translation: pt },
      es: { translation: es },
    },
    lng: 'pt', // Será atualizado dinamicamente
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

// Carregar idioma salvo
detectLanguage().then((lang) => {
  i18n.changeLanguage(lang);
});

export const changeLanguage = async (lang: 'pt' | 'es') => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  i18n.changeLanguage(lang);
};

export default i18n;
```

### 5.4 Criar Arquivos de Tradução

**Status:** ❌ **NÃO EXISTEM - CRIAR**

**Arquivo:** `locales/pt/translation.json` - ❌ **CRIAR**
```json
{
  "login": {
    "titulo": "Login",
    "email": "E-mail",
    "senha": "Senha",
    "entrar": "Entrar",
    "cadastrar": "Cadastrar",
    "erro": "Erro ao fazer login"
  },
  "motos": {
    "titulo": "Motos",
    "placa": "Placa",
    "modelo": "Modelo",
    "salvar": "Salvar",
    "editar": "Editar",
    "deletar": "Deletar",
    "listaVazia": "Nenhuma moto cadastrada"
  },
  "checkin": {
    "titulo": "Check-in",
    "realizar": "Realizar Check-in"
  },
  "perfil": {
    "titulo": "Perfil",
    "editar": "Editar Perfil",
    "sair": "Sair"
  },
  "sobre": {
    "titulo": "Sobre o App",
    "versao": "Versão",
    "commit": "Commit Hash"
  }
}
```

**Arquivo:** `locales/es/translation.json`
```json
{
  "login": {
    "titulo": "Iniciar Sesión",
    "email": "Correo Electrónico",
    "senha": "Contraseña",
    "entrar": "Entrar",
    "cadastrar": "Registrarse",
    "erro": "Error al iniciar sesión"
  },
  "motos": {
    "titulo": "Motos",
    "placa": "Placa",
    "modelo": "Modelo",
    "salvar": "Guardar",
    "editar": "Editar",
    "deletar": "Eliminar",
    "listaVazia": "No hay motos registradas"
  },
  "checkin": {
    "titulo": "Registro",
    "realizar": "Realizar Registro"
  },
  "perfil": {
    "titulo": "Perfil",
    "editar": "Editar Perfil",
    "sair": "Salir"
  },
  "sobre": {
    "titulo": "Acerca de la App",
    "versao": "Versión",
    "commit": "Hash del Commit"
  }
}
```

### 5.5 Usar Traduções nos Componentes

**Status:** ❌ **NÃO IMPLEMENTADO - TODAS AS STRINGS ESTÃO HARDCODED**

**Ação necessária:**
Substituir todas as strings hardcoded por traduções:

**Exemplo em LoginView:**
```typescript
import { useTranslation } from 'react-i18next';

export const LoginView = () => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('login.titulo')}</Text>
      <TextInput placeholder={t('login.email')} />
      <Button title={t('login.entrar')} />
    </View>
  );
};
```

### 5.6 Criar Seletor de Idioma

**Componente:** `componentes/SeletorIdioma.tsx` - ❌ **NÃO EXISTE - CRIAR**
```typescript
import { View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n/config';

export const SeletorIdioma = () => {
  const { i18n } = useTranslation();
  
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <TouchableOpacity
        onPress={() => changeLanguage('pt')}
        style={{ padding: 10, backgroundColor: i18n.language === 'pt' ? '#0f4a26' : '#ccc' }}
      >
        <Text>PT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeLanguage('es')}
        style={{ padding: 10, backgroundColor: i18n.language === 'es' ? '#0f4a26' : '#ccc' }}
      >
        <Text>ES</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 5.7 Inicializar i18n no App.tsx
**Status:** ❌ **NÃO IMPLEMENTADO**

```typescript
import './i18n/config';
```

---

## 6. ESTILIZAÇÃO COM TEMA

### 6.1 Criar Sistema de Tema

**Status:** ✅ **IMPLEMENTADO (BÁSICO)** / ⚠️ **MELHORIAS OPCIONAIS**

**✅ Já existe e funciona:**
- ✅ `estilos/temas.ts` - **IMPLEMENTADO** (cores light/dark definidas)
- ✅ Tema sendo usado nas views - **IMPLEMENTADO** (todas as views usam `temas[tema]`)
- ✅ Botão de troca de tema no App.tsx - **IMPLEMENTADO** (via `defineTema` em `appControl.ts`)
- ✅ Tema integrado no `contextoPrincipal.ts` - **IMPLEMENTADO**
- ✅ Tema persiste via `appControl.ts` - **IMPLEMENTADO**

**⚠️ Melhorias opcionais (não críticas):**
- ⚠️ `contexto/TemaContext.tsx` completo (opcional - o sistema atual funciona)
- ⚠️ Componente `SeletorTema` completo (opcional - botão atual funciona)
- ⚠️ Modo automático (auto) que segue o sistema (opcional)

**Arquivo:** `contexto/TemaContext.tsx` - **CRIAR NOVO ARQUIVO**
```typescript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tema = 'light' | 'dark' | 'auto';

interface TemaContextData {
  tema: Tema;
  isDark: boolean;
  cores: typeof coresClaro | typeof coresEscuro;
  alterarTema: (novoTema: Tema) => void;
}

const coresClaro = {
  primaria: '#0f4a26',
  secundaria: '#469846',
  fundo: '#ffffff',
  texto: '#000000',
  textoSecundario: '#666666',
  borda: '#e0e0e0',
  card: '#f5f5f5',
  erro: '#d32f2f',
  sucesso: '#2e7d32',
};

const coresEscuro = {
  primaria: '#4caf50',
  secundaria: '#66bb6a',
  fundo: '#121212',
  texto: '#ffffff',
  textoSecundario: '#b0b0b0',
  borda: '#333333',
  card: '#1e1e1e',
  erro: '#ef5350',
  sucesso: '#66bb6a',
};

const TemaContext = createContext<TemaContextData>({} as TemaContextData);

export const TemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [tema, setTema] = useState<Tema>('auto');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    carregarTema();
  }, []);

  useEffect(() => {
    atualizarTema();
  }, [tema, systemColorScheme]);

  const carregarTema = async () => {
    try {
      const temaSalvo = await AsyncStorage.getItem('@autottu:tema');
      if (temaSalvo) {
        setTema(temaSalvo as Tema);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  const atualizarTema = () => {
    if (tema === 'auto') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(tema === 'dark');
    }
  };

  const alterarTema = async (novoTema: Tema) => {
    try {
      await AsyncStorage.setItem('@autottu:tema', novoTema);
      setTema(novoTema);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const cores = isDark ? coresEscuro : coresClaro;

  return (
    <TemaContext.Provider value={{ tema, isDark, cores, alterarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
```

### 6.2 Atualizar estilos.ts

**Arquivo:** `estilos/estilos.ts` - ⚠️ **PRECISA ATUALIZAR**

**Status atual:**
- ✅ Arquivo existe com estilos básicos
- ❌ Estilos não usam tema dinamicamente (cores hardcoded)
- ❌ Não usa função `criarEstilos(cores)` para tema dinâmico

**Ação necessária:**
Atualizar para usar tema dinamicamente conforme exemplo abaixo:

```typescript
import { StyleSheet } from 'react-native';
import { useTema } from './contexto/TemaContext';

export const criarEstilos = (cores: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
    alignItems: 'stretch',
    alignContent: 'space-evenly',
    margin: 5,
  },
  container2: {
    flex: 1,
    backgroundColor: cores.background2,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.borda || 'gray',
    backgroundColor: cores.inputBg,
    color: cores.text,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  texto: {
    color: cores.text,
  },
  textoSecundario: {
    color: cores.textoSecundario || cores.text,
  },
  card: {
    backgroundColor: cores.cardBg,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: cores.borda || 'gray',
  },
  botao: {
    backgroundColor: cores.primaria || '#0f4a26',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
```

### 6.3 Usar Tema nos Componentes

**Status:** ✅ **JÁ ESTÁ SENDO USADO NAS VIEWS**

**Exemplo atual (já implementado):**
```typescript
import { temas } from '../estilos/temas';
import { useContext } from 'react';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';

export const MinhaView = () => {
  const { tema } = useContext(ContextoPrincipal);
  const cores = temas[tema];
  
  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <Text style={{color: cores.text}}>Texto com tema</Text>
    </View>
  );
};
```

**⚠️ Nota:** As views já usam tema, mas de forma básica. Para melhorar, criar `TemaContext` completo.

### 6.4 Criar Seletor de Tema

**Componente:** `componentes/SeletorTema.tsx` - ❌ **NÃO EXISTE**

**Status atual:**
- ✅ Botão básico no App.tsx (linha 57-59) - **IMPLEMENTADO**
- ❌ Componente completo com opções (Claro/Escuro/Auto) - **FALTA CRIAR**
```typescript
import { View, TouchableOpacity, Text } from 'react-native';
import { useTema } from '../contexto/TemaContext';
import { criarEstilos } from '../estilos';

export const SeletorTema = () => {
  const { tema, alterarTema, cores } = useTema();
  const estilos = criarEstilos(cores);
  
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <TouchableOpacity
        onPress={() => alterarTema('light')}
        style={[estilos.botao, { opacity: tema === 'light' ? 1 : 0.5 }]}
      >
        <Text style={estilos.botaoTexto}>Claro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alterarTema('dark')}
        style={[estilos.botao, { opacity: tema === 'dark' ? 1 : 0.5 }]}
      >
        <Text style={estilos.botaoTexto}>Escuro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alterarTema('auto')}
        style={[estilos.botao, { opacity: tema === 'auto' ? 1 : 0.5 }]}
      >
        <Text style={estilos.botaoTexto}>Auto</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 6.5 Envolver App com TemaProvider

**App.tsx:** ⚠️ **PRECISA ATUALIZAR**

**Status atual:**
- ✅ App usa `ContextoPrincipal` que já tem tema básico - **IMPLEMENTADO**
- ❌ Não usa `TemaProvider` completo do guia - **FALTA CRIAR**

**Ação necessária:**
Após criar `TemaContext.tsx`, envolver App com `TemaProvider`:

```typescript
import { TemaProvider } from './contexto/TemaContext';

export default function App() {
  return (
    <TemaProvider>
      {/* ... resto do código */}
    </TemaProvider>
  );
}
```

### 6.6 Seguir Material Design / HIG

**Material Design (Android):**
- Usar elevação (shadow) em cards
- Cores primárias e secundárias consistentes
- Espaçamento de 8dp
- Tipografia clara

**Human Interface Guidelines (iOS):**
- Usar SF Pro como fonte (se disponível)
- Espaçamento consistente
- Navegação nativa

---

## 7. ARQUITETURA DE CÓDIGO

### 7.1 Estrutura de Pastas Recomendada
```
autottu/
  assets/          # Imagens, ícones
  componentes/     # Componentes reutilizáveis
  contexto/        # Contexts do React
  control/         # Lógica de controle (hooks)
  fetcher/         # Chamadas HTTP
  i18n/            # Configuração i18n
  locales/          # Traduções
  model/            # Interfaces/Types
  navigation/       # Configuração de navegação
  service/          # Serviços (notificações, etc)
  utils/            # Funções utilitárias
  view/             # Telas/Views
  App.tsx
  estilos.ts
```

### 7.2 Padrões de Nomenclatura

**Componentes:** PascalCase
- `LoginView.tsx`
- `SeletorTema.tsx`

**Hooks:** camelCase com prefixo "use"
- `useAppControl.ts`
- `useTema.ts`

**Serviços:** camelCase
- `notificacaoService.ts`
- `errorHandler.ts`

**Interfaces/Types:** PascalCase
- `Usuario.ts`
- `Motos.ts`

### 7.3 Configurar ESLint e Prettier

**Instalar:**
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier
```

**Arquivo:** `.eslintrc.json`
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

**Arquivo:** `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

**package.json:**
```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
  }
}
```

### 7.4 Boas Práticas

1. **Separação de Responsabilidades:**
   - Views: apenas UI
   - Control: lógica de negócio
   - Fetcher: chamadas HTTP
   - Service: serviços externos

2. **Reutilização:**
   - Criar componentes reutilizáveis
   - Extrair lógica comum em hooks

3. **TypeScript:**
   - Tipar todas as funções e variáveis
   - Evitar `any`

4. **Performance:**
   - Usar `React.memo` quando necessário
   - Evitar re-renders desnecessários

---

## 8. DOCUMENTAÇÃO E APRESENTAÇÃO

### 8.1 Atualizar README.md

**Conteúdo obrigatório:**
- Nome do app
- Proposta e funcionalidades
- Estrutura de pastas
- Nome, RM e GitHub de todos os integrantes
- Como rodar o projeto
- Tecnologias utilizadas

### 8.2 Criar Tela "Sobre o App"

Ver seção 1.2

### 8.3 Gravar Vídeo de Apresentação

**Checklist do Vídeo:**
- [ ] Apresentação inicial (nome do app, equipe)
- [ ] Demonstração de todas as telas
- [ ] Troca de idioma (PT/ES)
- [ ] Troca de tema (claro/escuro)
- [ ] Funcionalidades de API (CRUD completo)
- [ ] Notificação push funcionando
- [ ] Navegação fluida
- [ ] Tela "Sobre o App" com hash do commit
- [ ] Duração: 5-10 minutos

**Ferramentas sugeridas:**
- OBS Studio
- Loom
- Zoom (gravação)

---

## 📝 CHECKLIST FINAL

### Funcionalidades
- ✅ Todas as telas funcionais - **COMPLETO** (7/7 telas - todas implementadas)
- ✅ Validações de formulários - **COMPLETO**
- ✅ Mensagens de erro - **COMPLETO**
- ✅ Indicadores de carregamento - **COMPLETO**
- ✅ Tratamento de erros de rede - **COMPLETO**

### Publicação
- ❌ App publicado no Firebase App Distribution - **FALTA**
- ❌ Email do professor adicionado como tester - **FALTA**
- ✅ Tela "Sobre o App" com hash do commit - **COMPLETO**

### Notificações
- ❌ Permissões configuradas - **FALTA**
- ❌ Pelo menos um cenário implementado - **FALTA**
- ❌ Testável e demonstrável - **FALTA**

### API
- ✅ Pelo menos 2 CRUDs completos - **COMPLETO** (Motos e CheckIn)
- ✅ Create, Read, Update, Delete funcionando - **COMPLETO**
- ✅ Validações e feedback - **COMPLETO**
- ⚠️ Verificar se API exige token de autenticação nos headers

### i18n
- ❌ Português implementado - **FALTA**
- ❌ Espanhol implementado - **FALTA**
- ❌ Todas as strings traduzidas - **FALTA**
- ❌ Seletor de idioma funcional - **FALTA**

### Tema
- ✅ Modo claro - **IMPLEMENTADO**
- ✅ Modo escuro - **IMPLEMENTADO**
- ⚠️ Modo automático (opcional) - **NÃO IMPLEMENTADO** (não crítico)
- ✅ Cores consistentes - **IMPLEMENTADO**
- ✅ Sistema funcional - **IMPLEMENTADO** (via appControl e contextoPrincipal)

### Arquitetura
- ✅ Estrutura organizada - **COMPLETO**
- ✅ Código limpo - **COMPLETO**
- ❌ ESLint/Prettier configurado - **FALTA**
- ✅ TypeScript bem utilizado - **COMPLETO**

### Documentação
- ✅ README.md completo - **EXISTE** (pode precisar atualizações)
- ❌ Vídeo gravado - **FALTA**
- ✅ Informações dos integrantes - **COMPLETO** (no README)

---

## 🚨 ATENÇÃO - PENALIDADES

Evitar:
- ❌ Não entregar via GitHub Classroom (-20)
- ❌ Não entregar vídeo (-20)
- ❌ Sem README.md (-10)
- ❌ Não publicar app (-40)
- ❌ Sem tema (-20)
- ❌ App fora do escopo (-60)
- ❌ Remover telas da sprint anterior (-100)
- ❌ Git incoerente (-50)

---

## 📚 RECURSOS ADICIONAIS

### Links Úteis
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [React i18next](https://react.i18next.com/)
- [Firebase App Distribution](https://firebase.google.com/docs/app-distribution)
- [Material Design](https://material.io/design)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Comandos Úteis
```bash
# Verificar commits
git log --oneline

# Obter hash do commit atual
git rev-parse HEAD

# Verificar estrutura
tree /F

# Limpar e reinstalar
rm -rf node_modules
npm install
```

---

**Boa sorte com a entrega! 🚀**

