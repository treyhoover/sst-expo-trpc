import { StackContext, Api, use } from "sst/constructs";
import SecretsStack from "./SecretsStack";

export function ApiStack({ stack }: StackContext) {
  const { DB_URL } = use(SecretsStack);

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
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
