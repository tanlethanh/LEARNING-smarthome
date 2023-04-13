import { TextInput } from "react-native";

function Input({ placeholder, secureTextEntry = false }) {
    return (
        <TextInput
            placeholder={placeholder || "Input text"}
            className="p-5 rounded-xl text-lg bg-white"
            secureTextEntry={secureTextEntry}
        ></TextInput>
    );
}

export { Input };
