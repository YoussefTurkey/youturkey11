import { z } from "zod";

export const contactSchema = z.object({
  fname: z.string().min(1, { message: "This field is required" }),
  lname: z.string().min(1, { message: "This field is required" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Not valid email" }),
  subject: z.string().min(1, { message: "This field is required" }),
  msg: z.string().min(1, { message: "This field is required" }),
});

export type TContact = z.infer<typeof contactSchema>;
