export const EXPLOSION = "/aud/explosion.wav";
export const LASER_SHOOT = "/aud/laserShoot.wav";
export const PICKUP_COIN = "/aud/pickupCoin.wav";

export function playSound(url) {
    let ourAudio = document.createElement('audio'); // Create a audio element using the DOM
    ourAudio.style.display = "none"; // Hide the audio element
    ourAudio.src = url; // Set resource to our URL
    ourAudio.autoplay = true; // Automatically play sound
    ourAudio.onended = function() {
        this.remove(); // Remove when played.
    };
    document.body.appendChild(ourAudio);
}

export function playSoundRepeating(url, volume) {
    let ourAudio = document.createElement('audio'); // Create a audio element using the DOM
    ourAudio.style.display = "none"; // Hide the audio element
    ourAudio.src = url; // Set resource to our URL
    ourAudio.autoplay = true; // Automatically play sound
    ourAudio.loop = true;
    ourAudio.volume = volume;
    document.body.appendChild(ourAudio);
}