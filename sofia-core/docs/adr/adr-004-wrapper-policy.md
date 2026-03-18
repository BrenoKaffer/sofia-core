# ADR 004 — Política de wrappers locais

## Contexto
Wrappers locais criavam duplicação e divergência.

## Decisão
Wrappers só existem para adaptar runtime específico do app.

## Consequências
- Duplicações viram dívida e são removidas.
- Imports diretos do core são o padrão.
