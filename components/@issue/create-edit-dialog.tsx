"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { createIssue } from "@/src/app/lib/actions/issue.actions";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ROUTE } from "@/constants/route.constants";
import { useParams, useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["open", "in-progress", "closed"], {
    message: "Invalid status",
  }),
  priority: z.enum(["low", "medium", "high"], { message: "Invalid priority" }),
  issue_type: z.enum(["problem", "question"], { message: "Invalid type" }),
});

export function CreateIssueDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();
  const workspaceId = params.workspaceId as string;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createIssue({ ...data, workspace_id: workspaceId }).then((res) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.push(
        ROUTE.BASE.ISSUES.DETAIL(res.attributes.workspace_id, res.id)
      );
    });
    onClose();
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent>
        <DialogTitle>{t("SYSCOMMON.create")}</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SYSCOMMON.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("SYSCOMMON.name")}
                      className="mt-1 block w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SYSCOMMON.description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("SYSCOMMON.description")}
                      className="w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SYSCOMMON.status.title")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("SYSCOMMON.status.title")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(STATUS_MAP).map(
                            ([key, { label }]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SYSCOMMON.priority.title")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("SYSCOMMON.priority.title")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(PRIORITY_MAP).map(
                            ([key, { label }]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issue_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SYSCOMMON.type")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("SYSCOMMON.type")} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TYPE_MAP).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">{t("SYSCOMMON.save")}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
