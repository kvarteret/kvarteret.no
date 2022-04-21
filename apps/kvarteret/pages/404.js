import { Custom404 } from "dak-components";
import fetchLayoutData from "dak-components/lib/cms/layout";

export async function getStaticProps(context) {
    const layout = await fetchLayoutData(context.locale);
  
    return {
      props: {
        layout: layout,
      },
      revalidate: 60 * 60 * 4, // Hver 4. time
    };
  }
  
export default Custom404