#!/usr/bin/env python3

import speech_recognition as sr

# get audio from the microphone
r = sr.Recognizer()
print('h')
with sr.Microphone() as mic:
    print("Hllo")
    audio = r.listen(mic)
you = r.recognize_google(audio)
print(you)

# ALSA lib pcm_dsnoop.c:566:(snd_pcm_dsnoop_open) unable to open slave
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.rear
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.center_lfe
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.side
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# Cannot connect to server socket err = No such file or directory
# Cannot connect to server request channel
# jack server is not running or cannot be started
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# Cannot connect to server socket err = No such filejjor directory
# Cannot connect to server request channel
# jack server is not running or cannot be started
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# ALSA lib pcm_oss.c:397:(_snd_pcm_oss_open) Cannot open device /dev/dsp
# ALSA lib pcm_oss.c:397:(_snd_pcm_oss_open) Cannot open device /dev/dsp
# ALSA lib pcm_a52.c:1001:(_snd_pcm_a52_open) a52 is only for playback
# ALSA lib confmisc.c:160:(snd_config_get_card) Invalid field card
# ALSA lib pcm_usb_stream.c:482:(_snd_pcm_usb_stream_open) Invalid card 'card'
# ALSA lib confmisc.c:160:(snd_config_get_card) Invalid field card
# ALSA lib pcm_usb_stream.c:482:(_snd_pcm_usb_stream_open) Invalid card 'card'
# ALSA lib pcm_dsnoop.c:566:(snd_pcm_dsnoop_open) unable to open slave
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.rear
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.center_lfe
# ALSA lib pcm.c:2666:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.side
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# ALSA lib pcm_route.c:877:(find_matching_chmap) Found no matching channel map
# Cannot connect to server socket err = No such file or directory
# Cannot connect to server request channel
# jack server is not running or cannot be started
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# Cannot connect to server socket err = No such file or directory
# Cannot connect to server request channel
# jack server is not running or cannot be started
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# JackShmReadWritePtr::~JackShmReadWritePtr - Init not done for -1, skipping unlock
# ALSA lib pcm_oss.c:397:(_snd_pcm_oss_open) Cannot open device /dev/dsp
# ALSA lib pcm_oss.c:397:(_snd_pcm_oss_open) Cannot open device /dev/dsp
# ALSA lib pcm_a52.c:1001:(_snd_pcm_a52_open) a52 is only for playback
# ALSA lib confmisc.c:160:(snd_config_get_card) Invalid field card
# ALSA lib pcm_usb_stream.c:482:(_snd_pcm_usb_stream_open) Invalid card 'card'
# ALSA lib confmisc.c:160:(snd_config_get_card) Invalid field card
# ALSA lib pcm_usb_stream.c:482:(_snd_pcm_usb_stream_open) Invalid card 'card'
