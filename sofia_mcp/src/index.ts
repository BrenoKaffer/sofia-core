import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import type { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { LOGICAL_CONTAINERS, type LogicalContainer } from "./config/containers.js";
import { runListSofiaContainers } from "./tools/list-sofia-containers.js";
import { runTailContainerLogs } from "./tools/tail-container-logs.js";
import { runSearchContainerLogs } from "./tools/search-container-logs.js";
import { runInspectContainer } from "./tools/inspect-container.js";
import { runHealthSnapshot } from "./tools/health-snapshot.js";
import { runCompareTimeline } from "./tools/compare-timeline.js";

const containerEnum = z.enum(LOGICAL_CONTAINERS);

const listTools = [
  {
    name: "list_sofia_containers",
    description: "Lista containers da SOFIA com status e imagem",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "tail_container_logs",
    description: "Mostra logs recentes de um container da SOFIA",
    inputSchema: {
      type: "object",
      properties: {
        container: { type: "string", enum: LOGICAL_CONTAINERS },
        lines: { type: "number" },
        since: { type: "string" }
      },
      required: ["container"]
    }
  },
  {
    name: "search_container_logs",
    description: "Busca logs por palavra-chave em um container da SOFIA",
    inputSchema: {
      type: "object",
      properties: {
        container: { type: "string", enum: LOGICAL_CONTAINERS },
        query: { type: "string" },
        lines: { type: "number" },
        since: { type: "string" }
      },
      required: ["container"]
    }
  },
  {
    name: "inspect_container",
    description: "Inspeciona um container da SOFIA com env mascarada",
    inputSchema: {
      type: "object",
      properties: {
        container: { type: "string", enum: LOGICAL_CONTAINERS }
      },
      required: ["container"]
    }
  },
  {
    name: "health_snapshot",
    description: "Resumo rápido de saúde dos containers",
    inputSchema: {
      type: "object",
      properties: {
        since: { type: "string" }
      }
    }
  },
  {
    name: "compare_timeline",
    description: "Compara logs por timestamp entre backend, worker e websocket",
    inputSchema: {
      type: "object",
      properties: {
        since: { type: "string" },
        lines: { type: "number" }
      }
    }
  }
];

const ensureLogicalContainer = (value: unknown): LogicalContainer => {
  return containerEnum.parse(value);
};

const server = new Server(
  {
    name: "sofia-runtime-mcp",
    version: "0.1.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: listTools };
});

server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
  const name = request.params.name;
  const args = request.params.arguments ?? {};

  try {
    switch (name) {
      case "list_sofia_containers": {
        const text = await runListSofiaContainers();
        return { content: [{ type: "text", text }] };
      }
      case "tail_container_logs": {
        const input = z
          .object({
            container: z.any(),
            lines: z.number().optional(),
            since: z.string().optional()
          })
          .parse(args);
        const text = await runTailContainerLogs({
          container: ensureLogicalContainer(input.container),
          lines: input.lines,
          since: input.since
        });
        return { content: [{ type: "text", text }] };
      }
      case "search_container_logs": {
        const input = z
          .object({
            container: z.any(),
            query: z.string().optional(),
            lines: z.number().optional(),
            since: z.string().optional()
          })
          .parse(args);
        const text = await runSearchContainerLogs({
          container: ensureLogicalContainer(input.container),
          query: input.query,
          lines: input.lines,
          since: input.since
        });
        return { content: [{ type: "text", text }] };
      }
      case "inspect_container": {
        const input = z
          .object({
            container: z.any()
          })
          .parse(args);
        const text = await runInspectContainer({
          container: ensureLogicalContainer(input.container)
        });
        return { content: [{ type: "text", text }] };
      }
      case "health_snapshot": {
        const input = z
          .object({
            since: z.string().optional()
          })
          .parse(args);
        const text = await runHealthSnapshot({ since: input.since });
        return { content: [{ type: "text", text }] };
      }
      case "compare_timeline": {
        const input = z
          .object({
            since: z.string().optional(),
            lines: z.number().optional()
          })
          .parse(args);
        const text = await runCompareTimeline({ since: input.since, lines: input.lines });
        return { content: [{ type: "text", text }] };
      }
      default:
        throw new Error("Tool not found");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [{ type: "text", text: `Erro: ${message}` }]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
