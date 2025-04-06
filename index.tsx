// Simple HTML wrapper component that injects the full HTML from the user

const Index = () => {
  return (
    <div 
      className="w-full h-full" 
      dangerouslySetInnerHTML={{ 
        __html: `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="StreamXcellence - Assista aos melhores canais online">
    <meta name="keywords" content="streaming, TV ao vivo, online, programação, entretenimento">
    <meta name="author" content="StreamXcellence">
    
    <title>StreamXcellence 📺</title>
    
    <!-- Preconnect para melhorar o carregamento -->
    <link rel="preconnect" href="https://i.imgur.com">
    <link rel="preconnect" href="https://player.twitch.tv">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://streamxcellence.com/">
    <meta property="og:title" content="StreamXcellence 📺">
    <meta property="og:description" content="A melhor plataforma para assistir seus canais favoritos">
    <meta property="og:image" content="https://i.imgur.com/sj6EMam.jpeg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://streamxcellence.com/">
    <meta property="twitter:title" content="StreamXcellence 📺">
    <meta property="twitter:description" content="A melhor plataforma para assistir seus canais favoritos">
    <meta property="twitter:image" content="https://i.imgur.com/sj6EMam.jpeg">
    
    <style>
        /* Estilos Gerais */
        :root {
            --primary-color: #413ed8;
            --primary-hover: #322fb4;
            --secondary-color: #2ac3de;
            --secondary-hover: #23a1b9;
            --accent-color: #bb9af7;
            --text-color: #f5f5f5;
            --text-dark: #c0caf5;
            --background-dark: #1a1b26;
            --background-darker: #16161e;
            --card-background: rgba(26, 27, 38, 0.8);
            --card-background-hover: rgba(30, 30, 46, 0.95);
            --border-color: #292e42;
            --success-color: #9ece6a;
            --success-hover: #7eb356;
            --guide-bg: rgba(24, 25, 38, 0.95);
            --notification-bg: rgba(36, 40, 59, 0.9);
            --shadow-color: rgba(0, 0, 0, 0.4);
            --glass-effect: blur(15px);
            --font-main: 'Montserrat', sans-serif;
            --font-accent: 'Playfair Display', serif;
            --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-main);
            background-color: var(--background-dark);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
            line-height: 1.6;
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        /* Imagem de Fundo */
        .background-image {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: brightness(0.3) saturate(0.8);
        }

        /* Overlay Gradiente para o fundo */
        .background-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(26, 27, 38, 0.8) 0%, rgba(16, 16, 24, 0.95) 100%);
            z-index: -1;
        }

        /* Container Principal */
        .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
            width: 90%;
            max-width: 1200px;
            padding: 20px;
            gap: 20px;
            z-index: 1;
        }

        /* Componentes de Card */
        .login-container,
        .live-notification {
            backdrop-filter: var(--glass-effect);
            -webkit-backdrop-filter: var(--glass-effect);
            background: var(--card-background);
            padding: 25px;
            border-radius: 16px;
            box-shadow: 0 8px 32px var(--shadow-color);
            text-align: center;
            flex: 1;
            animation: fadeIn 1s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 300px;
            transition: var(--transition-normal);
            border: 1px solid var(--border-color);
        }

        .login-container:hover,
        .live-notification:hover {
            background: var(--card-background-hover);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            transform: translateY(-5px);
        }

        .login-container {
            max-width: 330px;
        }

        .live-notification {
            max-width: 650px;
        }

        /* Tipografia */
        h1 {
            font-family: var(--font-accent);
            font-size: 2em;
            margin-bottom: 20px;
            color: var(--text-color);
            letter-spacing: 0.5px;
            position: relative;
            display: inline-block;
        }

        h1::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 2px;
            background-color: var(--accent-color);
        }

        h2 {
            font-family: var(--font-accent);
            font-size: 1.4em;
            margin-bottom: 15px;
            color: var(--text-color);
            position: relative;
            display: inline-block;
        }

        h2::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            background-color: var(--secondary-color);
        }

        .subtitle {
            margin-bottom: 20px;
            color: var(--text-dark);
            font-size: 1em;
            font-weight: 300;
            max-width: 85%;
        }

        /* Formulários e Inputs */
        .input-group {
            width: 100%;
            margin-bottom: 18px;
            position: relative;
        }

        input {
            width: 100%;
            padding: 14px;
            margin-top: 10px;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            background: rgba(24, 25, 38, 0.5);
            color: white;
            font-size: 0.95em;
            outline: none;
            transition: var(--transition-normal);
        }

        input:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 8px rgba(187, 154, 247, 0.3);
        }

        .button-group {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-size: 0.95em;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition-normal);
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            transition: var(--transition-normal);
        }

        button:hover::before {
            left: 100%;
        }

        .btn-primary {
            background: var(--primary-color);
            color: white;
            box-shadow: 0 4px 15px rgba(65, 62, 216, 0.3);
        }

        .btn-primary:hover {
            background: var(--primary-hover);
            box-shadow: 0 4px 20px rgba(65, 62, 216, 0.4);
        }

        .btn-secondary {
            background: rgba(41, 46, 66, 0.7);
            color: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(5px);
        }

        .btn-secondary:hover {
            background: rgba(41, 46, 66, 0.9);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-info {
            background: var(--secondary-color);
            color: white;
            box-shadow: 0 4px 15px rgba(42, 195, 222, 0.3);
        }

        .btn-info:hover {
            background: var(--secondary-hover);
            box-shadow: 0 4px 20px rgba(42, 195, 222, 0.4);
        }

        button:active {
            transform: scale(0.97);
        }

        /* Mensagens de Erro */
        .error-message {
            color: #f7768e;
            font-size: 0.9em;
            margin-top: 10px;
            animation: shake 0.3s;
            min-height: 20px;
        }

        /* Guia de Programação Scrolling */
        #guide-container {
            width: 100%;
            background: var(--guide-bg);
            color: #fff;
            padding: 14px 0;
            margin-bottom: 25px;
            position: relative;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid var(--border-color);
        }

        .scrolling-text {
            display: inline-flex;
            width: max-content;
            animation: scroll-text 30s linear infinite;
            -webkit-animation: scroll-text 30s linear infinite;
        }

        .scrolling-text span {
            white-space: nowrap;
            padding-right: 60px;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* Animação de Zoom */
        #zoom-image-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-darker);
            z-index: 10;
            justify-content: center;
            align-items: center;
        }

        #zoom-image {
            max-width: 100%;
            max-height: 100%;
            animation: zoomOut 6s forwards;
        }

        /* Player Twitch */
        .live-notification .player {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* Aspect ratio 16:9 */
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            pointer-events: none;
            border: 1px solid var(--border-color);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .live-notification .player iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        #player-container {
            display: none;
            width: 100%;
            height: 100vh;
            text-align: center;
            border-radius: 0;
            overflow: hidden;
            box-shadow: none;
            background: linear-gradient(45deg, var(--background-dark), var(--background-darker));
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
        }

        #player-container.active {
            display: flex;
        }

        .player {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 0;
        }

        #player-container iframe {
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        /* Canal Info */
        .channel-info {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(26, 27, 38, 0.8);
            backdrop-filter: blur(10px);
            padding: 12px 18px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
            border: 1px solid var(--border-color);
        }

        #player-container:hover .channel-info {
            opacity: 1;
        }

        .channel-logo {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--accent-color);
        }

        .channel-name {
            font-weight: 600;
            font-size: 16px;
        }

        .live-indicator {
            background-color: #f7768e;
            color: white;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .live-indicator::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
        }
        
        /* Controles do Player */
        .player-controls {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(26, 27, 38, 0.85);
            backdrop-filter: blur(10px);
            padding: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: opacity 0.3s ease;
            opacity: 0;
            z-index: 1000;
            border-top: 1px solid var(--border-color);
        }

        #player-container:hover .player-controls {
            opacity: 1;
        }

        .controls-left {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        .controls-right {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        .control-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            width: auto;
            padding: 10px;
            border-radius: 50%;
            transition: background-color 0.2s, transform 0.2s;
        }

        .control-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transform: scale(1.05);
        }

        /* Volume Control */
        .volume-container {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .volume-slider {
            -webkit-appearance: none;
            width: 85px;
            height: 5px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.25);
            outline: none;
            transition: opacity 0.2s;
        }

        .volume-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--accent-color);
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            border: 2px solid white;
        }

        .volume-slider::-moz-range-thumb {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--accent-color);
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            border: 2px solid white;
        }
        
        /* Menu de qualidade */
        .quality-menu {
            position: absolute;
            bottom: 70px;
            right: 20px;
            background: rgba(26, 27, 38, 0.9);
            backdrop-filter: blur(15px);
            border-radius: 12px;
            padding: 12px;
            display: none;
            border: 1px solid var(--border-color);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .quality-menu.active {
            display: block;
            animation: fadeIn 0.2s ease-out;
        }

        .quality-option {
            color: white;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 8px;
            transition: var(--transition-normal);
            font-weight: 500;
        }

        .quality-option:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .quality-option.active {
            background: rgba(187, 154, 247, 0.3);
            color: var(--accent-color);
        }

        /* Modais */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .modal-content {
            background: linear-gradient(135deg, rgba(26, 27, 38, 0.9) 0%, rgba(24, 25, 38, 0.95) 100%);
            backdrop-filter: var(--glass-effect);
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            padding: 35px;
            text-align: center;
            position: relative;
            width: 90%;
            max-width: 500px;
            animation: fadeIn 0.4s ease-out;
            border: 1px solid var(--border-color);
        }

        #programacao-modal-content {
            background: linear-gradient(135deg, rgba(26, 27, 38, 0.9) 0%, rgba(24, 25, 38, 0.95) 100%);
            backdrop-filter: var(--glass-effect);
            color: #fff;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            width: 95%;
            max-width: 800px;
            position: relative;
            margin: 20px;
            text-align: left;
            overflow-y: auto;
            max-height: 80vh;
            border: 1px solid var(--border-color);
        }

        .modal-content h2,
        #programacao-modal-content h2 {
            color: var(--accent-color);
            font-size: 1.6em;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-family: var(--font-accent);
        }

        #programacao-modal-content h2 {
            color: var(--secondary-color);
            text-align: center;
            position: relative;
            display: inline-block;
            width: 100%;
            margin-bottom: 30px;
        }

        #programacao-modal-content h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 2px;
            background-color: var(--secondary-color);
        }

        .modal-content p {
            color: var(--text-dark);
            font-size: 1em;
            line-height: 1.6;
            margin-bottom: 20px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .close,
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            color: var(--text-dark);
            cursor: pointer;
            transition: color 0.3s ease, transform 0.2s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .close:hover,
        .close-modal:hover {
            color: var(--text-color);
            transform: rotate(90deg);
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* Email Container */
        .email-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            background: rgba(24, 25, 38, 0.6);
            padding: 15px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .email-container p {
            margin-right: 15px;
            font-size: 1em;
            color: var(--text-color);
            margin-bottom: 0;
        }

        #copy-email {
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            background-color: var(--success-color);
            color: #16161e;
            font-size: 0.9em;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            width: auto;
            box-shadow: 0 4px 15px rgba(158, 206, 106, 0.3);
        }

        #copy-email:hover {
            background-color: var(--success-hover);
            box-shadow: 0 4px 20px rgba(158, 206, 106, 0.4);
            transform: translateY(-2px);
        }
        
        #copy-email:active {
            transform: translateY(0);
        }

        /* Programação Lista */
        #programacao-lista {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        #programacao-lista li {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
            animation: fadeIn 0.5s ease-out;
            animation-fill-mode: both;
        }
        
        #programacao-lista li:nth-child(1) { animation-delay: 0.1s; }
        #programacao-lista li:nth-child(2) { animation-delay: 0.2s; }
        #programacao-lista li:nth-child(3) { animation-delay: 0.3s; }
        #programacao-lista li:nth-child(4) { animation-delay: 0.4s; }
        #programacao-lista li:nth-child(5) { animation-delay: 0.5s; }

        #programacao-lista li:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        #programacao-lista h3 {
            color: var(--accent-color);
            font-size: 1.3em;
            margin-bottom: 15px;
            font-family: var(--font-accent);
        }

        #programacao-lista img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin-bottom: 15px;
            max-height: 200px;
            object-fit: contain;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            transition: transform 0.3s ease;
        }
        
        #programacao-lista img:hover {
            transform: scale(1.02);
        }
        
        #programacao-lista p {
            line-height: 1.7;
            margin-bottom: 10px;
            color: var(--text-dark);
        }
        
        #programacao-lista p strong {
            color: var(--text-color);
            font-weight: 600;
        }
        
        /* Notificações */
        #notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        .notification {
            background: var(--notification-bg);
            backdrop-filter: blur(10px);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s forwards, fadeOut 0.5s 2.5s forwards;
            max-width: 300px;
            border: 1px solid var(--border-color);
            display: flex;
            align-items: center;
        }
        
        .notification.success {
            border-left: 4px solid var(--success-color);
        }
        
        .notification.error {
            border-left: 4px solid #f7768e;
        }
        
        .notification.info {
            border-left: 4px solid var(--secondary-color);
        }
        
        .notification.success::before,
        .notification.error::before,
        .notification.info::before {
            content: '';
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-size: contain;
            background-repeat: no-repeat;
        }
        
        .notification.success::before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ece6a' width='24' height='24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z'/%3E%3C/svg%3E");
        }
        
        .notification.error::before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f7768e' width='24' height='24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z'/%3E%3C/svg%3E");
        }
        
        .notification.info::before {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232ac3de' width='24' height='24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z'/%3E%3C/svg%3E");
        }
        
        /* Seleção de canais */
        #channels-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        #channels-modal-content {
            background: linear-gradient(135deg, rgba(26, 27, 38, 0.9) 0%, rgba(24, 25, 38, 0.95) 100%);
            backdrop-filter: var(--glass-effect);
            color: #fff;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            width: 95%;
            max-width: 1000px;
            position: relative;
            text-align: center;
            border: 1px solid var(--border-color);
            animation: fadeIn 0.4s ease-out;
        }
        
        .channels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .channel-card {
            background: rgba(24, 25, 38, 0.6);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            overflow: hidden;
            transition: var(--transition-normal);
            cursor: pointer;
            position: relative;
        }
        
        .channel-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border-color: var(--accent-color);
        }
        
        .channel-card img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-bottom: 1px solid var(--border-color);
        }
        
        .channel-card .channel-title {
            padding: 15px;
            font-weight: 600;
            font-size: 1em;
        }
        
        .channel-card .channel-description {
            padding: 0 15px 15px;
            font-size: 0.85em;
            color: var(--text-dark);
        }
        
        .channel-button {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background-color: var(--primary-color);
            color: white;
            width: auto;
            padding: 8px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(65, 62, 216, 0.3);
            font-size: 0.8em;
            opacity: 0;
            transition: var(--transition-normal);
        }
        
        .channel-card:hover .channel-button {
            opacity: 1;
        }
        
        /* Link personalizado */
        .custom-url-container {
            margin-top: 20px;
            padding: 20px;
            background: rgba(24, 25, 38, 0.6);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            text-align: left;
        }
        
        .custom-url-title {
            font-size: 1.2em;
            margin-bottom: 15px;
            color: var(--accent-color);
            font-weight: 600;
        }
        
        .url-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .url-input-group input {
            flex: 1;
        }
        
        .url-input-group button {
            width: auto;
            white-space: nowrap;
        }
        
        .player-type-toggle {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .player-type-option {
            flex: 1;
            padding: 10px;
            text-align: center;
            background: rgba(41, 46, 66, 0.6);
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition-normal);
            border: 1px solid transparent;
        }
        
        .player-type-option.active {
            background: rgba(187, 154, 247, 0.2);
            border-color: var(--accent-color);
            color: var(--accent-color);
        }
        
        .player-type-option:hover:not(.active) {
            background: rgba(41, 46, 66, 0.9);
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        /* Animações */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }

        @keyframes zoomOut {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }

        @keyframes scroll-text {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        @-webkit-keyframes scroll-text {
            0% { -webkit-transform: translateX(0); }
            100% { -webkit-transform: translateX(-50%); }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(0.95);
                opacity: 0.5;
            }
            50% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0.95);
                opacity: 0.5;
            }
        }

        /* Media Queries */
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
                align-items: center;
            }

            .login-container,
            .live-notification {
                width: 100%;
                max-width: none;
                min-width: auto;
                margin-bottom: 20px;
            }
            
            .scrolling-text {
                animation-duration: 25s;
                -webkit-animation-duration: 25s;
            }
            
            .volume-slider {
                width: 80px;
            }
            
            .channel-info {
                top: 10px;
                left: 10px;
                padding: 8px 10px;
            }
            
            .channel-logo {
                width: 30px;
                height: 30px;
            }
            
            .channels-grid {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            
            .url-input-group {
                flex-direction: column;
            }
            
            .url-input-group button {
                width: 100%;
            }
            
            .modal-content,
            #programacao-modal-content,
            #channels-modal-content {
                padding: 20px;
            }
            
            h1 {
                font-size: 1.6em;
            }
            
            h2 {
                font-size: 1.2em;
            }
        }

        @media (max-width: 576px) {
            .modal-content,
            #programacao-modal-content,
            #channels-modal-content {
                padding: 20px;
                width: 95%;
            }

            .modal-content h2,
            #programacao-modal-content h2,
            #channels-modal-content h2 {
                font-size: 1.3em;
            }

            .close,
            .close-modal {
                font-size: 24px;
                top: 10px;
                right: 15px;
            }

            .scrolling-text {
                animation-duration: 20s;
                -webkit-animation-duration: 20s;
                font-size: 14px;
            }

            .scrolling-text span {
                padding-right: 40px;
            }
            
            .volume-slider {
                width: 60px;
            }
            
            .channels-grid {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 15px;
            }
            
            .channel-title {
                font-size: 0.9em;
            }
            
            .player-type-toggle {
                flex-direction: column;
            }
        }
    </style>
</head>

<body>
    <!-- Imagem de fundo -->
    <img src="https://i.imgur.com/sj6EMam.jpeg" alt="Background" class="background-image" loading="lazy">
    
    <!-- Overlay de fundo -->
    <div class="background-overlay"></div>

    <!-- Imagem de animação inicial -->
    <div id="zoom-image-container">
        <img id="zoom-image" src="https://i.imgur.com/QsrJDbX.png" alt="Imagem de boas-vindas">
    </div>

    <!-- Container de notificações -->
    <div id="notification-container"></div>

    <main class="container">
        <!-- Seção de login -->
        <section class="login-container" id="login-container">
            <h1>StreamXcellence</h1>
            <p class="subtitle">Digite a chave de acesso para entrar</p>
            
            <div class="input-group">
                <label for="key-input" class="sr-only">Chave de acesso</label>
                <input 
                    type="text" 
                    id="key-input" 
                    placeholder="Digite a chave de acesso" 
                    aria-label="Chave de acesso" 
                    autocomplete="off"
                />
            </div>
            
            <div class="button-group">
                <button type="button" onclick="verifyKey()" class="btn-primary">Entrar</button>
                <button type="button" onclick="openModal()" class="btn-secondary">Obter chave de acesso</button>
                <button type="button" id="view-guide-button" onclick="openProgramacaoModal()" class="btn-info">Ver guia de programação</button>
            </div>
            
            <div class="error-message" id="error-message" role="alert" aria-live="assertive"></div>
        </section>

        <!-- Seção de notificação ao vivo -->
        <section class="live-notification" id="live-notification">
            <h2>O que está passando agora</h2>
            
            <div id="guide-container" role="marquee">
                <div class="scrolling-text" id="scrolling-text">
                    <span id="guide-text">Carregando guia...</span>
                    <span id="guide-text-duplicate">Carregando guia...</span>
                </div>
            </div>
            
            <div class="player" id="live-player" aria-label="Prévia do conteúdo ao vivo"></div>
        </section>
    </main>

    <!-- Container do player principal -->
    <div id="player-container" aria-live="polite">
        <div class="player twitch-player" id="player">
            <div id="twitch-embed"></div>
            <div id="hls-player-container" style="display:none; width:100%; height:100%;">
                <video id="hls-player" controls style="width:100%; height:100%;"></video>
            </div>
        </div>
        
        <!-- Canal Info -->
        <div class="channel-info">
            <img src="https://i.imgur.com/QsrJDbX.png" alt="Logo do canal" class="channel-logo">
            <div>
                <div class="channel-name">StreamXcellence</div>
                <span class="live-indicator">AO VIVO</span>
            </div>
        </div>
        
        <!-- Menu de Qualidade -->
        <div id="quality-menu" class="quality-menu"></div>
        
        <!-- Controles do Player -->
        <div class="player-controls">
            <div class="controls-left">
                <button id="play-pause-btn" class="control-btn">⏸️</button>
                <div class="volume-container">
                    <button id="mute-btn" class="control-btn">🔊</button>
                    <input type="range" id="volume-slider" class="volume-slider" min="0" max="1" step="0.05" value="1">
                </div>
            </div>
            <div class="controls-right">
                <button id="channels-btn" class="control-btn" onclick="openChannelsModal()">📺</button>
                <button id="quality-btn" class="control-btn">⚙️</button>
                <button id="fullscreen-btn" class="control-btn">⛶</button>
            </div>
        </div>
    </div>

    <!-- Modal de aquisição de chave -->
    <div id="modal" class="modal" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-content">
            <span class="close" onclick="closeModal()" aria-label="Fechar">&times;</span>
            <h2 id="modal-title">Adquirir Chave para Acesso</h2>
            <p>Para desfrutar do melhor conteúdo StreamXcellence, adquira sua chave de acesso. Siga as instruções abaixo e
                envie o comprovante para liberação imediata.</p>
            <p><strong>Valor Simbólico: R$ 2,00</strong></p>
            
            <div class="email-container">
                <p id="pix-email">Pix: lourimarcos@outlook.com</p>
                <button id="copy-email" onclick="copyEmail()" aria-label="Copiar email">Copiar</button>
            </div>
            
            <p>A chave tem duração de <strong>15 dias</strong></p>
            
            <div class="input-group">
                <label for="user-name" class="sr-only">Seu Nome</label>
                <input type="text" id="user-name" placeholder="Seu Nome" aria-required="true" />
            </div>
            
            <button type="button" onclick="sendToWhatsApp()" class="btn-primary">Enviar</button>
        </div>
    </div>

    <!-- Modal do guia de programação -->
    <div id="programacao-modal" class="modal" role="dialog" aria-labelledby="programacao-title" aria-hidden="true">
        <div id="programacao-modal-content">
            <span class="close-modal" onclick="closeProgramacaoModal()" aria-label="Fechar">&times;</span>
            <h2 id="programacao-title">StreamXcellence | Guia de Programação</h2>
            <ul id="programacao-lista" aria-live="polite"></ul>
        </div>
    </div>
    
    <!-- Modal de canais -->
    <div id="channels-modal" class="modal" role="dialog" aria-labelledby="channels-title" aria-hidden="true">
        <div id="channels-modal-content">
            <span class="close-modal" onclick="closeChannelsModal()" aria-label="Fechar">&times;</span>
            <h2 id="channels-title">Escolha um Canal</h2>
            
            <div class="channels-grid" id="channels-grid">
                <!-- Canais serão adicionados aqui via JavaScript -->
            </div>
            
            <div class="custom-url-container">
                <div class="custom-url-title">Reproduzir URL Personalizada</div>
                
                <div class="player-type-toggle">
                    <div id="twitch-toggle" class="player-type-option active" onclick="switchPlayerType('twitch')">Twitch</div>
                    <div id="hls-toggle" class="player-type-option" onclick="switchPlayerType('hls')">HLS / HTTP</div>
                </div>
                
                <div class="url-input-group">
                    <input type="text" id="custom-url" placeholder="Cole a URL aqui..." />
                    <button onclick="playCustomUrl()" class="btn-primary">Reproduzir</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts para HLS Player -->
    <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
    
    <!-- Scripts do Twitch -->
    <script src="https://player.twitch.tv/js/embed/v1.js"></script>
    <script>
        // Variáveis globais
        let player;
        let livePlayer;
        let hlsPlayer;
        let qualities = [];
        let currentQuality = 'auto';
        let isQualityMenuOpen = false;
        let notificationTimeout;
        let currentPlayerType = 'twitch';
        let userKey = '';

        // Verificar se o HLS.js é suportado
        const isHlsSupported = Hls.isSupported();
        
        // Canais disponíveis
        const availableChannels = [
            {
                title: "Canal Principal",
                type: "twitch",
                url: "lourimarcos",
                image: "https://i.imgur.com/QsrJDbX.png",
                description: "Canal oficial StreamXcellence"
            },
            {
                title: "Filmes & Séries",
                type: "twitch",
                url: "caiocassoli",
                image: "https://i.imgur.com/k8UZfvN.jpeg",
                description: "Filmes e séries exclusivos"
            },
            {
                title: "Esportes ao Vivo",
                type: "twitch",
                url: "manolistv",
                image: "https://i.imgur.com/KCnJ0vw.jpeg",
                description: "Os melhores eventos esportivos"
            },
            {
                title: "Documentários",
                type: "twitch",
                url: "alfredo_o_humilde",
                image: "https://i.imgur.com/XeYpg0K.jpeg",
                description: "Documentários fascinantes"
            }
        ];

        // Função para reproduzir vídeo
        function playVideo(videoElement) {
            videoElement.play().catch(error => {
                console.log('Erro ao reproduzir o vídeo:', error);
            });
        }

        // Função para mostrar notificações
        function showNotification(message, type = 'info') {
            const container = document.getElementById('notification-container');
            const notification = document.createElement('div');
            notification.className = \`notification \${type}\`;
            notification.textContent = message;
            container.appendChild(notification);
            
            // Remover notificação após 3 segundos
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
        
        // Atualizar menu de qualidade
        function updateQualityMenu() {
            const qualityMenu = document.getElementById('quality-menu');
            qualityMenu.innerHTML = '';
            
            if (currentPlayerType !== 'twitch' || !player || !qualities.length) {
                return;
            }
            
            // Opção auto
            const autoOption = document.createElement('div');
            autoOption.className = \`quality-option \${currentQuality === 'auto' ? 'active' : ''}\`;
            autoOption.textContent = 'Auto';
            autoOption.onclick = () => {
                player.setQuality('auto');
                currentQuality = 'auto';
                updateQualityMenu();
                showNotification('Qualidade alterada para Automático', 'info');
                toggleQualityMenu();
            };
            qualityMenu.appendChild(autoOption);
            
            // Outras opções de qualidade
            qualities.forEach(quality => {
                const option = document.createElement('div');
                option.className = \`quality-option \${currentQuality === quality.name ? 'active' : ''}\`;
                option.textContent = quality.name;
                option.onclick = () => {
                    player.setQuality(quality.name);
                    currentQuality = quality.name;
                    updateQualityMenu();
                    showNotification(\`Qualidade alterada para \${quality.name}\`, 'info');
                    toggleQualityMenu();
                };
                qualityMenu.appendChild(option);
            });
        }
        
        // Alternar menu de qualidade
        function toggleQualityMenu() {
            const qualityMenu = document.getElementById('quality-menu');
            isQualityMenuOpen = !isQualityMenuOpen;
            
            if (isQualityMenuOpen) {
                qualityMenu.classList.add('active');
            } else {
                qualityMenu.classList.remove('active');
            }
        }

        // Função para criar player do Twitch com controles personalizados
        function createTwitchPlayer(channel = "lourimarcos") {
            // Esconder player HLS se estiver visível
            document.getElementById('hls-player-container').style.display = 'none';
            document.getElementById('twitch-embed').style.display = 'block';
            
            if (!document.querySelector("#twitch-embed iframe")) {
                player = new Twitch.Player("twitch-embed", {
                    channel: channel,
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
                    
                    // Obter qualidades disponíveis
                    setTimeout(() => {
                        qualities = player.getQualities();
                        updateQualityMenu();
                    }, 2000);
                    
                    // Inicializar controles personalizados
                    initCustomControls();
                    
                    const playerElement = player.getIframe();
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    playerElement.dispatchEvent(clickEvent);
                    
                    showNotification('Reprodução iniciada', 'success');
                });

                player.addEventListener(Twitch.Player.PLAY, () => {
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    if (playPauseBtn) playPauseBtn.textContent = '⏸️';
                });
                
                player.addEventListener(Twitch.Player.PAUSE, () => {
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    if (playPauseBtn) playPauseBtn.textContent = '▶️';
                });

                player.addEventListener(Twitch.Player.OFFLINE, () => {
                    document.getElementById('player-container').innerHTML = \`
                        <div class="offline-container">
                            <h2>Canal Offline</h2>
                            <p>🔴 ESTAMOS OFFLINE NO MOMENTO, TENTE NOVAMENTE MAIS TARDE 😢 🔴</p>
                            <button onclick="closePlayer()" class="btn-primary">Voltar</button>
                        </div>
                    \`;
                    
                    showNotification('O canal está offline no momento', 'error');
                });
            } else {
                // Mudar canal se o player já existe
                player.setChannel(channel);
                showNotification(\`Mudando para o canal: \${channel}\`, 'info');
            }
            
            currentPlayerType = 'twitch';
        }
        
        // Função para criar player HLS
        function createHlsPlayer(url) {
            // Esconder player Twitch se estiver visível
            document.getElementById('twitch-embed').style.display = 'none';
            document.getElementById('hls-player-container').style.display = 'block';
            
            const videoElement = document.getElementById('hls-player');
            
            // Destruir instância anterior se existir
            if (hlsPlayer) {
                hlsPlayer.destroy();
            }
            
            if (isHlsSupported) {
                hlsPlayer = new Hls();
                hlsPlayer.loadSource(url);
                hlsPlayer.attachMedia(videoElement);
                
                hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function() {
                    videoElement.play();
                    showNotification('Reprodução HLS iniciada', 'success');
                });
                
                hlsPlayer.on(Hls.Events.ERROR, function(event, data) {
                    if (data.fatal) {
                        switch(data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                showNotification('Erro de rede ao carregar o stream', 'error');
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                showNotification('Erro de mídia ao reproduzir o stream', 'error');
                                break;
                            default:
                                showNotification('Erro ao carregar o stream', 'error');
                                break;
                        }
                    }
                });
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                // Para Safari que suporta HLS nativamente
                videoElement.src = url;
                videoElement.addEventListener('loadedmetadata', function() {
                    videoElement.play();
                    showNotification('Reprodução HLS iniciada', 'success');
                });
            } else {
                showNotification('Seu navegador não suporta reprodução HLS', 'error');
            }
            
            currentPlayerType = 'hls';
        }

        // Inicializar controles personalizados
        function initCustomControls() {
            const playPauseBtn = document.getElementById('play-pause-btn');
            const muteBtn = document.getElementById('mute-btn');
            const volumeSlider = document.getElementById('volume-slider');
            const qualityBtn = document.getElementById('quality-btn');
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            
            // Desativar botão de qualidade para HLS
            if (currentPlayerType === 'hls') {
                qualityBtn.style.opacity = '0.5';
                qualityBtn.style.pointerEvents = 'none';
            } else {
                qualityBtn.style.opacity = '1';
                qualityBtn.style.pointerEvents = 'auto';
                
                // Definir volume inicial para Twitch
                if (player) {
                    volumeSlider.value = player.getVolume();
                }
            }
            
            updateVolumeIcon();
            
            // Adicionar eventos para os controles
            playPauseBtn.addEventListener('click', togglePlay);
            
            volumeSlider.addEventListener('input', () => {
                const volume = parseFloat(volumeSlider.value);
                
                if (currentPlayerType === 'twitch' && player) {
                    player.setVolume(volume);
                    player.setMuted(volume === 0);
                } else if (currentPlayerType === 'hls' && document.getElementById('hls-player')) {
                    const videoElement = document.getElementById('hls-player');
                    videoElement.volume = volume;
                    videoElement.muted = volume === 0;
                }
                
                updateVolumeIcon();
            });
            
            muteBtn.addEventListener('click', toggleMute);
            qualityBtn.addEventListener('click', function() {
                if (currentPlayerType === 'twitch') {
                    toggleQualityMenu();
                }
            });
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            
            // Adicionar listener para teclas
            document.addEventListener('keydown', handleKeyPress);
        }
        
        // Alternar reprodução
        function togglePlay() {
            if (currentPlayerType === 'twitch' && player) {
                if (player.isPaused()) {
                    player.play();
                    showNotification('Reproduzindo', 'info');
                } else {
                    player.pause();
                    showNotification('Pausado', 'info');
                }
            } else if (currentPlayerType === 'hls') {
                const videoElement = document.getElementById('hls-player');
                if (videoElement.paused) {
                    videoElement.play();
                    document.getElementById('play-pause-btn').textContent = '⏸️';
                    showNotification('Reproduzindo', 'info');
                } else {
                    videoElement.pause();
                    document.getElementById('play-pause-btn').textContent = '▶️';
                    showNotification('Pausado', 'info');
                }
            }
        }
        
        // Alternar mudo
        function toggleMute() {
            if (currentPlayerType === 'twitch' && player) {
                const muted = player.getMuted();
                player.setMuted(!muted);
                updateVolumeIcon();
                showNotification(muted ? 'Som ativado' : 'Som desativado', 'info');
            } else if (currentPlayerType === 'hls') {
                const videoElement = document.getElementById('hls-player');
                videoElement.muted = !videoElement.muted;
                
                if (videoElement.muted) {
                    document.getElementById('mute-btn').textContent = '🔇';
                    showNotification('Som desativado', 'info');
                } else {
                    updateVolumeIcon();
                    showNotification('Som ativado', 'info');
                }
            }
        }
        
        // Atualizar ícone de volume
        function updateVolumeIcon() {
            const muteBtn = document.getElementById('mute-btn');
            
            if (!muteBtn) return;
            
            if (currentPlayerType === 'twitch' && player) {
                if (player.getMuted() || player.getVolume() === 0) {
                    muteBtn.textContent = '🔇';
                } else if (player.getVolume() < 0.5) {
                    muteBtn.textContent = '🔉';
                } else {
                    muteBtn.textContent = '🔊';
                }
            } else if (currentPlayerType === 'hls') {
                const videoElement = document.getElementById('hls-player');
                if (videoElement) {
                    if (videoElement.muted || videoElement.volume === 0) {
                        muteBtn.textContent = '🔇';
                    } else if (videoElement.volume < 0.5) {
                        muteBtn.textContent = '🔉';
                    } else {
                        muteBtn.textContent = '🔊';
                    }
                }
            }
        }
        
        // Função para alternar tela cheia
        function toggleFullscreen() {
            const container = document.getElementById('player-container');
            
            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) { /* Safari */
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) { /* IE11 */
                    container.msRequestFullscreen();
                }
                showNotification('Tela cheia ativada', 'info');
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
                showNotification('Tela cheia desativada', 'info');
            }
        }
        
        // Manipular teclas de atalho
        function handleKeyPress(event) {
            // Só processar atalhos quando o player estiver visível
            if (!document.getElementById('player-container').classList.contains('active')) return;
            
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
                    const volumeSlider = document.getElementById('volume-slider');
                    let currentVolume = parseFloat(volumeSlider.value);
                    const newVolume = Math.min(1, currentVolume + 0.05);
                    
                    volumeSlider.value = newVolume;
                    
                    if (currentPlayerType === 'twitch' && player) {
                        player.setVolume(newVolume);
                        player.setMuted(false);
                    } else if (currentPlayerType === 'hls') {
                        const videoElement = document.getElementById('hls-player');
                        videoElement.volume = newVolume;
                        videoElement.muted = false;
                    }
                    
                    updateVolumeIcon();
                    showNotification(\`Volume: \${Math.round(newVolume * 100)}%\`, 'info');
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    const volumeSliderDown = document.getElementById('volume-slider');
                    let currentVolumeDown = parseFloat(volumeSliderDown.value);
                    const newVolumeDown = Math.max(0, currentVolumeDown - 0.05);
                    
                    volumeSliderDown.value = newVolumeDown;
                    
                    if (currentPlayerType === 'twitch' && player) {
                        player.setVolume(newVolumeDown);
                        player.setMuted(newVolumeDown === 0);
                    } else if (currentPlayerType === 'hls') {
                        const videoElement = document.getElementById('hls-player');
                        videoElement.volume = newVolumeDown;
                        videoElement.muted = newVolumeDown === 0;
                    }
                    
                    updateVolumeIcon();
                    showNotification(\`Volume: \${Math.round(newVolumeDown * 100)}%\`, 'info');
                    event.preventDefault();
                    break;
            }
        }

        // Função para criar player de notificação ao vivo
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

            // Recarregar o player de prévia periodicamente
            function reloadLivePlayer() {
                if (livePlayer) {
                    livePlayer.seek(0);
                }
            }
            setInterval(reloadLivePlayer, 30000);
        }

        // Carregar o guia de programação
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

        // Carregar as chaves válidas
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
                    validKeys = data.split('\\n').map(key => key.trim()).filter(key => key.length > 0);
                    console.log('Chaves carregadas com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao carregar as chaves:', error);
                    // Exibir mensagem de erro na interface se necessário
                    const errorMessage = document.getElementById('error-message');
                    if (errorMessage) {
                        errorMessage.textContent = "Erro ao carregar chaves de acesso. Tente novamente mais tarde.";
                    }
                });
        }

        // Verificar a chave inserida
        function verifyKey() {
            const keyInput = document.getElementById('key-input').value;
            const errorMessage = document.getElementById('error-message');

            if (!keyInput) {
                errorMessage.textContent = "Por favor, digite uma chave de acesso.";
                return;
            }

            if (validKeys.includes(keyInput)) {
                // Salvar a chave para uso em canais
                userKey = keyInput;
                
                // Esconder o container de login
                document.getElementById('login-container').style.display = 'none';
                
                // Mostrar a animação de zoom
                const zoomImageContainer = document.getElementById('zoom-image-container');
                zoomImageContainer.style.display = 'flex';
                
                // Após a animação, mostrar o player
                setTimeout(() => {
                    zoomImageContainer.style.display = 'none';
                    document.getElementById('player-container').classList.add('active');
                    createTwitchPlayer();
                }, 2000);
                
                // Esconder a notificação ao vivo
                document.getElementById('live-notification').style.display = 'none';
                
                // Exibir mensagem de boas-vindas
                showWelcomeMessage();
            } else {
                errorMessage.textContent = "Chave inválida. Tente novamente.";
                showNotification("Chave inválida. Tente novamente.", "error");
                // Animação de shake no input
                const keyInputElem = document.getElementById('key-input');
                keyInputElem.classList.add('shake');
                setTimeout(() => keyInputElem.classList.remove('shake'), 500);
            }
        }

        // Exibir mensagem de boas-vindas
        function showWelcomeMessage() {
            showNotification("Seja Bem-vindo!!!", "success");
            
            const welcomeMessage = document.createElement('div');
            welcomeMessage.textContent = "Seja Bem-vindo!!!";
            welcomeMessage.style.position = "absolute";
            welcomeMessage.style.top = "20px";
            welcomeMessage.style.left = "50%";
            welcomeMessage.style.transform = "translateX(-50%)";
            welcomeMessage.style.color = "white";
            welcomeMessage.style.fontSize = "18px";
            welcomeMessage.style.backgroundColor = "rgba(24, 25, 38, 0.8)";
            welcomeMessage.style.padding = "12px 20px";
            welcomeMessage.style.borderRadius = "12px";
            welcomeMessage.style.zIndex = "1000";
            welcomeMessage.style.backdropFilter = "blur(10px)";
            welcomeMessage.style.border = "1px solid var(--border-color)";
            document.body.appendChild(welcomeMessage);

            setTimeout(() => {
                welcomeMessage.remove();
            }, 6000);
        }

        // Funções para os modais
        function openModal() {
            document.getElementById("modal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }
        
        // Funções para o modal de canais
        function openChannelsModal() {
            // Verificar se a chave já foi validada
            if (!userKey) {
                showNotification("Por favor, faça login primeiro", "error");
                return;
            }
            
            populateChannels();
            document.getElementById("channels-modal").style.display = "flex";
        }
        
        function closeChannelsModal() {
            document.getElementById("channels-modal").style.display = "none";
        }
        
        // Preencher a grade de canais
        function populateChannels() {
            const channelsGrid = document.getElementById("channels-grid");
            channelsGrid.innerHTML = '';
            
            availableChannels.forEach(channel => {
                const channelCard = document.createElement('div');
                channelCard.className = 'channel-card';
                channelCard.innerHTML = \`
                    <img src="\${channel.image}" alt="\${channel.title}">
                    <div class="channel-title">\${channel.title}</div>
                    <div class="channel-description">\${channel.description}</div>
                    <button class="channel-button">Assistir</button>
                \`;
                
                channelCard.addEventListener('click', () => {
                    playChannel(channel);
                    closeChannelsModal();
                });
                
                channelsGrid.appendChild(channelCard);
            });
        }
        
        // Reproduzir canal selecionado
        function playChannel(channel) {
            if (channel.type === 'twitch') {
                createTwitchPlayer(channel.url);
            } else if (channel.type === 'hls') {
                createHlsPlayer(channel.url);
            }
        }
        
        // Alternar tipo de player
        function switchPlayerType(type) {
            currentPlayerType = type;
            
            document.getElementById('twitch-toggle').classList.toggle('active', type === 'twitch');
            document.getElementById('hls-toggle').classList.toggle('active', type === 'hls');
            
            const customUrlInput = document.getElementById('custom-url');
            if (type === 'twitch') {
                customUrlInput.placeholder = "Nome do canal Twitch (ex: lourimarcos)";
            } else {
                customUrlInput.placeholder = "URL do stream HLS (ex: https://...)";
            }
        }
        
        // Reproduzir URL personalizada
        function playCustomUrl() {
            const customUrl = document.getElementById('custom-url').value.trim();
            
            if (!customUrl) {
                showNotification("Por favor, insira uma URL válida", "error");
                return;
            }
            
            closeChannelsModal();
            
            if (currentPlayerType === 'twitch') {
                createTwitchPlayer(customUrl);
            } else {
                // Adicionar protocolo se não estiver presente
                let finalUrl = customUrl;
                if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
                    finalUrl = 'https://' + customUrl;
                }
                createHlsPlayer(finalUrl);
            }
        }

        function sendToWhatsApp() {
            const name = document.getElementById("user-name").value;
            if (!name) {
                alert("Por favor, preencha seu nome antes de enviar.");
                showNotification("Por favor, preencha seu nome antes de enviar.", "error");
                return;
            }
            const message = \`Olá StreamXcellence, me chamo \${name}. Efetuei o pagamento da chave de acesso e estou enviando o comprovante para liberação imediata.\`;
            window.location.href = \`https://wa.me/5564996718993?text=\${encodeURIComponent(message)}\`;
        }

        // Função para copiar email
        function copyEmail() {
            const emailText = document.getElementById("pix-email").innerText;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(emailText)
                    .then(() => {
                        // Feedback visual
                        const copyButton = document.getElementById("copy-email");
                        const originalText = copyButton.textContent;
                        copyButton.textContent = "Copiado!";
                        copyButton.style.backgroundColor = "#9ece6a";
                        
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
                // Fallback para navegadores que não suportam a API Clipboard
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

        // Funções para o modal de programação
        function openProgramacaoModal() {
            document.getElementById("programacao-modal").style.display = "flex";
            carregarProgramacao();
        }

        function closeProgramacaoModal() {
            document.getElementById("programacao-modal").style.display = "none";
        }

        // Carregar a programação detalhada
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
                    const programas = data.trim().split('\\n\\n');
                    
                    if (programas.length === 0) {
                        listaProgramacao.innerHTML = '<li>Nenhuma programação disponível no momento.</li>';
                        return;
                    }
                    
                    listaProgramacao.innerHTML = '';

                    programas.forEach(programa => {
                        const detalhes = programa.split('\\n');
                        if (detalhes.length >= 4) {
                            const titulo = detalhes[0].replace("Título: ", "").trim();
                            const sinopse = detalhes[1].replace("Sinopse: ", "").trim();
                            const horario = detalhes[2].replace("Horário: ", "").trim();
                            const imgLink = detalhes[3].replace("Imagem Capa: ", "").trim();

                            const listItem = document.createElement('li');
                            listItem.innerHTML = \`
                                <h3>\${titulo}</h3>
                                <img src="\${imgLink}" alt="Capa de \${titulo}" loading="lazy">
                                <p><strong>Sinopse:</strong> \${sinopse}</p>
                                <p><strong>Horário:</strong> \${horario}</p>
                            \`;
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
        
        // Fechar player e voltar para a tela inicial
        function closePlayer() {
            document.getElementById('player-container').classList.remove('active');
            document.getElementById('login-container').style.display = 'flex';
            document.getElementById('live-notification').style.display = 'flex';
        }

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
            
            // Adicionar evento de tecla Enter para o input de URL personalizada
            const customUrl = document.getElementById('custom-url');
            if (customUrl) {
                customUrl.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        playCustomUrl();
                    }
                });
            }
        });
    </script>
    
    <!-- IMPORTANTE: NÃO REMOVA ESTA TAG DE SCRIPT OU ESTE COMENTÁRIO! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>

</html>
` 
      }} 
    />
  );
};
