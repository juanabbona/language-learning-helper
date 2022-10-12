import {
  Card,
  CardContent,
  Typography,
  Paper,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import classNames from "classnames";
import React, {
  ChangeEvent,
  FormEventHandler,
  MouseEvent,
  RefObject,
} from "react";
import styles from "./WordCard.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type WordCardProps = {
  word: string;
  wordTranslation?: string;
  wordGuess?: string;
  isError?: boolean;
  isWarning?: boolean;
  isSuccess?: boolean;
  isSubmitting?: boolean;
  autoHeight?: boolean;
  showGuessForm?: boolean;
  showContinueButton?: boolean;
  onWordGuessChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onWordGuessSubmit?: FormEventHandler<HTMLFormElement>;
  onContinueClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  refWordGuessInput?: RefObject<HTMLInputElement>;
  refContinueButton?: RefObject<HTMLButtonElement>;
};

const WordCard = ({
  word,
  wordTranslation,
  wordGuess,
  isError,
  isWarning,
  isSuccess,
  isSubmitting,
  autoHeight,
  showGuessForm,
  showContinueButton,
  onWordGuessChange,
  onWordGuessSubmit,
  onContinueClick,
  refWordGuessInput,
  refContinueButton,
}: WordCardProps) => {
  return (
    <Card
      elevation={0}
      className={classNames(styles.wordCard, {
        [styles.wordCardSuccess]: isSuccess,
        [styles.wordCardWarning]: isWarning,
        [styles.wordCardError]: isError,
      })}
    >
      <CardContent
        className={classNames(styles.wordCardContent, {
          [styles.wordCardContentAutoHeight]: autoHeight,
        })}
      >
        <div>
          <Typography variant="subtitle1" component="div">
            Word
          </Typography>
          <Typography variant="h4">
            {word}
            {!!wordTranslation && (
              <>
                &nbsp;
                <ArrowForwardIcon />
                &nbsp;
                {wordTranslation}
              </>
            )}
          </Typography>
        </div>
        {showGuessForm && (
          <form onSubmit={onWordGuessSubmit}>
            <fieldset className={styles.fieldset} disabled={isSubmitting}>
              <Paper elevation={0}>
                <TextField
                  inputRef={refWordGuessInput}
                  type="string"
                  value={wordGuess}
                  onChange={onWordGuessChange}
                  label="Translation"
                  variant="filled"
                  className={styles.wordGuessTextField}
                  InputProps={{
                    className: styles.wordGuessTextFieldInput,
                  }}
                  fullWidth
                />
              </Paper>
            </fieldset>
          </form>
        )}
      </CardContent>
      {showContinueButton && (
        <CardActions className={styles.wordCardActions}>
          <Button
            ref={refContinueButton}
            color="inherit"
            endIcon={<ChevronRightIcon />}
            onClick={onContinueClick}
            disableFocusRipple
          >
            Continue
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default WordCard;
