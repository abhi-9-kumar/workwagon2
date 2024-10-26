import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="flex flex-col py-10 bg-[#D6EAF8]">
      <div className="container mx-auto flex flex-col lg:flex-row w-full lg:h-[450px] mb-7 gap-8 px-4 lg:px-0">
        <div className="title flex flex-col justify-center flex-1">
          <h1 className="text-4xl lg:text-6xl font-bold">Work Wagon:</h1>
          <h4 className="text-2xl lg:text-4xl mt-4">
            Bridging Talent and Opportunity—Empowering Job Seekers and Employers Alike!
          </h4>
          <p className="mt-6 text-lg lg:text-xl">
            Work Wagon aims to simplify the job search process, making it easier for individuals to find suitable job opportunities and for employers to connect with qualified candidates. The platform combines advanced search features with a user-friendly design to create an efficient job search experience.
          </p>
        </div>
        <div className="image flex-1 overflow-hidden">
          <img src="/jobs.png" alt="hero" className="w-full h-auto lg:h-[80%]" />
        </div>
      </div>

      <div className="details flex flex-wrap justify-center lg:justify-between py-12 w-full max-w-[1500px] mx-auto gap-8 lg:gap-0">
        {details.map((element) => (
          <div
            key={element.id}
            className="card flex gap-5 items-center bg-[#85C1E9] w-full lg:w-[220px] p-5 hover:shadow-2xl cursor-pointer transition-shadow duration-300 border-4 border-[#21618C]"
          >
            <div className="icon text-3xl bg-[#85C1E9] flex items-center justify-center p-3 text-black">
              {element.icon}
            </div>
            <div className="content">
              <p className="font-bold text-lg lg:text-xl">{element.title}</p>
              <p className="text-gray-900 text-base mt-1">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
