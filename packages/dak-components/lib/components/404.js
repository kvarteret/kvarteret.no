const Custom404 = () => {
    return (
      <div className="container">
        <div className="image"></div>
        <div className="content">
          <div className="right">
            <h1>404</h1>
            <p>
              <b>Pingvinen gikk seg vill mens han lette etter siden din og fant den ikke.</b>
            </p>
            <p>
            Klikk på knappen under for å hjelpe ham finne veien tilbake til hovedsiden
            </p>
            <a href="/">Gå tilbake</a>
          </div>
        </div>
        <style jsx>
          {`
            .container {
            }
  
            .image {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background-image: url("/static/404.webp");
              background-size: cover;
              background-position: center;
              background-color: #f54b4b; /* Tint color */
              background-blend-mode: multiply;
  
            }
  
            .content {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              backdrop-filter: blur(2px);
              display: flex;
              justify-content: center;
              align-items: center;
  
            }
  
            .right {
              width: 80vw;
              max-width: 600px;
              text-align: center;
            }
  
            h1 {
              color: white;
              font-size: 4rem;
              margin: 0;
            }
  
            p {
              color: white;
              font-size: 1rem;
            }
  
            a {
              display: block;
              margin: 20px 0;
              padding: 20px;
              font-size: 2.5rem;
              background-color: white;
              color: #f54b4b;
              text-decoration: none;
            }
  
            a:hover {
              opacity: 0.9;
            }
            
            @media only screen and (min-width: 800px) {
              .right {
              }
              b {
                font-size: 1.5rem;
  
              }
              p{
                font-size: 1rem;
              }
            }
          `}
        </style>
      </div>
    );
  }
  

export {Custom404}