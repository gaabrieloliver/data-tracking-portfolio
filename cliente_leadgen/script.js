document.addEventListener('DOMContentLoaded', () => {

    console.log('Lead Generation Analytics Engine: Ativado.');

    // --- Parte 1: Traqueamento de Scroll Depth ---

    // Objeto para garantir que cada marco de scroll seja enviado apenas uma vez
    const scrollTracker = {
        '25_percent_fired': false,
        '50_percent_fired': false,
        '75_percent_fired': false,
        '90_percent_fired': false,
    };

    window.addEventListener('scroll', () => {
        // Calcula a profundidade da rolagem em porcentagem
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDepth = (window.scrollY / scrollableHeight) * 100;

        if (scrollDepth >= 25 && !scrollTracker['25_percent_fired']) {
            trackEvent('scroll_depth', { 'scroll_percentage': 25 });
            scrollTracker['25_percent_fired'] = true;
        }
        if (scrollDepth >= 50 && !scrollTracker['50_percent_fired']) {
            trackEvent('scroll_depth', { 'scroll_percentage': 50 });
            scrollTracker['50_percent_fired'] = true;
        }
        if (scrollDepth >= 75 && !scrollTracker['75_percent_fired']) {
            trackEvent('scroll_depth', { 'scroll_percentage': 75 });
            scrollTracker['75_percent_fired'] = true;
        }
        if (scrollDepth >= 90 && !scrollTracker['90_percent_fired']) {
            trackEvent('scroll_depth', { 'scroll_percentage': 90 });
            scrollTracker['90_percent_fired'] = true;
        }
    });


    // --- Parte 2: Traqueamento de Formulário (Conversão) ---
    const leadForm = document.getElementById('lead-form');
    const formContainer = document.getElementById('form-container');
    const thankYouMessage = document.getElementById('thank-you-message');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Rastreia quando o usuário começa a preencher o formulário
    let formStarted = false;
    const startFormListener = () => {
        if (!formStarted) {
            trackEvent('form_start', { 'form_id': 'ebook_download_form' });
            formStarted = true;
        }
        nameInput.removeEventListener('focus', startFormListener);
        emailInput.removeEventListener('focus', startFormListener);
    };

    nameInput.addEventListener('focus', startFormListener);
    emailInput.addEventListener('focus', startFormListener);


    // Rastreia o envio do formulário (a conversão principal)
    leadForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const leadData = {
            name: nameInput.value,
            email: emailInput.value
        };

        // --- TRAQUEAMENTO DA CONVERSÃO ---
        trackEvent('generate_lead', {
            'form_id': 'ebook_download_form',
            'lead_email_domain': leadData.email.split('@')[1] // Exemplo de dado extra que podemos coletar
        });

        // Simula o sucesso: esconde o formulário e mostra a mensagem de agradecimento
        formContainer.style.display = 'none';
        thankYouMessage.style.display = 'block';

        console.log('Lead capturado:', leadData);
    });


    /**
     * Função centralizada para enviar todos os eventos.
     */
    const trackEvent = (eventName, eventData) => {
        const payload = {
            event: eventName,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            data: eventData
        };
        console.log("EVENTO RASTREADO:", payload);
    };

});