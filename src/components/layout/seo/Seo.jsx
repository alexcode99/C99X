import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}


// import { Helmet } from "react-helmet-async";

// const SITE_NAME = "C99X";
// const BASE_URL = "https://c99x.com";
// // const DEFAULT_IMAGE = `${BASE_URL}/images/c99x-preview.jpg`;

// export default function Seo({
//   title,
//   description,
//   path = "",
// //   image = DEFAULT_IMAGE,
//   noIndex = false,
// }) {
//   const pageUrl = `${BASE_URL}${path}`;
//   const metaTitle = title
//     ? `${title} | ${SITE_NAME}`
//     : SITE_NAME;

//   return (
//     <Helmet>
//       {/* Browser and search engines */}
//       <title>{metaTitle}</title>
//       <meta name="description" content={description} />
//       <link rel="canonical" href={pageUrl} />

//       {/* Search-engine indexing */}
//       <meta
//         name="robots"
//         content={noIndex ? "noindex, nofollow" : "index, follow"}
//       />

//       {/* Facebook, LinkedIn, WhatsApp */}
//       <meta property="og:type" content="website" />
//       <meta property="og:site_name" content={SITE_NAME} />
//       <meta property="og:url" content={pageUrl} />
//       <meta property="og:title" content={metaTitle} />
//       <meta property="og:description" content={description} />
//       {/* <meta property="og:image" content={image} /> */}

//       {/* X/Twitter */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={metaTitle} />
//       <meta name="twitter:description" content={description} />
//       {/* <meta name="twitter:image" content={image} /> */}
//     </Helmet>
//   );
// }