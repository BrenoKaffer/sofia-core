import { dockerLogs, resolveLogicalContainer } from "../docker.js";
import { type LogicalContainer } from "../config/containers.js";

const normalizeLines = (lines?: number): number => {
  if (!lines) {
    return 300;
  }
  return Math.max(1, Math.min(lines, 500));
};

const normalizeSince = (since?: string): string => {
  const value = since?.trim() || "1h";
  const isValid = /^\d+(s|m|h|d)$/.test(value);
  if (!isValid) {
    throw new Error("Invalid since format");
  }
  return value;
};

export const runSearchContainerLogs = async (input: {
  container: LogicalContainer;
  query?: string;
  lines?: number;
  since?: string;
}): Promise<string> => {
  const name = await resolveLogicalContainer(input.container);
  const tail = normalizeLines(input.lines);
  const since = normalizeSince(input.since);
  const query = (input.query || "error").trim();
  const content = await dockerLogs(name, { tail, since });
  const matcher = new RegExp(query, "i");
  const filtered = content
    .split("\n")
    .filter((line) => matcher.test(line))
    .slice(0, tail);
  return filtered.join("\n");
};
