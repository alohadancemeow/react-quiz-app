import { useRef, useEffect, useState } from "react";
import QuizSection from "./components/QuizSection.tsx";
import Navbar from "./components/Navbar.tsx";
import { questions } from "./questions.ts";

function App() {
  const popupInfoRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const quizSectionRef = useRef<HTMLElement>(null);
  const quizBoxRef = useRef<HTMLDivElement>(null);
  const questionTextRef = useRef<HTMLDivElement>(null);
  const questionTotalRef = useRef<HTMLElement>(null);
  const optionListRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [questionCount, setQuestionCount] = useState(0);
  const [useScoreCount, setUseScoreCount] = useState(0);

  const onShowPopup = () => {
    if (!popupInfoRef.current || !mainRef.current) return;

    popupInfoRef.current.classList.add("active");
    mainRef.current.classList.add("active");
  };

  const onExitPopup = () => {
    if (!popupInfoRef.current || !mainRef.current) return;

    popupInfoRef.current.classList.remove("active");
    mainRef.current.classList.remove("active");
  };

  const onContinue = () => {
    if (
      !popupInfoRef.current ||
      !mainRef.current ||
      !quizSectionRef.current ||
      !quizBoxRef.current
    )
      return;

    quizSectionRef.current.classList.add("active");
    popupInfoRef.current.classList.remove("active");
    mainRef.current.classList.remove("active");
    quizBoxRef.current.classList.add("active");
  };

  const onNext = () => {
    if (!optionListRef.current || !nextButtonRef.current) return;

    if (questionCount < questions.length - 1) {
      setQuestionCount(questionCount + 1);
    } else {
      console.log("Question completed!");
    }

    Array.from(optionListRef.current.children).forEach((item) =>
      item.classList.remove("correct", "incorrect", "disabled")
    );
    nextButtonRef.current.classList.remove("active");
  };

  useEffect(() => {
    if (!popupInfoRef.current || !mainRef.current) {
      console.error("popupInfo or main element not found in the DOM");
      return;
    }
  }, []);

  return (
    <>
      <main ref={mainRef} className="main">
        <Navbar />

        <div className="container">
          <QuizSection
            questionTextRef={questionTextRef}
            quizBoxRef={quizBoxRef}
            quizSectionRef={quizSectionRef}
            questionCount={questionCount}
            questionTotalRef={questionTotalRef}
            optionListRef={optionListRef}
            useScoreCount={useScoreCount}
            setUseScoreCount={setUseScoreCount}
            nextButtonRef={nextButtonRef}
            onNext={onNext}
          />

          <section className="home">
            <div className="home-content">
              <h1>Quiz Website</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis nobis sed recusandae dolorum minus sint.
              </p>
              <button className="start-btn" onClick={onShowPopup}>
                Start Quiz
              </button>
            </div>
          </section>
        </div>
      </main>

      <div ref={popupInfoRef} className="popup-info">
        <h2>Quiz Guide</h2>
        <span className="info">1. Lorem ipsum dolor sit amet.</span>
        <span className="info">2. Lorem ipsum dolor sit amet.</span>
        <span className="info">3. Lorem ipsum dolor sit amet.</span>
        <span className="info">4. Lorem ipsum dolor sit amet.</span>
        <span className="info">5. Lorem ipsum dolor sit amet.</span>

        <div className="btn-group">
          <button className="info-btn exit-btn" onClick={onExitPopup}>
            Exit Quiz
          </button>
          <a href="#" className="info-btn continue-btn" onClick={onContinue}>
            Continue
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
