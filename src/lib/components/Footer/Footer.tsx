import { gql, useQuery } from "@apollo/client";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";



const GET_FOOTER_DATA = gql`
  query SocialLink {
    socialLink {
      data {
        attributes {
          facebook
          twiter
          instagram
          linkedin
        }
      }
    }
  }
`;

const OTHERS_LINK = gql`
  query OthersLinks {
    othersLinks {
      data {
        attributes {
          link
          linkname
        }
      }
    }
  }
`;



 





const Footer = () => {
  const { loading, data } = useQuery(GET_FOOTER_DATA);
  const { data: otherdata } = useQuery(OTHERS_LINK);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <footer className="text-secondary   mt-auto  w-full bg-secondary-foreground  body-font">
      <div className="container border-b  border-muted-foreground sectionpadding mx-auto  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex flex-col">
        <div className=" grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:pr-20 -mb-10 text-left order-first">
          <div className=" w-full px-4">
            <h2 className="title-font font-medium text-lg mb-3">Page Links</h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutbag"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/photogallery"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4">
            <h2 className="title-font font-medium text-lg mb-3">Page Links</h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/newspost"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  CommutityPost
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarshipfund"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  to="/membershipform"
                  className="text-muted-foreground capitalize hover:text-primary"
                >
                  Membership
                </Link>
              </li>
            </nav>
          </div>

          <div className="w-full px-4">
            <h2 className="title-font font-medium text-lg mb-3">
              Others Links
            </h2>
            <nav className="list-none mb-10">
              {otherdata &&
              //@ts-ignore
                otherdata.othersLinks.data.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.attributes.link}
                      className="text-muted-foreground capitalize hover:text-primary"
                    >
                      {item.attributes.linkname}
                    </a>
                  </li>
                ))}
            </nav>
          </div>

          <div className=" md:mx-0   p-4 text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center justify-start  text-gray-900">
              <div className="">
                <img src="/img/logo.webp" alt="" />
              </div>
              <span className="ml-3 text-xl text-secondary capitalize">
                bagusaonline
              </span>
            </a>
    
          </div>
        </div>
      </div>
      <div className="bg-secondary-foreground">
        <div className="container mx-auto px-6 py-4 md:px-16 flex flex-wrap flex-col sm:flex-row">
          <p className="text-secondary  text-sm text-center sm:text-left">
            © 2024 Developed By
            <a
              href="https://webwes.com/"
              className="text-primary hover:underline ml-1"
              target="_blank"
            >
              @WebWes Digital Agency
            </a>
          </p>

          {data && (
            <span className="inline-flex gap-2 sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a
                href={data.socialLink.data.attributes.facebook}
                className="text-secondary hover:text-primary"
              >
                <Facebook size={16} />
              </a>
              <a
                href={data.socialLink.data.attributes.twiter}
                className="text-secondary hover:text-primary"
              >
                <Twitter size={16} />
              </a>
              <a
                href={data.socialLink.data.attributes.instagram}
                className="text-secondary hover:text-primary"
              >
                <Instagram size={16} />
              </a>
              <a
                href={data.socialLink.data.attributes.linkedin}
                className="text-secondary hover:text-primary"
              >
                <Linkedin size={16} />
              </a>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
