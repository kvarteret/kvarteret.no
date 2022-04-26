import { Link } from "dak-components";

const CallToActionSection = ({ text, url, size, fontSize }) => {
  return (
    <div className="container">
      <Link href={url} >
        <a className="button">{text}</a>
      </Link>
    <style jsx global>
        {`
            .call_to_action_section {
                height: 100%;
            }
        
        `}
    </style>
      <style jsx>
        {`
          .container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button {
            width: 100%;
            height: ${size || "80px"};
            display: flex;
            border: 4px solid var(--primary-color);
            border-left: 2px solid var(--primary-color);
            border-right: 2px solid var(--primary-color);
            border-radius: 4px;
            justify-content: center;
            align-items: center;
            font-size: ${fontSize || "24px"};
            transition: 200ms ease-in-out;
          }

          .button:hover {
            background-color: var(--primary-color);
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default CallToActionSection;
