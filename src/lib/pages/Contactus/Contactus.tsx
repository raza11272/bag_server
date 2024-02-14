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
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderSpin from "@/lib/components/LoaderSpin";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

const Contactus = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const navigate = useNavigate();

  const POST_CONTACT_FORM = gql`
    mutation CreateContactUs($data: ContactUsInput!) {
      createContactUs(data: $data) {
        data {
          attributes {
            name
            email
            number
            message
          }
        }
      }
    }
  `;

  const [contactForm, { loading }] = useMutation(POST_CONTACT_FORM);

  if (loading) {
    return <LoaderSpin />;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    contactForm({
      variables: {
        data: {
          name: values.name,
          email: values.email,
          number: values.phone,
          message: values.message,
        },
      },
    });
    toast.success("Thanks for your message");
    navigate("/");
  }

  return (
    <div className="grid md:grid-cols-2">
      <div className="w-full m-auto sectionpadding">
        <h3 className="text-start mb-8 text-2xl font-semibold">Contact Us</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-4 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write your message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="my-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="bg-secondary flex justify-center flex-col p-10 gap-4">
        <div className="flex justify-start items-center gap-4">
          <div className="w-10 bg-white h-10 rounded-full flex justify-center items-center">
            <MapPin size={20} className="text-primary" />
          </div>
          <p className="text-lg capitalize font-semibold">
            bangaldesh ,bogura,324
          </p>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
            <Phone size={20} className="text-primary" />
          </div>
          <p className="text-lg capitalize font-semibold">017000000</p>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="w-10 bg-white h-10 rounded-full flex justify-center items-center">
            <Mail size={20} className="text-primary" />
          </div>
          <p className="text-lg capitalize font-semibold">Example@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
