import { Button, Grid, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Practice.module.css";
import { WORDS } from "../constants";
import WordCard from "../components/WordCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

enum WordGuessResult {
  Match = "match",
  PartialMatch = "partial-match",
  Incorrect = "incorrect",
}

const getWordGuessResult = (
  wordTranslation: string,
  wordGuess: string
): WordGuessResult => {
  const parsedWordTranslation = wordTranslation.toLowerCase().trim();
  const parsedWordGuess = wordGuess.toLowerCase().trim();

  if (parsedWordGuess === parsedWordTranslation) return WordGuessResult.Match;

  if (
    parsedWordTranslation.includes(parsedWordGuess) ||
    parsedWordGuess.includes(parsedWordTranslation)
  )
    return WordGuessResult.PartialMatch;

  return WordGuessResult.Incorrect;
};

const Practice: NextPage = () => {
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);
  const wordGuessValueInputRef = useRef<HTMLInputElement | null>(null);

  const [wordIndex, setWordIndex] = useState(0);
  const [wordGuessValue, setWordGuessValue] = useState("");
  const [wordGuessResult, setWordGuessResult] =
    useState<WordGuessResult | null>();

  const word = WORDS[wordIndex];

  const goToNextWord = () => {
    if (wordIndex + 1 >= WORDS.length)
      return alert("Congrats, you practiced all words!");

    setWordIndex(wordIndex + 1);
    setWordGuessValue("");
    setWordGuessResult(null);
  };

  useEffect(() => {
    if (wordGuessResult === WordGuessResult.Match)
      setTimeout(goToNextWord, 300);
    else if (wordGuessResult) continueButtonRef.current?.focus();
  }, [wordGuessResult]);

  useEffect(() => {
    wordGuessValueInputRef.current?.focus();
  }, [wordIndex]);

  const handleWordIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWordIndex = parseInt(e.target.value) - 1;

    if (newWordIndex <= 0) setWordIndex(0);
    else if (newWordIndex >= WORDS.length) setWordIndex(WORDS.length - 1);
    else setWordIndex(newWordIndex);
  };

  const handleWordGuessValueChange = (e: ChangeEvent<HTMLInputElement>) =>
    setWordGuessValue(e.target.value);

  const handleGuessFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setWordGuessResult(
      getWordGuessResult(word.wordTranslation, wordGuessValue)
    );

    e.preventDefault();
    e.stopPropagation();
  };

  const handleContinueClick = () => goToNextWord();

  const shouldShowAnswer =
    !!wordGuessResult &&
    [WordGuessResult.PartialMatch, WordGuessResult.Incorrect].includes(
      wordGuessResult
    );
  const isSubmitting = !!wordGuessResult || shouldShowAnswer;

  return (
    <div className={styles.container}>
      <Head>
        <title>Language Learning Helper | Practice</title>
      </Head>

      <main className={styles.main}>
        <Grid spacing={3} className={styles.gridRoot} container>
          <Grid xs={12} item>
            <Button component="a" href="/" startIcon={<ChevronLeftIcon />}>
              Back
            </Button>
          </Grid>
          <Grid xs={12} item>
            <TextField
              type="number"
              value={wordIndex + 1}
              onChange={handleWordIndexChange}
              label="Word #"
            />
          </Grid>
          <Grid xs={12} item>
            <WordCard
              word={word.word}
              wordTranslation={
                shouldShowAnswer ? word.wordTranslation : undefined
              }
              wordGuess={wordGuessValue}
              isError={wordGuessResult === WordGuessResult.Incorrect}
              isSuccess={wordGuessResult === WordGuessResult.Match}
              isWarning={wordGuessResult === WordGuessResult.PartialMatch}
              isSubmitting={isSubmitting}
              showGuessForm
              showContinueButton={shouldShowAnswer}
              onWordGuessChange={handleWordGuessValueChange}
              onWordGuessSubmit={handleGuessFormSubmit}
              onContinueClick={handleContinueClick}
              refWordGuessInput={wordGuessValueInputRef}
              refContinueButton={continueButtonRef}
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Practice;
