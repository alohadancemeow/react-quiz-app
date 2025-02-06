import { Refs } from "../App";
import { questions } from "../questions";

type ResultBoxRefs = Pick<Refs, "circularProgress" | "resultBox">;

type Props = {
  refs: ResultBoxRefs;
  progressValueCount: number;
  userScoreCount: number;
  onTryAgain: () => void;
  onClear: () => void;
};

const ResultBox = ({
  refs,
  onClear,
  onTryAgain,
  progressValueCount,
  userScoreCount,
}: Props) => {
  return (
    <div ref={refs.resultBox} className="result-box">
      <h2>Quiz Result!</h2>
      <div className="percentage-container">
        <div ref={refs.circularProgress} className="circular-progress">
          <span className="progress-value">{`${progressValueCount} %`}</span>
        </div>

        <span className="score-text">
          {`Your score ${userScoreCount} out of ${questions.length}`}
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
  );
};

export default ResultBox;
