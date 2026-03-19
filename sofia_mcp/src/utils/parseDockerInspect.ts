export type DockerInspectItem = {
  Id?: string;
  Name?: string;
  Config?: {
    Env?: string[];
  };
  State?: {
    Running?: boolean;
    Restarting?: boolean;
    Status?: string;
    StartedAt?: string;
    FinishedAt?: string;
    ExitCode?: number;
    Error?: string;
    OOMKilled?: boolean;
    RestartCount?: number;
    Health?: {
      Status?: string;
    };
  };
  Mounts?: Array<{
    Type?: string;
    Source?: string;
    Destination?: string;
    RW?: boolean;
  }>;
  HostConfig?: {
    NetworkMode?: string;
  };
};

export const parseDockerInspect = (raw: string): DockerInspectItem | null => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  const data = JSON.parse(trimmed) as DockerInspectItem[];
  return data[0] ?? null;
};
