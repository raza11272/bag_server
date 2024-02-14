import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters [a-z] [0-9] [@$&]",
  }),
  confirmpassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Register = () => {
  const [matchPass, setMatchPass] = useState("");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  // 2. Define a submit handler.

  const REGISTER = gql`
    mutation Register($input: UsersPermissionsRegisterInput!) {
      register(input: $input) {
        jwt
        user {
          username
          email
          id
        }
      }
    }
  `;

  const [addUser, { loading, error }] = useMutation(REGISTER);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    toast.error(error.message);
  }

  // if (data) {
  //   localStorage.setItem("jwt", data.register.jwt);
  //   navigate("/");
  // }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // console.log(values);

    addUser({
      variables: {
        input: {
          email: values.email,
          password: values.password,
          username: values.username,
        },
      },
    });

    if (values.password !== values.confirmpassword) {
      setMatchPass("confirmpassword not match with you password");
    } else {
      setMatchPass("");
    }
    navigate("/checkmail");
    toast.success(
      "😀User registration successfully .Thanks for your registration"
    );
  }

  return (
    <div className="max-w-md m-auto sectionpadding">
      <h3 className="text-center mb-8 text-2xl font-semibold">Sign Up</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <span>{matchPass && matchPass}</span>

          <Button type="submit" className="my-4">
            Sign Up
          </Button>
          <p className=" inline-flex gap-1 text-center w-full justify-center items-center">
            Do yo have an account?
            <Link
              to={"/login"}
              className="capitalize text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Register;
