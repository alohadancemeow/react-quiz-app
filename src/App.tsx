import { useRef, useState, useCallback, RefObject } from "react";
import { questions } from "./questions";
import { toggleClass } from "./helpers/toggle-class";
import QuizSection from "./components/QuizSection";
import Popup from "./components/Popup";
import Banner from "./components/Banner";
import ResultBox from "./components/ResultBox";

export interface Refs {
  popupInfo: RefObject<HTMLDivElement>;
  main: RefObject<HTMLElement>;
  quizSection: RefObject<HTMLElement>;
  quizBox: RefObject<HTMLDivElement>;
  questionText: RefObject<HTMLDivElement>;
  questionTotal: RefObject<HTMLElement>;
  optionList: RefObject<HTMLDivElement>;
  resultBox: RefObject<HTMLDivElement>;
  circularProgress: RefObject<HTMLDivElement>;
  nextButton: RefObject<HTMLButtonElement>;
}

function App() {
  const refs: Refs = {
    popupInfo: useRef<HTMLDivElement>(null),
    main: useRef<HTMLElement>(null),
    quizSection: useRef<HTMLElement>(null),
    quizBox: useRef<HTMLDivElement>(null),
    questionText: useRef<HTMLDivElement>(null),
    questionTotal: useRef<HTMLElement>(null),
    optionList: useRef<HTMLDivElement>(null),
    resultBox: useRef<HTMLDivElement>(null),
    circularProgress: useRef<HTMLDivElement>(null),
    nextButton: useRef<HTMLButtonElement>(null),
  };

  const [questionCount, setQuestionCount] = useState<number>(0);
  const [userScoreCount, setUserScoreCount] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(0);

  const onShowPopup = () => {
    [refs.popupInfo, refs.main].forEach((ref) => toggleClass(ref, "active"));
  };

  const onExitPopup = () => {
    [refs.popupInfo, refs.main].forEach((ref) =>
      toggleClass(ref, "active", "remove")
    );
  };

  const onContinue = () => {
    [refs.quizSection, refs.quizBox].forEach((ref) =>
      toggleClass(ref, "active")
    );
    [refs.popupInfo, refs.main].forEach((ref) =>
      toggleClass(ref, "active", "remove")
    );
  };

  const onNext = () => {
    if (questionCount < questions.length - 1) {
      setQuestionCount((prev) => prev + 1);
    } else {
      [refs.quizBox, refs.nextButton].forEach((ref) =>
        toggleClass(ref, "active", "remove")
      );
      toggleClass(refs.resultBox, "active");
      updateProgress();
    }

    toggleClass(refs.nextButton, "active", "remove");
    Array.from(refs.optionList.current?.children || []).forEach((item) =>
      item.classList.remove("correct", "incorrect", "disabled")
    );
  };

  const updateProgress = useCallback(() => {
    let progress = 0;
    const target = (userScoreCount / questions.length) * 100;

    const interval = setInterval(() => {
      progress++;
      setProgressValue(progress);

      if (refs.circularProgress.current) {
        refs.circularProgress.current.style.background = `conic-gradient(#c40094, ${
          progress * 3.6
        }deg, rgba(255, 255, 255, 0.1) 0deg)`;
      }
      if (progress >= target) clearInterval(interval);
    }, 20);
  }, [userScoreCount, refs.circularProgress]);

  const resetQuiz = () => {
    setQuestionCount(0);
    setUserScoreCount(0);
    toggleClass(refs.quizBox, "active");
    toggleClass(refs.resultBox, "active", "remove");
  };

  const clearQuiz = () => {
    setQuestionCount(0);
    setUserScoreCount(0);
    [refs.quizSection, refs.resultBox].forEach((ref) =>
      toggleClass(ref, "active", "remove")
    );
  };

  return (
    <>
      <main ref={refs.main} className="main">
        <div className="container">
          <section ref={refs.quizSection} className="quiz-section">
            <QuizSection
              refs={{
                questionText: refs.questionText,
                quizBox: refs.quizBox,
                questionTotal: refs.questionTotal,
                optionList: refs.optionList,
                nextButton: refs.nextButton,
              }}
              questionCount={questionCount}
              userScoreCount={userScoreCount}
              progressValueCount={progressValue}
              setUserScoreCount={setUserScoreCount}
              onNext={onNext}
            />
            <ResultBox
              refs={{
                resultBox: refs.resultBox,
                circularProgress: refs.circularProgress,
              }}
              onTryAgain={resetQuiz}
              onClear={clearQuiz}
              progressValueCount={progressValue}
              userScoreCount={userScoreCount}
            />
          </section>
          <Banner onShowPopup={onShowPopup} />
        </div>
      </main>

      <Popup
        popupInfoRef={refs.popupInfo}
        onContinue={onContinue}
        onExitPopup={onExitPopup}
      />
    </>
  );
}

export default App;
