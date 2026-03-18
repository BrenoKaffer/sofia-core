# ADR 005 — Rotas contract-first

## Contexto
Rotas críticas variavam de payload por serviço.

## Decisão
Rotas críticas usam contratos e schemas do core como fonte única.

## Consequências
- Mudanças de contrato são versionadas.
- Clientes e backend evoluem em conjunto.
