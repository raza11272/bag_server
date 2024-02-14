import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

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
import LoaderSpin from "@/lib/components/LoaderSpin";

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const LOGIN_USER = gql`
    mutation Login($input: UsersPermissionsLoginInput!) {
      login(input: $input) {
        jwt
        user {
          username
          email
          id
        }
      }
    }
  `;
  const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER);

  if (loading) {
    return <LoaderSpin/>;
  }

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    toast.success("User login successfu");
    navigate("/dashboard");
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    loginUser({
      variables: {
        input: {
          identifier: values.email,
          password: values.password,
        },
      },
    });

    toast.success("User login successfully");
  }
  return (
    <div className="max-w-md m-auto sectionpadding">
      <h3 className="text-center mb-8 text-2xl font-semibold">Login</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4 "
        >
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
          <Button type="submit" className="my-4">
            Login
          </Button>
          <p className=" inline-flex gap-1 text-center w-full justify-center items-center">
            Don't have an account
            <Link
              to={"/signup"}
              className="capitalize text-primary hover:underline"
            >
              signup
            </Link>
          </p>
        </form>
      </Form>
      {error && <h1>{error.message}</h1>}
    </div>
  );
};

export default Login;
