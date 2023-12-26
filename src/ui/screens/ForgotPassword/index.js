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
import BackButton from '../../components/BackButton';
  // import Loading from '../components/Loading';
  
  const Register = ({navigation}) => {
    // const {loading, createUser} = authFirebase();
    const registerIntialValue = {
      email: '',
    };
  
    const registerValidationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Email is not in correct format')
        .required('Email is required'),
    });
  
    const handleForget = (values) => {
      // createUser(values.email, values.password, onClickLogin);
    };
  
    const onClickLogin = () => {
      navigation.goBack();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {/* {false && <Loading />} */}
        <KeyboardAwareScrollView>
          <View style={styles.imageContainer}>
            <BackButton onPress={onClickLogin}/>
            <OrangeCircleImage />
          </View>
          <View style={styles.bodyContainer}>
            <View>
              <Formik
                initialValues={registerIntialValue}
                onSubmit={handleForget}
                validationSchema={registerValidationSchema}>
                {({values, errors, touched, handleChange, handleSubmit}) => (
                  <>
                    <Text style={styles.title}>Forget Password</Text>
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
                    <View style={styles.buttonContainer}>
                      <CustomButton title="Find Your Account" onPress={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
              {/* <View style={styles.signUpContainer}>
                <View style={styles.line} />
                <View style={styles.line} />
              </View> */}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
  
  export default Register;