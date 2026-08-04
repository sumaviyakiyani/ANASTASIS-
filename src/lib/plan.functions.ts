import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const nameSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
});

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("id, full_name, plan, plan_started_at")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const setPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { plan: "free" | "premium" }) =>
    z.object({ plan: z.enum(["free", "premium"]) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    // Owner is derived from the validated bearer token, never from request data.
    const { data: row, error } = await context.supabase
      .from("profiles")
      .update({
        plan: data.plan,
        plan_started_at: data.plan === "premium" ? new Date().toISOString() : null,
      })
      .eq("id", context.userId)
      .select("id, full_name, plan, plan_started_at")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateMyName = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { fullName: string }) => nameSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ full_name: data.fullName })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
