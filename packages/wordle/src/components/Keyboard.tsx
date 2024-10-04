import {KEYBOARD_ROW_1, KEYBOARD_ROW_2, KEYBOARD_ROW_3} from "../utils";
import {KeyboardRow} from "./KeyboardRow";

interface KeyboardProps {
  onNewChar: (char: string) => void;
  gameCompleted: boolean;
  charsNotInWord: string[];
}

export const Keyboard = ({
  onNewChar,
  gameCompleted,
  charsNotInWord,
}: KeyboardProps) => {
  return (
    <div className="keyboard-container">
      <KeyboardRow
        keyboardRow={KEYBOARD_ROW_1}
        onNewChar={onNewChar}
        gameCompleted={gameCompleted}
        charsNotInWord={charsNotInWord}
      />
      <KeyboardRow
        keyboardRow={KEYBOARD_ROW_2}
        onNewChar={onNewChar}
        gameCompleted={gameCompleted}
        charsNotInWord={charsNotInWord}
      />
      <KeyboardRow
        keyboardRow={KEYBOARD_ROW_3}
        onNewChar={onNewChar}
        gameCompleted={gameCompleted}
        charsNotInWord={charsNotInWord}
      />
    </div>
  );
};
