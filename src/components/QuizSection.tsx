import { questions } from "../questions.ts";

type Props = {
  quizSectionRef: React.RefObject<HTMLElement>;
  questionTotalRef: React.RefObject<HTMLElement>;
  quizBoxRef: React.RefObject<HTMLDivElement>;
  questionTextRef: React.RefObject<HTMLDivElement>;
  optionListRef: React.RefObject<HTMLDivElement>;
  resultBoxRef: React.RefObject<HTMLDivElement>;
  circularProgressRef: React.RefObject<HTMLDivElement>;
  questionCount: number;
  userScoreCount: number;
  progressValueCount: number;
  setUserScoreCount: React.Dispatch<React.SetStateAction<number>>;
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  onNext: () => void;
  onTryAgain: () => void;
  onClear: () => void;
};

const QuizSection = ({
  questionTextRef,
  quizBoxRef,
  quizSectionRef,
  questionCount,
  questionTotalRef,
  optionListRef,
  setUserScoreCount: setUseScoreCount,
  userScoreCount: useScoreCount,
  nextButtonRef,
  resultBoxRef,
  progressValueCount,
  circularProgressRef,
  onNext,
  onTryAgain,
  onClear,
}: Props) => {
  const onOptionSelected = (e: HTMLDivElement) => {
    if (!optionListRef.current || !nextButtonRef.current) return;

    const userAnswer = e.textContent;
    const allOptions = optionListRef.current.children.length;

    const correctAnswer = questions[questionCount].answer;

    if (userAnswer === correctAnswer) {
      e.classList.add("correct");
      setUseScoreCount(useScoreCount + 1);
    } else {
      e.classList.add("incorrect");

      for (let i = 0; i < allOptions; i++) {
        if (optionListRef.current.children[i].textContent === correctAnswer) {
          optionListRef.current.children[i].setAttribute(
            "class",
            "option correct"
          );
        }
      }
    }

    if (allOptions) {
      for (let i = 0; i < allOptions; i++) {
        optionListRef.current.children[i].classList.add("disabled");
      }
    }

    nextButtonRef.current.classList.add("active");
  };

  return (
    <section ref={quizSectionRef} className="quiz-section">
      <div ref={quizBoxRef} className="quiz-box">
        <h1>Codehal Quiz</h1>
        <div className="quiz-header">
          <span>Quiz website tutorials</span>
          <span className="header-score">
            Score: {`${useScoreCount} / ${questions.length}`}
          </span>
        </div>
        <h2 ref={questionTextRef} className="question-text">
          {`${questions[questionCount].numb}. ${questions[questionCount].question}`}
        </h2>
        <div ref={optionListRef} className="option-list">
          {questions[questionCount].options.map((option, index) => (
            <div
              className="option"
              key={index}
              onClick={(e) => onOptionSelected(e.target as HTMLDivElement)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="quiz-footer">
          <span ref={questionTotalRef} className="question-total">
            {`${questionCount + 1} of ${questions.length} Questins`}
          </span>
          <button ref={nextButtonRef} onClick={onNext} className="next-btn">
            Next
          </button>
        </div>
      </div>

      <div ref={resultBoxRef} className="result-box">
        <h2>Quiz Result!</h2>
        <div className="percentage-container">
          <div ref={circularProgressRef} className="circular-progress">
            <span className="progress-value">{`${progressValueCount} %`}</span>
          </div>

          <span className="score-text">
            {`Your score ${useScoreCount} out of ${questions.length}`}
          </span>
        </div>

        <div className="buttons">
          <button className="tryAgain-btn" onClick={onTryAgain}>
            Try Agagin
          </button>
          <button className="goHome-btn" onClick={onClear}>
            Go to home
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
