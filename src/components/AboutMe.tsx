import PersonalProfile from "./_PersonalProfile";
import Skills from "./_Skills";

function AboutMe() {
  return (
    <section className="about-me" id="about">
      <div className="about-me__container">
        <div className="about-me__container--start" id="personal-profile">
          <PersonalProfile />
        </div>
        <div className="about-me__container--end" id="skills">
          <Skills />
        </div>
      </div>

    </section>
  );
}

export default AboutMe;
