import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid justify-center items-center sectionpadding">
      <h1 className="text-center text-3xl">😔Opps!</h1>
      <img src="/img/error.webp" alt="" />
      <Link to="/">
        <Button className="w-full">Go back </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
