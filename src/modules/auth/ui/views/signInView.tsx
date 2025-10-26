"use client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { loginSchema } from "../../schemas";

import { Poppins } from "next/font/google";

import { FaAnkh } from "react-icons/fa6";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
});

export const SignInView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5  ">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto border-r">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16 "
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center">
                <span
                  className={cn(
                    "text-5xl font-semibold flex flex-row",
                    poppins.className
                  )}
                >
                  <FaAnkh />
                  Mart
                </span>
              </Link>
              <Button
                asChild
                variant={"ghost"}
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href={"/sign-up"}>
                  Sign up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Login to your AnkhMart Account and start Seeling
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ankh@gmail.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter Your Password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-10" // padding يمين عشان الأيقونة ما تغطيش النص
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VscEye className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <VscEyeClosed
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={login.isPending}
              type="submit"
              size="lg"
              variant={"elevated"}
              className="bg-black text-white hover:bg-amber-400 hover:text-black"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </div>
      <div className="h-screen w-full lg:col-span-2 hidden lg:block">
        <Image
          src={"/images/signup.png"}
          alt="signup"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
