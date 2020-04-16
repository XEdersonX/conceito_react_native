import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * iOS com Emulador: localhost.
 * iOS com físico: IP da máquina.
 * 
 * Android com Emulador: localhost (Tem que usar o comando: adb reverse tcp:3333 tcp:3333)
 * Android com Emulador: 10.0.2.2 (Utilizando Emulador do Android Studio)
 * Android com Emulador: 10.0.3.2 (Utilizando Emulador do Genymotion)
 * Android com físico: Ip da máquina.
 */