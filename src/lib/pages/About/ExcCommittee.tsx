import { gql, useQuery } from "@apollo/client";
import TeamMember from "./TeamMember";
import LoaderSpin from "@/lib/components/LoaderSpin";

const ExcCommittee = () => {
  const GET_ALL_EXCMMITTE = gql`
    query ExecutiveCommittees(pagination: { limit: 100 }) {
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
  const { loading, data: excdata, error } = useQuery(GET_ALL_EXCMMITTE);

  if (loading) {
    return <LoaderSpin />;
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
      {excdata ? (
        <TeamMember
          title={"Executive Committee"}
          teamtype="team"
          data={excdata.executiveCommittees.data}
          heading={"meet with our Executive Committee   "}
        />
      ) : (
        <div className="h-[100vh] flex justify-center items-center ">
          <h1 className="text-center text-2xl  ">Sorry! data not found</h1>
        </div>
      )}
    </div>
  );
};

export default ExcCommittee;
