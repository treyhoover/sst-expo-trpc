import { z } from "zod";
import crypto from "crypto";

export async function create() {
  return {
    success: true,
  };
}

export function list() {
  return Array(50)
    .fill(0)
    .map((_, index) => ({
      id: crypto.randomUUID(),
      title: "Todo #" + index,
    }));
}
