let livePlayer;

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
    // Configuração do player
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const overlay = document.createElement("div");
        overlay.id = "block-message";
        // Configuração do overlay
        const playerContainer = document.querySelector('#live-player');
        if (playerContainer) {
            playerContainer.appendChild(overlay);
        }
    }, 10000);
});
