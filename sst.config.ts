import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import SecretsStack from "./stacks/SecretsStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(SecretsStack);
    app.stack(ApiStack);
  },
} satisfies SSTConfig;
