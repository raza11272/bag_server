import SectionHeading from "@/lib/components/Heading/SectionHeading";
import { SinglePost } from "./SinglePost";
import { gql, useQuery } from "@apollo/client";
import LoaderSpin from "@/lib/components/LoaderSpin";

const CommutityPost = () => {
  const GET_ALL_POST = gql`
    query NewsPosts {
      newsPosts(sort: "publishedAt:desc") {
        data {
          id
          attributes {
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

  const { loading, error, data } = useQuery(GET_ALL_POST);

  if (loading) {
    return <LoaderSpin />;
  }
  if (error) {
    return (
      <div className="h-[100vh] px-6 justify-center flex items-center flex-wrap ">
        <h1 className="text-xl text-red-500 text-center">{error.message}</h1>;
      </div>
    );
  }

  return (
    <section className="sectionpadding">
      <div className="titlemb">
        <SectionHeading
          title={"Commutity Dashboard"}
          subtitle={"see all posts from our Commutity "}
        />
      </div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.newsPosts &&
        //@ts-ignore
          data.newsPosts.data.map((item, index) => (
            <SinglePost
            image={item.attributes.image.data.attributes.url}
              key={index}
              title={item.attributes.Title}
              description={item.attributes.Description}
              id={item.id}
            />
          ))}
      </div>
    </section>
  );
};

export default CommutityPost;
