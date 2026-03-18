# ADR 001 — Distribuição do @sofia/core

## Contexto
O core precisa de distribuição previsível para evitar dependência de branch flutuante.

## Decisão
Usar versão fixa do core via tag semântica (ex.: v1.0.0).

## Consequências
- Rollback por tag é simples.
- Alterações exigem bump de versão.
