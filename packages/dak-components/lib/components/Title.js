
const Title = ({children, underlined, big, color, underlineColor}) => <div className="title-container">
<div className={"title" + (big ? " big" : "")}>{children}</div>
{underlined &&
  <div className="underline"></div>
}

<style jsx>
  {`
  .title {
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 8px;
    font-weight: 500;
    color: ${color ?? "var(--primary-color)"};
  }

  .big {
      font-size: 2rem;
  }

  @media(max-width: 768px) {
    .title {
        font-size: 1.2rem;
    }
    .big {
        font-size: 1.5rem;
    }
  }

  .underline {
    border-bottom: 2px solid ${underlineColor ?? color ?? "var(--primary-color)"};
  }
  
  `}
</style>
</div>

export default Title;