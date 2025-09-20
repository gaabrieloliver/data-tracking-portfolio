# Case de Portfólio: Implementação de Tracking para E-commerce

Este projeto simula uma implementação de tracking de dados para um cliente fictício do setor de games, a **"PowerUp Games"**. O objetivo é demonstrar a capacidade de mapear o funil de conversão de uma loja virtual.

## 1. Objetivo de Negócio do Cliente
O cliente não entende a jornada de compra dos seus usuários. Eles não sabem quais produtos são mais vistos, quantos são adicionados ao carrinho e, principalmente, em qual etapa do checkout os usuários desistem.

## 2. Plano de Implementação (Mapa de Tags)
| Evento (`event`) | Acionador (Gatilho) | Dados Coletados (Payload) | Justificativa de Negócio |
| :--- | :--- | :--- | :--- |
| `add_to_cart` | Usuário clica no botão "Adicionar ao Carrinho". | `items` (com `item_id`, `item_name`, `price`, `quantity`) | Medir a intenção de compra, uma etapa crucial do funil de vendas. |

## 3. Solução Técnica
A solução foi implementada utilizando JavaScript puro para a captura do evento de `click`. Os dados do produto são armazenados em atributos `data-*` no HTML para uma coleta limpa e robusta. O `payload` é estruturado seguindo as recomendações oficiais do Google Analytics 4 para eventos de E-commerce e enviado para o `dataLayer`, de onde o GTM faz a gestão.

## 4. Tecnologias Utilizadas
* JavaScript (ES6+)
* HTML5
* Google Tag Manager (GTM)
* Google Analytics 4 (GA4)