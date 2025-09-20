document.addEventListener('DOMContentLoaded', () => {

    console.log('GameHub Analytics Engine: Ativado.');

    // --- Seletores de Elementos do DOM ---
    const cartToggleButton = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartButton = document.querySelector('.close-cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartBody = document.querySelector('.cart-body');
    const totalPriceElement = document.querySelector('.total-price');
    const cartItemCountElement = document.querySelector('.cart-item-count');

    // --- Estado da Aplicação ---
    // Em uma aplicação real, isso poderia vir de um localStorage ou API
    let cart = [];

    // --- Funções de Lógica ---

    // Função para abrir/fechar o carrinho
    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('visible');
    };
    
    // Função principal para renderizar o carrinho na tela
    const renderCart = () => {
        // Limpa o conteúdo atual do carrinho
        cartBody.innerHTML = '';

        if (cart.length === 0) {
            cartBody.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartBody.classList.add('empty');
        } else {
            cartBody.classList.remove('empty');
            cart.forEach(item => {
                const cartItemHTML = `
                    <div class="cart-item">
                        <img src="https://via.placeholder.com/100x56?text=${item.name.replace(' ', '+')}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>R$ ${item.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item-btn" data-action="remove_from_cart" data-game-id="${item.id}">&times; Remover</button>
                    </div>
                `;
                cartBody.innerHTML += cartItemHTML;
            });
        }

        // Calcula e atualiza o preço total
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
        
        // Atualiza o contador de itens no ícone do carrinho
        cartItemCountElement.textContent = cart.length;
    };

    // Função para adicionar um item ao carrinho
    const addToCart = (game) => {
        // Verifica se o jogo já está no carrinho para evitar duplicatas
        if (cart.find(item => item.id === game.id)) {
            alert('Este jogo já está no seu carrinho!');
            return; // Sai da função se o item já existe
        }

        cart.push(game);

        // --- TRAQUEAMENTO ---
        trackEvent('add_to_cart', {
            currency: 'BRL',
            value: game.price,
            items: [{
                item_id: game.id,
                item_name: game.name,
                price: game.price,
                quantity: 1
            }]
        });

        renderCart();
    };

    // Função para remover um item do carrinho
    const removeFromCart = (gameId) => {
        const itemToRemove = cart.find(item => item.id === gameId);
        if (!itemToRemove) return;

        cart = cart.filter(item => item.id !== gameId);

        // --- TRAQUEAMENTO ---
        trackEvent('remove_from_cart', {
            currency: 'BRL',
            value: itemToRemove.price,
            items: [{
                item_id: itemToRemove.id,
                item_name: itemToRemove.name,
                price: itemToRemove.price,
                quantity: 1
            }]
        });

        renderCart();
    };

    // Função genérica de traqueamento para simulação
    const trackEvent = (eventName, eventData) => {
        const payload = {
            event: eventName,
            timestamp: new Date().toISOString(),
            data: eventData
        };
        console.log(`EVENTO RASTREADO:`, payload);
        // Em um projeto real, aqui você chamaria:
        // gtag('event', eventName, eventData);
        // analytics.track(eventName, eventData);
    };

    // --- Listeners de Eventos ---

    // Abre e fecha o carrinho
    cartToggleButton.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Delegação de eventos para botões dentro do documento
    document.addEventListener('click', (event) => {
        const target = event.target;
        const action = target.dataset.action;

        if (!action) return;

        const gameElement = target.closest('[data-game-id]');
        const gameId = gameElement ? gameElement.dataset.gameId : target.dataset.gameId;

        switch (action) {
            case 'add_to_cart':
                const gameName = target.dataset.gameName;
                const gamePrice = parseFloat(target.dataset.gamePrice);
                addToCart({ id: gameId, name: gameName, price: gamePrice });
                // Abre o carrinho para o usuário ver o item adicionado
                if (!cartSidebar.classList.contains('open')) {
                    toggleCart();
                }
                break;
            
            case 'remove_from_cart':
                removeFromCart(gameId);
                break;

            case 'begin_checkout':
                if (cart.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }
                // --- TRAQUEAMENTO ---
                trackEvent('begin_checkout', {
                    currency: 'BRL',
                    value: cart.reduce((total, item) => total + item.price, 0),
                    items: cart.map(item => ({
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price,
                        quantity: 1
                    }))
                });
                alert('Iniciando processo de checkout! (Evento rastreado no console)');
                break;
        }
    });

    // --- Inicialização ---
    // Renderiza o carrinho uma vez no início para mostrar o estado vazio
    renderCart();

});