import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { router, createContext } from "../utils";
import { todoRouter } from "./todo";

export const appRouter = router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
