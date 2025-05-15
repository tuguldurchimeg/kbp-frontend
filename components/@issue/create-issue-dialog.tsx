"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
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
import { FileQuestion } from "lucide-react";
import { IssueCreateParams } from "@/types/issue";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["open", "in-progress", "closed"], {
    message: "Invalid status",
  }),
  priority: z.enum(["low", "medium", "high"], { message: "Invalid priority" }),
  issue_type: z.enum(["problem", "question"], { message: "Invalid type" }),
});

type FormValues = z.infer<typeof FormSchema>;

export function CreateIssueDialog({
  isOpen,
  onClose,
  onCreate,
  workspaceId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (item: IssueCreateParams) => void;
  workspaceId: string;
}) {
  const t = useTranslations();
  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();

  const handleSubmit = (values: FormValues) => {
    onCreate({ ...values, workspace_id: workspaceId });
    form.reset();
    onClose();
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <FileQuestion />
            {t("SYSCOMMON.create")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SYSCOMMON.status.title")}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("SYSCOMMON.status.title")}
                          />
                        </SelectTrigger>
                        <SelectContent className="min-w-full">
                          {Object.entries(STATUS_MAP).map(
                            ([k, { label, icon, textColor }]) => (
                              <SelectItem key={k} value={k}>
                                <div className="flex items-center gap-2">
                                  {React.createElement(icon, {
                                    className: `w-4 h-4 ${textColor}`,
                                  })}
                                  {label}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("SYSCOMMON.priority.title")}
                          />
                        </SelectTrigger>
                        <SelectContent className="min-w-full">
                          {Object.entries(PRIORITY_MAP).map(
                            ([k, { label, icon }]) => (
                              <SelectItem key={k} value={k}>
                                <div className="flex items-center gap-2">
                                  {React.createElement(icon, {
                                    className: "w-4 h-4",
                                  })}
                                  {label}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("SYSCOMMON.type")} />
                        </SelectTrigger>
                        <SelectContent className="min-w-full">
                          {Object.entries(TYPE_MAP).map(
                            ([k, { label, icon }]) => (
                              <SelectItem key={k} value={k}>
                                <div className="flex items-center gap-2">
                                  {React.createElement(icon, {
                                    className: "w-4 h-4",
                                  })}
                                  {label}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant={"outline"}
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                {t("SYSCOMMON.cancel")}
              </Button>
              <Button type="submit">{t("SYSCOMMON.create")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
