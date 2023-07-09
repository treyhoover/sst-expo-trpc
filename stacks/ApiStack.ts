import { StackContext, Api, use } from "sst/constructs";
import SecretsStack from "./SecretsStack";

export function ApiStack({ stack }: StackContext) {
  const { DB_URL } = use(SecretsStack);

  const api = new Api(stack, "api", {
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc/index.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc/index.handler",
    },
    defaults: {
      function: {
        bind: [DB_URL],
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
