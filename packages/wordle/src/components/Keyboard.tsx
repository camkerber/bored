import {KEYBOARD_ROW_1, KEYBOARD_ROW_2, KEYBOARD_ROW_3} from "@bored/providers";
import {KeyboardRow} from "./KeyboardRow";

export const Keyboard = () => {
  return (
    <div className="keyboard-container">
      <KeyboardRow keyboardRow={KEYBOARD_ROW_1} />
      <KeyboardRow keyboardRow={KEYBOARD_ROW_2} />
      <KeyboardRow keyboardRow={KEYBOARD_ROW_3} />
    </div>
  );
};
