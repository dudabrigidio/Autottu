# 📚 EXPLICAÇÃO DETALHADA: INSTALAR FERRAMENTAS

## 🎯 POR QUE PRECISA INSTALAR ESSAS FERRAMENTAS?

### O Problema:
- Você tem um app Expo/React Native
- Precisa gerar um APK (arquivo Android) para publicar
- Precisa publicar no Firebase App Distribution
- **Mas não tem as ferramentas instaladas no seu computador!**

### A Solução:
Instalar ferramentas de linha de comando (CLI) que permitem:
1. **Fazer build do APK** (gerar o arquivo Android)
2. **Publicar no Firebase** (fazer upload do APK)

---

## 🔧 O QUE SÃO ESSAS FERRAMENTAS?

### 1. EAS CLI (Expo Application Services CLI)

**O que é:**
- Ferramenta de linha de comando do Expo
- Permite fazer build do seu app Expo
- Gera o arquivo APK para Android

**Por que precisa:**
- Seu app é Expo/React Native
- Não pode gerar APK diretamente no computador
- Precisa do EAS Build para compilar o app
- O EAS CLI é a interface para usar o EAS Build

**O que faz:**
```
Seu código Expo → EAS Build → APK pronto
```

**Exemplo de uso:**
```bash
eas build --platform android --profile production
```
Este comando envia seu código para os servidores do Expo, que compilam e geram o APK.

---

### 2. Firebase CLI (Firebase Command Line Interface)

**O que é:**
- Ferramenta de linha de comando do Firebase
- Permite interagir com o Firebase via terminal
- Permite publicar APKs no App Distribution

**Por que precisa:**
- Você precisa publicar o APK no Firebase App Distribution
- Não quer fazer upload manual pelo navegador
- Quer automatizar o processo
- O Firebase CLI permite fazer upload via terminal

**O que faz:**
```
APK no seu computador → Firebase CLI → Firebase App Distribution
```

**Exemplo de uso:**
```bash
firebase appdistribution:distribute autottu.apk --app [APP-ID] --testers "email@fiap.com.br"
```
Este comando faz upload do APK e adiciona testers automaticamente.

---

## 📋 PASSO A PASSO EXPLICADO

### PASSO 1: Instalar as Ferramentas

```bash
npm install -g eas-cli firebase-tools
```

**O que este comando faz:**

1. **`npm install`** - Usa o NPM (gerenciador de pacotes do Node.js) para instalar
2. **`-g`** - Instala **globalmente** (disponível em qualquer lugar do terminal)
3. **`eas-cli`** - Instala o EAS CLI
4. **`firebase-tools`** - Instala o Firebase CLI

**Por que `-g` (global)?**
- Sem `-g`, as ferramentas só funcionariam dentro do projeto
- Com `-g`, você pode usar `eas` e `firebase` em qualquer lugar
- É mais prático e é o padrão para ferramentas CLI

**Onde são instaladas?**
- No Windows: `C:\Users\[SEU_USUARIO]\AppData\Roaming\npm\`
- Você não precisa saber o caminho exato
- Basta usar `eas` e `firebase` no terminal

**Tempo de instalação:**
- Pode levar 1-2 minutos
- Depende da velocidade da sua internet

---

### PASSO 2: Fazer Login no Expo

```bash
eas login
```

**O que este comando faz:**

1. Abre o navegador automaticamente
2. Você vê uma tela de login do Expo
3. Você faz login com sua conta Expo
4. O terminal recebe a confirmação de login

**Por que precisa fazer login?**
- O EAS Build precisa saber quem você é
- Precisa de uma conta Expo (gratuita)
- O login autentica você para usar os servidores do Expo

**O que acontece se não tiver conta?**
1. Acesse: https://expo.dev/signup
2. Crie uma conta gratuita
3. Volte e execute `eas login` novamente

**O que você verá no terminal:**
```
✔ Logged in as seu-email@exemplo.com
```

**É seguro?**
- Sim, é o método oficial do Expo
- Usa autenticação segura
- Você pode fazer logout depois: `eas logout`

---

### PASSO 3: Fazer Login no Firebase

```bash
firebase login
```

**O que este comando faz:**

1. Abre o navegador automaticamente
2. Você vê uma tela pedindo permissão do Firebase
3. Você clica em "Permitir" ou "Allow"
4. O terminal recebe a confirmação de login

**Por que precisa fazer login?**
- O Firebase CLI precisa saber quem você é
- Precisa de uma conta Google (para Firebase)
- O login autentica você para usar o Firebase

**O que você verá no terminal:**
```
✔ Success! Logged in as seu-email@gmail.com
```

**É seguro?**
- Sim, é o método oficial do Firebase
- Usa autenticação OAuth (padrão da indústria)
- Você pode fazer logout depois: `firebase logout`

---

## 🔍 COMO VERIFICAR SE FUNCIONOU?

### Verificar se EAS CLI está instalado:

```bash
eas --version
```

**O que você deve ver:**
```
7.0.0
```
(ou outro número de versão)

**Se aparecer erro:**
- `'eas' is not recognized` → Não foi instalado corretamente
- Solução: Execute `npm install -g eas-cli` novamente
- Feche e abra o terminal novamente

---

### Verificar se Firebase CLI está instalado:

```bash
firebase --version
```

**O que você deve ver:**
```
13.0.0
```
(ou outro número de versão)

**Se aparecer erro:**
- `'firebase' is not recognized` → Não foi instalado corretamente
- Solução: Execute `npm install -g firebase-tools` novamente
- Feche e abra o terminal novamente

---

### Verificar login no Expo:

```bash
eas whoami
```

**O que você deve ver:**
```
seu-email@exemplo.com
```

**Se aparecer erro:**
- `Not logged in` → Precisa fazer login
- Solução: Execute `eas login`

---

### Verificar login no Firebase:

```bash
firebase login:list
```

**O que você deve ver:**
```
seu-email@gmail.com
```

**Se aparecer erro:**
- `Not logged in` → Precisa fazer login
- Solução: Execute `firebase login`

---

## 🎯 RESUMO VISUAL

### Antes de Instalar:
```
Você: "Quero fazer build do APK"
Computador: "Não sei como fazer isso"
```

### Depois de Instalar:
```
Você: "eas build --platform android"
EAS CLI: "OK, vou compilar seu app e gerar o APK"
```

### Antes de Instalar:
```
Você: "Quero publicar no Firebase"
Computador: "Não sei como fazer isso"
```

### Depois de Instalar:
```
Você: "firebase appdistribution:distribute autottu.apk"
Firebase CLI: "OK, vou fazer upload e adicionar testers"
```

---

## ⚠️ PERGUNTAS FREQUENTES

### 1. Preciso instalar toda vez?
**Não!** Uma vez instalado, fica instalado. Você só precisa fazer login novamente se fizer logout.

### 2. É gratuito?
**Sim!** Tanto o EAS CLI quanto o Firebase CLI são gratuitos. O EAS Build tem um plano gratuito com limites.

### 3. Preciso de internet?
**Sim!** As ferramentas precisam de internet para:
- Fazer build (envia código para servidores do Expo)
- Publicar no Firebase (faz upload do APK)

### 4. Funciona no Windows?
**Sim!** Funciona perfeitamente no Windows, Mac e Linux.

### 5. Preciso de Node.js?
**Sim!** Você precisa do Node.js instalado. Se não tiver, instale em: https://nodejs.org/

---

## 🚀 PRÓXIMOS PASSOS

Depois de instalar e fazer login:

1. ✅ **Atualizar hash do commit:**
   ```bash
   npm run git-info
   ```

2. ✅ **Fazer build do APK:**
   ```bash
   eas build --platform android --profile production
   ```

3. ✅ **Publicar no Firebase:**
   ```bash
   firebase appdistribution:distribute [APK] --app [APP-ID] --testers "[EMAIL]"
   ```

---

## 📊 FLUXO COMPLETO

```
1. Instalar ferramentas
   npm install -g eas-cli firebase-tools
   ↓
2. Fazer login
   eas login
   firebase login
   ↓
3. Atualizar hash
   npm run git-info
   ↓
4. Fazer build
   eas build --platform android --profile production
   ↓
5. Baixar APK
   (do link fornecido)
   ↓
6. Publicar
   firebase appdistribution:distribute [APK] --app [APP-ID]
   ↓
7. Pronto! ✅
```

---

## 💡 DICA FINAL

**Pense nas ferramentas como "programas de terminal":**

- **EAS CLI** = Programa para compilar seu app
- **Firebase CLI** = Programa para publicar seu app

Assim como você precisa do navegador para acessar sites, você precisa dessas ferramentas para fazer build e publicar.

---

**Agora você entende por que precisa instalar essas ferramentas! 🎉**

