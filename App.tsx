import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView,StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DropdownComp from './component/DropdownComp';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const colors = {
//   aliceblue: '#f0f8ff',
//   antiquewhite: '#faebd7',
//   aqua: '#00ffff',
//   aquamarine: '#7fffd4',
//   azure: '#f0ffff',
//   beige: '#f5f5dc',
//   bisque: '#ffe4c4',
//   black: '#000000',
//   blanchedalmond: '#ffebcd',
//   blue: '#0000ff',
//   blueviolet: '#8a2be2',
//   brown: '#a52a2a',
// };

const colors = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
};

const zipCodes = {
  zipcode_data: [
    {
      zipcode: '110011',
      city: 'Central Delhi',
      state: 'ND',
    },
    {
      zipcode: '400011',
      city: 'Mumbai',
      state: 'MH',
    },
    {
      zipcode: '600001',
      city: 'Chennai',
      state: 'TN',
    },
    {
      zipcode: '700001',
      city: 'Kolkata',
      state: 'WB',
    },
  ],
};

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZIP] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [color, setColor] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formData, setFormData] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);

  const validateName = () => {
    return /^[A-Z ']+$/.test(name);
  };

  const validateEmail = () => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validateMobile = () => {
    return /^\d{4}-\d{6}$/.test(mobile);
  };

  const validateDOB = () => {
    return /^\d{2}-\d{2}-\d{4}$/.test(dob);
  };

  const handleZIPChange = (value) => {
    setZIP(value);

    if (value.length >= 3) {
      const selectedZIP = zipCodes.zipcode_data.find((item) =>
        item.zipcode.startsWith(value)
      );

      if (selectedZIP) {
        setCity(selectedZIP.city);
        setState(selectedZIP.state);
      }
    } else {
      setCity('');
      setState('');
    }
  };

  const handleSubmit = () => {
    if (
      validateName() &&
      validateEmail() &&
      validateMobile() &&
      validateDOB()
    ) {
      setIsSubmitting(true);
       const Buffer = require("buffer").Buffer;
      const encodedData = Buffer.from(
        `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nDOB: ${dob}\nGender: ${gender}\nZIP: ${zip}\nCity: ${city}\nState: ${state}\nColor: ${color}\nAdditional Info: ${additionalInfo}\n`
      ).toString('base64');

      const storeUser = async (encodedData : string) => {
        try {
          await AsyncStorage.setItem("user", encodedData);
        } catch (error) {
          console.log(error);
        }
      };

      console.log('formData', storeUser)
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert('Form Data', encodedData);
        setToggleButton(false)
      }, 2000);
    } else {
      Alert.alert('Error', 'Please enter valid data in all fields');
    }
  };

  const handleShowData = () => {

    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        console.log("fdgd" , userData)
      } catch (error) {
       console.log(error); 
      }
    };
    getUser();

    setClickCount((prevCount) => prevCount + 1);
    setAdditionalInfo(
      (prevInfo) => `${prevInfo}Clicked Show Data (${clickCount + 1})\n`
    );
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMobile('');
    setDOB('');
    setGender('');
    setZIP('');
    setCity('');
    setState('');
    setColor('');
    setAdditionalInfo('');
    setFormData('');
    setClickCount(0);
  };

  const handleColorChange = (value) => {
    setColor(value);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 24 , textAlign : 'center' , color : 'blue'} }> Form</Text>
      <View>
        <Text style={ { color: color  }} >Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={{ color: color }}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={{ color: color }}>Mobile:</Text>
        <TextInput
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter your mobile number"
          keyboardType="numeric"
          maxLength={11}
          onChangeText={(value) => {
            let formattedValue = value.replace(/[^0-9]/g, '');
            if (formattedValue.length > 4) {
              formattedValue = `${formattedValue.slice(
                0,
                4
              )}-${formattedValue.slice(4)}`;
            }
            setMobile(formattedValue);
          }}
        />

        <Text style={{ color: color }}>DOB:</Text>
        <TextInput
          value={dob}
          onChangeText={setDOB}
          placeholder="Enter your date of birth (DD-MM-YYYY)"
          maxLength={10}
          onChangeText={(value) => {
            let formattedValue = value.replace(/[^0-9]/g, '');
            if (formattedValue.length > 2) {
              formattedValue = `${formattedValue.slice(
                0,
                2
              )}-${formattedValue.slice(2)}`;
            }
            if (formattedValue.length > 5) {
              formattedValue = `${formattedValue.slice(
                0,
                5
              )}-${formattedValue.slice(5)}`;
            }
            setDOB(formattedValue);
          }}
        />

        <Text style={{ color: color }}>Gender:</Text>
        <View>
          <Text>Male</Text>
          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
          <Text>Female</Text>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
          />
        </View>

        <Text style={{ color: color }}>ZIP:</Text>
        <TextInput
          value={zip}
          onChangeText={handleZIPChange}
          placeholder="Enter ZIP code"
          keyboardType="numeric"
        />

        <Text style={{ color: color }}>City:</Text>
        <TextInput value={city} editable={false} />

        <Text style={{ color: color }}>State:</Text>
        <TextInput value={state} editable={false} />

        <Text style={{ color: color }}>Color:</Text>
        <DropdownComp handleColorChange={handleColorChange}/>

        <Text style={{ color: color }}>Additional Info:</Text>
        <TextInput
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
          editable={false}
        />
       <View style={{ margin : 10}}>
       <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!name || !email || !mobile || !dob || !gender || !zip || isSubmitting  || !toggleButton} 
        />
       </View>
       <View style={{ margin : 10}}>
        <Button
          title="Show Data"
          onPress={handleShowData}
          disabled={toggleButton}
          
        />
        </View>
        <View style={{ margin : 10}}>
        <Button
          title="Reset"
          onPress={handleReset}
          disabled={toggleButton}
        />
        </View>
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  
});











