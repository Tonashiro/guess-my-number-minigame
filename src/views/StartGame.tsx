import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { inputValidator } from "../utils/inputValidator";
import Button from "../components/atoms/Button";
import { colors } from "../constants/colors";

interface IStartGame {
  onConfirmed: (selectedNumber: string) => void;
}

const StartGame = ({ onConfirmed }: IStartGame) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberHandler(enteredNumber: string) {
    setEnteredNumber(enteredNumber);
  }

  function resetNumberHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const validatedInput = inputValidator(enteredNumber);

    if (!validatedInput) {
      Alert.alert(
        "Invalid number!",
        "Please enter a number between 0 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetNumberHandler }]
      );
      return;
    }

    onConfirmed(enteredNumber);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button type="secondary" onPress={resetNumberHandler}>
            Reset
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button type="primary" onPress={confirmInputHandler}>
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};

export { StartGame };

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: "5%",
    backgroundColor: colors.primary800,
    borderRadius: 8,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  numberInput: {
    height: 50,
    width: 40,
    textAlign: "center",
    fontSize: 32,
    borderColor: colors.accent500,
    borderBottomWidth: 2,
    color: colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
