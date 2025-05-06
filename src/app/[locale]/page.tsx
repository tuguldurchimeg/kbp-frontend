"use client";

import { useTranslations } from "next-intl";
import CreateWorkspaceForm from "@/components/@workspace/WorkspaceCreateForm";
import WorkspaceCardList from "@/components/@workspace/WorkspaceCardList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PrivateRoute from "@/components/PrivateRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { topics } from "@/constants/kb-placeholder-data";
import { Eye, FileText, Rocket, Zap } from "lucide-react";
import SiteLayout from "@/components/layouts/SiteLayout";

export default function Home() {
  const t = useTranslations("SYSCOMMON");
  return (
    <PrivateRoute>
      <SiteLayout>
        <main className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
          {/* Workspaces */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                {t("workspaces")}
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    + {t("create")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {t("create")} {t("documents")}
                    </DialogTitle>
                  </DialogHeader>
                  <CreateWorkspaceForm />
                </DialogContent>
              </Dialog>
            </div>

            <WorkspaceCardList />
          </section>

          {/* Popular Topics */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t("quick_access")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic, index) => (
                <Card key={index} className="border rounded-lg p-4">
                  <CardContent className="flex flex-col gap-1 p-0">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 text-purple-700 rounded-md">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-base">{topic.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {topic.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2 ml-1">
                      <Eye className="w-4 h-4" />
                      <span>
                        {topic.views.toLocaleString()} {t("views")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </SiteLayout>
    </PrivateRoute>
  );
}
