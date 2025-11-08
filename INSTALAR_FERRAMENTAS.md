# 🔧 INSTALAR FERRAMENTAS NECESSÁRIAS

## ✅ O QUE VOCÊ PRECISA INSTALAR

### Para Fazer Build do APK:
- ✅ **EAS CLI** (Expo Application Services)
- ✅ **Conta Expo** (gratuita)

### Para Publicar no Firebase App Distribution:
- ✅ **Firebase CLI**
- ✅ **Conta Google** (para Firebase)

---

## 📝 PASSO A PASSO DETALHADO

### PASSO 1: Instalar EAS CLI

**O que é:** Ferramenta para fazer build do app Expo

**Como instalar:**

Abra o PowerShell/Terminal e execute:

```bash
npm install -g eas-cli
```

**Aguarde a instalação terminar** (pode levar 1-2 minutos)

**Verificar se foi instalado:**

```bash
eas --version
```

**Deve aparecer algo como:** `7.0.0` (número da versão)

---

### PASSO 2: Fazer Login no Expo

**O que é:** Autenticação para usar o EAS Build

**Como fazer login:**

```bash
eas login
```

**O que vai acontecer:**

1. Pode abrir o navegador automaticamente
2. Ou pedir para você acessar um link
3. Se abrir o navegador, faça login com sua conta Expo
4. Se pedir um link, acesse o link fornecido e faça login
5. Volte ao terminal e você verá: **"✔ Logged in as [seu-email]"**

**Se não tiver conta Expo:**

1. Acesse: https://expo.dev/signup
2. Crie uma conta gratuita
3. Volte e execute `eas login` novamente

---

### PASSO 3: Instalar Firebase CLI

**O que é:** Ferramenta para publicar no Firebase App Distribution

**Como instalar:**

```bash
npm install -g firebase-tools
```

**Aguarde a instalação terminar** (pode levar 1-2 minutos)

**Verificar se foi instalado:**

```bash
firebase --version
```

**Deve aparecer algo como:** `13.0.0` (número da versão)

---

### PASSO 4: Fazer Login no Firebase

**O que é:** Autenticação para usar o Firebase CLI

**Como fazer login:**

```bash
firebase login
```

**O que vai acontecer:**

1. Abrirá seu navegador automaticamente
2. Você verá uma tela pedindo permissão
3. Clique em **"Permitir"** ou **"Allow"**
4. Volte ao terminal e você verá: **"✔ Success! Logged in as [seu-email]"**

---

## ✅ VERIFICAÇÃO FINAL

Execute estes comandos para verificar se tudo está instalado:

```bash
# Verificar EAS CLI
eas --version

# Verificar Firebase CLI
firebase --version

# Verificar login no Expo
eas whoami

# Verificar login no Firebase
firebase login:list
```

**Se todos os comandos funcionarem, está tudo pronto! ✅**

---

## 🚀 ORDEM DE EXECUÇÃO

### Para Fazer Build do APK:

1. ✅ Instalar EAS CLI: `npm install -g eas-cli`
2. ✅ Fazer login no Expo: `eas login`
3. ✅ Fazer build: `eas build --platform android --profile production`

### Para Publicar no Firebase:

1. ✅ Instalar Firebase CLI: `npm install -g firebase-tools`
2. ✅ Fazer login no Firebase: `firebase login`
3. ✅ Publicar: `firebase appdistribution:distribute [APK] --app [APP-ID]`

---

## ⚠️ IMPORTANTE

### Você Precisa Fazer Login em Ambos?

**Para Build do APK:**
- ✅ **SIM** - Precisa do EAS CLI e login no Expo

**Para Publicar no Firebase:**
- ✅ **SIM** - Precisa do Firebase CLI e login no Firebase

**Você pode fazer tudo de uma vez:**
```bash
# Instalar tudo
npm install -g eas-cli firebase-tools

# Fazer login em ambos
eas login
firebase login
```

---

## 🆘 TROUBLESHOOTING

### Erro: "eas: command not found"

**Solução:**
```bash
npm install -g eas-cli
```

Se ainda não funcionar, feche e abra o terminal novamente.

---

### Erro: "firebase: command not found"

**Solução:**
```bash
npm install -g firebase-tools
```

Se ainda não funcionar, feche e abra o terminal novamente.

---

### Erro: "Not logged in"

**Solução:**
```bash
# Para Expo
eas login

# Para Firebase
firebase login
```

---

### Erro: "Permission denied" ou "Access denied"

**Solução:**
- No Windows, pode precisar executar como Administrador
- Ou use: `npm install -g eas-cli firebase-tools` (sem sudo no Windows)

---

## 📋 CHECKLIST

Antes de fazer o build, verifique:

- [ ] ✅ EAS CLI instalado (`eas --version` funciona)
- [ ] ✅ Firebase CLI instalado (`firebase --version` funciona)
- [ ] ✅ Login no Expo feito (`eas whoami` mostra seu email)
- [ ] ✅ Login no Firebase feito (`firebase login:list` mostra sua conta)

---

## 🎯 RESUMO RÁPIDO

**Execute estes comandos em ordem:**

```bash
# 1. Instalar ferramentas
npm install -g eas-cli firebase-tools

# 2. Fazer login no Expo
eas login

# 3. Fazer login no Firebase
firebase login

# 4. Verificar se está tudo OK
eas --version
firebase --version
```

**Depois disso, você pode fazer o build! 🚀**

---

**Boa sorte! 🎉**

