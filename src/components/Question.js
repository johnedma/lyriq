import React, {useContext} from 'react';
import QuizContext from '../context/QuizContext';

function Question() {
    const {state} = useContext(QuizContext);
    const {currentQuestion, questions} = state;
    const question = questions[currentQuestion];
    return(
       <h1 className="question" style={{
      background: `white`,
      fontStyle: `italic`,
      border: `0`,
      borderRadius: `0`,
      boxShadow: `none`,
  }}>"{question.question}"</h1>
);
}
export default Question;

