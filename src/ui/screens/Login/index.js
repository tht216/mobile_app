import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../components/CustonInput';
import CustomButton from '../../components/CustomButton';
import {units} from '../../../themes/Units';
import {colors} from '../../../themes/Colors';
import SocialMediaCard from '../../components/SocialMediaCard';
import {routes} from '../../../navigation/routes';
import CircleImage from '../../../assets/svgs/circle';
import OrangeCircleImage from '../../../assets/svgs/orangeCircle';
import {useLoginMutation} from '../../../utils/api';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Loading from '../../components/Loading';
import {loginAccount, saveId} from '../../../utils/userSlicer';
import {saveToken} from '../../../utils/localstorage';

const Login = ({navigation}) => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const initailLoginValue = {
    email: '',
    password: '',
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handeleLogin = async values => {
    console.log(values);
    await login(values)
    .unwrap()
    .then(payload => {
      saveToken(payload.token);
      showMessage({
        message: 'Login successful',
        type: 'success',
      });
      if (payload.role) dispatch(loginAccount(payload.role));
    })
    .catch(error => {
      console.log(error);
      if (error.status === 403) {
        dispatch(saveId(error.data.customerId._id));
        navigation.navigate(routes.VERIFY);
      }
      showMessage({
        message: error.data.message,
        type: 'danger',
      });
    });
  };
  const onClickSignUp = () => {
    navigation.navigate(routes.REGISTER);
  };
  const onClickForgot = () => {
    navigation.navigate(routes.FORGOT);
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
          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={initailLoginValue}
            onSubmit={handeleLogin}
            validationSchema={loginValidationSchema}>
            {({values, errors, touched, handleChange, handleSubmit}) => (
              <>
                <View style={{marginTop: units.height / 27}}>
                  <Text style={styles.emailText}>Email</Text>
                  <CustomInput
                    placeHolder="Your Email address"
                    type="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View style={{marginTop: units.height / 27}}>
                  <Text style={styles.emailText}>Password</Text>
                  <CustomInput
                    placeHolder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secure
                    type={undefined}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={{marginTop: units.height / 25}}>
                  <TouchableOpacity onPress={onClickForgot}>
                    <Text style={styles.forgotText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                  <View style={styles.loginContainer}>
                    <CustomButton title="LOGIN" onPress={handleSubmit} />
                    <View style={styles.signUpContainer}>
                      <Text>Don’t have an account? </Text>
                      <TouchableOpacity onPress={onClickSignUp}>
                        <Text style={{color: colors.ORANGE}}>Sign Up</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.signInContainer}>
                      <View style={styles.line} />
                      <Text style={{marginHorizontal: units.width / 16}}>
                        Sign in with
                      </Text>
                      <View style={styles.line} />
                    </View>
                    <View style={{marginVertical: units.height / 55}}>
                      <SocialMediaCard />
                    </View>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
