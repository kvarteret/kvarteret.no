import { Custom404 } from "dak-components";
import fetchLayoutData from "dak-components/lib/cms/layout";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";

export async function getStaticProps(context) {
    const layout = await fetchLayoutData(context.locale);
  
    return {
      props: {
        layout: layout,
        translations: await getTranslationsData(context.locale, ["go-back", "404-title", "404-subtitle", "404-text"]),
      },
      revalidate: 1,
    };
  }
  
export default Custom404