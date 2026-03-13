"use client";

import { loginSchema } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",

      password: ""
    }
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/sign-in", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const dataResponse = await response.json();
        if (response.ok) {
          toast.success(dataResponse?.message,  { position: "top-center" });
          router.push("/");
        } else {
          toast.error(dataResponse?.message || "Login failed", {position: "top-center"});
        }
      } catch (error) {
        toast.error("rror logging in",  { position: "top-center" });
      }
    });
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="gap-y-5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email address</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="john@doe.com"
                      type="email"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" disabled={isPending} className="w-full gap-2">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer font-medium text-primary hover:underline">
                <Button variant="link" asChild>
                  <Link href="/auth/sign-up">Sign up</Link>
                </Button>
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
