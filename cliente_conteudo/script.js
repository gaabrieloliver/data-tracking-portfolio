/**
 * @file Script de tracking para o cliente "Tech Insider Blog" (Conteúdo).
 * @description Implementa o rastreamento de engajamento para múltiplos vídeos do YouTube.
 */

// Variáveis globais para o player e para o controle dos eventos.
let players = {};
let videoProgressTracker = {};
let progressIntervals = {};

function enviarParaDataLayer(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    console.log(`Evento ${payload.event} enviado:`, payload);
}

// Função de entrada obrigatória da API do YouTube.
function onYouTubeIframeAPIReady() {
    const playerElements = document.querySelectorAll('.youtube-player');
    
    playerElements.forEach(el => {
        const playerId = el.id;
        const videoId = el.dataset.videoId;
        
        videoProgressTracker[videoId] = { start_fired: false, q1_fired: false, q2_fired: false, q3_fired: false };

        players[playerId] = new YT.Player(playerId, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: { 'playsinline': 1, 'rel': 0 },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

// Função chamada pela API quando o estado do player muda.
function onPlayerStateChange(event) {
    const player = event.target;
    const videoId = player.getVideoData().video_id;

    if (event.data === YT.PlayerState.PLAYING && player.getCurrentTime() < 2) {
        videoProgressTracker[videoId] = { start_fired: false, q1_fired: false, q2_fired: false, q3_fired: false };
    }

    switch(event.data) {
        case YT.PlayerState.PLAYING:
            if (!videoProgressTracker[videoId].start_fired) {
                trackVideoEvent('video_start', player);
                videoProgressTracker[videoId].start_fired = true;
            }
            startProgressTracking(player);
            break;
        case YT.PlayerState.PAUSED:
            stopProgressTracking(videoId);
            break;
        case YT.PlayerState.ENDED:
            stopProgressTracking(videoId);
            trackVideoEvent('video_complete', player);
            break;
    }
}

// Inicia o intervalo que verifica o progresso do vídeo.
function startProgressTracking(player) {
    const videoId = player.getVideoData().video_id;
    stopProgressTracking(videoId);

    progressIntervals[videoId] = setInterval(() => {
        const progress = (player.getCurrentTime() / player.getDuration()) * 100;
        const tracker = videoProgressTracker[videoId];

        if (progress >= 25 && !tracker.q1_fired) {
            trackVideoEvent('video_progress', player, { video_percent_complete: 25 });
            tracker.q1_fired = true;
        }
        if (progress >= 50 && !tracker.q2_fired) {
            trackVideoEvent('video_progress', player, { video_percent_complete: 50 });
            tracker.q2_fired = true;
        }
        if (progress >= 75 && !tracker.q3_fired) {
            trackVideoEvent('video_progress', player, { video_percent_complete: 75 });
            tracker.q3_fired = true;
        }
    }, 1000);
}

// Para o intervalo de verificação.
function stopProgressTracking(videoId) {
    clearInterval(progressIntervals[videoId]);
}

// Função final que monta e envia o payload para o dataLayer.
function trackVideoEvent(eventName, player, customData = {}) {
    const videoData = player.getVideoData();
    const videoTitle = document.querySelector(`[data-video-id="${videoData.video_id}"]`).dataset.videoTitle;

    const payload = {
        event: eventName,
        video_provider: 'YouTube',
        video_title: videoTitle,
        video_duration: Math.round(player.getDuration()),
        ...customData
    };
    
    enviarParaDataLayer(payload);
}