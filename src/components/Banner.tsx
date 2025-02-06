type Props = {
  onShowPopup: () => void;
};

const Banner = ({ onShowPopup }: Props) => {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Quiz Website</h1>
        <p>
          Welcome to Quiz game! 🎉 Ready to have a blast? Let's get started and
          become a quiz champion together! 🧠✨
        </p>
        <button className="start-btn" onClick={onShowPopup}>
          Start Quiz
        </button>
      </div>
    </section>
  );
};

export default Banner;
