function PersonalProfile() {
  return (
    <>
      <div className="title-p"><h2>Personal Profile</h2></div>
      <p>
        I&apos;m a person who loves computer science, from a very young age I
        fell in love with computer programming I started with my first computer
        language at 12 years old, it was c# and now with Web Technologies. Also,
        I have knowledge of customer support because I have been working in the
        family business since a very young age.
      </p>
      <p>
        I also like photography and all audio visual material, so much so that
        in my free time I dedicate myself to edit, take and / or manipulate
        videos and photographs, knowing how to use Photoshop and Premiere, and
        on the other hand, I use a little Illustrator, Corel Draw, After effects
        and Audition.
      </p>

      <style jsx>{`
        p,
        h2 {
          color: var(--black);
        }
        .title-p{
          width: 100%;
        }

        h2 {
          font-size: 1.7rem;
          text-align: left;
        }

        p {
          margin-top: 1rem;
          font-size: 1rem;
          text-align: justify;
        }
      `}</style>
    </>
  );
}

export default PersonalProfile;
