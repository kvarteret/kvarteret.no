import { BlurImage, Link } from "dak-components";

const EventCard = ({ event }) => {
    // Ugly, i don't like this, TODO: Fix
    const hasLink = event?.url;
    const LinkWrapper = hasLink ? Link : ({ children }) => <>{children}</>;
    const startDate = new Date(event.startDate)
    const url = `${event?.url ?? "/"}${ event.recurring ? `?startDate=${startDate.toISOString().substring(0, 10)}` : ""}`
    return (
      <LinkWrapper href={url}>
        <a className={"container" + (hasLink ? " link" : "")}>
            <div className="image">
              <BlurImage
                className="event-image"
                fadeIn
                objectFit="cover"
                layout="fill"
                image={event.image}
              />
            </div>
            <div className="content">
              <div className="tags">{event.tags.join(" | ")}</div>
              <h1 className="title">{event.title}</h1>
              <div className="description">{event.description}</div>
            </div>
    
            <style jsx global>
              {`
                .event-image {
                  border-radius: 5px;
                  transition: 200ms;
                }
    
                .link:hover .event-image {
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                  transform: scale(1.02);
                }
              `}
            </style>
            <style jsx>
              {`
                .container {
                  width: 100%;
                  transition: 100ms;
                  padding: 0px;
                  margin: 10px;
                  border-radius: 5px;
                  cursor: unset;
                }

                a {
                  display: block;
                  color: inherit;
                }
                .link {
                  cursor: pointer;
                  transition: 200ms;
                }
                .link:hover {
                  box-shadow: 0px 0px 32px 0px #d1d1d1;
                }
    
                .image {
                  height: 223px;
                  width: 100%;
                  position: relative;
                  margin-bottom: 5px;
                }
    
                .content {
                  margin: 7px;
                }
                .tags {
                  font-size: 12px;
                  font-weight: 300;
                  text-transform: uppercase;
                }
    
                .title {
                  margin-top: 3px;
                  font-size: max(16px, calc(26px - ${(event?.title?.length || 1) / 5}px));
                  margin-bottom: 1px;
                }
    
                .description {
                  font-size: 14px;
                  font-weight: 300;
                }
    
                @media only screen and (min-width: 768px) {
                  .container {
                    width: calc(50% - 20px);
                  }
                }
    
                @media only screen and (min-width: 992px) {
                  .container {
                    width: calc(50% - 20px);
                  }
                }
              `}
            </style>
        </a>
      </LinkWrapper>
    );
  };

  export {EventCard};