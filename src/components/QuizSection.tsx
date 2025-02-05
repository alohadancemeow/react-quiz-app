import { questions } from "../questions.ts";

type Props = {
  quizSectionRef: React.RefObject<HTMLElement>;
  questionTotalRef: React.RefObject<HTMLElement>;
  quizBoxRef: React.RefObject<HTMLDivElement>;
  questionTextRef: React.RefObject<HTMLDivElement>;
  questionCount: number;
  onNext: () => void;
};

const QuizSection = ({
  questionTextRef,
  quizBoxRef,
  quizSectionRef,
  questionCount,
  questionTotalRef,
  onNext,
}: Props) => {
  return (
    <section ref={quizSectionRef} className="quiz-section">
      <div ref={quizBoxRef} className="quiz-box">
        <h1>Codehal Quiz</h1>
        <div className="quiz-header">
          <span>Quiz website tutorials</span>
          <span className="header-score">Score: 0/5</span>
        </div>
        <h2 ref={questionTextRef} className="question-text">
          {`${questions[questionCount].numb}. ${questions[questionCount].question}`}
        </h2>
        <div className="option-list">
          {questions[questionCount].options.map((option, index) => (
            <div className="option" key={index}>
              <span>{option}</span>
            </div>
          ))}
        </div>
        <div className="quiz-footer">
          <span ref={questionTotalRef} className="question-total">
            {`${questionCount + 1} of ${questions.length} Questins`}
          </span>
          <button onClick={onNext} className="next-btn">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
