import {
  Button,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/List.module.css";
import { WORDS } from "../constants";
import WordCard from "../components/WordCard";
import SearchIcon from "@mui/icons-material/Search";
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

const WORDS_PER_PAGE = 30;

const List: NextPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) =>
    setPage(page);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredWords = WORDS.filter(
    ({ word, wordTranslation }) =>
      word.toLowerCase().includes(search.toLowerCase()) ||
      wordTranslation.toLowerCase().includes(search.toLowerCase())
  );

  const pageWords = filteredWords.slice(
    (page - 1) * WORDS_PER_PAGE,
    (page - 1) * WORDS_PER_PAGE + WORDS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Language Learning Helper | List all words</title>
        <meta name="description" content="Flashcards for language learning" />
        <link rel="icon" href="/favicon.ico" />
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
              value={search}
              onChange={handleSearchChange}
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid xs={12} className={styles.paginationContainer} item>
            <Pagination
              page={page}
              count={Math.ceil(WORDS.length / WORDS_PER_PAGE)}
              onChange={handlePageChange}
            />
          </Grid>
          {pageWords.map((word) => (
            <Grid xs={12} item>
              <WordCard
                key={word.word}
                word={word.word}
                wordTranslation={word.wordTranslation}
                autoHeight
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default List;
