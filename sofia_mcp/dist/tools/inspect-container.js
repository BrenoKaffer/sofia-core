import { dockerInspect, resolveLogicalContainer } from "../docker.js";
import { maskEnv } from "../utils/maskEnv.js";
export const runInspectContainer = async (input) => {
    const name = await resolveLogicalContainer(input.container);
    const data = await dockerInspect(name);
    if (!data) {
        throw new Error("Inspect returned empty response");
    }
    const state = data.State || {};
    const mounts = (data.Mounts || []).map((mount) => ({
        type: mount.Type || "unknown",
        source: mount.Source || "unknown",
        destination: mount.Destination || "unknown",
        readOnly: mount.RW === false
    }));
    const payload = {
        name,
        running: Boolean(state.Running),
        restarting: Boolean(state.Restarting),
        status: state.Status || "unknown",
        startedAt: state.StartedAt || "unknown",
        finishedAt: state.FinishedAt || "unknown",
        exitCode: state.ExitCode ?? null,
        error: state.Error || "",
        oomKilled: Boolean(state.OOMKilled),
        restartCount: state.RestartCount ?? 0,
        health: state.Health?.Status || "unknown",
        networkMode: data.HostConfig?.NetworkMode || "unknown",
        mounts,
        env: maskEnv(data.Config?.Env)
    };
    return JSON.stringify(payload, null, 2);
};
