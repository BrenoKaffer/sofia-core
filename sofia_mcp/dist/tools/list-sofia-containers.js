import { listSofiaContainers } from "../docker.js";
export const runListSofiaContainers = async () => {
    const containers = await listSofiaContainers();
    const lines = containers.map((item) => `${item.logical} | ${item.name} | ${item.status} | ${item.uptime} | ${item.image}`);
    return lines.join("\n");
};
