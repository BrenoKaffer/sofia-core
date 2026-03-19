import { dockerInspect, dockerLogs, resolveLogicalContainer } from "../docker.js";
import { LOGICAL_CONTAINERS, type LogicalContainer } from "../config/containers.js";

type HealthItem = {
  logical: LogicalContainer;
  name: string;
  status: string;
  running: boolean;
  restarting: boolean;
  health: string;
  restartCount: number;
  recentErrors: string[];
};

const normalizeSince = (since?: string): string => {
  const value = since?.trim() || "30m";
  const isValid = /^\d+(s|m|h|d)$/.test(value);
  if (!isValid) {
    throw new Error("Invalid since format");
  }
  return value;
};

export const runHealthSnapshot = async (input?: { since?: string }): Promise<string> => {
  const since = normalizeSince(input?.since);
  const snapshot = await Promise.all(
    LOGICAL_CONTAINERS.map(async (logical) => {
      const name = await resolveLogicalContainer(logical);
      const inspect = await dockerInspect(name);
      const state = inspect?.State || {};
      const logs = await dockerLogs(name, { tail: 120, since });
      const recentErrors = logs
        .split("\n")
        .filter((line) => /error|exception|timeout|fail/i.test(line))
        .slice(0, 10);

      const item: HealthItem = {
        logical,
        name,
        status: state.Status || "unknown",
        running: Boolean(state.Running),
        restarting: Boolean(state.Restarting),
        health: state.Health?.Status || "unknown",
        restartCount: state.RestartCount ?? 0,
        recentErrors
      };
      return item;
    })
  );

  return JSON.stringify(snapshot, null, 2);
};
