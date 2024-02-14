// import { teamData } from "@/db/data";
import SectionHeading from "@/lib/components/Heading/SectionHeading";
import SingleTeamCard from "@/lib/components/SingleTeamCard";

type TeamProps = {
  heading: String;
  title: String;
  data?: [];
  teamtype: "team" | "membership";
};

const TeamMember = ({ heading, title, data, teamtype }: TeamProps) => {
  return (
    <section className="sectionpadding bg-secondary">
      <div className="titlemb ">
        <SectionHeading title={title} subtitle={heading} />
      </div>
      <div className="  grid gap-8  md:grid-cols-3 lg:grid-cols-4">
        {data &&
          //@ts-ignore
          data.map((item, index) => (
            <SingleTeamCard
              //@ts-ignore
              key={index}
              //@ts-ignore
              type={teamtype}
              //@ts-ignore
              title={item.attributes.title}
              //@ts-ignore
              name={item.attributes.name}
              //@ts-ignore
              img={item.attributes.image.data.attributes.url}
            />
          ))}
      </div>
    </section>
  );
};

export default TeamMember;
