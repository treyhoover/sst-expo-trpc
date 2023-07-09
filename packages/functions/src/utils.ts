import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const TRPC = initTRPC.create({});

export const createContext =
  ({}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({});

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
