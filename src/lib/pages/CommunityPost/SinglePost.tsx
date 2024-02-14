import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

//@ts-ignore
export const SinglePost = ({ title, description, id, image }) => {
  return (
    <Link to={`/newspost/${id}`} className="cursor-pointer ">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={image && image}
          alt="blog"
        />
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-col gap-4">
            <h1 className="title-font text-2xl capitalize font-medium text-secondary-foreground mb-3">
              {title}
            </h1>

            <p
              className="leading-relaxed mb-3 text-secondary-foreground  
           whitespace-nowrap  text-ellipsis
          "
            >
              {description}
            </p>
          </div>

          <div className="flex items-center  justify-between ">
            <Link
              to="/singlepost"
              className="text-primary inline-flex  items-center md:mb-2 lg:mb-0"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
