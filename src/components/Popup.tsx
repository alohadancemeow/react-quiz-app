import React from "react";

type Props = {
  popupInfoRef: React.RefObject<HTMLDivElement>;
  onExitPopup: () => void;
  onContinue: () => void;
};

const Popup = ({ popupInfoRef, onContinue, onExitPopup }: Props) => {
  return (
    <div ref={popupInfoRef} className="popup-info">
      <h2>Quiz Guide</h2>
      <span className="info">
        1. Play Fair: No cheating or using outside help.
      </span>
      <span className="info">
        2. Stay Honest: Answer questions to the best of your knowledge.
      </span>
      <span className="info">
        3. Enjoy the Game: Have fun and make the most out of the experience.
      </span>

      <div className="btn-group">
        <button className="info-btn exit-btn" onClick={onExitPopup}>
          Exit Quiz
        </button>
        <a href="#" className="info-btn continue-btn" onClick={onContinue}>
          Continue
        </a>
      </div>
    </div>
  );
};

export default Popup;
