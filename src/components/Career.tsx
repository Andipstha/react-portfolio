import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IT INSTRUCTOR & GRAPHIC DESIGNER</h4>
                <h5>ALFA EDUCATION</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              <li> Develop creative advertising content for various media, including catalogs, menus, business
cards, flyers, posters.</li>
<li>Conceptualize logo design, gif animations, videos, websites and social media channels to
promote product brands.</li>
<li>Used composition and color theory knowledge to design websites according to client need
and preferences. </li>
            


            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Jr. Graphic Designer</h4>
                <h5>ALTERNATIVEV TECHNOLOGY</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Designed UI/UX using Figma, creating wireframes and prototypes to streamline the product
development process.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sr. Graphic Designer</h4>
                <h5>D20:Labs</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designed UI/UX using Figma, creating wireframes and prototypes to streamline the product
development process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
