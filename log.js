const textarea = document.querySelector('#log');

export function logEvent(string) {
  textarea.value += string + '\n';
}

export function clearLog() {
  textarea.value = '';
}
