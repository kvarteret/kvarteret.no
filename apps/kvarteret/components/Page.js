import CardSection from "./CardSection";
import GallerySection from "./GallerySection";
import SnippetSection from "./SnippetSection";
import TextSection from "./TextSection";

const SplitSection = ({ left, right }) => {
  return (
    <div className="container">
      <div className="left">
        <LookupList items={left} />
      </div>
      <div className="right">
        <LookupList items={right} />
      </div>
      <style jsx>
        {`
          .left,
          .right {
            margin-bottom: 40px;
          }
          @media only screen and (min-width: 992px) {
            .container {
              width: 100%;
              display: flex;
              flex-direction: row;
            }

            .left,
            .right {
              width: 50%;
            }
            .left {
              padding-right: 20px;
            }
            .right {
              padding-left: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

const ComponentLookup = ({ type, data }) => {
  switch (type) {
    case "text_section":
      return <TextSection {...data} />;
    case "gallery_section":
      return <GallerySection {...data} />;
    case "split_section":
      return <SplitSection {...data} />;
    case "snippet_section":
      return <SnippetSection {...data} />;
    case "card_section":
      return <CardSection {...data} />;
    default:
      return <div>TODO: Missing section types</div>;
  }
};

const LookupList = ({ items }) => {
  return items?.map((x, i) => (
    <div key={i} className={x.collection}>
      <ComponentLookup type={x.collection} data={x.item} />
    </div>
  ));
};

const Page = ({ data }) => (
  <div className="container">
    <LookupList items={data?.sections} />
    <style jsx>
      {`
        .container {
          max-width: 1080px;
          margin: auto;
          padding: 0 40px;
          margin-top: 100px;
        }
      `}
    </style>
  </div>
);

export default Page;
