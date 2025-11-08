# 📋 SEUS VALORES PARA FIREBASE APP DISTRIBUTION

## ✅ SEU APP ID (Já Encontrado!)

**Seu App ID do Firebase:**
```
1:976584900743:android:80f58c917f9c9c19e47822
```

**Onde encontrei:**
- Arquivo: `android/app/google-services.json`
- Campo: `mobilesdk_app_id`

---

## 📍 CAMINHO DO APK (Ainda Não Existe)

**⚠️ IMPORTANTE:** O caminho do APK ainda não existe porque você precisa fazer o build primeiro!

### Como Obter o Caminho do APK:

#### Passo 1: Fazer Build do APK

Execute no terminal:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu

# Atualizar hash do commit ANTES do build
npm run git-info

# Fazer build do APK
eas build --platform android --profile production
```

#### Passo 2: Aguardar o Build Terminar

O build pode levar 30-60 minutos. Quando terminar, você verá:

- Uma URL para download do APK
- Ou o APK será baixado automaticamente

#### Passo 3: Salvar o APK em Local de Fácil Acesso

**Recomendado:** Salve na pasta Downloads:

```
C:\Users\[SEU_USUARIO]\Downloads\autottu.apk
```

**Exemplo real:**
```
C:\Users\Joao\Downloads\autottu.apk
```

**⚠️ IMPORTANTE:** Substitua `[SEU_USUARIO]` pelo seu nome de usuário do Windows!

---

## 🚀 COMANDO COMPLETO (Depois do Build)

Depois que você tiver o APK, use este comando:

```bash
firebase appdistribution:distribute C:\Users\[SEU_USUARIO]\Downloads\autottu.apk --app 1:976584900743:android:80f58c917f9c9c19e47822 --testers "email.professor@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final"
```

**Substitua:**
- `[SEU_USUARIO]` pelo seu nome de usuário do Windows
- `email.professor@fiap.com.br` pelo e-mail real do professor

---

## 📝 EXEMPLO REAL (Depois de Ajustar)

**Exemplo se seu usuário for "Joao":**

```bash
firebase appdistribution:distribute C:\Users\Joao\Downloads\autottu.apk --app 1:976584900743:android:80f58c917f9c9c19e47822 --testers "professor@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final"
```

**Exemplo se seu usuário for "Maria":**

```bash
firebase appdistribution:distribute C:\Users\Maria\Downloads\autottu.apk --app 1:976584900743:android:80f58c917f9c9c19e47822 --testers "professor@fiap.com.br" --release-notes "Versão 1.0.0 - Entrega Final"
```

---

## 🔍 COMO DESCOBRIR SEU NOME DE USUÁRIO DO WINDOWS

### Método 1: Via PowerShell

Abra o PowerShell e execute:

```powershell
$env:USERNAME
```

### Método 2: Via Prompt de Comando

Abra o CMD e execute:

```cmd
echo %USERNAME%
```

### Método 3: Via Explorador de Arquivos

1. Abra o Explorador de Arquivos
2. Vá em `C:\Users\`
3. Veja qual pasta tem seu nome

---

## ✅ RESUMO DOS VALORES

| Item | Valor |
|------|-------|
| **App ID** | `1:976584900743:android:80f58c917f9c9c19e47822` |
| **Caminho do APK** | `C:\Users\[SEU_USUARIO]\Downloads\autottu.apk` |
| **Package Name** | `com.autottu.app` |
| **Project ID** | `autottu-31039` |

---

## 📋 CHECKLIST ANTES DE PUBLICAR

- [ ] ✅ App ID anotado: `1:976584900743:android:80f58c917f9c9c19e47822`
- [ ] ⏳ Build do APK concluído
- [ ] ⏳ APK baixado e salvo
- [ ] ⏳ Caminho completo do APK anotado
- [ ] ⏳ E-mail do professor obtido
- [ ] ⏳ Hash do commit atualizado (`npm run git-info`)

---

## 🚀 PRÓXIMOS PASSOS

1. **Fazer build do APK:**
   ```bash
   cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
   npm run git-info
   eas build --platform android --profile production
   ```

2. **Aguardar build terminar e baixar o APK**

3. **Publicar no Firebase:**
   ```bash
   firebase appdistribution:distribute [CAMINHO_DO_APK] --app 1:976584900743:android:80f58c917f9c9c19e47822 --testers "[EMAIL_PROFESSOR]" --release-notes "Versão 1.0.0 - Entrega Final"
   ```

---

**Boa sorte! 🚀**

