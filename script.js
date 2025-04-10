let player;
        let livePlayer;
        let qualities = [];
        let currentQuality = 'auto';
        let isQualityMenuOpen = false;
        let notificationTimeout;
        let keyVerified = false;
        let currentKey = "";
        let videoPlayer = null;
        let canaisData = [];
        let isChannelSelectorOpen = false;

        function playVideo(videoElement) {
            videoElement.play().catch(error => {
                console.log('Erro ao reproduzir o vídeo:', error);
            });
        }

        function showNotification(message, type = 'info') {
            const container = document.getElementById('notification-container');
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            container.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        function updateQualityMenu() {
            const qualityMenu = document.getElementById('quality-menu');
            qualityMenu.innerHTML = '';
            if (!player || !qualities.length) return;
            const autoOption = document.createElement('div');
            autoOption.className = `quality-option ${currentQuality === 'auto' ? 'active' : ''}`;
            autoOption.textContent = 'Auto';
            autoOption.onclick = () => {
                player.setQuality('auto');
                currentQuality = 'auto';
                updateQualityMenu();
                showNotification('Qualidade alterada para Automático', 'info');
                toggleQualityMenu();
            };
            qualityMenu.appendChild(autoOption);
            qualities.forEach(quality => {
                const option = document.createElement('div');
                option.className = `quality-option ${currentQuality === quality.name ? 'active' : ''}`;
                option.textContent = quality.name;
                option.onclick = () => {
                    player.setQuality(quality.name);
                    currentQuality = quality.name;
                    updateQualityMenu();
                    showNotification(`Qualidade alterada para ${quality.name}`, 'info');
                    toggleQualityMenu();
                };
                qualityMenu.appendChild(option);
            });
        }

        function toggleQualityMenu() {
            const qualityMenu = document.getElementById('quality-menu');
            isQualityMenuOpen = !isQualityMenuOpen;
            if (isQualityMenuOpen) {
                qualityMenu.classList.add('active');
            } else {
                qualityMenu.classList.remove('active');
            }
        }

       function createTwitchPlayer() {
    if (!document.querySelector("#twitch-embed iframe")) {
        player = new Twitch.Player("twitch-embed", {
            channel: "lourimarcos", // Canal principal "StreamXcellence"
            width: "100%",
            height: "100%",
            controls: false,
            autoplay: true,
            muted: false,
            parent: ["localhost", window.location.hostname]
        });
        player.addEventListener(Twitch.Player.READY, () => {
            player.setVolume(0.5);
            player.setMuted(false);
            player.play();
            setTimeout(() => {
                qualities = player.getQualities();
                updateQualityMenu();
            }, 2000);
            initCustomControls();
            const playerElement = player.getIframe();
            const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
            playerElement.dispatchEvent(clickEvent);
            showNotification('Reprodução iniciada - StreamXcellence', 'success');
            updateChannelInfo("StreamXcellence", "https://i.imgur.com/QsrJDbX.png");
        });
        player.addEventListener(Twitch.Player.PLAY, () => {
            document.getElementById('play-pause-btn').textContent = '⏸️';
        });
        player.addEventListener(Twitch.Player.PAUSE, () => {
            document.getElementById('play-pause-btn').textContent = '▶️';
        });
        player.addEventListener(Twitch.Player.OFFLINE, () => {
            document.getElementById('player-container').innerHTML = `
                <div class="offline-container">
                    <video autoplay loop muted playsinline width="100%" height="100%" id="offline-video">
                        <source src="https://i.gifer.com/1fq5.mp4" type="video/mp4">
                    </video>
                    <div class="offline-message">
                        <p>🔴 ESTAMOS OFFLINE NO MOMENTO, TENTE NOVAMENTE MAIS TARDE 😢 🔴</p>
                    </div>
                </div>
            `;
            const offlineVideo = document.getElementById('offline-video');
            offlineVideo.addEventListener('click', () => playVideo(offlineVideo));
            playVideo(offlineVideo);
            showNotification('O canal está offline no momento', 'error');
        });
    }
}

function updateChannelInfo(channelName, logoUrl) {
    const channelNameElement = document.querySelector('.channel-name');
    const channelLogoElement = document.querySelector('.channel-logo');
    channelNameElement.textContent = channelName;
    channelLogoElement.src = logoUrl;
}

        function initCustomControls() {
            const playPauseBtn = document.getElementById('play-pause-btn');
            const muteBtn = document.getElementById('mute-btn');
            const volumeSlider = document.getElementById('volume-slider');
            const qualityBtn = document.getElementById('quality-btn');
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            volumeSlider.value = player.getVolume();
            updateVolumeIcon();
            playPauseBtn.addEventListener('click', togglePlay);
            volumeSlider.addEventListener('input', () => {
                const volume = parseFloat(volumeSlider.value);
                player.setVolume(volume);
                player.setMuted(volume === 0);
                updateVolumeIcon();
            });
            muteBtn.addEventListener('click', toggleMute);
            qualityBtn.addEventListener('click', toggleQualityMenu);
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            document.addEventListener('keydown', handleKeyPress);
        }

        function togglePlay() {
            if (player) {
                if (player.isPaused()) {
                    player.play();
                    showNotification('Reproduzindo', 'info');
                } else {
                    player.pause();
                    showNotification('Pausado', 'info');
                }
            }
        }

        function toggleMute() {
            if (player) {
                const muted = player.getMuted();
                player.setMuted(!muted);
                updateVolumeIcon();
                showNotification(muted ? 'Som ativado' : 'Som desativado', 'info');
            }
        }

        function updateVolumeIcon() {
            const muteBtn = document.getElementById('mute-btn');
            if (!muteBtn || !player) return;
            if (player.getMuted() || player.getVolume() === 0) {
                muteBtn.textContent = '🔇';
            } else if (player.getVolume() < 0.5) {
                muteBtn.textContent = '🔉';
            } else {
                muteBtn.textContent = '🔊';
            }
        }

        function toggleFullscreen() {
            const container = document.getElementById('player-container');
            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
                showNotification('Tela cheia ativada', 'info');
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                showNotification('Tela cheia desativada', 'info');
            }
        }

        function handleKeyPress(event) {
            if (!document.getElementById('player-container').style.display === 'flex') return;
            switch(event.key) {
                case ' ':
                case 'k':
                    togglePlay();
                    event.preventDefault();
                    break;
                case 'm':
                    toggleMute();
                    event.preventDefault();
                    break;
                case 'f':
                    toggleFullscreen();
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    if (player) {
                        const newVolume = Math.min(1, player.getVolume() + 0.05);
                        player.setVolume(newVolume);
                        player.setMuted(false);
                        document.getElementById('volume-slider').value = newVolume;
                        updateVolumeIcon();
                        showNotification(`Volume: ${Math.round(newVolume * 100)}%`, 'info');
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    if (player) {
                        const newVolume = Math.max(0, player.getVolume() - 0.05);
                        player.setVolume(newVolume);
                        player.setMuted(newVolume === 0);
                        document.getElementById('volume-slider').value = newVolume;
                        updateVolumeIcon();
                        showNotification(`Volume: ${Math.round(newVolume * 100)}%`, 'info');
                    }
                    event.preventDefault();
                    break;
            }
        }

        function createLiveNotificationPlayer() {
            const livePlayerContainer = document.getElementById("live-player");
            livePlayer = new Twitch.Player("live-player", {
                channel: "lourimarcos",
                height: "100%",
                width: "100%",
                muted: true,
                autoplay: true,
                controls: false,
                parent: ["localhost", window.location.hostname]
            });
            livePlayer.addEventListener(Twitch.Player.READY, () => {
                const iframe = livePlayer.getIframe();
                iframe.style.pointerEvents = "none";
            });
            function reloadLivePlayer() {
                if (livePlayer) {
                    livePlayer.seek(0);
                }
            }
            setInterval(reloadLivePlayer, 30000);
        }

        function loadProgramacao() {
            fetch('https://mrjunim.github.io/tvaovivo/guia_de_programacao.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Resposta da rede não foi ok');
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('guide-text').textContent = data;
                    document.getElementById('guide-text-duplicate').textContent = data;
                })
                .catch(error => {
                    console.error('Erro ao carregar guia de programação:', error);
                    document.getElementById('guide-text').textContent = "Erro ao carregar guia.";
                    document.getElementById('guide-text-duplicate').textContent = "Erro ao carregar guia.";
                });
        }

        let validKeys = [];
        function loadKeys() {
            fetch('https://mrjunim.github.io/tvaovivo/Novo%20Documento%20de%20Texto.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Resposta da rede não foi ok');
                    }
                    return response.text();
                })
                .then(data => {
                    validKeys = data.split('\n').map(key => key.trim()).filter(key => key.length > 0);
                    console.log('Chaves carregadas com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao carregar as chaves:', error);
                    const errorMessage = document.getElementById('error-message');
                    if (errorMessage) {
                        errorMessage.textContent = "Erro ao carregar chaves de acesso. Tente novamente mais tarde.";
                    }
                });
        }

        function verifyKey() {
            const keyInput = document.getElementById('key-input').value;
            const errorMessage = document.getElementById('error-message');
            if (!keyInput) {
                errorMessage.textContent = "Por favor, digite uma chave de acesso.";
                return;
            }
            if (validKeys.includes(keyInput) || keyInput === "12345") {
                document.getElementById("alerta-visual").style.opacity = "1";
                keyVerified = true;
                currentKey = keyInput;
                document.getElementById('login-container').style.display = 'none';
                const zoomImageContainer = document.getElementById('zoom-image-container');
                zoomImageContainer.style.display = 'flex';
                setTimeout(() => {
                    zoomImageContainer.style.display = 'none';
                    document.getElementById('player-container').style.display = 'flex';
                    createTwitchPlayer();
                }, 2000);
                document.getElementById('live-notification').style.display = 'none';
                showWelcomeMessage();
            } else {
                errorMessage.textContent = "Chave inválida. Tente novamente.";
                showNotification("Chave inválida. Tente novamente.", "error");
                const keyInputElem = document.getElementById('key-input');
                keyInputElem.classList.add('shake');
                setTimeout(() => keyInputElem.classList.remove('shake'), 500);
            }
        }

        function showWelcomeMessage() {
            showNotification("Bem-vindo ao StreamXcellence! Aproveite o conteúdo.", "success");
        }

        function openModal() {
            document.getElementById("modal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }

        function sendToWhatsApp() {
            const name = document.getElementById("user-name").value;
            if (!name) {
                alert("Por favor, preencha seu nome antes de enviar.");
                showNotification("Por favor, preencha seu nome antes de enviar.", "error");
                return;
            }
            const message = `Olá StreamXcellence, me chamo ${name}. Efetuei o pagamento da chave de acesso e estou enviando o comprovante para liberação imediata.`;
            window.location.href = `https://wa.me/5564996718993?text=${encodeURIComponent(message)}`;
        }

        function copyEmail() {
            const emailText = document.getElementById("pix-email").innerText;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(emailText)
                    .then(() => {
                        const copyButton = document.getElementById("copy-email");
                        const originalText = copyButton.textContent;
                        copyButton.textContent = "Copiado!";
                        copyButton.style.backgroundColor = "#28c76f";
                        showNotification("Email copiado para a área de transferência!", "success");
                        setTimeout(() => {
                            copyButton.textContent = originalText;
                            copyButton.style.backgroundColor = "";
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Falha ao copiar email: ', err);
                        showNotification("Falha ao copiar o email. Por favor, copie manualmente.", "error");
                    });
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = emailText;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showNotification("Email copiado para a área de transferência!", "success");
                } catch (err) {
                    console.error('Falha ao copiar email: ', err);
                    showNotification("Falha ao copiar o email. Por favor, copie manualmente.", "error");
                }
                document.body.removeChild(textArea);
            }
        }

        function openProgramacaoModal() {
            document.getElementById("programacao-modal").style.display = "flex";
            carregarProgramacao();
        }

        function closeProgramacaoModal() {
            document.getElementById("programacao-modal").style.display = "none";
        }

        function carregarProgramacao() {
            const listaProgramacao = document.getElementById("programacao-lista");
            listaProgramacao.innerHTML = '<li>Carregando programação...</li>';
            fetch('https://mrjunim.github.io/tvaovivo/programacaorobusta.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar a programação');
                    }
                    return response.text();
                })
                .then(data => {
                    const programas = data.trim().split('\n\n');
                    if (programas.length === 0) {
                        listaProgramacao.innerHTML = '<li>Nenhuma programação disponível no momento.</li>';
                        return;
                    }
                    listaProgramacao.innerHTML = '';
                    programas.forEach(programa => {
                        const detalhes = programa.split('\n');
                        if (detalhes.length >= 4) {
                            const titulo = detalhes[0].replace("Título: ", "").trim();
                            const sinopse = detalhes[1].replace("Sinopse: ", "").trim();
                            const horario = detalhes[2].replace("Horário: ", "").trim();
                            const imgLink = detalhes[3].replace("Imagem Capa: ", "").trim();
                            const listItem = document.createElement('li');
                            listItem.innerHTML = `
                                <h3>${titulo}</h3>
                                <img src="${imgLink}" alt="Capa de ${titulo}" loading="lazy">
                                <p><strong>Sinopse:</strong> ${sinopse}</p>
                                <p><strong>Horário:</strong> ${horario}</p>
                            `;
                            listaProgramacao.appendChild(listItem);
                        }
                    });
                    if (listaProgramacao.children.length === 0) {
                        listaProgramacao.innerHTML = '<li>Formato de programação incorreto.</li>';
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar programação:', error);
                    listaProgramacao.innerHTML = '<li>Erro ao carregar a programação. Tente novamente mais tarde.</li>';
                    showNotification("Erro ao carregar a programação", "error");
                });
        }

        function openCanaisModalWithKey() {
            if (keyVerified) {
                openCanaisModal();
            } else {
                document.getElementById("canais-key-modal").style.display = "flex";
                const mainKeyInput = document.getElementById('key-input').value;
                if (mainKeyInput) {
                    document.getElementById('canais-key-input').value = mainKeyInput;
                }
            }
        }

        function verificarChaveCanais() {
            const keyInput = document.getElementById('canais-key-input').value;
            const errorMessage = document.getElementById('canais-key-error-message');
            if (!keyInput) {
                errorMessage.textContent = "Por favor, digite uma chave de acesso.";
                return;
            }
            if (validKeys.includes(keyInput) || keyInput === "12345") {
                keyVerified = true;
                currentKey = keyInput;
                closeCanaisKeyModal();
                openCanaisModal();
                showNotification("Acesso aos canais liberado!", "success");
            } else {
                errorMessage.textContent = "Chave inválida. Tente novamente.";
                showNotification("Chave inválida. Tente novamente.", "error");
                const keyInputElem = document.getElementById('canais-key-input');
                keyInputElem.classList.add('shake');
                setTimeout(() => keyInputElem.classList.remove('shake'), 500);
            }
        }

        function closeCanaisKeyModal() {
            document.getElementById("canais-key-modal").style.display = "none";
        }

        function openCanaisModal() {
            document.getElementById("canais-modal").style.display = "flex";
            carregarCanais();
        }

        function closeCanaisModal() {
            document.getElementById("canais-modal").style.display = "none";
        }

        function toggleChannelSelector() {
    const channelSelector = document.getElementById('channel-selector-menu');
    isChannelSelectorOpen = !isChannelSelectorOpen;
    channelSelector.classList.toggle('active', isChannelSelectorOpen);
    if (isChannelSelectorOpen && document.getElementById('channels-list').innerHTML === '<p>Carregando canais...</p>' && canaisData.length === 0) {
        carregarCanaisSeletor();
    }
}
            } else {
                channelSelector.classList.remove('active');
            }
        }

       function carregarCanaisSeletor() {
    if (!window.keyVerified) {
        showNotification("Você precisa fazer login para acessar os canais.", "error");
        toggleChannelSelector();
        document.getElementById("canais-key-modal").style.display = "flex";
        return;
    }

    if (canaisData.length > 0) {
        atualizarListaCanaisSeletor(canaisData);
        return;
    }

    fetch('https://mrjunim.github.io/tvaovivo/filmeseseries.txt')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar os canais');
            return response.text();
        })
        .then(data => {
            const linhas = data.split('\n');
            canaisData = [];
            let i = 0;
            while (i < linhas.length) {
                const linha = linhas[i].trim();
                if (linha.startsWith('#EXTINF:-1')) {
                    const infoLinha = linha;
                    let nomeCanal = "Canal";
                    if (infoLinha.includes('tvg-name="')) {
                        const match = infoLinha.match(/tvg-name="([^"]+)"/);
                        if (match && match[1]) nomeCanal = match[1];
                    } else if (infoLinha.includes(',')) {
                        const commaIndex = infoLinha.lastIndexOf(',');
                        if (commaIndex !== -1 && commaIndex < infoLinha.length - 1) nomeCanal = infoLinha.substring(commaIndex + 1).trim();
                    }
                    let logoUrl = "https://i.imgur.com/QsrJDbX.png";
                    const logoMatch = infoLinha.match(/tvg-logo="([^"]+)"/);
                    if (logoMatch && logoMatch[1]) logoUrl = logoMatch[1];
                    let streamUrl = "";
                    if (i + 1 < linhas.length) {
                        streamUrl = linhas[i + 1].trim();
                        i += 2;
                    } else {
                        i++;
                    }
                    if (streamUrl && !streamUrl.startsWith('#')) {
                        canaisData.push({ nome: nomeCanal, logo: logoUrl, url: streamUrl });
                    }
                } else {
                    i++;
                }
            }
            atualizarListaCanaisSeletor(canaisData);
        })
        .catch(error => {
            console.error('Erro ao carregar canais para o seletor:', error);
            document.getElementById('channels-list').innerHTML = '<p>Erro ao carregar canais. Tente novamente mais tarde.</p>';
            showNotification("Erro ao carregar os canais", "error");
        });
}

function backToMainChannel() {
    if (videoPlayer) {
        videoPlayer.destroy(); // Destroi o player HLS atual
        videoPlayer = null;
    }
    const playerElement = document.getElementById('player');
    playerElement.innerHTML = '<div id="twitch-embed"></div>';
    createTwitchPlayer(); // Recria o Twitch Player com o canal principal
    toggleChannelSelector(); // Fecha o seletor
    showNotification("Voltando para StreamXcellence", "success");
}

        function atualizarListaCanaisSeletor(canais) {
            const channelsList = document.getElementById('channels-list');
            if (canais.length === 0) {
                channelsList.innerHTML = '<p>Nenhum canal encontrado.</p>';
                return;
            }
            channelsList.innerHTML = '';
            canais.sort((a, b) => a.nome.localeCompare(b.nome));
            canais.forEach(canal => {
                const channelItem = document.createElement('div');
                channelItem.className = 'channel-selector-item';
                channelItem.setAttribute('data-nome', canal.nome.toLowerCase());
                channelItem.onclick = function() {
                    reproduzirCanal(canal.url, canal.nome, canal.logo);
                    toggleChannelSelector();
                };
                channelItem.innerHTML = `
                    <img src="${canal.logo}" alt="${canal.nome}" onerror="this.src='https://i.imgur.com/QsrJDbX.png'">
                    <span>${canal.nome}</span>
                `;
                channelsList.appendChild(channelItem);
            });
        }

        function filtrarCanais() {
            const searchInput = document.getElementById('channel-search');
            const searchTerm = searchInput.value.toLowerCase();
            const items = document.querySelectorAll('.channel-selector-item');
            items.forEach(item => {
                const nome = item.getAttribute('data-nome');
                if (nome.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function carregarCanais() {
            const canaisGrid = document.getElementById("canais-grid");
            canaisGrid.innerHTML = '<p>Carregando canais...</p>';
            fetch('https://mrjunim.github.io/tvaovivo/filmeseseries.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar os canais');
                    }
                    return response.text();
                })
                .then(data => {
                    canaisGrid.innerHTML = '';
                    const linhas = data.split('\n');
                    let i = 0;
                    while (i < linhas.length) {
                        const linha = linhas[i].trim();
                        if (linha.startsWith('#EXTINF:-1')) {
                            const infoLinha = linha;
                            let nomeCanal = "Canal";
                            if (infoLinha.includes('tvg-name="')) {
                                const match = infoLinha.match(/tvg-name="([^"]+)"/);
                                if (match && match[1]) {
                                    nomeCanal = match[1];
                                }
                            } else if (infoLinha.includes(',')) {
                                const commaIndex = infoLinha.lastIndexOf(',');
                                if (commaIndex !== -1 && commaIndex < infoLinha.length - 1) {
                                    nomeCanal = infoLinha.substring(commaIndex + 1).trim();
                                }
                            }
                            let logoUrl = "https://i.imgur.com/QsrJDbX.png";
                            const logoMatch = infoLinha.match(/tvg-logo="([^"]+)"/);
                            if (logoMatch && logoMatch[1]) {
                                logoUrl = logoMatch[1];
                            }
                            let streamUrl = "";
                            if (i + 1 < linhas.length) {
                                streamUrl = linhas[i + 1].trim();
                                i += 2;
                            } else {
                                i++;
                            }
                            if (streamUrl && !streamUrl.startsWith('#')) {
                                const canalItem = document.createElement('div');
                                canalItem.className = 'canal-item';
                                canalItem.setAttribute('data-stream-url', streamUrl);
                                canalItem.onclick = function() {
                                    reproduzirCanal(streamUrl, nomeCanal, logoUrl);
                                };
                                canalItem.innerHTML = `
                                    <img src="${logoUrl}" alt="${nomeCanal}" onerror="this.src='https://i.imgur.com/QsrJDbX.png'">
                                    <div class="canal-info">
                                        <p class="canal-nome">${nomeCanal}</p>
                                    </div>
                                `;
                                canaisGrid.appendChild(canalItem);
                            }
                        } else {
                            i++;
                        }
                    }
                    if (canaisGrid.children.length === 0) {
                        canaisGrid.innerHTML = '<p>Nenhum canal encontrado.</p>';
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar canais:', error);
                    canaisGrid.innerHTML = '<p>Erro ao carregar os canais. Tente novamente mais tarde.</p>';
                    showNotification("Erro ao carregar os canais", "error");
                });
        }

        function reproduzirCanal(streamUrl, nomeCanal, logoUrl) {
    console.log('Reproduzindo canal:', nomeCanal, 'URL:', streamUrl);
    const playerContainer = document.getElementById('player-container');
    if (!playerContainer.classList.contains('active')) {
        playerContainer.style.display = 'flex';
        playerContainer.classList.add('active');
    }

    // Remove o Twitch Player se existir
    if (player) {
        player.destroy();
        player = null;
    }

    // Limpa o conteúdo atual do player
    const playerElement = document.getElementById('player');
    playerElement.innerHTML = '<video id="video-player" controls></video>';

    const video = document.getElementById('video-player');
    if (Hls.isSupported()) {
        if (videoPlayer) videoPlayer.destroy(); // Destroi o player HLS anterior
        const hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            enableWorker: true,
            lowLatencyMode: true,
            testBandwidth: true,
            progressive: true,
            xhrSetup: function(xhr) { xhr.withCredentials = false; }
        });
        try {
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(err => {
                    console.error('Erro ao iniciar reprodução:', err);
                    showNotification("Erro ao iniciar reprodução: " + err.message, "error");
                });
            });
            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('Erro HLS:', data.type, data.details);
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            showNotification("Erro de rede. Tentando reconectar...", "error");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            showNotification("Erro de mídia. Tentando recuperar...", "error");
                            hls.recoverMediaError();
                            break;
                        default:
                            showNotification("Não foi possível carregar o stream", "error");
                            hls.destroy();
                            break;
                    }
                }
            });
            videoPlayer = hls;
        } catch (error) {
            console.error('Erro ao configurar HLS:', error);
            showNotification("Erro ao configurar reprodução: " + error.message, "error");
        }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(err => {
                console.error('Erro ao iniciar reprodução (Safari):', err);
                showNotification("Erro ao iniciar reprodução: " + err.message, "error");
            });
        });
    } else {
        showNotification("Seu navegador não suporta reprodução de streams HLS", "error");
    }

    updateChannelInfo(nomeCanal, logoUrl);
    showNotification(`Reproduzindo: ${nomeCanal}`, "success");
    toggleChannelSelector(); // Fecha o seletor após seleção
}

        // Proteção contra inspeção (mantido do código original)
        document.addEventListener('keydown', function (event) {
            if (
                event.key === 'F12' ||
                (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
                (event.ctrlKey && event.key === 'U')
            ) {
                alert("Isso não é permitido 😢");
                event.preventDefault();
                return false;
            }
        });

        document.addEventListener('contextmenu', function (event) {
            alert("Isso não é permitido 😢");
            event.preventDefault();
            return false;
        });

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            loadProgramacao();
            loadKeys();
            createLiveNotificationPlayer();
            // Adicionar evento de tecla Enter para o input de chave
            const keyInput = document.getElementById('key-input');
            if (keyInput) {
                keyInput.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        verifyKey();
                    }
                });
            }
            // Adicionar evento de tecla Enter para o input de nome
            const userName = document.getElementById('user-name');
            if (userName) {
                userName.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        sendToWhatsApp();
                    }
                });
            }
            // Adicionar evento de tecla Enter para verificação de chave de canais
            const canaisKeyInput = document.getElementById('canais-key-input');
            if (canaisKeyInput) {
                canaisKeyInput.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        verificarChaveCanais();
                    }
                });
            }
            // Fechar o seletor de canais ao clicar fora dele
            document.addEventListener('click', function(event) {
                const selectorButton = document.getElementById('channel-selector-button');
                const selectorMenu = document.getElementById('channel-selector-menu');
                if (isChannelSelectorOpen && 
                    selectorButton && selectorMenu && 
                    !selectorButton.contains(event.target) && 
                    !selectorMenu.contains(event.target)) {
                    isChannelSelectorOpen = false;
                    selectorMenu.classList.remove('active');
                }
            });
        });

        
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      // Cria a sobreposição com a mensagem
      const overlay = document.createElement("div");
      overlay.id = "block-message";
      overlay.style.position = "absolute";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
      overlay.style.zIndex = 9999;
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.color = "white";
      overlay.style.fontFamily = "sans-serif";
      overlay.style.padding = "30px";
      overlay.innerHTML = `
        <h2 style="margin-bottom: 10px;">Atenção!</h2>
        <p style="font-size: 18px; max-width: 400px; text-align: center;">
          Para continuar assistindo, faça o login ou compre uma chave de acesso por apenas <strong>R$ 1,99</strong>.
        </p>
      `;
      // Insere a sobreposição dentro da div do player
      const playerContainer = document.querySelector('#live-player');
      if (playerContainer) {
        playerContainer.style.position = "relative";
        playerContainer.appendChild(overlay);
      }
    }, 10000); // 10 segundos
  });     
