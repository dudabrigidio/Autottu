# 🚀 GUIA PASSO A PASSO - PUBLICAÇÃO NO FIREBASE APP DISTRIBUTION

Este guia detalha todos os passos necessários para publicar o aplicativo AUTOTTU no Firebase App Distribution e atender aos critérios de avaliação.

---

## 📋 PRÉ-REQUISITOS

Antes de começar, você precisa ter:

- ✅ Conta Google (para acessar Firebase Console)
- ✅ Node.js instalado (versão 18 ou superior)
- ✅ Git instalado e configurado
- ✅ Projeto Expo configurado
- ✅ Conta Expo (gratuita)

---

## 📝 PASSO 1: ATUALIZAR INFORMAÇÕES DO GIT (HASH DO COMMIT)

**IMPORTANTE:** Sempre execute este passo ANTES de fazer o build para garantir que o hash do commit esteja atualizado na tela "Sobre o App".

### 1.1 Atualizar o hash do commit

No terminal, navegue até a pasta do projeto e execute:

```bash
cd autottu
npm run git-info
```

Este comando atualiza o arquivo `utils/gitInfo.ts` com:
- Hash curto do commit atual
- Hash completo do commit
- Branch atual
- Data do último commit

### 1.2 Verificar se foi atualizado

Abra o arquivo `autottu/utils/gitInfo.ts` e verifique se o `commitHash` está correto:

```typescript
export const gitInfo = {
    commitHash: 'abc1234', // Deve corresponder ao commit atual
    commitHashFull: 'abc1234...',
    branch: 'main',
    lastCommitDate: '2025-01-XX'
};
```

**✅ A tela "Sobre o App" já está configurada para exibir este hash automaticamente!**

---

## 📝 PASSO 2: CONFIGURAR FIREBASE PROJECT

### 2.1 Criar projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"** ou **"Create a project"**
3. Preencha:
   - **Nome do projeto:** `autottu` (ou outro nome de sua escolha)
   - **Google Analytics:** Opcional (pode desabilitar)
4. Clique em **"Criar projeto"** e aguarde a criação

### 2.2 Habilitar App Distribution

1. No Firebase Console, vá em **"App Distribution"** no menu lateral
2. Se for a primeira vez, clique em **"Get started"**
3. Aceite os termos e condições

### 2.3 Registrar o app Android

1. No Firebase Console, vá em **"Project Settings"** (ícone de engrenagem)
2. Role até a seção **"Your apps"**
3. Clique no ícone **Android** (🟢)
4. Preencha:
   - **Android package name:** `com.autottu.app`
   - **App nickname (opcional):** `AUTOTTU`
   - **Debug signing certificate SHA-1:** Opcional (pode pular)
5. Clique em **"Register app"**
6. **IMPORTANTE:** Anote o **App ID** que será exibido (você precisará dele depois)

---

## 📝 PASSO 3: INSTALAR FERRAMENTAS NECESSÁRIAS

### 3.1 Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 3.2 Fazer login no Firebase

```bash
firebase login
```

Isso abrirá o navegador para você fazer login com sua conta Google.

### 3.3 Instalar EAS CLI (Expo Application Services)

```bash
npm install -g eas-cli
```

### 3.4 Fazer login no Expo

```bash
eas login
```

---

## 📝 PASSO 4: CONFIGURAR EAS BUILD

### 4.1 Inicializar EAS no projeto

No terminal, dentro da pasta `autottu`:

```bash
cd autottu
eas build:configure
```

Isso criará o arquivo `eas.json` automaticamente.

### 4.2 Verificar/Editar eas.json

O arquivo `eas.json` deve estar na raiz do projeto `autottu`. Verifique se está assim:

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

**Nota:** Se o arquivo não existir ou estiver diferente, crie/edite manualmente.

---

## 📝 PASSO 5: VERIFICAR CONFIGURAÇÕES DO APP

### 5.1 Verificar app.json

Certifique-se de que o `app.json` está configurado corretamente:

```json
{
  "expo": {
    "android": {
      "package": "com.autottu.app",
      "versionCode": 1,
      ...
    }
  }
}
```

**✅ Já está configurado!**

### 5.2 Verificar package.json

Certifique-se de que o script `git-info` existe:

```json
{
  "scripts": {
    "git-info": "node scripts/update-git-info.js"
  }
}
```

**✅ Já está configurado!**

---

## 📝 PASSO 6: FAZER BUILD DO APK

### 6.1 Atualizar hash do commit ANTES do build

```bash
cd autottu
npm run git-info
```

### 6.2 Fazer build de produção

```bash
eas build --platform android --profile production
```

**IMPORTANTE:**
- Este processo pode levar 15-30 minutos
- Você precisará escolher se quer fazer build local ou na nuvem (recomendado: nuvem)
- Se escolher nuvem, você precisará ter créditos no Expo (plano gratuito tem limite)

### 6.3 Aguardar conclusão do build

Você receberá um link para acompanhar o progresso. Quando concluir, você terá:
- Um link para download do APK
- Ou o APK será baixado automaticamente

### 6.4 Baixar o APK

Se o build foi feito na nuvem, baixe o APK do link fornecido e salve em um local de fácil acesso (ex: `C:\Users\SeuUsuario\Downloads\autottu.apk`).

---

## 📝 PASSO 7: PUBLICAR NO FIREBASE APP DISTRIBUTION

### 7.1 Obter o App ID do Firebase

1. Acesse Firebase Console: https://console.firebase.google.com/
2. Selecione seu projeto
3. Vá em **"Project Settings"** > **"Your apps"**
4. Encontre o app Android e copie o **App ID** (formato: `1:123456789:android:abcdef123456`)

### 7.2 Publicar via CLI (Método Recomendado)

No terminal, execute:

```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] \
  --app [APP-ID] \
  --release-notes "Versão 1.0.0 - Entrega Final - Hash: [HASH_DO_COMMIT]"
```

**Exemplo real:**

```bash
firebase appdistribution:distribute C:\Users\SeuUsuario\Downloads\autottu.apk \
  --app 1:123456789:android:abcdef123456 \
  --release-notes "Versão 1.0.0 - Entrega Final - Hash: abc1234"
```

**Substitua:**
- `[CAMINHO_DO_APK]` pelo caminho completo do seu APK
- `[APP-ID]` pelo App ID do Firebase
- `[HASH_DO_COMMIT]` pelo hash do commit atual (obtido com `git rev-parse --short HEAD`)

### 7.3 Publicar via Console Firebase (Método Alternativo)

1. Acesse Firebase Console: https://console.firebase.google.com/
2. Vá em **"App Distribution"**
3. Clique em **"Distribute app"** ou **"Upload release"**
4. Faça upload do APK
5. Preencha:
   - **Release notes:** "Versão 1.0.0 - Entrega Final"
   - **Groups:** Deixe vazio por enquanto
6. Clique em **"Distribute"**

---

## 📝 PASSO 8: ADICIONAR PROFESSOR COMO TESTER

### 8.1 Adicionar via CLI (Método Recomendado)

```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] \
  --app [APP-ID] \
  --testers "email.professor@fiap.com.br" \
  --release-notes "Versão 1.0.0 - Entrega Final"
```

**Exemplo real:**

```bash
firebase appdistribution:distribute C:\Users\SeuUsuario\Downloads\autottu.apk \
  --app 1:123456789:android:abcdef123456 \
  --testers "professor@fiap.com.br" \
  --release-notes "Versão 1.0.0 - Entrega Final"
```

**Substitua:**
- `[CAMINHO_DO_APK]` pelo caminho completo do seu APK
- `[APP-ID]` pelo App ID do Firebase
- `email.professor@fiap.com.br` pelo e-mail real do professor

### 8.2 Adicionar via Console Firebase (Método Alternativo)

1. Acesse Firebase Console: https://console.firebase.google.com/
2. Vá em **"App Distribution"**
3. Clique na release que você acabou de publicar
4. Vá na aba **"Testers"**
5. Clique em **"Add testers"**
6. Digite o e-mail do professor
7. Clique em **"Add"**

### 8.3 Adicionar múltiplos testers

Se precisar adicionar vários e-mails, separe por vírgula:

```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] \
  --app [APP-ID] \
  --testers "professor1@fiap.com.br,professor2@fiap.com.br" \
  --release-notes "Versão 1.0.0 - Entrega Final"
```

---

## 📝 PASSO 9: VERIFICAR CORRESPONDÊNCIA COM CÓDIGO-FONTE

### 9.1 Garantir que o código está commitado

```bash
git status
```

Se houver arquivos não commitados, faça commit:

```bash
git add .
git commit -m "Versão final para publicação"
```

### 9.2 Obter hash do commit de referência

```bash
git rev-parse HEAD
```

**IMPORTANTE:** Este hash deve corresponder ao hash exibido na tela "Sobre o App" do app publicado.

### 9.3 Verificar na tela "Sobre o App"

1. Instale o APK em um dispositivo Android
2. Abra o app
3. Vá na tela **"Sobre o App"**
4. Verifique se o hash do commit exibido corresponde ao hash do commit atual no Git

**✅ Se corresponder, está tudo certo!**

---

## 📝 PASSO 10: VERIFICAÇÃO FINAL

### Checklist de Verificação:

- [ ] ✅ App publicado no Firebase App Distribution
- [ ] ✅ E-mail do professor adicionado como tester
- [ ] ✅ Hash do commit exibido na tela "Sobre o App"
- [ ] ✅ Hash do commit corresponde ao código-fonte no Git
- [ ] ✅ Versão publicada corresponde ao código-fonte enviado
- [ ] ✅ APK instalável e funcional

---

## 🆘 TROUBLESHOOTING (SOLUÇÃO DE PROBLEMAS)

### Problema: "firebase: command not found"

**Solução:**
```bash
npm install -g firebase-tools
```

### Problema: "eas: command not found"

**Solução:**
```bash
npm install -g eas-cli
```

### Problema: "App ID not found"

**Solução:**
1. Verifique se você registrou o app Android no Firebase Console
2. Copie o App ID corretamente (formato: `1:123456789:android:abcdef123456`)

### Problema: "Build failed"

**Solução:**
1. Verifique se o `app.json` está correto
2. Verifique se o `eas.json` existe e está configurado
3. Tente fazer build local: `eas build --platform android --profile production --local`

### Problema: "Hash do commit não corresponde"

**Solução:**
1. Execute `npm run git-info` novamente
2. Faça commit das alterações: `git add . && git commit -m "Atualizar hash"`
3. Faça um novo build

### Problema: "Tester não recebeu e-mail"

**Solução:**
1. Verifique se o e-mail está correto
2. Verifique a pasta de spam do professor
3. Tente adicionar novamente via Console Firebase

---

## 📚 RECURSOS ADICIONAIS

- **Documentação Firebase App Distribution:** https://firebase.google.com/docs/app-distribution
- **Documentação EAS Build:** https://docs.expo.dev/build/introduction/
- **Documentação Expo:** https://docs.expo.dev/

---

## ✅ CONCLUSÃO

Após seguir todos os passos acima, você terá:

1. ✅ App publicado no Firebase App Distribution
2. ✅ Professor adicionado como tester
3. ✅ Hash do commit exibido na tela "Sobre o App"
4. ✅ Versão publicada correspondendo ao código-fonte

**Boa sorte com a entrega! 🚀**

