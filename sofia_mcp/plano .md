# Plano MCP SOFIA Runtime

## O que você executa (VPS)

### Passo 1: mapear containers reais (concluído)

```bash
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
```

Guarde os nomes reais de:

* backend
* worker
* websocket

### Passo 2: criar usuário dedicado (concluído)

```bash
sudo adduser sofia_mcp
```

### Passo 3: cadastrar chave SSH (pendente)

```bash
mkdir -p /home/sofia_mcp/.ssh
nano /home/sofia_mcp/.ssh/authorized_keys
chmod 700 /home/sofia_mcp/.ssh
chmod 600 /home/sofia_mcp/.ssh/authorized_keys
chown -R sofia_mcp:sofia_mcp /home/sofia_mcp/.ssh
```

Se a chave der erro de formato no MCP, use uma chave PEM válida ou configure senha via env.

### Passo 4: liberar Docker (concluído)

```bash
sudo usermod -aG docker sofia_mcp
```

Depois reinicie a sessão desse usuário.

---

## O que eu executo (local)

### Passo 1: criar estrutura do MCP (concluído)

* projeto TypeScript na pasta `sofia_mcp`
* ferramentas MCP para logs e inspeção
* validações e limites de segurança

### Passo 2: implementar ferramentas (concluído)

* `list_sofia_containers`
* `tail_container_logs`
* `search_container_logs`
* `inspect_container`
* `health_snapshot`
* `compare_timeline`

---

## Configuração no TRAE (você)

```json
{
  "mcpServers": {
    "sofia-runtime": {
      "command": "node",
      "args": ["/Users/brenoferreira/Documents/SOFIA/CAMADA1/CAMADA2/CAMADA3/PROJETO SOFIA/sofia_mcp/dist/index.js"],
      "env": {
        "SOFIA_SSH_HOST": "92.113.34.157",
        "SOFIA_SSH_PORT": "22",
        "SOFIA_SSH_USER": "sofia_mcp",
        "SOFIA_SSH_PRIVATE_KEY_PATH": "/Users/brenoferreira/.ssh/sofia_mcp",
        "SOFIA_SSH_PRIVATE_KEY_PASSPHRASE": "SUA_PASSPHRASE",
        "SOFIA_SSH_PASSWORD": "SUA_SENHA",
        "SOFIA_CONTAINER_BACKEND": "estruturas_sofia-backend",
        "SOFIA_CONTAINER_WORKER": "estruturas_sofia-worker",
        "SOFIA_CONTAINER_WEBSOCKET": "estruturas_sofia-websocket"
      }
    }
  }
}
```

Se quiser ajustar limites:

* `SOFIA_SSH_TIMEOUT_MS` (ex.: `10000`)
* `SOFIA_MAX_OUTPUT_CHARS` (ex.: `200000`)

---

## Testes iniciais (você)

1. listagem de containers
2. tail do backend
3. busca por `error`, `exception`, `timeout`
4. inspect com env mascarada
5. snapshot com status de saúde

source: running | latest_failed | latest_created | auto

lines

since

Regra auto

se houver running, pega running

se não houver, pega latest_failed

se nem isso, pega latest_created

Para o backend hoje, auto cairia no último Exited (1).

3. get_service_status

Mais executivo:

running / failing / absent / degraded

último erro detectado

timestamps

restart/failure count recente

4. get_failure_summary

Essa aqui vai valer ouro.

Ela deve responder:

quais serviços falharam recentemente

quantas falhas por serviço

padrão de erro

causa provável superficial

Hoje, por exemplo, o backend claramente entraria como:

status: failing

pattern: startup_crash

error: ERR_MODULE_NOT_FOUND @sofia/core

5. inspect_service

Ao invés de expor inspect por container cru, expõe por serviço lógico.

Ele resolve:

container relevante

docker inspect

extrai:

image

createdAt

state

exitCode

env mascaradas

mounts

command
