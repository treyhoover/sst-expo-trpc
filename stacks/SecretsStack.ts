import { StackContext, Config } from "sst/constructs";

export default function SecretsStack({ stack }: StackContext) {
  const DB_URL = new Config.Secret(stack, "DB_URL");

  return { DB_URL };
}
