Serviço criado para atender a necessidade de omunicação de um Mobile App, pois disponibilizo uma API de acesso ao serviço Text To Speech do IBM Watson.

Serviço Text To Speech
===========================================================================================

Obs.: As contas abaixo são de teste, expiram em 30 dias, por isso pode já ter expirado.

Teste em Ingles:
https://tts-provider.mybluemix.net/ttspeech/?text=Hi! Good morning!&voice=en-US_AllisonVoice&accept=audio/wav

Teste em Portugues:
https://tts-provider.mybluemix.net/ttspeech/?text=Olá! Bom dia!&voice=pt-BR_IsabelaVoice&accept=audio/wav

Os parametro esperados são:

text => Texto que deseja transformar em audio/wav
voice => A voz que será utilizada no audio
accept => Tipo do audio desejado, segue os tipos aceitos:
    audio/flac
    audio/l16 (Also specify the sampling rate and number of channels; for example, audio/l16; rate=48000; channels=2. Ensure that the rate matches the rate at which the audio is captured and specify a maximum of 16 channels.)
    audio/wav (Provide audio with a maximum of nine channels.) The Node SDK uses a default value of audio/wav.
    audio/ogg;codecs=opus
    audio/mulaw (Also specify the sampling rate at which the audio is captured.)
    audio/basic (Use audio in this format only with narrowband models.)

Serviço para recuperar a lista de vozes:

https://tts-provider.mybluemix.net/voices
