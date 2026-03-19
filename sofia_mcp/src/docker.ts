import { runSshCommand } from "./ssh.js";
import { CONTAINER_ALIASES, type LogicalContainer } from "./config/containers.js";
import { parseDockerPs, type DockerPsItem } from "./utils/parseDockerPs.js";
import { parseDockerInspect, type DockerInspectItem } from "./utils/parseDockerInspect.js";

const maxOutputChars = Number(process.env.SOFIA_MAX_OUTPUT_CHARS || 200000);

const limitOutput = (value: string): string => {
  if (value.length <= maxOutputChars) {
    return value;
  }
  return value.slice(0, maxOutputChars);
};

const matchesAlias = (realName: string, alias: string): boolean => {
  if (!alias) {
    return false;
  }
  return realName === alias || realName.startsWith(alias) || realName.includes(alias);
};

const resolveContainerName = (
  logical: LogicalContainer,
  containers: DockerPsItem[]
): string => {
  const aliases = CONTAINER_ALIASES[logical];
  const match = containers.find((item) => {
    const name = item.Names || "";
    return aliases.some((alias) => matchesAlias(name, alias));
  });
  if (!match?.Names) {
    throw new Error(`Container not found for ${logical}`);
  }
  return match.Names;
};

export const dockerPs = async (): Promise<DockerPsItem[]> => {
  const result = await runSshCommand(`docker ps -a --format '{{json .}}'`);
  return parseDockerPs(result.stdout);
};

export const dockerLogs = async (
  containerName: string,
  options: { tail: number; since: string; timestamps?: boolean }
): Promise<string> => {
  const { tail, since, timestamps } = options;
  const timestampFlag = timestamps ? "--timestamps" : "";
  const command = `docker logs ${timestampFlag} --tail ${tail} --since ${since} ${containerName}`;
  const result = await runSshCommand(command);
  return limitOutput(result.stdout || result.stderr);
};

export const dockerInspect = async (containerName: string): Promise<DockerInspectItem | null> => {
  const result = await runSshCommand(`docker inspect ${containerName}`);
  return parseDockerInspect(result.stdout);
};

export const resolveLogicalContainer = async (logical: LogicalContainer): Promise<string> => {
  const containers = await dockerPs();
  return resolveContainerName(logical, containers);
};

export const listSofiaContainers = async (): Promise<
  Array<{
    logical: LogicalContainer;
    name: string;
    status: string;
    uptime: string;
    image: string;
  }>
> => {
  const containers = await dockerPs();
  return (Object.keys(CONTAINER_ALIASES) as LogicalContainer[]).map((logical) => {
    const name = resolveContainerName(logical, containers);
    const item = containers.find((entry) => entry.Names === name);
    return {
      logical,
      name,
      status: item?.Status || "unknown",
      uptime: item?.RunningFor || "unknown",
      image: item?.Image || "unknown"
    };
  });
};
