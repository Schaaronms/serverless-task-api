# 🚀 Serverless Task API

Uma API RESTful serverless para gerenciamento de tarefas, projetada para alta disponibilidade e escalabilidade. A infraestrutura é provisionada utilizando Infrastructure as Code (IaC) com Terraform e segue boas práticas do ecossistema AWS.

O objetivo deste projeto é consolidar conhecimentos em Cloud Computing, Serverless, DevOps e Observabilidade através da construção de uma aplicação real utilizando serviços AWS.

---

# 🏗️ Arquitetura do Sistema

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ▼
Terraform
   │
   ▼
AWS API Gateway
   │
   ▼
AWS Lambda
   │
   ▼
Amazon DynamoDB
   │
   ├── CloudWatch
   └── X-Ray
```

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia      | Categoria              | Finalidade                        |
| --------------- | ---------------------- | --------------------------------- |
| AWS Lambda      | Compute                | Execução serverless da aplicação  |
| Terraform       | Infrastructure as Code | Provisionamento da infraestrutura |
| Amazon DynamoDB | Database               | Armazenamento NoSQL               |
| API Gateway     | Networking             | Exposição da API REST             |
| Amazon Cognito  | Security               | Autenticação e autorização        |
| Docker          | Containers             | Empacotamento da aplicação        |
| Amazon ECR      | Containers             | Registro de imagens               |
| GitHub Actions  | CI/CD                  | Automação de deploy               |
| CloudWatch      | Observability          | Logs e métricas                   |
| AWS X-Ray       | Observability          | Tracing distribuído               |

---

# 📂 Estrutura do Projeto

```text
serverless-task-api/
├── src/
│   ├── handlers/
│   │   ├── createTask.js
│   │   ├── listTasks.js
│   │   ├── getTask.js
│   │   ├── updateTask.js
│   │   └── deleteTask.js
│   └── lib/
│       ├── dynamo.js
│       └── response.js
│
├── terraform/
│   ├── backend.tf
│   ├── main.tf
│   └── modules/
│       ├── dynamodb/
│       └── api-gateway/
│
└── README.md
```

---

# 🛣️ Roadmap

## ✅ Etapa 1: Fundação

* [x] Configuração da AWS CLI
* [x] Configuração do backend remoto Terraform
* [x] Provisionamento inicial da infraestrutura
* [x] Criação da AWS Lambda
* [x] Configuração de IAM Roles

## ✅ Etapa 2: Persistência e CRUD

* [x] Criação da tabela DynamoDB
* [x] Modelagem Single Table Design
* [x] Integração Lambda + DynamoDB
* [x] Create Task
* [x] List Tasks
* [x] Get Task
* [x] Update Task
* [x] Delete Task

## 🚧 Etapa 3: API Gateway

* [x] Criação do módulo API Gateway
* [x] Provisionamento da HTTP API
* [ ] Integração API Gateway + Lambda
* [ ] Criação das rotas REST
* [ ] Testes dos endpoints

## 🚧 Etapa 4: Segurança e CI/CD

* [ ] Amazon Cognito JWT Authorizer
* [ ] Docker
* [ ] Amazon ECR
* [ ] GitHub Actions
* [ ] OIDC Federation
* [ ] Deploy automatizado

## 🚧 Etapa 5: Observabilidade

* [ ] CloudWatch Logs
* [ ] CloudWatch Dashboards
* [ ] AWS X-Ray
* [ ] Alarmes e métricas

---

# 🎯 Competências Desenvolvidas

* ✅ Terraform Modularizado
* ✅ Infrastructure as Code (IaC)
* ✅ AWS Lambda
* ✅ Amazon DynamoDB
* ✅ CRUD Serverless
* ✅ AWS SDK v3
* ✅ API Gateway
* ✅ Remote State no S3
* ✅ State Locking com DynamoDB
* ✅ Git e GitHub
* ✅ Linux para administração e desenvolvimento
* ✅ IAM Roles e Policies
* ✅ Princípio do Menor Privilégio (PoLP)
* ✅ Arquiteturas Serverless
* ✅ Single Table Design

---

# 📚 Próximos Aprendizados

* 🚧 GitHub Actions com OIDC
* 🚧 Cognito JWT Authorizer
* 🚧 Docker e Amazon ECR
* 🚧 CloudWatch Dashboards
* 🚧 AWS X-Ray
* 🚧 Observabilidade em aplicações serverless

---

# 🧑‍💻 Autora

**Schaaron Souza**

Em formação contínua em Cloud Computing, DevOps e Desenvolvimento de Software, com foco em AWS, Terraform, Linux e Arquiteturas Serverless.
