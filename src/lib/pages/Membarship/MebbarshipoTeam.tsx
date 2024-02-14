import { teamData } from '@/db/data'
import SectionHeading from '@/lib/components/Heading/SectionHeading'
import SingleTeamCard from '@/lib/components/SingleTeamCard'

const MebbarshipoTeam = () => {
  return (
    <section className="sectionpadding bg-secondary">
    <div className="titlemb ">
       <SectionHeading  title={"Executive Committee"} subtitle={"meet with Executive Committee"}/>
    </div>
    <div className="  grid gap-8  md:grid-cols-2 lg:grid-cols-3">
      {teamData.map((item, index) => (
        <SingleTeamCard
          key={index}
          title={item.title}
          name={item.name}
          img={item.img}
          date={item.date}
        />
      ))}
    </div>
    </section>
  )
}

export default MebbarshipoTeam