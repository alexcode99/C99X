import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../../components/layout/seo/Seo";
import ServicesData from "./data/ServicesData";

import Hero from "./hero/Hero";
import Comprehensive from "./comprehensive/Comprehensive";
import Ladder from "./ladder/ladder";
import RoundBall from "./round-ball/RoundBall";
import Scooty from "./scooty/Scooty";
import Waveball from "./wave-ball/WaveBall";
import Clock from "./clock/Clock";
import Steps from "./step-animation/Steps";
import ExpertServices from "./expertservices/ExpertServices";
import Processing from "./processing/Processing";
import Platform from "./platforms/Platforms";
import TrustedBusiness from "./trustedbusiness/TrustedBusiness";
import PaidServices from "./paidservices/PaidServices";
import FAQ from "./faq/Faq";
import Cta from "../../components/layout/cta/Cta";


export default function Services() {
  const { slug } = useParams();

  const service = slug
    ? ServicesData.find((item) => item.slug === slug)
    : ServicesData[0]; // default homepage

  if (!service) return <h1>Service not found</h1>;

  // 🔥 Slug → Animation Mapping
  const animationMap = {
    "digital-marketing": <Clock />,
    "web-development": <Ladder />,
    "e-commerce": <Scooty />,
    "design-video-editing": <Waveball />,
    "ui-ux-designing": <RoundBall />,
    "web-application": <Steps />,
  };

  return (
    <>
      <Seo
        title={service.meta_title}
        description={service.meta_description}
      />
       {/* <Helmet>
        <title>{service.meta_title}</title>

        <meta
          name="description"
          content={service.meta_description}
        />

        <meta
          property="og:title"
          content={service.meta_title}
        />

        <meta
          property="og:description"
          content={service.meta_description}
        />

        <meta
          name="twitter:title"
          content={service.meta_title}
        />

        <meta
          name="twitter:description"
          content={service.meta_description}
        />
      </Helmet> */}

      <Hero data={service} />
      {animationMap[service.slug]}
      <Comprehensive data={service} />
      <ExpertServices data={service} />
      <Processing data={service} />
      <Platform data={service} />
      <TrustedBusiness data={service} />
      <PaidServices data={service} />
      <FAQ data={service} />
      <Cta />
    </>
  );
}
