# ⚡ INSTRUÇÕES RÁPIDAS: ADICIONAR FIREBASE AO PROJETO

## 🎯 SITUAÇÃO ATUAL

Você está na etapa 2 do Firebase Console:
- ✅ App Android registrado (`com.autottu.app`)
- ⏳ Precisa adicionar o arquivo `google-services.json`

---

## ⚠️ IMPORTANTE: Você Precisa do google-services.json?

**Para App Distribution (publicar o app): NÃO é necessário!**

Você pode pular esta etapa e ir direto para publicar o APK usando o Firebase CLI.

**Continue apenas se você quiser usar:**
- Firebase Analytics
- Firebase Crashlytics  
- Firebase Cloud Messaging
- Outros recursos do Firebase

---

## 📝 PASSO A PASSO RÁPIDO (Se Quiser Adicionar)

### 1. Baixar o arquivo google-services.json

1. No Firebase Console, clique em **"Baixar google-services.json"**
2. Salve o arquivo em um local de fácil acesso (ex: Desktop)

### 2. Criar estrutura de pastas

Abra o PowerShell/Terminal e execute:

```bash
cd C:\FIAP-2TDSPH\AUTOTTU-1\autottu
mkdir android
mkdir android\app
```

### 3. Copiar o arquivo

1. **Copie** o arquivo `google-services.json` que você baixou
2. **Cole** na pasta: `C:\FIAP-2TDSPH\AUTOTTU-1\autottu\android\app\google-services.json`

**Estrutura final:**
```
autottu/
  └── android/
      └── app/
          └── google-services.json  ← Arquivo aqui
```

### 4. Atualizar app.json (Opcional)

Se você quiser usar recursos do Firebase, adicione no `app.json`:

```json
{
  "expo": {
    "android": {
      "package": "com.autottu.app",
      "versionCode": 1,
      "googleServicesFile": "./android/app/google-services.json"
    }
  }
}
```

---

## ✅ VERIFICAÇÃO

Execute no terminal para verificar se o arquivo está no lugar:

```bash
dir android\app\google-services.json
```

Se aparecer o arquivo, está correto! ✅

---

## 🚀 PRÓXIMOS PASSOS

Agora você pode:

1. **Continuar no Firebase Console** (etapas 3 e 4 são opcionais para App Distribution)
2. **Seguir o guia de publicação:** `GUIA_PUBLICACAO_DETALHADO.md`

---

## 💡 DICA

**Para App Distribution, você pode pular as etapas 3 e 4 do Firebase Console!**

Apenas anote o **App ID** e continue com a publicação do APK.

---

**Precisa de mais ajuda? Consulte `GUIA_CONFIGURAR_FIREBASE.md` para instruções detalhadas.**

