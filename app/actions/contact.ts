import { resend } from "@/library/config/clients";
import { envVars } from "@/library/config/environment";
import { checkIfRateLimited } from "@/library/helpers/rate-limit";
import { capitalize } from "@/shared/utils/strings";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contactAction = defineAction({
  accept: "form",
  input: z.object({
    firstName: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .max(64),
    lastName: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .max(64),
    email: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .email({ message: "Please enter a valid email address" }),
    message: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .min(20, { message: "Message must be up to 20 chars" })
      .max(256),
    queryType: z.enum(["general", "contract", "support", "issues"], {
      message: "Please select a query type",
    }),
    consent: z
      .string({
        message: "To submit this form, please consent to being contacted",
      })
      .refine((value) => value === "on", {
        message: "To submit this form, please consent to being contacted",
      }),
  }),
  handler: async (body, { request }) => {
    const { isRateLimited } = await checkIfRateLimited(request);

    if (isRateLimited)
      throw new ActionError({
        code: "TOO_MANY_REQUESTS",
        message: "You have reached your request limit for today",
      });

    const response = await resend.emails.send({
      from: `${body.firstName} <${body.email}>`,
      to: envVars.RESEND_ADDRESS,
      subject: `${capitalize(body.queryType)} email from ${body.firstName} ${body.lastName}`,
      replyTo: body.email,
      text: body.message,
    });

    return response.data
      ? {
          success: true,
          payload: `Email #${response.data.id.slice(0, 5)} sent`,
        }
      : response.error
        ? { success: false, payload: response.error.message }
        : { success: false, payload: "Request failed" };
  },
});