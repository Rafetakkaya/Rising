"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import style from "./index.module.css";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation"; 
import { jwtAtom } from "../utils/atoms";
import "react-toastify/dist/ReactToastify.css"

const schema = z.object({
  username: z.string().min(4),
  password: z.string().min(4).max(8),
});
type FormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const [jwt, setJwt] = useAtom(jwtAtom);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(
    (data: FormValues) => axios.post("https://recruitment-api.vercel.app/login", data),
    {
      onSuccess: (data: any) => {
        const token = data.data.jwt;
        setJwt(token);
        localStorage.setItem("jwt", token);
        reset({
          username: "",
          password: "",
        });
        router.push("/");
      },
      
      onError: (error: any) => {
        toast.error(
          error.response.data.message || "Geçerli Bilgi Giriniz !!!"
        )
        console.log(error);
      },
    }
  );

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      router.push("/");
    }
   
  }, [router,jwt]);

  return (
    <>

    <ToastContainer/>
    <div className={style.login}>
      <div className={style.loginHead}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>
          <input type="text" placeholder="Username" {...register("username")} />
          <input type="password" placeholder="Password" {...register("password")} />
          <button type="submit">Login</button>
          {errors.username && <p>{errors.username.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
       
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
