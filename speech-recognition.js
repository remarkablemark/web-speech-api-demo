import { clearLog, logEvent } from './log.js';

export function disableSpeechRecognition() {
  document.querySelector('.support').hidden = false;
  document.querySelector('main').hidden = true;
}

const confidence = document.querySelector('#confidence');
const transcription = document.querySelector('#transcription');

export function startSpeechRecognition(SpeechRecognition) {
  const recognizer = new SpeechRecognition();

  recognizer.addEventListener('result', (event) => {
    transcription.value = '';

    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      if (event.results[i].isFinal) {
        transcription.value += event.results[i][0].transcript;
        confidence.value = event.results[i][0].confidence;
      } else {
        transcription.value += event.results[i][0].transcript;
      }
    }
  });

  recognizer.addEventListener('error', (event) => {
    logEvent(`Recognition error: ${event.message}`);
  });

  recognizer.addEventListener('end', () => {
    logEvent('Recognition ended');
  });

  document.querySelector('#record').addEventListener('click', () => {
    startRecognition(recognizer);
  });

  document.querySelector('#stop').addEventListener('click', () => {
    stopRecognition(recognizer);
  });

  document.querySelector('#clear').addEventListener('click', clearLog);
}

function startRecognition(recognizer) {
  const isInterim = document.querySelector('input[name="recognition-type"][value="interim"]').checked;

  recognizer.lang = document.querySelector('#language').value;
  recognizer.continuous = !isInterim;
  recognizer.interimResults = isInterim;

  try {
    recognizer.start();
    logEvent('Recognition started');
  } catch (error) {
    logEvent(`Recognition error: ${error.message}`);
  }
}

function stopRecognition(recognizer) {
  recognizer.stop();
  logEvent('Recognition stopped');
}
