import { gql, useQuery } from "@apollo/client";
import TeamMember from "../About/TeamMember";
import LoaderSpin from "@/lib/components/LoaderSpin";

const GeneralMember = () => {
  const GET_ALL_EXCMMITTE = gql`
    query BagGeneralMembers {
      bagGeneralMembers {
        data {
          attributes {
            name
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

  const { loading, data: excdata ,error} = useQuery(GET_ALL_EXCMMITTE);

  if (loading) {
    return <LoaderSpin/>
  }

  if (error) {
    return (
      <div className="h-[100vh] px-6 justify-center flex items-center flex-wrap ">
        <h1 className="text-xl text-red-500 text-center">{error.message}</h1>;
      </div>
    );
  }

  return (
    <div>
      {excdata && (
        <TeamMember
          title={"Executive Committee"}
          teamtype="team"
          data={excdata.bagGeneralMembers.data}
          heading={"meet with our Executive Committee   "}
        />
      )}
    </div>
  );
};

export default GeneralMember;
