# 📘 Documentação Técnica – Sistema de Gerenciamento de Usuários e Endereços

---

## 🧠 Visão Geral

Esta aplicação web full stack foi desenvolvida para gerenciar o cadastro de usuários e seus respectivos endereços. O sistema adota uma arquitetura em camadas, integra-se a um banco de dados relacional e implementa validações rigorosas para garantir a consistência dos dados.

---

## 🛠️ Tecnologias Utilizadas

| Camada              | Tecnologias                                                    |
|---------------------|----------------------------------------------------------------|
| **Front-end**       | HTML, CSS, Angular                                             |
| **Back-end**        | Java 16, Spring Boot, JPA (Hibernate), Maven                   |
| **Banco de Dados**  | PostgreSQL                                                     |
| **Bibliotecas**     | Bean Validation, Jackson, UUID Generator                       |

---

## ⚙️ Configuração do Ambiente

### 📦 Front-end

Antes de executar a aplicação Angular, é necessário instalar as dependências:

```bash
npm install
```

### ☕ Back-end
- Versão do Java: 16
- Configurações do ```application.properties:```
```
spring.datasource.url=jdbc:postgresql://localhost:5432/cbyk-db
spring.datasource.username=postgres
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

`⚠️ Atenção: Os valores de username e password devem ser ajustados conforme as credenciais do seu ambiente local.`

## 🧩 Modelagem Relacional (DDL)

```
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
```
- id: Identificador único gerado automaticamente via gen_random_uuid()
- email: Valor único com validação de formato padrão de e-mail
- senha: Armazenamento seguro (criptografada pela aplicação)

```
CREATE TABLE endereco (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255) NOT NULL,
    localidade VARCHAR(255) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    usuario_id UUID NOT NULL,
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);
```
- Relacionamento: Many-to-One (múltiplos endereços por usuário)
- Regras: ON DELETE CASCADE para exclusão automática de endereços vinculados ao usuário

## 💡 Diferenciais do Projeto
- 🔗 Integração transparente entre Angular e API REST
- 🆔 Identificadores gerados via UUID
- ✔️ Validações customizadas com mensagens específicas
- 💾 Persistência com JPA + Hibernate
- 🧱 Código estruturado conforme boas práticas e padrões de mercad


## 🚧 Pontos de Melhoria Sugeridos
- 🔐 Implementar autenticação e autorização com JWT
- 🧑‍💻 Telas de Login e Registro
- 📄 Paginação e ordenação em listagens





