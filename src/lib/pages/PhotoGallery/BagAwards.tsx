// import { awardsdata } from "@/db/data";
import SectionHeading from "@/lib/components/Heading/SectionHeading";
import LoaderSpin from "@/lib/components/LoaderSpin";
import { DrawerDialogDemo } from "@/lib/components/centerDrowser";
import { gql, useQuery } from "@apollo/client";

const BagAwards = () => {
  const GET_ALL_AWARDS = gql`
    query BagAwards {
      bagAwards {
        data {
          attributes {
            awardname
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
  const { loading, data } = useQuery(GET_ALL_AWARDS);

  if (loading) {
    return <LoaderSpin/>;
  }

  // console.log(data.bagAwards.data);

  return (
    <section className="sectionpadding">
      <div className="titlemb">
        <SectionHeading title={"BAG Awards"} subtitle={"Our Achievements "} />
      </div>

      <div className=" columns-2 md:columns-4 lg:columns-5">
        {data &&
        //@ts-ignore
          data.bagAwards.data.map((item, index) => (
            <DrawerDialogDemo
              key={index}
              img={item.attributes.image.data.attributes.url}
              clickComponent={
                <AwardImg
                  url={item.attributes.image.data.attributes.url}
                  name={item.attributes.awardname}
                />
              }
            />
          ))}
      </div>
    </section>
  );
};


export default BagAwards;

type ImgProps = {
  url: String;
  name: String;
};

const AwardImg = ({ url, name }: ImgProps) => {
  return (
    <div className=" mb-4 group transition-all duration-500  relative">
    {/* @ts-ignore */}
      <img src={url} alt="" />
      <div className="absolute group-hover:top-0 group-hover:flex  h-full w-full bg-[#0000009e] top-[-100] hidden left-0 p-5 justify-center items-center">
        <h4 className="capitalize text-accent font-semibold text-lg">{name}</h4>
      </div>
    </div>
  );
};
