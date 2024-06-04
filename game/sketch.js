let player;
let enemies = [];
let bullets = [];
let bulletPool = [];
let explosionParticles = [];
let particlePool = [];
let score = 0;
let gameState = 'title';
let magicMeter = 100; // Magic meter starts full
let currentLevel = 1;
let maxLevels = 3;
let levelThreshold = 1000;
let bgGif; // GIF image
let bgMusic;
let shootSound;
let explosionSound;

function preload() {
    bgGif = loadImage('10.gif'); // Load GIF image
    bgMusic = loadSound('60.mp3'); // Load background music
    shootSound = loadSound('80.mp3'); // Load shoot sound effect
    explosionSound = loadSound('100.mp3'); // Load explosion sound effect
}

function setup() {
    createCanvas(495, 400); // Set canvas size
    player = new Player(); // Create a new player instance
    bgMusic.loop(); // Start background music
}

function draw() {
    if (gameState === 'title') {
        titleScreen(); // Display title screen
    } else if (gameState === 'play') {
        image(bgGif, 0, 0, width, height); // Display GIF as background
        player.display(); // Display player
        player.move(); // Move player

        // Spawn enemies at regular intervals
        if (frameCount % 60 === 0) {
            enemies.push(new Enemy());
        }

        // Display and move enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].display();
            enemies[i].move();

            // Check for collision with player
            if (enemies[i].hits(player)) {
                gameState = 'gameOver'; // End game if an enemy hits the player
            }

            // Remove offscreen enemies and increase score
            if (enemies[i].offscreen()) {
                enemies.splice(i, 1);
                score++;
            }
        }

        // Display and move bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].display();
            bullets[i].move();

            // Remove offscreen bullets and return to pool
            if (bullets[i].offscreen()) {
                bulletPool.push(bullets.splice(i, 1)[0]);
                continue; // Skip further processing for this bullet
            }

            // Check for collision with enemies
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (bullets[i] && bullets[i].hits(enemies[j])) {
                    // Create explosion particles before removing the enemy
                    for (let k = 0; k < 5; k++) {
                        let p = getParticle(enemies[j].x, enemies[j].y, random(-2, 2), random(-2, 2));
                        explosionParticles.push(p);
                    }

                    bulletPool.push(bullets.splice(i, 1)[0]); // Return bullet to pool
                    enemies.splice(j, 1); // Remove enemy
                    score += 10; // Increase score
                    explosionSound.play(); // Play explosion sound
                    break; // Exit loop after a hit to avoid further checks
                }
            }
        }

        // Update and display explosion particles
        for (let i = explosionParticles.length - 1; i >= 0; i--) {
            explosionParticles[i].update();
            explosionParticles[i].display();
            if (explosionParticles[i].finished()) {
                particlePool.push(explosionParticles.splice(i, 1)[0]); // Return particle to pool
            }
        }

        // Display score
        displayScore();

        // Display magic meter
        fill(0, 0, 255);
        rect(20, height - 30, magicMeter, 10);

        // Check win condition
        if (score >= levelThreshold && currentLevel < maxLevels) {
            currentLevel++;
            startLevel(currentLevel); // Start next level
        } else if (currentLevel === maxLevels && score >= levelThreshold) {
            gameState = 'win'; // Win game if final level is completed
        }

        // Drain magic meter
        if (frameCount % 30 === 0 && magicMeter > 0) {
            magicMeter -= 5;
        }
    } else if (gameState === 'gameOver') {
        gameOverScreen(); // Display game over screen
    } else if (gameState === 'win') {
        winScreen(); // Display win screen
    }
}

function keyPressed() {
    if (gameState === 'title' && keyCode === ENTER) {
        startGame(); // Start game from title screen
    } else if ((gameState === 'gameOver' || gameState === 'win') && keyCode === ENTER) {
        restartGame(); // Restart game from game over or win screen
    } else if (gameState === 'play' && key === ' ') {
        let bullet = getBullet(player.x, player.y - 10); // Create a new bullet
        bullets.push(bullet); // Add bullet to bullets array
        shootSound.play(); // Play shoot sound
    }
}

function titleScreen() {
    background(0); // Black background
    fill(255); // White text
    textAlign(CENTER);
    textSize(48);
    text("Space Shooter Game", width / 2, height / 2 - 50);
    textSize(24);
    text("Press ENTER to start", width / 2, height / 2 + 50);
}

function startGame() {
    gameState = 'play';
    // Reset game variables
    player = new Player();
    enemies = [];
    bullets = [];
    score = 0;
    magicMeter = 100; // Reset magic meter
    currentLevel = 1;
    levelThreshold = 1000;
}

function restartGame() {
    startGame(); // Restart game
}

function gameOverScreen() {
    background(0); // Black background
    fill(255); // White text
    textAlign(CENTER, CENTER);
    textSize(64);
    text("Game Over", width / 2, height / 2);
    textSize(32);
    text("Final Score: " + score, width / 2, height / 2 + 50);
    textSize(24);
    text("Press ENTER to play again", width / 2, height / 2 + 100);
}

function winScreen() {
    background(0); // Black background
    fill(255); // White text
    textAlign(CENTER, CENTER);
    textSize(64);
    text("You Win!", width / 2, height / 2);
    textSize(32);
    text("Final Score: " + score, width / 2, height / 2 + 50);
    textSize(24);
    text("Press ENTER to play again", width / 2, height / 2 + 100);
}

function startLevel(level) {
    // Reset game variables for new level
    enemies = [];
    bullets = [];
    score = 0;
    // Add logic to set up enemies, obstacles, etc. for each level
}

function displayScore() {
    // Draw a translucent background for the score
    fill(0, 0, 0, 150); // Black with some transparency
    rect(10, 10, 120, 40, 10); // Rounded rectangle

    // Display the score text
    fill(255); // White text
    textSize(24);
    textAlign(LEFT, CENTER);
    text("Score: " + score, 20, 30);
}

class Player {
    constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.speed = 5;
    }

    display() {
        fill(255, 0, 0); // Red color
        rectMode(CENTER);
        rect(this.x, this.y, 50, 50); // Draw player as a red square
    }

    move() {
        if (keyIsDown(LEFT_ARROW) && this.x > 25) {
            this.x -= this.speed; // Move left
        } else if (keyIsDown(RIGHT_ARROW) && this.x < width - 25) {
            this.x += this.speed; // Move right
        }
    }
}
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 8; // Radius
        this.speed = 5; // Speed
    }

    display() {
        fill(255, 255, 0); // Yellow color
        ellipse(this.x, this.y, this.r * 2); // Draw bullet as an ellipse
    }

    move() {
        this.y -= this.speed; // Move bullet upwards
    }

    offscreen() {
        return this.y < 0; // Check if bullet is offscreen
    }

    hits(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        return d < this.r + 25; // Check for collision with enemy
    }
}

class Enemy {
    constructor() {
        this.x = random(width); // Random x position
        this.y = 0; // Start at the top
        this.speed = 3; // Speed
    }

    display() {
        fill(128); // Grey color
        ellipseMode(CENTER);
        ellipse(this.x, this.y, 50, 50); // Draw enemy as a grey circle
    }

    move() {
        this.y += this.speed; // Move enemy downwards
    }

    hits(player) {
        let d = dist(this.x, this.y, player.x, player.y);
        return d < 50; // Check for collision with player
    }

    offscreen() {
        return this.y > height; // Check if enemy is offscreen
    }
}

class Particle {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.lifespan = 255; // Initial lifespan
    }

    update() {
        this.x += this.xSpeed; // Update x position
        this.y += this.ySpeed; // Update y position
        this.lifespan -= 5; // Decrease lifespan
    }

    display() {
        noStroke();
        fill(255, this.lifespan); // Set color with alpha based on lifespan
        ellipse(this.x, this.y, 12); // Draw particle as an ellipse
    }

    finished() {
        return this.lifespan < 0; // Check if particle is finished
    }
}

function getBullet(x, y) {
    if (bulletPool.length > 0) {
        let b = bulletPool.pop(); // Reuse bullet from pool
        b.x = x;
        b.y = y;
        return b;
    } else {
        return new Bullet(x, y); // Create new bullet if pool is empty
    }
}

function getParticle(x, y, xSpeed, ySpeed) {
    if (particlePool.length > 0) {
        let p = particlePool.pop(); // Reuse particle from pool
        p.x = x;
        p.y = y;
        p.xSpeed = xSpeed;
        p.ySpeed = ySpeed;
        p.lifespan = 255;
        return p;
    } else {
        return new Particle(x, y, xSpeed, ySpeed); // Create new particle if pool is empty
    }
}
