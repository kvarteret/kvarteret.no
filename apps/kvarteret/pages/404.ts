import { Custom404 } from "dak-components";
import fetchLayoutData from "dak-components/lib/cms/layout";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const layout = await fetchLayoutData(context.locale);

  return {
    props: {
      translations: await getTranslationsData(context.locale, [
        "go-back",
        "404-title",
        "404-subtitle",
        "404-text",
      ]),
      layout: layout,
    },
    revalidate: 60 * 60 * 4, // Hver 4. time
  };
};

export default Custom404;
