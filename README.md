# 🧪 Cypress API Automation - Restful Booker

Suíte de testes automatizados de API desenvolvida com **Cypress** e **JavaScript** para validar a integração e os endpoints da API [Restful Booker](https://restful-booker.herokuapp.com/).

---

## 📌 Visão Geral do Projeto

O objetivo deste projeto é garantir a qualidade, estabilidade e conformidade dos serviços da API de reservas. A arquitetura dos testes foi desenhada seguindo o padrão **modular por recursos/verbos REST**, promovendo alta manutenibilidade, isolamento de cenários e facilidade de depuração.

---

## 📁 Estrutura das Suítes de Teste

A pasta `cypress/e2e/` está organizada por responsabilidades funcionais:

* **`login.cy.js`**
  * **Função:** Valida o endpoint de autenticação (`POST /auth`).
  * **Cenários:** Envio de credenciais válidas e inválidas, garantindo a geração correta do `token` de acesso necessário para requisições protegidas.

* **`criar-agendamento.cy.js`**
  * **Função:** Valida a criação de reservas (`POST /booking`).
  * **Cenários:** Envio de *payloads* completos e com campos obrigatórios, verificando o status HTTP `200` e a estrutura do objeto retornado com o `bookingid`.

* **`consulta-agendamento.cy.js`**
  * **Função:** Valida a leitura de dados (`GET /booking` e `GET /booking/:id`).
  * **Cenários:** Listagem geral de reservas e busca de detalhes de um agendamento específico por ID.

* **`update-agendamento.cy.js`**
  * **Função:** Valida a alteração de dados (`PUT` e `PATCH /booking/:id`).
  * **Cenários:** Atualização completa e parcial de reservas existentes, validando o envio do token de autorização no cabeçalho (*Header* / *Cookie*).

* **`deletar-agendamento.cy.js`**
  * **Função:** Valida a remoção de reservas (`DELETE /booking/:id`).
  * **Cenários:** Exclusão de registros com autenticação e confirmação de que o recurso foi removido com sucesso.

* **`all-api-project.cy.js`**
  * **Função:** Suíte de regressão de ponta a ponta (*E2E / Workflow Integro*).
  * **Cenários:** Executa o ciclo de vida completo de uma reserva em sequência (**Autenticar $\rightarrow$ Criar $\rightarrow$ Consultar $\rightarrow$ Atualizar $\rightarrow$ Excluir**) para validar a integridade da jornada do usuário.

---

## 🏗️ Decisões de Arquitetura

A escolha por separar as suítes por módulo/endpoint traz os seguintes benefícios:

1. **Princípio da Responsabilidade Única (SRP):** Cada arquivo foca em apenas um domínio da API, facilitando a localização de código e correções.
2. **Isolamento de Falhas:** Um erro na suíte de alteração não impede a execução ou validação dos testes de criação ou consulta.
3. **Paralelização em CI/CD:** A separação em múltiplos arquivos permite a execução dos testes em paralelo nas pipelines de integração contínua, reduzindo o tempo total de execução.
4. **Facilidade de Manutenção:** Alterações em regras de um endpoint específico afetam apenas o arquivo correspondente.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **Cypress** (Framework de automação de testes)
* **JavaScript (ES6+)** (Linguagem de programação)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** instalado (versão LTS recomendada).
* **Git** configurado.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/brendaluizaf4/cypress-api-suites.git](https://github.com/brendaluizaf4/cypress-api-suites.git)
