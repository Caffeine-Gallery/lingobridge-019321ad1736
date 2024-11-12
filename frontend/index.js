import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const targetLang = document.getElementById('targetLang');
    const translateBtn = document.getElementById('translateBtn');
    const translationResult = document.getElementById('translationResult');
    const speakBtn = document.getElementById('speakBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const typingText = document.getElementById('typing-text');

    // Initialize particles.js
    particlesJS.load('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Typing effect
    const phrases = [
        "Breaking language barriers",
        "Connecting cultures",
        "Empowering communication",
        "Bridging worlds through words"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();

    translateBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();
        const lang = targetLang.value;

        if (text) {
            loadingSpinner.style.display = 'inline-block';
            translateBtn.disabled = true;
            speakBtn.disabled = true;

            try {
                // Call the MyMemory Translation API
                const encodedText = encodeURIComponent(text);
                const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${lang}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.responseStatus === 200) {
                    const translation = data.responseData.translatedText;
                    translationResult.textContent = translation;
                    speakBtn.disabled = false;
                } else {
                    throw new Error('Translation API error');
                }
            } catch (error) {
                console.error('Translation error:', error);
                translationResult.textContent = 'Error occurred during translation.';
            } finally {
                loadingSpinner.style.display = 'none';
                translateBtn.disabled = false;
            }
        }
    });

    speakBtn.addEventListener('click', () => {
        const text = translationResult.textContent;
        const lang = targetLang.value;

        if (text && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        }
    });

    // Add hover effects to icons
    const icons = document.querySelectorAll('.banner-icon, .footer-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });
});
