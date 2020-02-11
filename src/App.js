import React, {useState, useReducer} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';
import Quiz from './Quiz.js';


const pop = [
    {id: 1,
    question: 'Fifty-fifty, love the way you split it. Hunnid racks, help me spend it, babe. Light a match, get litty, babe. That jet set, watch the sunset kinda, yeah, yeah.',
    answer_a: 'Justin Bieber',
    answer_b: '98 Degrees',
    answer_c: 'Ed Sheeran',
    answer_d: 'The Weeknd',
    correct_answer: 'a',
    detail: 'Song: Yummy by Justin Bieber',
    },
    {id: 2,
    question: 'If I knew it all then would I do it again? Would I do it again? If they knew what they said would go straight to my head. What would they say instead?',
    answer_a: 'Nsync',
    answer_b: 'Jack Black',
    answer_c: 'Lizzo',
    answer_d: 'Billie Eillish',
    correct_answer: 'd',
    detail: 'Song: Everything I Wanted by Billie Eillish',
    },
    {id: 3,
    question: 'Toast to the ones here today. Toast to the ones that we lost on the way. Cause the drinks bring back all the memories. And the memories bring back, memories bring back you.',
    answer_a: 'Backstreet Boyz',
    answer_b: 'Maroon 5',
    answer_c: 'Selena Gomez',
    answer_d: 'Bob Marley',
    correct_answer: 'b',
    detail: 'Song: Memories by Marron 5',
  },
];

const rock = [
    {id: 1,
    question: 'Had to have high, high hopes for a living. Shooting for the stars when I couldnt make a killing. Didnt have a dime but I always had a vision. Always had high, high hopes.',
    answer_a: 'Kid Rock',
    answer_b: 'Panic At The Disco',
    answer_c: 'Ozzy Ozborne',
    answer_d: 'Pink Floyd',
    correct_answer: 'b',
    detail: 'Song: High Hopes by Panic At The Disco',
  },
    {id: 2,
    question: 'Weve got to hold on to what weve got. It doesnt make a difference if we make it or not. Weve got each other and thats a lot for love. Well give it a shot.',
    answer_a: 'Metallica',
    answer_b: 'Bon Jovi',
    answer_c: 'Foo Fighters',
    answer_d: 'Red Hot Chilli Peppers',
    correct_answer: 'b',
    detail: 'Song: Livin On A Prayer by Bon Jovi',
  },
    {id: 3,
    question: 'Hypocritical, egotistical - dont wanna be the parenthetical, hypothetical. Working onto something that Im proud of, out of the box. An epoxy to the world and the vision weve lost.',
    answer_a: 'Imagine Dragons',
    answer_b: 'Guns N Roses',
    answer_c: 'Queen',
    answer_d: 'Twenty One Pilots',
    correct_answer: 'a',
    detail: 'Song: Whatever It Takes by Imagine Dragons'
  },
];
const rap = [
    {id: 1,
    question: 'Race against your doubt, a lot of yall aint runnin fast enough. I can spot a fake before we even finish dappin up. Clappin when they win, but when I win, they never clap it up.',
    answer_a: 'Drake',
    answer_b: 'Russ',
    answer_c: 'Lil Duval',
    answer_d: 'Lil Wayne',
    correct_answer: 'b',
    detail:' Song: Guess What by Russ',
    },
    {id: 2,
    question: 'Pullin out the coupe out the lot. Told em Fuck 12, fuck SWAT. Bustin out the bells out the box. I just hit a lick with the box.',
    answer_a: 'Mike Jones',
    answer_b: 'Lil Blurry',
    answer_c: 'Roddy Ricch',
    answer_d: 'Vanilla Ice',
    correct_answer: 'c',
    detail: 'Song: Box by Roddy Ricch',
    },
    {id: 3,
    question: 'Maybe you dont understand what Im going through. Its only me, what you got to lose? Make up your mind, tell me, what are you gonna do? Its only me, let it go.',
    answer_a: '50 Cent',
    answer_b: 'Ja Rule',
    answer_c: 'Post Malone',
    answer_d: '2pac',
    correct_answer: 'c',
    detail: 'Song: Circles by Post Malone',
  },
];
const country = [
    {id: 1,
    question: 'Well, I know whats right, I got just one life. In a world that keeps on pushin me around. But I stand my ground and I wont back down',
    answer_a: 'Hank Williams',
    answer_b: 'Johnny Cash',
    answer_c: 'Randy Travis',
    answer_d: 'George Strait',
    correct_answer: 'b',
    detail: 'Song: I Wont Back Down by Johnny Cash',
  },
    {id: 2,
    question: 'Yeah, Im gonna take my horse to the old town road, Im gonna ride til I cant no more. Im gonna take my horse to the old town road, Im gonna ride til I cant no more',
    answer_a: 'Garth Brooks',
    answer_b: 'Dolly Parton',
    answer_c: 'Tim McGraw',
    answer_d: 'Lil Nas X',
    correct_answer: 'd',
    detail: 'Song: Old Town Road by Lil Nas X',
  },
    {id: 3,
    question: 'So dont you worry your pretty little mind. People throw rocks at things that shine, and life makes love look hard.',
    answer_a: 'Reba McEntire',
    answer_b: 'Taylor Swift',
    answer_c: 'Blake Shelton',
    answer_d: 'Willie Nelson',
    correct_answer: 'b',
    detail: 'Song: Ours by Taylor Swift',
  },
];


// const genreSelected = false;

const App = () => {
  const [genre, setGenre] = useState(false);
  const [questions, setQuestions] = useState('');
  if (genre===true) {
      return <Quiz questions={questions} onClick={() => setGenre(false)}/>
  } else {
        return (
          <div className='index'>
          <div className='titlebox'>
            <h1 style={{fontSize:`2.5em`, padding:`.5em`, fontWeight: `900`}} >Welcome to Lyr<span style={{color:`ivory`, textShadow: `black 2px -1px 3px`}}>IQ</span></h1>
          </div>
            - The Lyrics Quiz -
            <div className="cta" style={{color: `#2196F3`}}>
                <h2>
                Test your lyrical IQ!
                <br />Select A Genre:
                </h2>
            </div>
            <div className='genres'>
             <button className="neu" onClick={() => {setGenre(true); setQuestions(pop);}}>
             Pop</button>
             <button className="neu" onClick={() => {setGenre(true); setQuestions(rock);}}>
             Rock</button>
             <button className="neu" onClick={() => {setGenre(true); setQuestions(rap);}}>
             Rap</button>
             <button className="neu" onClick={() => {setGenre(true); setQuestions(country);}}>
             Country</button>
           </div>
           </div>
         );
    }
  }

export default App;
