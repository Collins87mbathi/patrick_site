import { nodeConfig } from "../nodeConfig/node.config";

const {
  env: { mongoUrl, port, secretKey,user,pass},
} = nodeConfig;

export { secretKey, mongoUrl, port,user,pass };
