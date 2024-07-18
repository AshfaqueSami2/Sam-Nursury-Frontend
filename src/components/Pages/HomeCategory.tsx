import { Link } from "react-router-dom";
import topCategories from "../../assets/img/top categories.svg";
import { useGetCategoriesQuery } from "../../redux/api/api";
import { Card, CardBody, CardImage, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const HomeCategory = () => {
  const { data, isError, isLoading } = useGetCategoriesQuery(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  const categories = data?.data;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-end">
          <img
            className="w-1/2 h-20 mb-4"
            src={topCategories}
            alt="Top Categories"
          />
          <h1 className="custom-font text-5xl mt-10">Top Categories</h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center mt-20 justify-center min-h-screen gap-6">
        {categories.map((category: any) => (
          <Card
            key={category.id}
            className="w-72 h-96 rounded-lg shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden">
              <CardImage
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardBody className="flex flex-col flex-grow p-4">
              <CardTitle  className="font-bold custom-font text-xl mb-2 text-center text-gray-900">
                {category.name}
              </CardTitle>
              <p className="text-gray-700 text-base text-center flex-grow">
                {category.description}
              </p>
              <div className="flex justify-center mt-4">
                <Link to={`/category/${category.name}`}>
                  <Button
                    style={{ width: "200px" }}
                    className="bg-[#DCDCDC] hover:bg-[#e0e0e0] text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                  >
                    See All
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
