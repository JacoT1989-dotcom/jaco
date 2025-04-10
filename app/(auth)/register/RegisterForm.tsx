"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterFormValues } from "./validation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { signUp } from "./register-user";
import { UserRole } from "@prisma/client";

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  // Fix type issue by explicitly specifying RegisterFormValues
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      role: UserRole.USER, // Explicitly use UserRole.USER instead of string "USER"
    },
  });

  // TypeScript will now properly infer the type of data
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsPending(true);
      const result = await signUp(data);
      if (result?.error) {
        toast.error(result.error);
        if (result.error.includes("Username")) {
          form.setError("username", { message: result.error });
        } else if (result.error.includes("Email")) {
          form.setError("email", { message: result.error });
        }
        return;
      }

      toast.success("Registration successful!");
      router.push("/register-success");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="w-full max-w-2xl space-y-6 bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Please complete all required fields to register
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80 mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe"
                        {...field}
                        autoComplete="username"
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                        autoComplete="email"
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        autoComplete="new-password"
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        autoComplete="new-password"
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
