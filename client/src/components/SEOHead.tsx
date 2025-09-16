import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

interface SchemaObject {
  type: "Person" | "Product" | "Article" | "Organization";
  data: any;
}

interface SEOHeadProps {
  titleKey?: string;
  descriptionKey?: string;
  image?: string;
  isHomePage?: boolean;
  schemaData?: SchemaObject[];
}

const siteUrl = "https://antypowabne.netlify.app";

export function SEOHead({
  titleKey,
  descriptionKey,
  image,
  isHomePage = false,
  schemaData,
}: SEOHeadProps) {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();

  const siteName = t("seo.siteName");
  const defaultDescription = t("seo.defaultDescription");
  const defaultImage = `${siteUrl}/witryna.png`;
  const twitterHandle = "@AdamBabinicz";

  const pageTitle = titleKey
    ? isHomePage
      ? t(titleKey)
      : `${t(titleKey)} | ${siteName}`
    : siteName;
  const pageDescription = descriptionKey
    ? t(descriptionKey)
    : defaultDescription;
  const finalImage = image || defaultImage;
  const canonicalUrl = `${siteUrl}${location}`;
  const fullImageUrl = finalImage.startsWith("http")
    ? finalImage
    : `${siteUrl}${finalImage}`;

  const getOgLocale = () => {
    const lang = i18n.language;
    if (lang === "pl") return "pl_PL";
    if (lang === "en") return "en_US";
    if (lang === "is") return "is_IS";
    return "pl_PL";
  };

  const generateSchemaJSON = () => {
    const schemas: any[] = [];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
      inLanguage: i18n.language,
    });

    if (schemaData && schemaData.length > 0) {
      schemaData.forEach((schemaItem) => {
        const { type, data } = schemaItem;
        let specificSchema: any = null;

        switch (type) {
          case "Person":
            specificSchema = {
              "@context": "https://schema.org",
              "@type": "Person",
              ...data,
            };
            break;
          case "Product":
            specificSchema = {
              "@context": "https://schema.org",
              "@type": "Product",
              ...data,
            };
            break;
          case "Article":
            specificSchema = {
              "@context": "https://schema.org",
              "@type": "Article",
              ...data,
            };
            break;
          case "Organization":
            specificSchema = {
              "@context": "https://schema.org",
              "@type": "Organization",
              ...data,
            };
            break;
        }
        if (specificSchema) schemas.push(specificSchema);
      });
    }

    return JSON.stringify(schemas, null, 2);
  };

  return (
    <Helmet
      key={i18n.language}
      htmlAttributes={{
        lang: i18n.language,
      }}
    >
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={isHomePage ? "website" : "article"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaJSON() }}
      />
    </Helmet>
  );
}
