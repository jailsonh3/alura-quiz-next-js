import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>
        <QuizLogo />
        <Widget>

          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);
              // console.log('fazendo um submissão por meio do react');
            }}
            >
              {/* <input
                onChange={(event) => {
                  // console.log(event.target.value);
                  // name = event.target.value;
                  setName(event.target.value);
                }}
                placeholder="Diga o seu nome"
              /> */}
              <Input
                name="nomeDoUsuario"
                placeholder="Diga o seu nome"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>

        </Widget>

        <Widget>

          <Widget.Content>
            <h1>
              {db.title}
            </h1>
            <p>{db.description}</p>
          </Widget.Content>

        </Widget>

        <Footer />

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jailsonh3/" />

    </QuizBackground>
  );
}
