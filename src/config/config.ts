import { nodeConfig } from "../nodeConfig/node.config";

const {
  env: { mongoUrl, port, secretKey },
} = nodeConfig;

export { secretKey, mongoUrl, port };
