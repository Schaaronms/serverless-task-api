Serverless Task APIUma API RESTful serverless para gerenciamento de tarefas, projetada para alta disponibilidade e escalabilidade linear.
A infraestrutura é totalmente automatizada como código (IaC) utilizando Terraform, com deploy contínuo via pipelines de CI/CD.
O principal objetivo deste projeto é consolidar e demonstrar práticas recomendadas de nível de produção no ecossistema AWS e ferramentas modernas de DevOps.
🏗️ Arquitetura do SistemaO fluxo abaixo ilustra desde o commit do desenvolvedor até o monitoramento da aplicação em produção:Snippet de códigograph TD
    A[GitHub Actions] -->|Build & Push| B(AWS ECR)
    B -->|Deploy Container| C(AWS Lambda)
    D[Client] -->|HTTPS Request| E(API Gateway)
    E -->|Auth| F(Amazon Cognito)
    E -->|Trigger| C
    C -->|Persistência| G(Amazon DynamoDB)
    C -->|Observabilidade| H(CloudWatch & X-Ray)
🛠️ Tecnologias & Stack TécnicaTecnologiaCategoriaFinalidade no ProjetoAWS LambdaComputeExecução serverless do core da aplicaçãoTerraformIaCProvisionamento e versionamento de 
toda a infraestruturaDynamoDBDatabaseArmazenamento NoSQL de baixa latência para as tarefasAPI GatewayNetworkingExposição dos endpoints REST e roteamento de requisiçõesCognitoSecurityAutenticação,
autorização e gerenciamento de usuários (JWT)Docker / ECRContainerizationEmpacotamento da Lambda em container e registro de imagensGitHub ActionsCI/CDPipeline automatizado de lint, testes e deploy 
(Infra + Code)CloudWatchObservabilityCentralização de logs de execução e métricas de performanceAWS X-RayObservabilityRastreamento distribuído (tracing) para análise de gargalos

🛣️ Roadmap de Desenvolvimento
✅ Etapa 1: Fundação

[x] Configuração da AWS CLI.
[x] Configuração do backend remoto Terraform em S3.
[x] Provisionamento de infraestrutura com Terraform.
[x] Criação e execução de função AWS Lambda.
[x] Gerenciamento de permissões com IAM Roles.

🚧 Etapa 2: API Serverless

[ ] Criação da tabela tasks no DynamoDB.
[ ] Desenvolvimento das funções CRUD de tarefas.
[ ] Integração Lambda + DynamoDB.
[ ] Exposição da API via API Gateway.
[ ] Testes funcionais dos endpoints.

🚧 Etapa 3: Segurança e Deploy

[ ] Autenticação utilizando Amazon Cognito.
[ ] Containerização com Docker.
[ ] Registro de imagens no Amazon ECR.
[ ] Pipeline CI/CD com GitHub Actions.

🚧 Etapa 4: Observabilidade

[ ] Centralização de logs no CloudWatch.
[ ] Dashboards de monitoramento.
[ ] Tracing distribuído com AWS X-Ray.
[ ] Alarmes e métricas operacionais.

## Competências Desenvolvidas

* ✅ Terraform modularizado para Infrastructure as Code
* ✅ Backend remoto no Amazon S3
* ✅ AWS Lambda para arquiteturas serverless
* ✅ Integração Lambda + DynamoDB
* ✅ API Gateway para exposição de APIs REST
* ✅ State Locking com DynamoDB
* ✅ GitHub Actions com OIDC
* ✅ Cognito JWT Authorizer
* ✅ CloudWatch Dashboards
* ✅ X-Ray Tracing
* ✅ Single Table Design
* ✅ Docker e Amazon ECR
* ✅ CI/CD automatizado
* ✅ IAM Roles e Policies seguindo o Princípio do Menor Privilégio (PoLP)
* ✅ Observabilidade e monitoramento de aplicações serverless
* ✅ Versionamento e colaboração utilizando Git e GitHub


🧑‍💻 Autor Schaaron Souza
