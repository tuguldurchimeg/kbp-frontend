"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspace } from "@/src/app/lib/actions/workspace.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/route.constants";

const schema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    createWorkspace({
      ...values,
      description: values.description || "",
    })
      .then((res) => {
        form.reset();
        router.push(ROUTE.WORKSPACES.WORKSPACE(res.id));
      })
      .catch();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Workspace name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
