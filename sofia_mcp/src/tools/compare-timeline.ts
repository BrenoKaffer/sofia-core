import { dockerLogs, resolveLogicalContainer } from "../docker.js";
import { LOGICAL_CONTAINERS, type LogicalContainer } from "../config/containers.js";

type TimelineEntry = {
  timestamp: string;
  logical: LogicalContainer;
  line: string;
};

const normalizeSince = (since?: string): string => {
  const value = since?.trim() || "20m";
  const isValid = /^\d+(s|m|h|d)$/.test(value);
  if (!isValid) {
    throw new Error("Invalid since format");
  }
  return value;
};

const extractTimestamp = (line: string): string => {
  const [first] = line.split(" ");
  if (first && first.includes("T")) {
    return first;
  }
  return "";
};

const collectEntries = (logical: LogicalContainer, content: string): TimelineEntry[] => {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      timestamp: extractTimestamp(line),
      logical,
      line
    }))
    .filter((entry) => entry.timestamp);
};

export const runCompareTimeline = async (input?: { since?: string; lines?: number }): Promise<string> => {
  const since = normalizeSince(input?.since);
  const tail = Math.max(20, Math.min(input?.lines ?? 120, 300));

  const entries = await Promise.all(
    LOGICAL_CONTAINERS.map(async (logical) => {
      const name = await resolveLogicalContainer(logical);
      const content = await dockerLogs(name, { tail, since, timestamps: true });
      return collectEntries(logical, content);
    })
  );

  const merged = entries.flat().sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const output = merged.map((entry) => `${entry.timestamp} ${entry.logical} -> ${entry.line}`);
  return output.join("\n");
};
