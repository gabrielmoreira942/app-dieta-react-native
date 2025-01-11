import { View, StyleSheet, TextInput, KeyboardTypeOptions, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors } from '@/constants/colors';

interface InputProps {
  name: string;
  control: any;
  rules?: object;
  placeholder?: string;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}
export function Input({ name, control, rules, placeholder, error, keyboardType }: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
          ></TextInput>

        )}
        />
        {error && (<Text style={styles.errorText}>{error}</Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 4
  }

});