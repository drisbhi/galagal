import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const colors = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
};

const DropdownComp = ({handleColorChange}) => {
  const [color, setColor] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (color || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const dropdownData = Object.keys(colors).map((key) => ({
    label: colors[key],
    value: key,
  }));

  return (
    <ScrollView>
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select color' : '...'}
        searchPlaceholder="Search..."
        value={color}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          console.log("color" , item.value)
          setColor(item.value);
          handleColorChange(item.value)
          setIsFocus(false);
        }}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    color: 'gray',
  },
  selectedTextStyle: {
    color: 'black',
  },
  inputSearchStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  iconStyle: {
    color: 'gray',
  },
});

export default DropdownComp;
