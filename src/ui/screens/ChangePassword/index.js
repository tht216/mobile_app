import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../themes/Colors';
import BackButton from '../../components/BackButton';
import {units} from '../../../themes/Units';
import {Formik} from 'formik';

import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import {useUpdatePasswordMutation} from '../../../utils/api';
export default function ChangePassword({navigation}) {
  const [updatePassword] = useUpdatePasswordMutation();
  const passwordExp =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  const goBack = () => {
    navigation.goBack();
  };
  const initailValue = {
    oldPassword: '',
    newPassword: '',
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be a minimum of 6 characters')
      .max(30, 'Password must be a maximum of 30 characters')
      .matches(
        passwordExp,
        'Password must contain uppercase, special character and number',
      )
      .required('Password is required'),
  });
  const updatePasswordFunction = value => {
    updatePassword(value)
      .unwrap()
      .then(payload =>
        showMessage({
          message: 'Login successful',
          type: 'success',
        }),
      )
      .catch(error =>
        showMessage({
          message: error.data.message,
          type: 'danger',
        }),
      );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && <Loading />} */}
      <View style={styles.topBar}>
        <BackButton onPress={goBack} />
      </View>
      <View style={styles.topview}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Change Password
        </Text>
      </View>
      <View style={styles.bottomview}>
        <Formik
          initialValues={initailValue}
          onSubmit={updatePasswordFunction}
          validationSchema={validationSchema}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <View>
              <View>
                <Text style={styles.fieldTitle}>Old Password</Text>
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={styles.userName}
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    placeHolder="Your Old Password"
                  />
                  {errors.oldPassword && touched.oldPassword && (
                    <Text style={styles.errorText}>{errors.oldPassword}</Text>
                  )}
                </View>
              </View>
              <View style={{marginTop: units.height / 50}}>
                <Text style={styles.fieldTitle}>New Password</Text>
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={styles.userName}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    placeHolder="Your New Password"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}
                </View>
              </View>
              <View style={{marginTop: units.height / 25}}>
                <CustomButton
                  title="Update Password"
                  onPress={(handleSubmit, resetForm)}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomview: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 24,
    justifyContent: 'center',
    alignContent: 'center',
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: units.height / 30,
    zIndex: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.DARK,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: units.height / -41,
  },
  errorText: {
    color: colors.ORANGE,
    marginTop: units.height / 101,
  },
  editText: {
    color: colors.GRAY,
    marginTop: units.height / 81,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 10,
    paddingVertical: units.height / 48,
    paddingLeft: units.width / 23,
    marginTop: units.height / 67,
  },
  bodyContainer: {
    marginHorizontal: units.width / 21,
    marginTop: units.height / 25,
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 16,
    color: colors.GRAY,
  },
  buttonContainer: {
    marginHorizontal: units.width / 12,
    marginTop: units.height / 38,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  serviceHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    color: colors.ORANGE,
    fontSize: 20,
  },
  list: {
    padding: 0,
    width: '100%',
    marginTop: units.height / 50,
  },
});
