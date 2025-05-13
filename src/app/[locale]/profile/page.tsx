"use client";

import SiteLayout from "@/components/layouts/SiteLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, CheckCheck, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProfile, updateUser } from "../../lib/actions/user.actions";
import {
  getPresignedUploadUrl,
  uploadFileToS3,
} from "../../lib/actions/file.actions";

import { AvatarUploader } from "@/components/avatar-uploader";
import { UserItem } from "@/types/user";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { PasswordUpdateForm } from "@/components/password-update-form";
import { toast } from "sonner";

export const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});

export type FormData = z.infer<typeof schema>;

export default function ProfliePage() {
  const t = useTranslations("Account");
  const [currentUser, setCurrentUser] = useState<UserItem>();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: currentUser?.attributes.firstname,
      lastName: currentUser?.attributes.lastname,
      email: currentUser?.attributes.email,
      avatarUrl: currentUser?.attributes.avatar,
    },
  });

  const getProfile = useCallback(async () => {
    try {
      const data = await fetchProfile();
      setCurrentUser(data);
      form.reset({
        firstName: data.attributes.firstname,
        lastName: data.attributes.lastname,
        email: data.attributes.email,
        avatarUrl: data.attributes.avatar,
      });
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  }, [form]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleAvatarUpload = async (file: File) => {
    const presigned = await getPresignedUploadUrl({
      file_name: file.name,
      mime_type: file.type,
      content_type: "avatar",
    });

    await uploadFileToS3(file, presigned.url);
    form.setValue("avatarUrl", presigned.file_url, { shouldDirty: true });
    if (currentUser) {
      try {
        await updateUser({
          id: currentUser.id,
          params: {
            ...currentUser.attributes,
            avatar: presigned.file_url,
          },
        });
        await getProfile();
      } catch (err) {
        console.error("Failed to update avatar", err);
      }
    }
  };

  const onSubmit = async (values: FormData) => {
    if (!currentUser) return;

    try {
      await updateUser({
        id: currentUser.id,
        params: {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
        },
      });

      await getProfile();
      toast.success(t("profile.updateSuccess"));
    } catch (err) {
      console.error("Failed to update user", err);
      toast.error(t("profile.updateError"));
    }
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AvatarUploader
              imageUrl={form.watch("avatarUrl") || ""}
              fallbackName={`${form.watch("firstName")} ${form.watch(
                "lastName"
              )}`}
              onPickFile={handleAvatarUpload}
            />

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  {t("tabs.profile")}
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Lock className="h-4 w-4 mr-2" />
                  {t("tabs.password")}
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  {t("tabs.notifications")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("profile.title")}</CardTitle>
                    <CardDescription>
                      {t("profile.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.firstName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.firstName")}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.lastName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.lastName")}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.email")}</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="space-y-1">
                      <Label>{t("form.company")}</Label>
                      <Input
                        disabled
                        value={
                          currentUser?.attributes.company?.data.attributes
                            .name || ""
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button
                      type="submit"
                      disabled={
                        !form.formState.isDirty || form.formState.isSubmitting
                      }
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        t("actions.save")
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                {currentUser && (
                  <PasswordUpdateForm currentUser={currentUser} />
                )}
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("notifications.title")}</CardTitle>
                    <CardDescription>
                      {t("notifications.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("notifications.body")}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" disabled>
                      <CheckCheck className="mr-2 h-4 w-4" />
                      {t("actions.markAsRead")}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </SiteLayout>
  );
}
