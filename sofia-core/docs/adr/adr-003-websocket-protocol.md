# ADR 003 — Protocolo websocket no core

## Contexto
Websocket tinha definições locais em serviços diferentes.

## Decisão
Protocolos, canais e eventos são definidos exclusivamente no core.

## Consequências
- Clientes e servidores compartilham a mesma fonte de verdade.
- Mudanças exigem versionamento do core.
