---
title: Pixelate do glitch sem redesenhar o quadro parado
date: 2026-10-19
---

# Pixelate do glitch sem redesenhar o quadro parado

O busto da home e o cérebro usam o mesmo loop WebGL. O quadro parado não redesenha: com o mix do glitch em zero e a máscara do pixelate apagada, o canvas guarda a imagem limpa. O `requestAnimationFrame` continua, então o próximo burst entra no tempo. Burst, fade da máscara, hover, resize e o primeiro desenho seguem.

A cor de cada bloco do pixelate é calculada uma vez, num passe do tamanho da grade do rastro, e o passe da tela só lê essa cor. O passe pequeno só roda enquanto algum bloco está aceso. DPR, tamanho do bloco e o carimbo não mudam.
