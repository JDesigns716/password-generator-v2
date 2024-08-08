import { z } from "zod";

export const formSchema = z.object({
  passwordLength: z.number(),
  lowercaseLetters: z.boolean(),
  uppercaseLetters: z.boolean(),
  numbers: z.boolean(),
  symbols: z.boolean().optional(),
});
