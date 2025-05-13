"use client";

import SiteLayout from "@/components/layouts/SiteLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Lock, Bell, MailWarning } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function WorkspaceDetailPage() {
  const t = useTranslations("Account");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/avatar.jpg"
            alt={t("profilePicAlt")}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 justify-center"
            >
              <User className="h-4 w-4" />
              {t("tabs.profile")}
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center gap-2 justify-center"
            >
              <Lock className="h-4 w-4" />
              {t("tabs.password")}
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2 justify-center"
            >
              <Bell className="h-4 w-4" />
              {t("tabs.notifications")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.title")}</CardTitle>
                <CardDescription>{t("profile.description")}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t("form.firstName")}</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">{t("form.lastName")}</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">{t("form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">{t("form.role")}</Label>
                  <Input id="role" placeholder="Product Designer" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>{t("actions.save")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{t("security.title")}</CardTitle>
                <CardDescription>{t("security.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "currentPassword",
                    label: t("form.currentPassword"),
                    show: showCurrent,
                    setShow: setShowCurrent,
                  },
                  {
                    id: "newPassword",
                    label: t("form.newPassword"),
                    show: showNew,
                    setShow: setShowNew,
                  },
                  {
                    id: "confirmPassword",
                    label: t("form.confirmPassword"),
                    show: showConfirm,
                    setShow: setShowConfirm,
                  },
                ].map(({ id, label, show, setShow }) => (
                  <div className="space-y-1 relative" key={id}>
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-4.5"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <MailWarning className="h-4 w-4" />
                  {t("security.forgot")}
                </Button>
                <Button>{t("actions.updatePassword")}</Button>
              </CardFooter>
            </Card>
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
              <CardFooter>
                <Button>{t("actions.savePreferences")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
