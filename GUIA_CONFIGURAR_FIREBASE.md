# 🔥 GUIA: CONFIGURAR FIREBASE NO PROJETO EXPO

Este guia explica como adicionar o Firebase ao seu projeto Expo/React Native.

---

## ⚠️ IMPORTANTE: Para App Distribution

**Se você só precisa publicar no Firebase App Distribution, NÃO é necessário adicionar o `google-services.json` ou instalar o SDK do Firebase.**

O Firebase App Distribution funciona apenas com o **Firebase CLI** para fazer upload do APK. Você já pode seguir o guia de publicação sem este passo.

**Continue apenas se você quiser usar outros recursos do Firebase** (como Analytics, Crashlytics, etc.).

---

## 📋 PASSO A PASSO: ADICIONAR FIREBASE AO EXPO

### PASSO 1: Baixar o arquivo google-services.json

1. **No Firebase Console**, você já está na etapa de "Fazer o download e adicione o arquivo de configuração"
2. **Clique no botão de download** para baixar o arquivo `google-services.json`
3. **Salve o arquivo** em um local de fácil acesso (ex: Desktop ou Downloads)

### PASSO 2: Criar pasta para o arquivo

No projeto Expo, você precisa criar uma estrutura específica. Siga estes passos:

1. **Abra o terminal/PowerShell** e navegue até a pasta do projeto:
   ```bash
   cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
   ```

2. **Crie a pasta `android`** (se não existir):
   ```bash
   mkdir android
   ```

3. **Crie a pasta `app` dentro de `android`**:
   ```bash
   mkdir android\app
   ```

### PASSO 3: Copiar google-services.json

1. **Copie o arquivo `google-services.json`** que você baixou
2. **Cole na pasta:** `autottu/android/app/google-services.json`

**Estrutura final deve ficar assim:**
```
autottu/
  ├── android/
  │   └── app/
  │       └── google-services.json  ← Arquivo aqui
  ├── app.json
  ├── package.json
  └── ...
```

### PASSO 4: Instalar dependências do Firebase

No terminal, execute:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
npm install firebase @react-native-firebase/app
```

**Nota:** Se você só precisa do App Distribution, pode pular este passo.

### PASSO 5: Configurar app.json para usar o plugin do Firebase

Abra o arquivo `app.json` e adicione o plugin do Firebase na seção `plugins`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#ffffff",
          "sounds": ["./assets/notification.wav"]
        }
      ],
      "@react-native-firebase/app"
    ],
    "android": {
      "package": "com.autottu.app",
      "googleServicesFile": "./android/app/google-services.json"
    }
  }
}
```

### PASSO 6: Verificar configuração

1. **Verifique se o arquivo está no lugar correto:**
   ```bash
   dir android\app\google-services.json
   ```

2. **Verifique se o package name no google-services.json corresponde:**
   - Abra o arquivo `android/app/google-services.json`
   - Procure por `"package_name": "com.autottu.app"`
   - Deve corresponder ao `package` no `app.json`

---

## 🎯 ALTERNATIVA: Usar Expo Config Plugin (Recomendado)

Para projetos Expo, a melhor forma é usar o plugin do Expo. Siga estes passos:

### 1. Instalar o plugin

```bash
npm install expo-build-properties
```

### 2. Atualizar app.json

Adicione o plugin `expo-build-properties` e configure o caminho do `google-services.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#ffffff",
          "sounds": ["./assets/notification.wav"]
        }
      ],
      [
        "expo-build-properties",
        {
          "android": {
            "googleServicesFile": "./android/app/google-services.json"
          }
        }
      ]
    ]
  }
}
```

---

## ✅ VERIFICAÇÃO FINAL

Após seguir os passos acima:

1. ✅ Arquivo `google-services.json` está em `android/app/`
2. ✅ Package name no `google-services.json` corresponde ao `app.json`
3. ✅ Plugin configurado no `app.json`
4. ✅ Dependências instaladas (se necessário)

---

## 🚀 PRÓXIMOS PASSOS

Agora você pode:

1. **Fazer o build do app:**
   ```bash
   eas build --platform android --profile production
   ```

2. **Publicar no Firebase App Distribution:**
   ```bash
   firebase appdistribution:distribute [CAMINHO_DO_APK] --app [APP-ID]
   ```

---

## ⚠️ NOTA IMPORTANTE

**Para App Distribution, você NÃO precisa do google-services.json!**

O Firebase App Distribution é apenas uma ferramenta de distribuição de APKs. Você pode publicar o app sem adicionar o `google-services.json` se não for usar outros recursos do Firebase.

**Use o `google-services.json` apenas se você quiser:**
- Firebase Analytics
- Firebase Crashlytics
- Firebase Cloud Messaging (FCM)
- Outros recursos do Firebase

---

## 🆘 TROUBLESHOOTING

### Erro: "google-services.json not found"

**Solução:**
- Verifique se o arquivo está em `android/app/google-services.json`
- Verifique se o caminho no `app.json` está correto

### Erro: "Package name mismatch"

**Solução:**
- Verifique se o `package` no `app.json` é `com.autottu.app`
- Verifique se o `package_name` no `google-services.json` é `com.autottu.app`

### Erro no build: "Plugin not found"

**Solução:**
- Execute `npm install` novamente
- Verifique se os plugins estão instalados corretamente

---

## 📚 RECURSOS ADICIONAIS

- **Documentação Expo Firebase:** https://docs.expo.dev/guides/using-firebase/
- **Documentação React Native Firebase:** https://rnfirebase.io/
- **Firebase Console:** https://console.firebase.google.com/

---

**Boa sorte! 🚀**

