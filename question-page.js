const pageType = document.body.dataset.proposalType || 'valentine'

const successTargets = {
    valentine: 'yes.html?type=valentine',
    date: 'yes.html?type=date',
    married: 'yes.html?type=married'
}

const gifStages = [
    "https://media.tenor.com/eNHbizSfVb0AAAAj/lovemode-cute.gif",
    "https://media.tenor.com/4F0K8CdxlRIAAAAj/cat-surprised.gif",
    "https://media.tenor.com/q8vI0d0H5tAAAAAj/cat-begging.gif",
    "https://media.tenor.com/zJxj8rK9R3gAAAAj/cat-sad.gif",
    "https://media.tenor.com/7K8rL0WvabcAAAAj/crying-cat-cat.gif"
]

const noMessagesByType = {
    valentine: [
        "No",
        "Are you sure? 💕",
        "Please be my Valentine... 🥺",
        "That was a tiny heart break 💔",
        "Still no? I'm pouting now 😢",
        "You can't press me that easily 😜"
    ],
    date: [
        "No",
        "Not even one cute date? 🥺",
        "I can plan snacks too... 🍓",
        "Come on, it'll be fun 💕",
        "You're really making me work for it 😭",
        "Too slow, hehe 😜"
    ],
    married: [
        "No",
        "Think about forever first 💍",
        "I promise I'd be adorable 🥺",
        "My heart just gasped 💔",
        "Okay this one hurts a little 😢",
        "Nope, you can't catch this button 😜"
    ]
}

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const pikachuGif = document.getElementById('pikachu-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play().catch(() => {})
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    window.location.href = successTargets[pageType] || 'yes.html'
}

function handleNoClick() {
    noClickCount++

    const noMessages = noMessagesByType[pageType] || noMessagesByType.valentine
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const yesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${yesSize * 1.18}px`
    const yesPadY = Math.min(18 + noClickCount * 5, 60)
    const yesPadX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${yesPadY}px ${yesPadX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.86, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 4 && !runawayEnabled) {
        showTeaseMessage("The no button has trust issues now 👀")
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    pikachuGif.style.opacity = '0'
    setTimeout(() => {
        pikachuGif.src = src
        pikachuGif.style.opacity = '1'
    }, 200)
}

function showTeaseMessage(msg) {
    const toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * Math.max(maxX, 40) + margin / 2
    const randomY = Math.random() * Math.max(maxY, 40) + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
