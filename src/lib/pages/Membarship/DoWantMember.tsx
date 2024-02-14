import { Button } from "@/components/ui/button";
import LoaderSpin from "@/lib/components/LoaderSpin";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const DoWantMember = () => {
  const JOIN_USDATA = gql`
    query JoinUsSection {
      joinUsSection {
        data {
          attributes {
            title
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

  const { loading, data } = useQuery(JOIN_USDATA);

  if (loading) {
    return <LoaderSpin/>;
  }

  return (
    <section className=" sectionpadding ">
      {data && (
        <div className="bg-primary overflow-hidden rounded-xl grid gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="flex p-10 justify-center gap-10 lg:gap-12  flex-col">
            <h1 className="title  text-accent">
              {data.joinUsSection.data.attributes.title}
            </h1>

            <Link to={"/signup"}>
              <Button variant={"outline"} size={"lg"}>
                Join Us
              </Button>
            </Link>
          </div>
          <div className=" bg-primary overflow-hidden">
            <img
              className="w-full h-full"
              src={data.joinUsSection.data.attributes.image.data.attributes.url}
              alt="img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DoWantMember;
