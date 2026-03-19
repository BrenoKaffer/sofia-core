import { dockerLogs, resolveLogicalContainer } from "../docker.js";
import { type LogicalContainer } from "../config/containers.js";

const normalizeLines = (lines?: number): number => {
  if (!lines) {
    return 200;
  }
  return Math.max(1, Math.min(lines, 500));
};

const normalizeSince = (since?: string): string => {
  const value = since?.trim() || "15m";
  const isValid = /^\d+(s|m|h|d)$/.test(value);
  if (!isValid) {
    throw new Error("Invalid since format");
  }
  return value;
};

export const runTailContainerLogs = async (input: {
  container: LogicalContainer;
  lines?: number;
  since?: string;
}): Promise<string> => {
  const name = await resolveLogicalContainer(input.container);
  const tail = normalizeLines(input.lines);
  const since = normalizeSince(input.since);
  return dockerLogs(name, { tail, since });
};
