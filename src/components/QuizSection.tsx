import { Refs } from "../App.tsx";
import { questions } from "../questions.ts";
import { toggleClass } from "../helpers/toggle-class";

type QuizSectionRefs = Pick<
  Refs,
  "questionText" | "quizBox" | "questionTotal" | "optionList" | "nextButton"
>;

type Props = {
  refs: QuizSectionRefs;
  questionCount: number;
  userScoreCount: number;
  progressValueCount: number;
  setUserScoreCount: React.Dispatch<React.SetStateAction<number>>;
  onNext: () => void;
};

const QuizSection = ({
  refs,
  questionCount,
  setUserScoreCount,
  userScoreCount,
  onNext,
}: Props) => {
  const onOptionSelected = (selectedOption: HTMLDivElement) => {
    const { optionList, nextButton } = refs;
    if (!optionList.current || !nextButton.current) return;

    const userAnswer = selectedOption.textContent;
    const correctAnswer = questions[questionCount].answer;
    const options = Array.from(optionList.current.children) as HTMLDivElement[];

    const markCorrectAnswer = () => {
      const correctOption = options.find(
        (option) => option.textContent === correctAnswer
      );
      correctOption?.classList.add("correct");
    };

    if (userAnswer === correctAnswer) {
      selectedOption.classList.add("correct");
      setUserScoreCount((prev) => prev + 1);
    } else {
      selectedOption.classList.add("incorrect");
      markCorrectAnswer();
    }

    options.forEach((option) => option.classList.add("disabled"));
    toggleClass(nextButton, "active");
  };

  return (
    <div ref={refs.quizBox} className="quiz-box">
      <h1>Codehal Quiz</h1>
      <div className="quiz-header">
        <span>Quiz website tutorials</span>
        <span className="header-score">
          Score: {`${userScoreCount} / ${questions.length}`}
        </span>
      </div>
      <h2 ref={refs.questionText} className="question-text">
        {`${questions[questionCount].numb}. ${questions[questionCount].question}`}
      </h2>
      <div ref={refs.optionList} className="option-list">
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
        <span ref={refs.questionTotal} className="question-total">
          {`${questionCount + 1} of ${questions.length} Questins`}
        </span>
        <button ref={refs.nextButton} onClick={onNext} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizSection;
