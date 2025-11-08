# 📱 AUTOTTU

> Desenvolvemos a AutoTTU, uma solução tecnológica completa, para organização e controle de um pátio de motos.

## 💡 Solução

> Começaremos pela instalação de sensores e scanners em cada uma das vagas do pátio.
>Os sensores identificarão a presença de uma moto e, caso isso ocorra, o scanner fará a leitura do ID da moto por meio de um QR code pré-instalado, enviando os dados para o sistema. Dessa forma, saberemos exatamente qual >a localização de cada moto.
>Para evitar erros na identificação, realizaremos um check-in para cada moto na entrada do pátio. Nesse momento, os QR codes serão gerados (cde acordo com o id da moto), os danos serão verificados, o horário de entrada >será registrado e fotos serão tiradas. Em caso de ausência do ID por dano ou perda, um novo será gerado.
>Por meio desse sistema, os operadores do pátio poderão acessar as informações por uma interface intuitiva, na qual também realizarão o check-in.
>Para garantir o bom funcionamento do sistema, uma IA tirará fotos do pátio a cada hora e reportará possíveis erros, como a ausência de uma moto em uma vaga que deveria estar ocupada, falhas ou danos em sensores ou >scanners, entre outros.
>Atráves desse sistema, iremos garantir o bom funcionamento do pátio e a organização de forma automatizada, otimizando tempo e promovendo um ambiente mais eficiente e confiável

---

## 🧪 Integrantes do Projeto

Maria Eduarda Brigidio - RM558575 

André Luís Mesquita de Abreu- RM558159

Rafael Bompadre Lima - RM556459

---

## 🚀 Tecnologias e Ferramentas

- React Native
- TypeScript / JavaScript
- Expo / CLI
- Bibliotecas usadas (ex: React Navigation, AsyncStorage, TabNavigator, etc.)


---

## ⚙️ Como Rodar

### Pré-requisitos

- Node.js
- Expo CLI ou React Native CLI
- Android Studio ou emulador iOS
- Conta na Expo (se aplicável)

### Passos

```bash
# Clone o repositório
git clone https://github.com/dudabrigidio/Autottu.git

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
npm run web
# ou
npm run android
```

### 🏗️ Arquitetura do Projeto

Padrão MVC/MVVM:
Model → model/ (entidades de dados)
View → view/ (interfaces de usuário)
Control → control/ (lógica de negócio)
Service → service/ (serviços de aplicação)
Fetcher → fetcher/ (requisições HTTP)


### 📁 Estrutura de Pastas do Projeto AutoTTU

```bash
autottu/
├── 📁 assets/                    # Recursos estáticos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── mottu-zero.webp
│   └── splash-icon.png
│
├── 📁 componentes/               # Componentes reutilizáveis
│   └── (vazio)
│
├── 📁 contexto/                  # Contextos React
│   └── contextoPrincipal.ts
│
├── 📁 control/                   # Controladores de lógica
│   ├── appControl.ts
│   ├── checkInControl.ts
│   ├── loginControl.ts
│   ├── motosControl.ts
│   ├── perfilControl.ts
│   └── usuarioControl.ts
│
├── 📁 fetcher/                   # Camada de requisições HTTP
│   ├── checkinFetcher.ts
│   ├── loginFetcher.ts
│   ├── motosFetcher.ts
│   └── usuarioFetcher.ts
│
├── 📁 model/                     # Modelos de dados
│   ├── CheckIn.ts
│   ├── Motos.ts
│   └── Usuario.ts
│
├── 📁 navigation/                # Configuração de navegação
│   └── navigationParams.ts
│
├── 📁 service/                   # Serviços de negócio
│   ├── checkinService.ts
│   ├── loginService.ts
│   ├── motosService.ts
│   └── usuarioService.ts
│
├── 📁 view/                      # Telas/Views da aplicação
│   ├── AlterarPerfil.tsx
│   ├── CadastroUsuarioView.tsx
│   ├── CheckInView.tsx
│   ├── LoginView.tsx
│   ├── MotosView.tsx
│   └── PerfilView.tsx
│
├── 📁 node_modules/              # Dependências instaladas
├── 📄 App.tsx                    # Componente principal
├── 📄 app.json                   # Configuração do Expo
├── 📄 estilos.ts                 # Estilos globais
├── 📄 index.ts                   # Ponto de entrada
├── 📄 package.json               # Dependências e scripts
├── 📄 package-lock.json          # Lock das dependências
├── 📄 README.md                  # Documentação
└── 📄 tsconfig.json              # Configuração TypeScript

```






### Dependências principais (20):
```bash
@expo/metro-runtime
@react-native-async-storage/async-storage
@react-navigation/bottom-tabs
@react-navigation/drawer
@react-navigation/native
@react-navigation/native-stack
axios
expo
expo-status-bar
navigation
react
react-dom
react-native
react-native-gesture-handler
react-native-get-random-values
react-native-reanimated
react-native-safe-area-context
react-native-screens
react-native-web
yup
```
