let musicPlaying = false

const successContent = {
    valentine: {
        title: "Happy Valentine's Day! 💕",
        message: "You're my Valentine! 💖"
    },
    date: {
        title: "It's a date! 🎉",
        message: "I can't wait to go out with you! 💕"
    },
    married: {
        title: "We're getting married! 💍",
        message: "This is my favorite yes forever. 💞"
    }
}

window.addEventListener('load', () => {
    applyPageContent()
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function applyPageContent() {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    const content = successContent[type]

    if (!content) return

    document.title = content.title
    document.getElementById('success-title').textContent = content.title
    document.getElementById('success-message').textContent = content.message
}

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}
