/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import Loading from '../src/components/Loading';
import AlternativesForm from '../src/components/AlternativesForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <Loading
          type="bars"
          color={db.theme.colors.contrastText}
          height="50px"
          width="50px"
        />
      </Widget.Header>

      <Widget.Content>
        <Loading
          type="bars"
          color={db.theme.colors.contrastText}
          height="50px"
          width="50px"
        />
      </Widget.Content>
    </Widget>
  );
}

function FineshWidget({ results }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Widget>
      <Widget.Header>
        <h2>
          {`Parabéns, ${name}! Obrigado por jogar!`}
        </h2>
      </Widget.Header>

      <img
        alt="Resultado"
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
        }}
        src={db.image_res}
      />

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {
              results.reduce((somatoriaAtual, resultAtual) => {
                const isAcerto = resultAtual === true;
                return (isAcerto) ? somatoriaAtual + 1 : somatoriaAtual;
              }, 0)
          } */}
          {results.filter((x) => x).length}
          {' '}
          pergunta(s).
        </p>
        <ul>
          {results.map((result, index) => {
            const resultId = `result_${index}`;
            return (
              <li
                key={resultId}
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  width: '50px',
                  height: '50px',
                  margin: '2px',
                  fontSize: '15pt',
                  paddingTop: '10px',
                  textAlign: 'center',
                  outline: 'center',
                  backgroundColor: result ? db.theme.colors.success : db.theme.colors.wrong,
                }}
              >
                {(index + 1) > 9 ? `${index + 1}` : `0${index + 1}`}
                {/* {' '}
                Resultado:
                {result === true ? ' Acertou!' : ' Errou!'} */}
              </li>
            );
          })}
        </ul>
        <Button type="button" onClick={() => router.back()}> Jogar Novamente</Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '120px',
          objectPosition: '0 17%',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setSelectedAlternative(undefined);
              setIsQuestionSubmited(false);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  checked={false}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect
          && (
            <>
              Você acertou!
              {' '}
              <Loading
                type="bars"
                color={db.theme.colors.contrastText}
                width="20px"
                height="20px"
              />
            </>
          )}

          {isQuestionSubmited && !isCorrect
          && (
            <>
              Você errou!
              {' '}
              <Loading
                type="bars"
                color={db.theme.colors.contrastText}
                width="20px"
                height="20px"
              />
            </>
          )}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <FineshWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
