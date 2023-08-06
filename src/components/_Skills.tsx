import Me from "../data/me.json";
function Skills() {
  return (
    <>
      <h2>Skills</h2>
      <ul>
        {Me.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </>
  );
}

export default Skills;
