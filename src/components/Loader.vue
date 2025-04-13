<template>
    <div class="loader-overlay">
        <div class="loader-container">
            <div class="loader-circle circle-1"></div>
            <div class="loader-circle circle-2"></div>
            <div class="loader-circle circle-3"></div>
            <div class="loader-logo">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 5L30 15L40 17.5L32.5 25L35 35L25 30L15 35L17.5 25L10 17.5L20 15L25 5Z" fill="#FFFFFF"
                        stroke="#FF6500" stroke-width="2" />
                </svg>
            </div>
            <div class="loader-text">Loading<span class="dot-animation">...</span></div>
        </div>
    </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #C40C0C 0%, #FF6500 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader-container {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader-circle {
    position: absolute;
    border-radius: 50%;
    border: 3px solid transparent;
    mix-blend-mode: screen;
}

.circle-1 {
    width: 120px;
    height: 120px;
    border-top-color: #FFC100;
    border-left-color: #FFC100;
    animation: spin 1.5s linear infinite;
}

.circle-2 {
    width: 90px;
    height: 90px;
    border-top-color: #FF8A08;
    border-right-color: #FF8A08;
    animation: spin-reverse 1.2s linear infinite;
}

.circle-3 {
    width: 60px;
    height: 60px;
    border-bottom-color: #FFFFFF;
    border-left-color: #FFFFFF;
    animation: spin 1s linear infinite;
}

.loader-logo {
    position: absolute;
    animation: pulse 2s ease-in-out infinite;
}

.loader-text {
    position: absolute;
    bottom: -40px;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
}

.dot-animation {
    display: inline-block;
    animation: dots 1.5s infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes spin-reverse {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-360deg);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

@keyframes dots {
    0% {
        opacity: 0.2;
    }

    20% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}

/* For Tablets */
@media (max-width: 768px) {
    .loader-container {
        width: 100px;
        height: 100px;
    }

    .circle-1 {
        width: 100px;
        height: 100px;
    }

    .circle-2 {
        width: 75px;
        height: 75px;
    }

    .circle-3 {
        width: 50px;
        height: 50px;
    }
}

/* For Mobile */
@media (max-width: 480px) {
    .loader-container {
        width: 80px;
        height: 80px;
    }

    .circle-1 {
        width: 80px;
        height: 80px;
    }

    .circle-2 {
        width: 60px;
        height: 60px;
    }

    .circle-3 {
        width: 40px;
        height: 40px;
    }

    .loader-text {
        font-size: 14px;
        bottom: -35px;
    }
}
</style>