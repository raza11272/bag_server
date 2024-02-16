import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { countrynames } from "@/db/data";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpin from "@/lib/components/LoaderSpin";
const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  streetaddress: z.string(),
  streetaddress2: z.string(),
  city: z.string(),
  stateprovince: z.string(),
  zipcode: z.string(),
  country: z.string(),
  linkedin: z.string(),
  message: z.string(),
});

const MEMBER_SHIP_FORM = gql`
  mutation CreateMembershipForm($data: MembershipFormInput!) {
    createMembershipForm(data: $data) {
      data {
        attributes {
          FirstName
        }
        id
      }
    }
  }
`;

const FILE_UPLOAD = gql`
  mutation SingleImageUpload(
    $refId: ID
    $ref: String
    $field: String
    $info: FileInfoInput
    $file: Upload!
  ) {
    upload(refId: $refId, ref: $ref, field: $field, file: $file, info: $info) {
      data {
        id
        attributes {
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const MemberShipForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      streetaddress: "",
      streetaddress2: "",
      city: "",
      stateprovince: "",
      zipcode: "",
      country: "",
      linkedin: "",
      message: "",
      // file: [],
    },
  });

  //drop code

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        //@ts-ignore
        setImage(file);
        //@ts-ignore
        setPreviewImage(URL.createObjectURL(file));
      }
    },
    //@ts-ignore
    accept: "image/*",
  });

  const [createFormPost] = useMutation(MEMBER_SHIP_FORM);

  const [createFile, { loading }] = useMutation(FILE_UPLOAD);

  if (loading) {
    return <LoaderSpin />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //@ts-ignore
      const { data } = await createFormPost({
        variables: {
          data: {
            FirstName: values.firstname,
            LastName: values.lastname,
            Email: values.email,
            gender: values.gender,
            PhoneNumber: values.phone,
            StreetAddress: values.streetaddress,
            StreetAddress2: values.streetaddress2,
            City: values.city,
            StateProvince: values.stateprovince,
            PostalZipCode: values.zipcode,
            country: values.country,
            LinkedIn: values.linkedin,
            message: values.message,
          },
        },
      });
      if (data) {
        // console.table("this is data", data.createNewsPost.data.id);
        await createFile({
          variables: {
            refId: data.createMembershipForm.data.id,
            ref: "api::membership-form.membership-form",
            field: "image",
            file: image,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    toast.success("thanks for submitting the form");
    // console.log("click");

    navigate("/");
    console.table(values);
  }
  return (
    <div className=" m-auto  max-w-2xl sectionpadding">
      <h3 className="text-center mb-8 text-2xl font-semibold">
        Membership Form
      </h3>
      <div className="mb-6">
        <div>
          {/* @ts-ignore */}
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )}
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4 "
        >
          <div className="grid grid-cols-2 gap-4 ">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 ">
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
                  <FormLabel>Phone Number</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="r1" />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="r2" />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetaddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Street Address"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetaddress2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address 2</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Street Address 2"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="City" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateprovince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="State/Province" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal / Zip Code*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Postal / Zip Code*"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select your country</SelectLabel>
                        {countrynames.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="LinkedIn (optional)"
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
                <FormLabel>Write your message (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Type your message here." />
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
  );
};

const dropzoneStyles = {
  border: "2px dashed #0087F7",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default MemberShipForm;
