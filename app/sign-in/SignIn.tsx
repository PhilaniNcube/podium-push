"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSupabase } from "../supabase-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInSchema = z.infer<typeof signInSchema>;

const SignIn = () => {

  const {supabase} = useSupabase();

  const router = useRouter()


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignInSchema>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = async (data: SignInSchema) => {

      if(typeof data.email !== "string" || typeof data.password !== "string") return;

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.log(error)

      } else {

        const {data:isAdmin, error:adminError} = await supabase.rpc("is_admin")

        if(isAdmin){
          router.push("/dashboard")
        } else {
          router.push("/")
        }

      }
    }


  return <div className="w-full grid grid-cols-3 bg-primary rounded-3xl overflow-hidden shadow my-6 h-[70vh]">
    <div className="w-full col-span-3 lg:col-span-1 px-4 md:px-10 lg:px-24 py-3 bg-transparent flex flex-col items-center justify-center h-full">
      <h2 className="text-white font-medium text-xl md:text-2xl ">Sign into your account</h2>
    </div>
    <div className="col-span-3 lg:col-span-2 px-4 py-3 md:rounded-l-3xl bg-white flex items-center justify-center">
      <div className="max-w-[600px] w-[90%]">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-neutral-900 text-2xl md:text-3xl">Sign In</h1>
          <div className="flex flex-col w-full lg:w-4/5">
            <Label htmlFor="email" className="my-3">Email</Label>
            <Input id="email" type="email" placeholder="Email" {...register("email")} />
          </div>
          <div className="flex flex-col w-full lg:w-4/5 mt-4">
            <Label htmlFor="password" className="my-3">Password</Label>
            <Input id="password" type="password" placeholder="password" {...register("password")} />
          </div>

          <div className="flex flex-col w-full lg:w-4/5 mt-4">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  </div>;
};
export default SignIn;
