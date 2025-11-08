# 🚀 GUIA PASSO A PASSO DETALHADO - PUBLICAÇÃO NO FIREBASE APP DISTRIBUTION

Este guia fornece instruções **COMPLETAS E DETALHADAS** para publicar o aplicativo AUTOTTU no Firebase App Distribution, atendendo a todos os critérios de avaliação.

---

## 📋 ÍNDICE

1. [Pré-requisitos](#1-pré-requisitos)
2. [Passo 1: Verificar e Atualizar Hash do Commit](#2-passo-1-verificar-e-atualizar-hash-do-commit)
3. [Passo 2: Configurar Projeto no Firebase](#3-passo-2-configurar-projeto-no-firebase)
4. [Passo 3: Instalar Ferramentas Necessárias](#4-passo-3-instalar-ferramentas-necessárias)
5. [Passo 4: Configurar EAS Build](#5-passo-4-configurar-eas-build)
6. [Passo 5: Fazer Build do APK](#6-passo-5-fazer-build-do-apk)
7. [Passo 6: Publicar no Firebase App Distribution](#7-passo-6-publicar-no-firebase-app-distribution)
8. [Passo 7: Adicionar Professor como Tester](#8-passo-7-adicionar-professor-como-tester)
9. [Passo 8: Verificar Correspondência com Código-Fonte](#9-passo-8-verificar-correspondência-com-código-fonte)
10. [Troubleshooting](#10-troubleshooting-solução-de-problemas)

---

## 1. PRÉ-REQUISITOS

Antes de começar, verifique se você tem:

### ✅ Contas Necessárias
- [ ] Conta Google (para acessar Firebase Console)
- [ ] Conta Expo (gratuita - criar em https://expo.dev/signup se não tiver)

### ✅ Software Instalado
- [ ] Node.js versão 18 ou superior
  - Verificar: `node --version`
  - Instalar: https://nodejs.org/
- [ ] Git instalado e configurado
  - Verificar: `git --version`
  - Instalar: https://git-scm.com/
- [ ] NPM (vem com Node.js)
  - Verificar: `npm --version`

### ✅ Projeto Preparado
- [ ] Projeto Expo configurado
- [ ] Código commitado no Git
- [ ] `app.json` configurado (✅ já está pronto)

---

## 2. PASSO 1: VERIFICAR E ATUALIZAR HASH DO COMMIT

**⏱️ Tempo estimado:** 2 minutos

**🎯 Objetivo:** Garantir que o hash do commit atual seja exibido na tela "Sobre o App"

### 2.1 Abrir Terminal/PowerShell

1. Abra o **PowerShell** ou **Prompt de Comando** no Windows
2. Navegue até a pasta do projeto:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
```

### 2.2 Verificar Status do Git

Execute para ver se há alterações não commitadas:

```bash
git status
```

**O que você deve ver:**
- Se aparecer "nothing to commit, working tree clean" → ✅ Tudo commitado
- Se aparecer arquivos em vermelho → ⚠️ Precisa fazer commit primeiro

**Se precisar fazer commit:**

```bash
git add .
git commit -m "Preparar versão para publicação"
```

### 2.3 Obter Hash do Commit Atual

Execute para ver o hash do commit atual:

```bash
git rev-parse --short HEAD
```

**Exemplo de saída:**
```
93ae342
```

**⚠️ ANOTE ESTE HASH!** Você precisará dele depois para verificar se corresponde ao que aparece no app.

### 2.4 Atualizar Arquivo gitInfo.ts

Execute o script que atualiza automaticamente o arquivo `utils/gitInfo.ts`:

```bash
npm run git-info
```

**O que este comando faz:**
- Executa o script `scripts/update-git-info.js`
- Obtém informações do Git (hash, branch, data)
- Atualiza o arquivo `utils/gitInfo.ts`

### 2.5 Verificar se Foi Atualizado

Abra o arquivo `autottu/utils/gitInfo.ts` e verifique se o hash corresponde ao que você anotou:

```typescript
export const gitInfo = {
    commitHash: '93ae342',  // ← Deve corresponder ao hash do passo 2.3
    commitHashFull: '93ae34218e5762eeded672f7d31c1e60e3245af6',
    branch: 'main',
    lastCommitDate: '2025-11-08'
};
```

**✅ Se o hash corresponder, está correto!**

### 2.6 Fazer Commit da Atualização (Opcional mas Recomendado)

Se o arquivo `gitInfo.ts` foi modificado, faça commit:

```bash
git add utils/gitInfo.ts
git commit -m "Atualizar hash do commit para publicação"
```

**✅ Passo 1 concluído!**

---

## 3. PASSO 2: CONFIGURAR PROJETO NO FIREBASE

**⏱️ Tempo estimado:** 15 minutos

**🎯 Objetivo:** Criar projeto no Firebase e habilitar App Distribution

### 3.1 Acessar Firebase Console

1. Abra o navegador e acesse: **https://console.firebase.google.com/**
2. Faça login com sua conta Google

### 3.2 Criar Novo Projeto

1. Clique no botão **"Adicionar projeto"** ou **"Create a project"**
2. **Passo 1 - Nome do projeto:**
   - Digite: `autottu` (ou outro nome de sua escolha)
   - Clique em **"Continuar"** ou **"Continue"**

3. **Passo 2 - Google Analytics (Opcional):**
   - Você pode **desabilitar** o Google Analytics (não é necessário)
   - Ou deixar habilitado (não afeta a publicação)
   - Clique em **"Continuar"** ou **"Continue"**

4. **Passo 3 - Configurar Analytics (se habilitou):**
   - Escolha uma conta (ou crie nova)
   - Clique em **"Criar projeto"** ou **"Create project"**

5. **Aguarde a criação do projeto** (pode levar alguns segundos)
6. Quando aparecer "Seu projeto está pronto", clique em **"Continuar"** ou **"Continue"**

### 3.3 Habilitar App Distribution

1. No menu lateral esquerdo, procure por **"App Distribution"**
   - Se não aparecer, clique no ícone **"☰"** (menu hambúrguer) para expandir

2. Clique em **"App Distribution"**

3. Se for a primeira vez:
   - Clique em **"Get started"** ou **"Começar"**
   - Leia e aceite os termos e condições
   - Clique em **"Aceitar"** ou **"Accept"**

**✅ App Distribution habilitado!**

### 3.4 Registrar App Android

1. No Firebase Console, clique no **ícone de engrenagem (⚙️)** no canto superior esquerdo
2. Clique em **"Configurações do projeto"** ou **"Project settings"**

3. Role a página até encontrar a seção **"Seus apps"** ou **"Your apps"**

4. Clique no ícone **Android (🟢)** para adicionar um app Android

5. **Preencha o formulário:**
   - **Nome do pacote Android:** `com.autottu.app`
     - ⚠️ **IMPORTANTE:** Deve ser exatamente este valor (sem espaços, sem maiúsculas)
   - **Apelido do app (opcional):** `AUTOTTU`
   - **Certificado de assinatura de depuração SHA-1:** Deixe em branco (opcional)

6. Clique em **"Registrar app"** ou **"Register app"**

7. **⚠️ IMPORTANTE - Anotar App ID:**
   - Após registrar, você verá uma tela com informações do app
   - Procure por **"App ID"** ou **"ID do aplicativo"**
   - O formato será algo como: `1:123456789012:android:abcdef1234567890abcdef`
   - **COPIE E ANOTE ESTE APP ID!** Você precisará dele depois

**Exemplo de onde encontrar o App ID:**
```
App ID
1:123456789012:android:abcdef1234567890abcdef
```

**✅ Passo 2 concluído!**

---

## 4. PASSO 3: INSTALAR FERRAMENTAS NECESSÁRIAS

**⏱️ Tempo estimado:** 5 minutos

**🎯 Objetivo:** Instalar Firebase CLI e EAS CLI

### 3.1 Instalar Firebase CLI

No terminal/PowerShell, execute:

```bash
npm install -g firebase-tools
```

**O que este comando faz:**
- Instala o Firebase CLI globalmente
- Permite usar comandos `firebase` no terminal

**Aguarde a instalação terminar** (pode levar 1-2 minutos)

**Verificar se foi instalado:**

```bash
firebase --version
```

**Deve aparecer algo como:** `13.0.0` (número da versão)

### 3.2 Fazer Login no Firebase

Execute:

```bash
firebase login
```

**O que vai acontecer:**
1. Abrirá seu navegador automaticamente
2. Você verá uma tela pedindo permissão
3. Clique em **"Permitir"** ou **"Allow"**
4. Volte ao terminal e você verá: **"✔ Success! Logged in as [seu-email]"**

**✅ Login no Firebase concluído!**

### 3.3 Instalar EAS CLI

Execute:

```bash
npm install -g eas-cli
```

**O que este comando faz:**
- Instala o EAS CLI (Expo Application Services) globalmente
- Permite fazer builds do app Expo

**Aguarde a instalação terminar**

**Verificar se foi instalado:**

```bash
eas --version
```

**Deve aparecer algo como:** `7.0.0` (número da versão)

### 3.4 Fazer Login no Expo

Execute:

```bash
eas login
```

**O que vai acontecer:**
1. Pode abrir o navegador ou pedir para você acessar um link
2. Se abrir o navegador, faça login com sua conta Expo
3. Se pedir um link, acesse o link fornecido e faça login
4. Volte ao terminal e você verá: **"✔ Logged in as [seu-email]"**

**Se não tiver conta Expo:**
1. Acesse: https://expo.dev/signup
2. Crie uma conta gratuita
3. Volte e execute `eas login` novamente

**✅ Passo 3 concluído!**

---

## 5. PASSO 4: CONFIGURAR EAS BUILD

**⏱️ Tempo estimado:** 5 minutos

**🎯 Objetivo:** Configurar EAS Build para gerar APK

### 4.1 Navegar até a Pasta do Projeto

No terminal, certifique-se de estar na pasta correta:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
```

### 4.2 Inicializar EAS Build

Execute:

```bash
eas build:configure
```

**O que vai acontecer:**
1. Pode perguntar se você quer criar o arquivo `eas.json`
2. Digite **"y"** (yes) e pressione Enter
3. Pode perguntar sobre algumas configurações - aceite as padrões (pressione Enter)

**O que este comando faz:**
- Cria o arquivo `eas.json` na raiz do projeto
- Configura os perfis de build (production, development)

### 4.3 Verificar Arquivo eas.json

Abra o arquivo `autottu/eas.json` e verifique se está assim:

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

**Se o arquivo estiver diferente ou não existir, crie manualmente:**

1. Crie um arquivo chamado `eas.json` na pasta `autottu`
2. Cole o conteúdo acima
3. Salve o arquivo

**✅ Passo 4 concluído!**

---

## 6. PASSO 5: FAZER BUILD DO APK

**⏱️ Tempo estimado:** 30-60 minutos (depende da fila do Expo)

**🎯 Objetivo:** Gerar o arquivo APK do aplicativo

### 5.1 ⚠️ IMPORTANTE: Atualizar Hash do Commit ANTES do Build

**SEMPRE execute este passo antes de fazer o build!**

```bash
npm run git-info
```

Isso garante que o hash do commit correto será incluído no APK.

### 5.2 Verificar se Está na Pasta Correta

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
```

### 5.3 Iniciar Build de Produção

Execute:

```bash
eas build --platform android --profile production
```

**O que vai acontecer:**

1. **Pode perguntar sobre credenciais:**
   - Se perguntar sobre Android credentials, escolha: **"Set up a new one"** ou **"Let EAS handle it"**
   - Pressione Enter para aceitar

2. **Pode perguntar sobre o tipo de build:**
   - Escolha: **"Build on Expo servers"** (recomendado)
   - Ou: **"Build on your machine"** (mais rápido, mas requer mais configuração)

3. **O build começará:**
   - Você verá uma URL para acompanhar o progresso
   - Exemplo: `https://expo.dev/accounts/[seu-usuario]/builds/[build-id]`

### 5.4 Acompanhar o Progresso do Build

**Opção 1 - Via Terminal:**
- O terminal mostrará o progresso
- Aguarde até aparecer "Build finished"

**Opção 2 - Via Navegador:**
- Acesse a URL fornecida
- Você verá o status do build em tempo real
- Aguarde até aparecer "Finished" ou "Completed"

**⏱️ Tempo de espera:** 15-30 minutos (normalmente)

### 5.5 Baixar o APK

Quando o build terminar:

**Opção 1 - Download Automático:**
- O terminal pode mostrar um link para download
- Clique no link ou copie e cole no navegador

**Opção 2 - Via Dashboard Expo:**
1. Acesse: https://expo.dev/accounts/[seu-usuario]/builds
2. Encontre o build que acabou de terminar
3. Clique em **"Download"** ou no ícone de download

**Opção 3 - Via URL Direta:**
- O terminal mostrará uma URL direta para o APK
- Copie e cole no navegador para baixar

### 5.6 Salvar o APK em Local de Fácil Acesso

**Recomendado:** Salve o APK na pasta Downloads:

```
C:\Users\[SeuUsuario]\Downloads\autottu.apk
```

**⚠️ ANOTE O CAMINHO COMPLETO DO APK!** Você precisará dele no próximo passo.

**✅ Passo 5 concluído!**

---

## 7. PASSO 6: PUBLICAR NO FIREBASE APP DISTRIBUTION

**⏱️ Tempo estimado:** 10 minutos

**🎯 Objetivo:** Fazer upload do APK para o Firebase App Distribution

### 6.1 Obter Informações Necessárias

Você precisa ter em mãos:

1. **Caminho completo do APK:**
   - Exemplo: `C:\Users\Joao\Downloads\autottu.apk`

2. **App ID do Firebase:**
   - O que você anotou no Passo 2.4
   - Formato: `1:123456789012:android:abcdef1234567890abcdef`

3. **Hash do commit atual:**
   - Execute: `git rev-parse --short HEAD`
   - Exemplo: `93ae342`

### 6.2 Publicar via Firebase CLI (Método Recomendado)

No terminal/PowerShell, execute:

```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] --app [APP-ID] --release-notes "Versão 1.0.0 - Entrega Final - Hash: [HASH]"
```

**Substitua:**
- `[CAMINHO_DO_APK]` pelo caminho completo do seu APK
- `[APP-ID]` pelo App ID do Firebase
- `[HASH]` pelo hash do commit atual

**Exemplo REAL (copie e adapte para seu caso):**

```bash
firebase appdistribution:distribute C:\Users\Joao\Downloads\autottu.apk --app 1:123456789012:android:abcdef1234567890abcdef --release-notes "Versão 1.0.0 - Entrega Final - Hash: 93ae342"
```

**⚠️ IMPORTANTE - No Windows PowerShell:**
- Se o caminho tiver espaços, coloque entre aspas:
  ```bash
  firebase appdistribution:distribute "C:\Users\Joao Silva\Downloads\autottu.apk" --app 1:123456789012:android:abcdef1234567890abcdef --release-notes "Versão 1.0.0 - Entrega Final - Hash: 93ae342"
  ```

**O que vai acontecer:**
1. O Firebase fará upload do APK
2. Você verá o progresso no terminal
3. Quando terminar, aparecerá: **"✔ Uploaded release successfully"**

**✅ Publicação concluída!**

### 6.3 Publicar via Console Firebase (Método Alternativo)

Se preferir usar a interface web:

1. **Acesse Firebase Console:** https://console.firebase.google.com/
2. **Selecione seu projeto**
3. **Vá em "App Distribution"** no menu lateral
4. **Clique em "Distribute app"** ou **"Upload release"**
5. **Faça upload do APK:**
   - Clique em **"Escolher arquivo"** ou **"Choose file"**
   - Selecione o arquivo APK
   - Aguarde o upload terminar
6. **Preencha as informações:**
   - **Release notes:** `Versão 1.0.0 - Entrega Final - Hash: [HASH]`
   - Substitua `[HASH]` pelo hash do commit atual
7. **Clique em "Distribute"** ou **"Distribuir"**

**✅ Passo 6 concluído!**

---

## 8. PASSO 7: ADICIONAR PROFESSOR COMO TESTER

**⏱️ Tempo estimado:** 5 minutos

**🎯 Objetivo:** Adicionar o e-mail do professor para que ele possa testar o app

### 7.1 Obter E-mail do Professor

**⚠️ IMPORTANTE:** Você precisa do e-mail do professor fornecido pelo professor ou pela instituição.

**Exemplo:** `professor@fiap.com.br`

### 7.2 Adicionar via Firebase CLI (Método Recomendado)

Execute o mesmo comando do Passo 6, mas adicione o parâmetro `--testers`:

```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] --app [APP-ID] --testers "email.professor@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final - Hash: [HASH]"
```

**Exemplo REAL:**

```bash
firebase appdistribution:distribute C:\Users\Joao\Downloads\autottu.apk --app 1:123456789012:android:abcdef1234567890abcdef --testers "professor@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final - Hash: 93ae342"
```

**Se já publicou antes, pode adicionar testers sem fazer upload novamente:**

1. Acesse Firebase Console
2. Vá em "App Distribution"
3. Clique na release que você publicou
4. Vá na aba "Testers"
5. Clique em "Add testers"
6. Digite o e-mail do professor
7. Clique em "Add"

### 7.3 Adicionar via Console Firebase (Método Alternativo)

1. **Acesse Firebase Console:** https://console.firebase.google.com/
2. **Vá em "App Distribution"**
3. **Clique na release que você publicou** (a mais recente)
4. **Vá na aba "Testers"** ou **"Testadores"**
5. **Clique em "Add testers"** ou **"Adicionar testadores"**
6. **Digite o e-mail do professor:**
   - Exemplo: `professor@fiap.com.br`
7. **Clique em "Add"** ou **"Adicionar"**

### 7.4 Adicionar Múltiplos Testers

Se precisar adicionar vários e-mails, separe por vírgula:

**Via CLI:**
```bash
firebase appdistribution:distribute [CAMINHO_DO_APK] --app [APP-ID] --testers "professor1@fiap.com.br,professor2@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final"
```

**Via Console:**
- Digite os e-mails separados por vírgula ou um por linha

### 7.5 Verificar se o Professor Recebeu o E-mail

**O que acontece:**
- O Firebase envia um e-mail automaticamente para o professor
- O e-mail contém um link para baixar o app
- O professor pode instalar diretamente no dispositivo Android

**Se o professor não recebeu:**
- Verifique se o e-mail está correto
- Peça para verificar a pasta de spam
- Tente adicionar novamente

**✅ Passo 7 concluído!**

---

## 9. PASSO 8: VERIFICAR CORRESPONDÊNCIA COM CÓDIGO-FONTE

**⏱️ Tempo estimado:** 10 minutos

**🎯 Objetivo:** Garantir que a versão publicada corresponde exatamente ao código-fonte

### 8.1 Verificar Hash do Commit no Git

No terminal, execute:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
git rev-parse --short HEAD
```

**Anote o hash que aparece** (exemplo: `93ae342`)

### 8.2 Verificar Hash no Arquivo gitInfo.ts

Abra o arquivo `autottu/utils/gitInfo.ts` e verifique o hash:

```typescript
export const gitInfo = {
    commitHash: '93ae342',  // ← Deve corresponder ao hash do passo 8.1
    ...
};
```

**✅ Se corresponder, está correto!**

### 8.3 Instalar o APK em um Dispositivo Android

**Opção 1 - Via Link do Firebase:**
- O professor receberá um link por e-mail
- Você também pode acessar o link no Firebase Console
- Abra o link no dispositivo Android
- Baixe e instale o APK

**Opção 2 - Transferir Manualmente:**
- Transfira o APK para o dispositivo Android (via USB, e-mail, etc.)
- Abra o arquivo no dispositivo
- Permita instalação de fontes desconhecidas (se solicitado)
- Instale o app

### 8.4 Verificar Hash na Tela "Sobre o App"

1. **Abra o app AUTOTTU** no dispositivo Android
2. **Faça login** (se necessário)
3. **Navegue até a tela "Sobre o App":**
   - Se estiver logado: vá na aba "SobreApp" (ícone de informação)
   - Se não estiver logado: pode estar na tela de login ou em outro lugar
4. **Procure pela linha "Commit:"** ou **"Commit Hash:"**
5. **Compare o hash exibido** com o hash do passo 8.1

**✅ Se os hashes corresponderem, está tudo correto!**

**Exemplo do que você deve ver na tela:**
```
Commit: 93ae342
```

**E no terminal:**
```bash
$ git rev-parse --short HEAD
93ae342
```

**✅ Se ambos forem iguais, a correspondência está correta!**

### 8.5 Verificar Outras Informações

Na tela "Sobre o App", verifique também:
- ✅ Versão: `1.0.0`
- ✅ Branch: `main` (ou a branch que você usou)
- ✅ Data do commit: deve corresponder à data do último commit

**✅ Passo 8 concluído!**

---

## 10. TROUBLESHOOTING (SOLUÇÃO DE PROBLEMAS)

### ❌ Problema: "firebase: command not found"

**Causa:** Firebase CLI não está instalado ou não está no PATH

**Solução:**
```bash
npm install -g firebase-tools
```

Se ainda não funcionar, feche e abra o terminal novamente.

---

### ❌ Problema: "eas: command not found"

**Causa:** EAS CLI não está instalado ou não está no PATH

**Solução:**
```bash
npm install -g eas-cli
```

Se ainda não funcionar, feche e abra o terminal novamente.

---

### ❌ Problema: "App ID not found" ou "Invalid app ID"

**Causa:** App ID incorreto ou app não foi registrado no Firebase

**Solução:**
1. Acesse Firebase Console
2. Vá em "Project Settings" > "Your apps"
3. Verifique se o app Android está registrado
4. Copie o App ID corretamente (formato: `1:123456789:android:abcdef123456`)
5. Certifique-se de que não há espaços ou caracteres extras

---

### ❌ Problema: "Build failed" ou erro no build

**Causa:** Problema na configuração ou no código

**Solução:**
1. Verifique se o `app.json` está correto:
   ```bash
   cd autottu
   cat app.json
   ```
2. Verifique se o `eas.json` existe e está correto
3. Tente fazer build local:
   ```bash
   eas build --platform android --profile production --local
   ```
4. Verifique os logs de erro no dashboard do Expo

---

### ❌ Problema: "Hash do commit não corresponde"

**Causa:** Hash não foi atualizado antes do build

**Solução:**
1. Execute `npm run git-info` novamente
2. Faça commit:
   ```bash
   git add utils/gitInfo.ts
   git commit -m "Atualizar hash do commit"
   ```
3. Faça um novo build:
   ```bash
   npm run git-info
   eas build --platform android --profile production
   ```

---

### ❌ Problema: "Tester não recebeu e-mail"

**Causa:** E-mail incorreto ou problema no envio

**Solução:**
1. Verifique se o e-mail está correto (sem espaços, sem erros de digitação)
2. Peça para o professor verificar a pasta de spam
3. Tente adicionar novamente via Console Firebase
4. Verifique se o e-mail do professor está ativo

---

### ❌ Problema: "APK não instala no dispositivo"

**Causa:** Configurações de segurança do Android

**Solução:**
1. No dispositivo Android, vá em "Configurações" > "Segurança"
2. Ative "Fontes desconhecidas" ou "Instalar apps de fontes desconhecidas"
3. Tente instalar novamente

---

### ❌ Problema: "Erro ao fazer login no Firebase"

**Causa:** Problema de autenticação

**Solução:**
1. Tente fazer logout e login novamente:
   ```bash
   firebase logout
   firebase login
   ```
2. Limpe o cache:
   ```bash
   firebase logout
   # Feche o terminal
   # Abra novamente
   firebase login
   ```

---

### ❌ Problema: "Erro ao fazer login no Expo"

**Causa:** Problema de autenticação ou conta não criada

**Solução:**
1. Verifique se você tem conta Expo: https://expo.dev/
2. Se não tiver, crie uma conta gratuita
3. Tente fazer logout e login novamente:
   ```bash
   eas logout
   eas login
   ```

---

## ✅ CHECKLIST FINAL DE VERIFICAÇÃO

Antes de considerar a publicação completa, verifique:

- [ ] ✅ Hash do commit atualizado (`npm run git-info`)
- [ ] ✅ Código commitado no Git
- [ ] ✅ Firebase configurado e App ID anotado
- [ ] ✅ Ferramentas instaladas (Firebase CLI, EAS CLI)
- [ ] ✅ Login realizado (Firebase e Expo)
- [ ] ✅ EAS Build configurado (`eas.json` criado)
- [ ] ✅ Build do APK concluído com sucesso
- [ ] ✅ APK baixado e salvo
- [ ] ✅ App publicado no Firebase App Distribution
- [ ] ✅ Professor adicionado como tester
- [ ] ✅ Hash do commit verificado na tela "Sobre o App"
- [ ] ✅ Hash do app corresponde ao hash do Git
- [ ] ✅ Versão publicada corresponde ao código-fonte

---

## 📚 RECURSOS ADICIONAIS

- **Documentação Firebase App Distribution:** https://firebase.google.com/docs/app-distribution
- **Documentação EAS Build:** https://docs.expo.dev/build/introduction/
- **Documentação Expo:** https://docs.expo.dev/
- **Firebase Console:** https://console.firebase.google.com/
- **Expo Dashboard:** https://expo.dev/

---

## 🎉 CONCLUSÃO

Após seguir todos os passos acima, você terá:

1. ✅ App publicado no Firebase App Distribution
2. ✅ Professor adicionado como tester
3. ✅ Hash do commit exibido na tela "Sobre o App"
4. ✅ Versão publicada correspondendo ao código-fonte

**Parabéns! Sua publicação está completa! 🚀**

---

## 📞 PRECISA DE AJUDA?

Se encontrar problemas não listados aqui:

1. Verifique os logs de erro no terminal
2. Consulte a documentação oficial do Firebase e Expo
3. Verifique se todas as dependências estão instaladas
4. Certifique-se de estar usando as versões corretas das ferramentas

**Boa sorte com a entrega! 🎓**

