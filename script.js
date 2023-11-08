import { renderLanguageOptions } from './languages.js';
import { startSpeechRecognition, disableSpeechRecognition } from './speech-recognition.js';

renderLanguageOptions();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  startSpeechRecognition(SpeechRecognition);
} else {
  disableSpeechRecognition();
}
