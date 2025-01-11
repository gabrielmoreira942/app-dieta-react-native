import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Controller, set } from 'react-hook-form';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
interface OptionsProps {
  label: string;
  value: string | number;
}
interface SelectProps {
  name: string;
  control: any;
  rules?: object;
  placeholder?: string;
  error?: string;
  options: OptionsProps[];
}
export function Select({ name, control, rules, placeholder, error, options }: SelectProps) {

  const [visible, setVisible] = useState(false);
  const selectedOption = (value: string | number) => options.find((item) => item.value === value)?.label;
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
              <Text>{selectedOption(value) || placeholder}</Text>
              <Feather name='arrow-down' size={20}></Feather>
            </TouchableOpacity>
            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.modalContainer}
                activeOpacity={1}
              >
                <TouchableOpacity
                  style={styles.modalContent}
                  activeOpacity={1}
                >
                  <FlatList
                    data={options}
                    contentContainerStyle={{ gap: 4 }}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false)
                        }}>
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  >
                  </FlatList>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
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
  select: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 4
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 8,

  },
  option: {
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    borderRadius: 4,
  },

});