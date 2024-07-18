import Banner from "../layout/Banner";
import FAQ from "./FAQ";
import HomeCategory from "./HomeCategory";
import Partner from "./Partner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeCategory></HomeCategory>
      <Partner></Partner>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
