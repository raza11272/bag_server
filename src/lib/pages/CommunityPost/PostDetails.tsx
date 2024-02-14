// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";

// import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import LoaderSpin from "@/lib/components/LoaderSpin";
const PostDetails = () => {
  const { id } = useParams();

  const GET_SINGLE_POST = gql`
    query NewsPost($newsPostId: ID) {
      newsPost(id: $newsPostId) {
        data {
          id
          attributes {
            owner
            Title
            Description
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_SINGLE_POST, {
    variables: { newsPostId: id },
  });
  if (loading) {
    return <LoaderSpin />;
  }

  if (data) {
    console.log(data.newsPost.data.attributes);
  }

  return (
    <section className="">
      <div className=" md:w-[60%] sectionpadding flex flex-col gap-4 m-auto  ">
        <img
          className="rounded-lg"
          src={data && data.newsPost.data.attributes.image.data.attributes.url}
          alt=""
        />
        <div className="flex justify-between">
          <span className="text-sm inline-flex justify-start gap-1 items-center text-muted-foreground">
            created by {data.newsPost.data.attributes.owner}
          </span>
          {/* <span className="text-sm inline-flex justify-start gap-1 items-center text-muted-foreground">
            <MessageCircle size={16} />6
          </span> */}
        </div>

        {data && (
          <>
            <h1 className="text-4xl font-semibold text-secondary-foreground">
              {data.newsPost.data.attributes.Title}
            </h1>

            <p className="text-base text-secondary-foreground">
              {data.newsPost.data.attributes.Description}
            </p>
          </>
        )}
        <div>
          {/* <div className=""></div>
          <hr className="my-9" />
          <h2 className="text-2xl mb-8 capitalize">Comments</h2> */}
          {/* <div className=" flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((item, index) => (
                <UserComment />
              ))}
            </div>
            <CommentBox />
          </div> */}
        </div>
      </div>
      {/* <section className="border-t sectionpadding  ">
        <div className="titlemb">
          <SectionHeading subtitle={"Related Post"} />
        </div>
        <RecomendePosts />
      </section> */}
    </section>
  );
};

export default PostDetails;
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email(),
//   comment: z.string().min(2, {
//     message: "Comment must be at least 1 characters.",
//   }),
// });
// const CommentBox = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       comment: "",
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 w-full "
//       >
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input type="text" placeholder="Name" {...field} />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input type="email" placeholder="Email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="comment"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Textarea
//                   placeholder="Write your comment"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// const UserComment = () => {
//   return (
//     <div className="p-2 flex flex-col gap-1 px-4 bg-accent">
//       <h1 className="text-lg">Raisul hasan</h1>
//       <p className="capitalize text-sm">this is just a dummay comment </p>
//     </div>
//   );
// };
