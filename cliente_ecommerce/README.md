# Case de Portfólio: Implementação de Tracking para E-commerce

Este projeto simula uma implementação de tracking de dados para um cliente fictício do setor de games, a **"GameHub"**. O objetivo é demonstrar a capacidade de traduzir objetivos de negócio em uma solução técnica de coleta de dados robusta, focada no funil de vendas.

## 1. Objetivo de Negócio do Cliente

O cliente, uma loja virtual de jogos, não possuía visibilidade sobre a jornada de compra de seus usuários. As perguntas de negócio a serem respondidas eram:
- Quais produtos geram mais interações?
- Quantos usuários iniciam uma compra (adicionam ao carrinho)?
- Qual o fluxo de abandono antes da finalização da compra?

## 2. Plano de Implementação (Mapa de Tags)

Para atender aos objetivos, foi desenvolvido um plano de tracking para capturar os eventos de e-commerce recomendados pelo Google Analytics 4.

| Evento (`event`) | Acionador (Gatilho) | Dados Coletados (Payload) | Justificativa de Negócio |
| :--- | :--- | :--- | :--- |
| `add_to_cart` | Usuário clica no botão "Adicionar ao Carrinho". | `items` (com `item_id`, `item_name`, `price`) | Medir a intenção de compra, a primeira etapa crucial do funil. |
| `remove_from_cart` | Usuário remove um item do carrinho. | `items` (com `item_id`, `item_name`, `price`) | Entender o comportamento de reconsideração do usuário. |
| `begin_checkout` | Usuário clica no botão "Finalizar Compra". | `items`, `value`, `currency` | Identificar o início da conversão final e medir o abandono no checkout. |

## 3. Solução Técnica

A solução foi implementada utilizando JavaScript puro para a captura dos eventos de clique. A lógica do carrinho de compras é gerenciada no client-side para simular uma experiência de e-commerce real.

- **Captura de Eventos:** Foi utilizada a técnica de **Delegação de Eventos** com um único `addEventListener` no `document`, o que otimiza a performance e permite a manipulação de múltiplos botões dinamicamente.
- **Extração de Dados:** Atributos `data-*` (`dataset`) foram usados nos elementos HTML para armazenar os metadados dos produtos, garantindo uma coleta de dados limpa e desacoplada da interface.
- **Envio e Estrutura:** Todos os eventos são enviados para o `dataLayer` com um `payload` estruturado no formato `ecommerce` exigido pelo GA4. A gestão final e o envio para as plataformas de análise são feitos via Google Tag Manager (GTM).

## 4. Tecnologias Utilizadas

- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Google Tag Manager (GTM)**
- **Google Analytics 4 (GA4)**