import  { useState } from "react";
// import JoditEditor from "jodit-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import LoaderSpin from "@/lib/components/LoaderSpin";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string(),
});
const CREATE_POST = gql`
  mutation Mutation($data: NewsPostInput!) {
    createNewsPost(data: $data) {
      data {
        id
        attributes {
          updatedAt
          Title
          ExtraText
        }
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

const CreatePostForm = () => {
  //@ts-ignore
  const userdata = useSelector((state: authuser) => state.authuser.user);
  const navigate = useNavigate();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [createPost, { loading }] = useMutation(CREATE_POST);
  const [createFile] = useMutation(FILE_UPLOAD);

  if (loading) {
    return <LoaderSpin />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await createPost({
        variables: {
          data: {
            Title: values.title,
            Description: values.description,
            owner: userdata.email,
          },
        },
      });
      if (data) {
        // console.table("this is data", data.createNewsPost.data.id);
        await createFile({
          variables: {
            refId: data.createNewsPost.data.id,
            ref: "api::news-post.news-post",
            field: "image",
            file: image,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    toast.success(
      "Thanks for your post . Now wait for post approval from admin"
    );
    navigate("/");
  }

  return (
    <div className="sectionpadding max-w-lg  m-auto">
      <div className=" m-auto ">
        <h3 className="text-center mb-8 text-2xl font-semibold">
          Create a post
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Post title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Post description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit" className="my-4">
                Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
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

export default CreatePostForm;
