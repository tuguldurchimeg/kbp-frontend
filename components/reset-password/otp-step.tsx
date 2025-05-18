import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useTranslations } from "next-intl";

const schema = z.object({
  pin: z.string().length(6, "6 digits required"),
});

type Props = { onNext: (code: string) => void };

export default function OtpStep({ onNext }: Props) {
  const t = useTranslations("ResetPassword");
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { pin: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onNext(data.pin))}
        className="space-y-6 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("verify")}
        </Button>
      </form>
    </Form>
  );
}
