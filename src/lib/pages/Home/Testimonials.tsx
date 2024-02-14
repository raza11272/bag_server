import SectionHeading from "@/lib/components/Heading/SectionHeading";
// Import Swiper React components
// import { Quote } from "lucide-react";
// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

type TestoProps = {
  data?: [];
};

const Testimonials = ({ data }: TestoProps) => {

return (
    <section className="sectionpadding ">
      <div className="titlemb">
        <SectionHeading
          title={"advertisement"}
          subtitle={"community advertisement"}
        />
      </div>
      <Swiper
        spaceBetween={24}
        breakpoints={{
          425: {
            width: 426,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 3,
          },
          1024: {
            width: 1024,
            slidesPerView: 3,
          },
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data &&
          data.map((item, index) => {
             {/* console.log(item.attributes.image.data.attributes.url) */}
          return(
            <SwiperSlide key={index}>
            {/* @ts-ignore */}
                <img src={item.attributes.image.data.attributes.url} alt="" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
};

export default Testimonials;

// type TestoCardProps = {
//   content: String;
//   name: String;
//   title: String;
//   img: String;
// };

// const TestimonialCard = ({ content, name, title, img }: TestoCardProps) => {
//   return (
//     <div className="p-4 cursor-pointer rounded-md  bg-popover   w-full">
//       <div className="h-full flex flex-col gap-4    p-8 rounded">
//         <Quote className="text-muted-foreground" />
//         <p className="leading-relaxed text-start text-secondary-foreground mb-6">
//           {content}
//         </p>
//         <div className="flex items-center gap-4 justify-start">
//           <div className="h-10 w-10">
//             <img
//               alt="testimonial"
//               src={img}
//               className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
//             />
//           </div>

//           <span className="  flex items-start  flex-col ">
//             <span className=" font-medium text-secondary-foreground">
//               {name}
//             </span>
//             <span className="text-muted-foreground capitalize text-sm">
//               {title}
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
