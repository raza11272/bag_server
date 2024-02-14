import { Clock3 } from "lucide-react";

type CardProps = {
  img: String;
  name: String;
  title: String;
  date?: String;
  // type: "team" | "membership";
};


const SingleTeamCard = ({ img, name, title, date }: CardProps) => {
  return (   
    <div className="flex flex-col overflow-hidden rounded-sm shadow-lg hover:shadow-xl cursor-pointer"> 
      <div className=" flex justify-end items-end "> 
      {/* @ts-ignore */}
        <img src={img} className="h-full  w-full object-contain" alt={name} />
      </div>
      <div className="flex bg-popover p-6 flex-col justify-center items-center gap-2">
        <h3 className=" text-secondary-foreground text-xl font-semibold">
          {name}
        </h3>
        <p className="text-muted-foreground text-base">{title}</p>

        {date && (
          //@ts-ignore
          <span className="flex justify-center items-center gap-1">
            <Clock3 size={16} />
            <p className=" text-secondary-foreground capitalize text-sm">
              {date}
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default SingleTeamCard;
