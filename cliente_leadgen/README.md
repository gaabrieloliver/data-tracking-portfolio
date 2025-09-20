![Imagem do projeto](projeto.png "Imagem do projeto")

# Implementação de Tracking para Geração de Leads

Este projeto simula uma implementação de tracking para um cliente fictício do setor financeiro, a **"Consultoria Valor Real"**. O objetivo é demonstrar a capacidade de mensurar o engajamento e a conversão em uma landing page.

## 1. Objetivo de Negócio do Cliente

O cliente investe em campanhas de marketing para direcionar tráfego a uma landing page, cujo objetivo é a **geração de leads qualificados** através do download de um e-book. A empresa precisava de dados para avaliar a performance da página e otimizar seus investimentos em mídia.

## 2. Plano de Implementação (Mapa de Tags)

O plano de tracking foi focado em medir a conversão principal e o nível de interesse do usuário no conteúdo.

| Evento (`event`) | Acionador (Gatilho) | Dados Coletados (Payload) | Justificativa de Negócio |
| :--- | :--- | :--- | :--- |
| `content_download` | Clique no link de download do e-book. | `document_name`, `document_type` | Mede a principal **conversão** da página (KPI primário). |
| `scroll_depth` | Usuário rola 75% da página. | `scroll_depth_percentage` | Mede o **engajamento** com o conteúdo, um indicador de interesse do lead (KPI secundário). |

## 3. Solução Técnica

A solução utiliza JavaScript puro para capturar as interações do usuário e enviá-las para o `dataLayer`.

- **Captura de Eventos:**
    - Um `addEventListener` do tipo `click` foi adicionado ao link de download para capturar a conversão.
    - Um `addEventListener` do tipo `scroll` foi adicionado ao objeto `window` para monitorar a rolagem. Uma variável de "flag" foi implementada para garantir que o evento de 75% fosse disparado apenas uma vez por visualização de página, evitando dados duplicados.
- **Extração de Dados:** Metadados sobre o documento foram armazenados em atributos `data-*` (`dataset`) no HTML.
- **Envio e Gestão:** Os eventos são enviados ao `dataLayer` e gerenciados via Google Tag Manager (GTM), permitindo flexibilidade para futuras integrações.

## 4. Tecnologias Utilizadas

- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Google Tag Manager (GTM)**
- **Google Analytics 4 (GA4)**