const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 50;
const playerHeight = 20;
const player = {
    x: canvas.width / 2 - playerWidth / 2,
    y: canvas.height - playerHeight,
    width: playerWidth,
    height: playerHeight,
    speed: 5,
    dx: 0
};

const platforms = [];
const platformWidth = 80;
const platformHeight = 10;
const platformSpeed = 2;

function createPlatform(x, y) {
    return { x, y, width: platformWidth, height: platformHeight };
}

// Initialize some platforms
for (let i = 0; i < 5; i++) {
    const x = Math.random() * (canvas.width - platformWidth);
    const y = i * 100;
    platforms.push(createPlatform(x, y));
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    player.x += player.dx;
    
    // Player movement
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    
    // Platform movement
    platforms.forEach(platform => {
        platform.y += platformSpeed;
        if (platform.y > canvas.height) {
            platform.y = -platformHeight;
            platform.x = Math.random() * (canvas.width - platformWidth);
        }
    });

    // Collision detection
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height) {
            player.y = platform.y - player.height;
        }
    });

    if (player.y < canvas.height - playerHeight) {
        player.y += 1; // Gravity
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
    if (e.key === 'ArrowRight') player.dx = player.speed;
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') player.dx = 0;
});

update();
