// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ person }) => {
  const title = `${person.name} - Game & Full-Stack Developer`;
  const description = person.tagline;
  const url = person.social.website;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Additional Meta */}
      <meta name="author" content={person.name} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;