// Import Swiper React components

// Import Swiper styles

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TeamMember from "../About/TeamMember";
import DoWantMember from "../Membarship/DoWantMember";
import Testimonials from "./Testimonials";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useQuery, gql } from "@apollo/client";
import LoaderSpin from "@/lib/components/LoaderSpin";

const Home = () => {
  const GET_HOME_ALL = gql`
    query {
      heroSections {
        data {
          attributes {
            heading
            paragraph
            bgimage {
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

  const GET_ABOUT_DATA = gql`
    query Aboutus {
      aboutus {
        data {
          id
          attributes {
            title
            description
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

  const GET_ALL_EXCMMITTE = gql`
    query ExecutiveCommittees {
      executiveCommittees {
        data {
          attributes {
            title
            name
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

  const GET_TESTOMONIAL = gql`
    query Advertisements {
      advertisements {
        data {
          attributes {
            url
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

  const { loading, error, data } = useQuery(GET_HOME_ALL);
  const { loading: aboutloading, data: aboutdata } = useQuery(GET_ABOUT_DATA);
  const { loading: excloading, data: excdata } = useQuery(GET_ALL_EXCMMITTE);
  const { loading: testoloading, data: testodata } = useQuery(GET_TESTOMONIAL);
  //@ts-ignore
  if ((loading, aboutloading, excloading, testoloading)) return <LoaderSpin />;
  if (error) return <p>Error : {error.message}</p>;

  // console.log(testodata.testimonials.data);

  return (
    <div>
      {/* hero section  */}
      <section className=" h-[100vh] lg:h-[90vh]">
        <Swiper
          navigation={true}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {data &&
            //@ts-ignore
            data.heroSections.data.map((item, index) => (
              <SwiperSlide key={index}>
                <HeroSection
                  title={item.attributes.heading}
                  dec={item.attributes.paragraph}
                  img={item.attributes.bgimage.data.attributes.url}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      {/* about us section */}

      <section className="grid gap-8 lg:gap-12 sectionpadding lg:grid-cols-2">
        <div className="rounded-md overflow-hidden">
          {aboutdata && (
            <img
              className="w-full h-full"
              src={aboutdata.aboutus.data.attributes.image.data.attributes.url}
              alt="img"
            />
          )}
        </div>

        <div className="flex  gap-10 lg:gap-12  flex-col">
          <div className="flex flex-col gap-4">
            <h3 className="heading">About us</h3>
            <h1 className="title text-secondary-foreground">
              {aboutdata && aboutdata.aboutus.data.attributes.title}
            </h1>
            <p className="dec text-secondary-foreground">
              {aboutdata && aboutdata.aboutus.data.attributes.description}
            </p>
          </div>
          <Link to={"/baghistory"}>
            <Button size={"lg"}>Lern more</Button>
          </Link>
        </div>
      </section>
      {excdata && (
        <TeamMember
          title={"Executive Committee"}
          teamtype="team"
          data={excdata.executiveCommittees.data}
          heading={"meet with our Executive Committee   "}
        />
      )}
      <DoWantMember />
      {testodata && <Testimonials data={testodata.advertisements.data} />}
    </div>
  );
};

export default Home;

type herosectionProps = {
  img: String;
  title: String;
  dec: String;
};

const HeroSection = ({ img, title, dec }: herosectionProps) => {
  return (
    <div className="h-full w-full ">
      <div className="w-full h-full  relative">
        {/* @ts-ignore */}
        <img src={img} className="bg-contain" alt={title} />
      </div>
      <div className="absolute  top-0 left-0 z-30 bg-[#00000094] flex flex-col justify-center text-start items-start  gap-4 md:gap-8 h-full w-full px-4 md:px-16 py-24 ">
        <h1 className="text-white font-bold capitalize text-5xl lg:text-6xl md:w-[60%] ">
          {title}
        </h1>
        <p className="text-muted lg:w-[60%]  text-lg">{dec}</p>
        <Link to="/aboutus">
          <Button size={"lg"}>Lern More</Button>
        </Link>
      </div>
    </div>
  );
};
