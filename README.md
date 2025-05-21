# 📱 AUTOTTU

> Desenvolvemos a AutoTTU, uma solução tecnológica completa, para organização e controle de um pátio de motos.

# 💡 Solução

Começaremos pela instalação de sensores e scanners em cada uma das vagas do pátio. 
Os sensores identificarão a presença de uma moto e, caso isso ocorra, o scanner fará a leitura do ID da moto por meio de um QR code pré-instalado, enviando os dados para o sistema. Dessa forma, saberemos exatamente qual a localização de cada moto.
Para evitar erros na identificação, realizaremos um check-in para cada moto na entrada do pátio. Nesse momento, os QR codes serão gerados (cde acordo com o id da moto), os danos serão verificados, o horário de entrada será registrado e fotos serão tiradas. Em caso de ausência do ID por dano ou perda, um novo será gerado.
Por meio desse sistema, os operadores do pátio poderão acessar as informações por uma interface intuitiva, na qual também realizarão o check-in.
Para garantir o bom funcionamento do sistema, uma IA tirará fotos do pátio a cada hora e reportará possíveis erros, como a ausência de uma moto em uma vaga que deveria estar ocupada, falhas ou danos em sensores ou scanners, entre outros.

Atráves desse sistema, iremos garantir o bom funcionamento do pátio e a organização de forma automatizada, otimizando tempo e promovendo um ambiente mais eficiente e confiável

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
