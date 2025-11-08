# 📱 AutoTTU

O **AutoTTU** é uma solução tecnológica desenvolvida para organização e controle de um pátio de motos. O sistema permite gerenciar check-ins, cadastrar motos e usuários, além de fornecer uma interface intuitiva para operadores do pátio.

## 💡 Solução

> Começaremos pela instalação de sensores e scanners em cada uma das vagas do pátio.
>Os sensores identificarão a presença de uma moto e, caso isso ocorra, o scanner fará a leitura do ID da moto por meio de um QR code pré-instalado, enviando os dados para o sistema. Dessa forma, saberemos exatamente qual >a localização de cada moto.
>Para evitar erros na identificação, realizaremos um check-in para cada moto na entrada do pátio. Nesse momento, os QR codes serão gerados (cde acordo com o id da moto), os danos serão verificados, o horário de entrada >será registrado e fotos serão tiradas. Em caso de ausência do ID por dano ou perda, um novo será gerado.
>Por meio desse sistema, os operadores do pátio poderão acessar as informações por uma interface intuitiva, na qual também realizarão o check-in.
>Para garantir o bom funcionamento do sistema, uma IA tirará fotos do pátio a cada hora e reportará possíveis erros, como a ausência de uma moto em uma vaga que deveria estar ocupada, falhas ou danos em sensores ou >scanners, entre outros.
>Atráves desse sistema, iremos garantir o bom funcionamento do pátio e a organização de forma automatizada, otimizando tempo e promovendo um ambiente mais eficiente e confiável

---
## Links Importantes

## Links Importantes

- Vídeo demonstrativo: [YouTube](https://youtu.be/JXR4s7E06tA)  
- Firebase App Distribution: [Download APK/AAB](https://appdistribution.firebase.google.com/testerapps/1:976584900743:android:80f58c917f9c9c19e47822/releases/1n6cnmjrd6gpo?utm_source=firebase-console)  
  - Acesso concedido ao e‑mail: `profantonio.neto@fiap.com.br` (convite enviado)

---

## 🚀 Funcionalidades

### Autenticação e Usuários
- ✅ Login e autenticação de usuários
- ✅ Cadastro de novos usuários
- ✅ Gestão de perfil de usuários
- ✅ Visualização e edição de funcionários cadastrados

### Gestão de Motos
- ✅ Cadastro de motos (placa, modelo, marca, ano)
- ✅ Visualização de motos cadastradas
- ✅ Edição e exclusão de motos
- ✅ Controle de status (ativa/inativa)

### Check-in
- ✅ Realização de check-in de motos
- ✅ Registro de horário de entrada
- ✅ Verificação de danos (moto violada)
- ✅ Registro de observações
- ✅ Upload de fotos da moto
- ✅ Visualização de histórico de check-ins

### Recursos Adicionais
- ✅ Suporte a temas claro/escuro
- ✅ Internacionalização (i18n) - Português e Espanhol
- ✅ Notificações push
- ✅ Interface responsiva e moderna

---

## 🏗️ Estrutura de Pastas

```
autottu/
├── 📁 android/                    # Configurações Android
│   └── app/
│       └── google-services.json
│
├── 📁 assets/                      # Recursos estáticos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── mottu-zero.webp
│   └── splash-icon.png
│
├── 📁 componentes/                 # Componentes reutilizáveis
│   └── (vazio)
│
├── 📁 contexto/                    # Contextos React
│   └── contextoPrincipal.ts
│
├── 📁 control/                     # Controladores de lógica
│   ├── appControl.ts
│   ├── checkInControl.ts
│   ├── loginControl.ts
│   ├── motosControl.ts
│   ├── perfilControl.ts
│   └── usuarioControl.ts
│
├── 📁 estilos/                     # Estilos e temas
│   ├── estilos.ts
│   └── temas.ts
│
├── 📁 fetcher/                     # Camada de requisições HTTP
│   ├── checkinFetcher.ts
│   ├── loginFetcher.ts
│   ├── motosFetcher.ts
│   └── usuarioFetcher.ts
│
├── 📁 i18n/                        # Internacionalização
│   ├── config.ts
│   ├── es/
│   │   └── es.json
│   └── pt/
│       └── pt.json
│
├── 📁 model/                       # Modelos de dados
│   ├── CheckIn.ts
│   ├── Motos.ts
│   └── Usuario.ts
│
├── 📁 navigation/                  # Configuração de navegação
│   └── navigationParams.ts
│
├── 📁 service/                     # Serviços de negócio
│   ├── checkinService.ts
│   ├── loginService.ts
│   ├── motosService.ts
│   ├── notificacaoService.ts
│   └── usuarioService.ts
│
├── 📁 utils/                       # Utilitários
│   └── gitInfo.ts
│
├── 📁 view/                        # Telas/Views da aplicação
│   ├── AlterarPerfil.tsx
│   ├── CadastroUsuarioView.tsx
│   ├── CheckInView.tsx
│   ├── LoginView.tsx
│   ├── MotosView.tsx
│   ├── PerfilView.tsx
│   └── SobreAppView.tsx
│
├── 📁 scripts/                     # Scripts auxiliares
│   └── update-git-info.js
│
├── 📄 App.tsx                      # Componente principal
├── 📄 app.json                     # Configuração do Expo
├── 📄 index.ts                     # Ponto de entrada
├── 📄 package.json                 # Dependências e scripts
├── 📄 tsconfig.json                # Configuração TypeScript
└── 📄 README.md                    # Documentação
```

---

## 👥 Integrantes do Projeto

| Nome | RM | GitHub |
|------|----|--------|
| Maria Eduarda Brigidio | RM558575 |
| André Luís Mesquita de Abreu | RM558159 |
| Rafael Bompadre Lima | RM556459 |

---

## 🛠️ Tecnologias e Ferramentas

### Principais
- **React Native** - Framework para desenvolvimento mobile
- **TypeScript** - Linguagem de programação
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP
- **i18next** - Internacionalização

### Bibliotecas Principais
- `@react-navigation/native` - Navegação nativa
- `@react-navigation/bottom-tabs` - Navegação por abas
- `@react-navigation/native-stack` - Navegação em pilha
- `@react-native-async-storage/async-storage` - Armazenamento local
- `expo-notifications` - Notificações push
- `expo-localization` - Localização
- `react-i18next` - Internacionalização React
- `yup` - Validação de schemas
- `date-fns` - Manipulação de datas

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)
- Conta na Expo (opcional, para desenvolvimento)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/dudabrigidio/Autottu.git
cd Autottu/autottu
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o projeto**
```bash
# Inicia o servidor Expo
npx expo start

# Ou use os scripts do package.json
npm start        # Inicia o servidor Expo
npm run android  # Inicia no Android
npm run ios      # Inicia no iOS
npm run web      # Inicia no navegador
```

### Executando no Dispositivo

- **Android**: Escaneie o QR code com o app Expo Go ou execute `npm run android` com um emulador/dispositivo conectado
- **iOS**: Escaneie o QR code com a câmera do iPhone ou execute `npm run ios` com um simulador/dispositivo conectado
- **Web**: Execute `npm run web` para abrir no navegador

---

## 🏛️ Arquitetura do Projeto

O projeto segue o padrão **MVC/MVVM** com separação clara de responsabilidades:

- **Model** (`model/`) - Entidades de dados e modelos
- **View** (`view/`) - Interfaces de usuário e telas
- **Control** (`control/`) - Lógica de negócio e controle
- **Service** (`service/`) - Serviços de aplicação
- **Fetcher** (`fetcher/`) - Camada de requisições HTTP

---

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Inicia no Android
npm run ios        # Inicia no iOS
npm run web        # Inicia no navegador
npm run git-info   # Atualiza informações do Git
```

---

## 📄 Licença

Este projeto é privado e desenvolvido para fins acadêmicos.

---

**Desenvolvido pela equipe AutoTTU - 2025**
