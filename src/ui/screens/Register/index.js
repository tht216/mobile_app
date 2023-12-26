import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import CustomInput from '../../components/CustonInput';
import CustomButton from '../../components/CustomButton';
import SocialMediaCard from '../../components/SocialMediaCard';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import CircleImage from '../../../assets/svgs/circle';
import OrangeCircleImage from '../../../assets/svgs/orangeCircle';
import {routes} from '../../../navigation/routes';
import {useRegisterMutation} from '../../../utils/api';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import Loading from '../../components/Loading';
import { saveId } from '../../../utils/userSlicer';

const Register = ({navigation}) => {
  const [register, {isLoading, data, error}] = useRegisterMutation();
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordExp =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  const registerIntialValue = {
    email: '',
    password: '',
    rePassword: '',
    name: '',
    phone: '',
  };

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('Email is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be a minimum of 6 characters')
      .max(30, 'Password must be a maximum of 30 characters')
      .matches(
        passwordExp,
        'Password must contain uppercase, special character and number',
      )
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords are not the same')
      .required('Confirm password is required'),
  });

  const handleRegister = ({email, phone, password, name}) => {
    const data = {email, phone, password, name};
    register(data)
      .then(payload => {
        if (payload.error) {
          showMessage({
            message: payload.error.data.message,
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Register successful',
            type: 'success',
          });
          const {_id} = payload.data.data;
          console.log(_id);
          dispatch(saveId(_id))
          navigation.navigate(routes.VERIFY)
        }
      })
      .catch(error =>
        showMessage({
          message: error.data.message,
          type: 'danger',
        }),
      );
  };

  const onClickLogin = () => {
    navigation.goBack();
  };
  const verify = () => {
    navigation.navigate(routes.VERIFY);
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <CircleImage />
          <OrangeCircleImage />
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Formik
              initialValues={registerIntialValue}
              onSubmit={handleRegister}
              validationSchema={registerValidationSchema}>
              {({values, errors, touched, handleChange, handleSubmit}) => (
                <>
                  <Text style={styles.title}>Sign Up</Text>
                  <View style={{marginTop: units.height / 27}}>
                    <Text style={styles.emailText}>E-mail</Text>
                    <CustomInput
                      placeHolder="Your E-mail"
                      type="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Name</Text>
                    <CustomInput
                      placeHolder="Your name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Phone</Text>
                    <CustomInput
                      placeHolder="Your phone"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                    />
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Password</Text>
                    <CustomInput
                      placeHolder="Your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secure
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Re-Password</Text>
                    <CustomInput
                      placeHolder="Re password"
                      value={values.rePassword}
                      onChangeText={handleChange('rePassword')}
                      secure
                    />
                    {errors.rePassword && touched.rePassword && (
                      <Text style={styles.errorText}>{errors.rePassword}</Text>
                    )}
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton title="Sign Up" onPress={handleSubmit} />
                    <View style={styles.loginContainer}>
                      <Text>Already have an account. </Text>
                      <TouchableOpacity onPress={onClickLogin}>
                        <Text style={{color: colors.ORANGE}}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.signUpContainer}>
              <View style={styles.line} />
              <Text style={{marginHorizontal: units.width / 16}}>
                Sign up with
              </Text>
              <View style={styles.line} />
            </View>
            <View style={{marginVertical: units.height / 55}}>
              <SocialMediaCard onPress={verify} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
