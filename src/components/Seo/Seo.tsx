import * as React from "react";
import { Helmet } from "react-helmet";
import packageJson from "../../../package.json";

function Seo() {
  const title = "Random AR";
  const { description, homepage: url } = packageJson;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

export default Seo;
