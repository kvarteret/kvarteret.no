import getDirectusClient, {
  type Translation,
  type Locale,
} from "./get-directus-client";

export default async function queryGeneralInformation(lang: Locale) {
  const directus = getDirectusClient();
  return directus.query(
    `
  query GeneralInformation($lang: String) {
    general_information {
      id
      left_navigation {
        id
      }
      right_navigation {
        id
      }
      hoved_logo {
        id
        __typename
        type
      }
      scripts
      logo {
        id
        __typename
        type
      }
      social_media {
        url
        icon {
          id
          __typename
          type
        }
      }
    }
    navigation {
      id
      is_button
      navigation_item {
        translations(
          filter: { languages_code: { url_code: { _eq: $lang } } }
        ) {
          name
        }
        type
        url
        page_2 {
          slug
        }
      }
      muti_menu_dropdown {
        navigation_items {
          translations(
            filter: { languages_code: { url_code: { _eq: $lang } } }
          ) {
            name
          }
          type
          url
          page_2 {
            slug
          }
        }
        translations(
          filter: { languages_code: { url_code: { _eq: $lang } } }
        ) {
          title
        }
      }
    }
  }
`,
    {
      lang,
    },
  );
}

export async function queryCarouselItems(lang: Locale) {
  const data = await getDirectusClient().query<Carousel>(
    `
  query queryCarouselItems($lang: String) {
    main_carousel {
      id
      header {
        id
        __typename
        type
      }
      navigation {
        id
        type
        page_2 {
          slug
        }
        url
      }
      translations(
        filter: { languages_code: { url_code: { _eq: $lang } } }
      ) {
        id
        title
        description
      }
    }
  }
`,
    {
      lang,
    },
  );

  return data.main_carousel;
}

export async function queryTodayText() {
  const data = await getDirectusClient().query(`
  query QueryTodayText {
    general_information {
      id
      today_at_kvarteret
    }
  }
`);
  return data.general_information?.today_at_kvarteret ?? "";
}

export async function queryOpeningHours() {
  const data = await getDirectusClient().query<OpeningHours>(`
  query QueryOpeningHours {
    opening_time {
      id
      day
      opening_time_day {
        id
        is_open
        opening_time
        closing_time
        room {
          name
        }
      }
    }
  }
`);

  data.opening_time.forEach((x) =>
    x.opening_time_day?.forEach((y) => {
      y.opening_time = y.opening_time?.slice(0, -2);
      y.closing_time = y.closing_time?.slice(0, -2);
    }),
  );

  return data.opening_time;
}

export interface OpeningHours {
  opening_time: OpeningTime[];
}

export interface OpeningTime {
  id: string;
  day: string;
  opening_time_day: OpeningTimeDay[];
}

export interface OpeningTimeDay {
  id: string;
  is_open: boolean;
  opening_time: string;
  closing_time: string;
  room: {
    name: string;
  };
}

export interface Carousel {
  main_carousel: CarouselItem[];
}

export interface CarouselItem {
  id: string;
  header: {
    id: string;
    __typename: "directus_files" | string;
    type: "image/jpeg" | string;
  };
  navigation: {
    id: string;
    type: "page" | string;
    page_2: {
      slug: string;
    };
    url: string;
  };
  translations: Translation[];
}
