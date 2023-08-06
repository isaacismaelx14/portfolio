import Icons from "./Icons/_index";
import data from "../data/me.json";
import { useEffect } from "react";

function Technologies() {
  useEffect(() => { }, []);
  return (
    <section className="tech" id="technologies">
      <div className="tech__container">
        <h2>Technologies</h2>
        <div className="icons">
          {data.technologies.map((tech, index) => (
            <div className="icon" key={index}>
              <span className="icon__text">
                {tech.title ? tech.title : tech.name}
              </span>
              <span className="icon__content">
                <GetIcon name={tech.name} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GetIcon = ({ name }: { name: string }) => {
  const Icon = (Icons as any)[name];
  if (!Icon) return <div style={{ fontSize: "20px" }}>{name}</div>;
  return <Icon title={name} />;
};

export default Technologies;
