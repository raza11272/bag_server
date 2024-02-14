import LoaderSpin from "@/lib/components/LoaderSpin";
import { gql, useQuery } from "@apollo/client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

const Benefit = () => {
  const GET_NOTE = gql`
    query MemberShipBenefit {
      memberShipBenefit {
        data {
          attributes {
            Title
            content
          }
        }
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_NOTE);

  if (loading) {
    return <LoaderSpin/>;
  }
  if (error) {
    return (
      <div className="h-[100vh] px-6 justify-center flex items-center flex-wrap ">
        <h1 className="text-xl text-red-500 text-center">{error.message}</h1>;
      </div>
    );
  }

  // if (data) {
  //   console.log(data.note.data.attributes.conttent);
  // }

  const content: BlocksContent =
    data && data.memberShipBenefit.data.attributes.content;

  return (
    <div className="sectionpadding sectiontext">
      <div className="w-full">
        <BlocksRenderer content={content} />
      </div>
    </div>
  );
};

export default Benefit;
