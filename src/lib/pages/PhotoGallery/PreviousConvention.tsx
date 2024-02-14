import SectionHeading from "@/lib/components/Heading/SectionHeading";
import LoaderSpin from "@/lib/components/LoaderSpin";
import { DrawerDialogDemo } from "@/lib/components/centerDrowser";
import { gql, useQuery } from "@apollo/client";

const PreviousConvention = () => {
  const GET_PHOTOGALLERYS = gql`
    query PreviousConventions {
      previousConventions {
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

  const { loading, data } = useQuery(GET_PHOTOGALLERYS);

  if (loading) {
    return <LoaderSpin />;
  }

  return (
    <section className="sectionpadding">
      <div className="titlemb">
        <SectionHeading title={"Gallery"} subtitle={"Our amazing activity "} />
      </div>

      <div className="flex flex-col justify-start items-start gap-20">
        {data &&
        //@ts-ignore
          data.previousConventions.data.map((item, index) => (
            <div>
              <div className="flex flex-col">
                <h1 className="text-3xl mb-10 font-semibold" key={index}>
                  {item.attributes.title}
                </h1>
                    {/* @ts-ignore */}
                <div className=" columns-1 md:columns-2 lg:columns-3  gap-6">
                    {/* @ts-ignore */}
                  {item.attributes.image.data.map((item2, index) => (
                    //@ts-ignore
                    <DrawerDialogDemo
                      clickComponent={
                        <ImageCard img={item2.attributes.url} key={index} />
                      }
                      img={item2.attributes.url}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PreviousConvention;



//@ts-ignore
const ImageCard = ({ img }) => {
  //@ts-ignore
  return (
    <div className="mb-5">
      
    {/* @ts-ignore */}
    
      <img src={img} className="w-full" alt="img" />
    </div>
  );
};
