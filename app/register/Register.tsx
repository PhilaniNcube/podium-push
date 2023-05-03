"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSupabase } from "../supabase-provider";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const { supabase } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    if (typeof data.email !== "string" || typeof data.password !== "string" || typeof data.first_name !== "string" || typeof data.last_name !== "string") return;

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
        }
      }
    });
    if (error) {
      console.log(error);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-3 bg-primary rounded-3xl overflow-hidden shadow my-6 h-[70vh]">
      <div className="w-full col-span-3 lg:col-span-1 px-4 md:px-10 lg:px-24 py-3 bg-transparent flex flex-col items-center justify-center h-full">
        <h2 className="text-white font-medium text-xl md:text-2xl ">
          Register an account
        </h2>
      </div>
      <div className="col-span-3 lg:col-span-2 px-4 py-3 md:rounded-l-3xl bg-white flex items-center justify-center">
        <div className="max-w-[600px] w-[90%]">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-semibold text-neutral-900 text-2xl md:text-3xl">
              Register
            </h1>
            <div className="flex flex-col w-full lg:w-4/5">
              <Label htmlFor="email" className="my-3">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col w-full lg:w-4/5 mt-4">
              <Label htmlFor="password" className="my-3">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col w-full lg:w-4/5 mt-4">
              <Label htmlFor="first_name" className="my-3">
                First Name
              </Label>
              <Input
                id="first_name"
                type="text"
                placeholder="First Name"
                {...register("first_name")}
              />
            </div>
            <div className="flex flex-col w-full lg:w-4/5 mt-4">
              <Label htmlFor="last_name" className="my-3">
                Last Name
              </Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Last Name"
                {...register("last_name")}
              />
            </div>

            <div className="flex flex-col w-full lg:w-4/5 mt-4">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
