import React, {useReducer} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import Countdown from 'react-countdown';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SCORE,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';

function Quiz(props) {
    const questions = props.questions;
    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: '',
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, error} = state;

    const question = questions[currentQuestion];
    // question being defined and shown to user will be the currentQuestion index from the questions array passed to quiz component by app

    const renderError = () => {
        if (!error) {
            return;
        }
        return <div className="error">{error}</div>;
    };
    //
    // const setScore = () => {
    //     return answers.map(answer => {
    //         const question = questions.find(
    //             question => question.id === answer.questionId
    //         );
    //         if (question.correct_answer === answer.answer) {
    //           dispatch({
    //               type: SET_SCORE,
    //               score: score + 1,
    //           });
    //
    //
    //       }});
    //     };
    const renderResultMark = (question, answer) => {
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>;
        }
        return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );
            return (
                <div key={question.id} style={{
              fontWeight:`200`,
              background: `white`,
               padding:`1em`,
               margin:`1em`

                }}>
                    {question.id}. {question.detail} - {renderResultMark(question, answer)}
                </div>
            );

        });
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: 'x'});
        return(
           <span>:{seconds}{next()}</span>

         );
      } else {
        // Render a countdown
        return <span style={{
       fontWeight: `bold`,
       // boxShadow: `20px 20px 60px #d9d500, -20px -20px 60px #ffff00`,
       // border: `solid 20px`,
       borderRadius: `100%`,
       // background: `#2196F3`,
       color: `#4f4c4c`,
       // padding: `1em`,
       textShadow: `2px -1px 3px black`
     }}>Time Left: {seconds}s</span>;
      }
    };

    const restart = () => {
        dispatch({type: RESET_QUIZ});

    };

    const next = () => {
        const answer = {questionId: question.id, answer: currentAnswer};

        if (!currentAnswer) {
            dispatch({type: SET_ERROR, error: 'Please select an option'});
            return;
        }

        answers.push(answer);
        dispatch({type: SET_ANSWERS, answers});
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});
        // currentAnswer and question.id pushed to answers array as an answer object. line ends.
        // dispatch SET_ANSWERS with answers object payload.  line ends.
        // dispatch SET_CURRENT_ANSWER to currentAnswer. line ends.

        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            return;
        }

        dispatch({type: SET_SHOW_RESULTS, showResults: true});
    };

    if (showResults) {

        return (
            <div className="container results" style={{margin:`0`}}>
                <h1>Lyr<span style={{color:`ivory`, textShadow: `black 2px -1px 3px`}}>IQ</span></h1>
                <h2>Results</h2>
                <ul style={{
                  borderRadius: `50px`,
                  background: `#fffb00`,
                  boxShadow:  `20px 20px 60px #d9d500,
                               -20px -20px 60px #ffff00`,
             padding:`1em`,
             margin:`1em`
                }}>{renderResultsData()}</ul>
                <button className="btn btn-primary" onClick={() => {props.onClick(); restart(); }}>
                    Restart
                </button>
            </div>
        );
    } else {
        return (
            <QuizContext.Provider value={{state, dispatch}}>
                <div className="container">
                    <Progress
                        total={questions.length}
                        current={currentQuestion + 1}
                    />
                     <Countdown date={Date.now() + 30000}
                     renderer={renderer}
                     key={currentQuestion}
                     />
                    <Question />
                    {renderError()}
                    <Answers />
                    <button className="btn btn-primary" onClick={next}>
                        Submit Answer
                    </button>
                </div>
            </QuizContext.Provider>
        );
    }
}

export default Quiz;
