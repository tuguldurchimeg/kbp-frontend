"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

import { IssueItem, IssueUpdateParams } from "@/types/issue";
import { UserItem } from "@/types/user";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import { Loader2, XIcon } from "lucide-react";

const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["open", "in_progress", "closed"]),
  priority: z.enum(["low", "medium", "high"]),
  issue_type: z.enum(["problem", "question"]),
  assignee_ids: z.array(z.string()).optional(),
});

type Props = {
  issue: IssueItem;
  users: UserItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: IssueUpdateParams) => void;
};

export function EditIssueDialog({
  issue,
  users,
  isOpen,
  onClose,
  onUpdate,
}: Props) {
  const t = useTranslations();
  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: issue.attributes.title,
      description: issue.attributes.description,
      status: issue.attributes.status as "open" | "in_progress" | "closed",
      priority: issue.attributes.priority as "low" | "medium" | "high",
      issue_type: issue.attributes.issue_type as "problem" | "question",
      assignee_ids: issue.attributes.assignees?.data?.map((u) => u.id) || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onUpdate({
      id: issue.id,
      params: { ...data, workspace_id: issue.attributes.workspace_id },
    });
    toast.success(t("SYSCOMMON.updated_successfully"));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("ISSUE.edit_issue")}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SYSCOMMON.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} rows={4} />
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
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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

            <FormField
              control={form.control}
              name="assignee_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("ISSUE.assignees")}</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {users
                      .filter((u) => field.value?.includes(u.id))
                      .map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-2 pl-2 rounded-full bg-muted text-sm"
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.attributes.avatar} />
                            <AvatarFallback>
                              {user.attributes.firstname[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.attributes.firstname}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="p-0 text-xs"
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((id) => id !== user.id)
                              )
                            }
                          >
                            <XIcon className="size-2.5" />
                          </Button>
                        </div>
                      ))}
                  </div>

                  <Select
                    onValueChange={(val) => {
                      if (!field.value?.includes(val)) {
                        field.onChange([...(field.value || []), val]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("ISSUE.add_assignee")} />
                    </SelectTrigger>
                    <SelectContent>
                      {users
                        .filter((u) => !field.value?.includes(u.id))
                        .map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.attributes.firstname}{" "}
                            {user.attributes.lastname}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-between gap-3">
              <Button variant="ghost" type="button" onClick={onClose}>
                {t("SYSCOMMON.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("SYSCOMMON.save")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
