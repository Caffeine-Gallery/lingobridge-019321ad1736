import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const targetLang = document.getElementById('targetLang');
    const translateBtn = document.getElementById('translateBtn');
    const translationResult = document.getElementById('translationResult');
    const speakBtn = document.getElementById('speakBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');

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
});
