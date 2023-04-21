import React, { useState, useEffect } from 'react';

function CardDisplay() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('/surveys')
      .then(res => res.json())
      .then(data => setSurveys(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="survey-cards">
      {surveys.map(survey => (
        <div key={survey._id} className="card">
          <div className="card-header">{survey.title}</div>
          <div className="card-body">{survey.description}</div>
        </div>
      ))}
    </div>
  );
}

export default CardDisplay;