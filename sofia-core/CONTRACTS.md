# Contratos públicos do @sofia/core

## Módulos públicos suportados
- @sofia/core
- @sofia/core/auth
- @sofia/core/config
- @sofia/core/contracts
- @sofia/core/integrations/websocket
- @sofia/core/schemas
- @sofia/core/sdk
- @sofia/core/types
- @sofia/core/utils

## O que é interno
- Qualquer import que não esteja listado acima
- Caminhos profundos dentro de src/ ou dist/ que não estejam no exports

## Regras de versionamento
- Patch: correções e ajustes sem quebra de API
- Minor: adições compatíveis (novos exports, novos campos opcionais)
- Major: remoções, renomes, mudanças de contrato ou comportamento
- Tags seguem vX.Y.Z e devem refletir o conteúdo do exports em package.json
