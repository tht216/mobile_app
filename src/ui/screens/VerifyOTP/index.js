import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import {colors} from '../../../themes/Colors';
import CustomButton from '../../components/CustomButton';
import {units} from '../../../themes/Units';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import OrangeCircleImage from '../../../assets/svgs/orangeCircle';
import {routes} from '../../../navigation/routes';
import {
  useLoginMutation,
  useResendMutation,
  useVerifyAccountMutation,
} from '../../../utils/api';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Loading from '../../components/Loading';
import { saveToken } from '../../../utils/localstorage';
import { loginAccount } from '../../../utils/userSlicer';

export default VerifyOTP = ({navigation}) => {
  const [code, setCode] = useState();
  const [resend, {isLoading}] = useResendMutation();
  const [verifyAccount, {isLoading: isVeryfying}] = useVerifyAccountMutation();
  const [login, {isLoading: isLogining}] = useLoginMutation();
  const id = useSelector(selector => selector.userReduce.id);
  const dispatch = useDispatch();


  const handleSubmit = () => {
    setCode('');
    console.log(id);
    resend(id)
      .unwrap()
      .then(payload => {
        showMessage({
          message: 'New OTP has been sent',
          type: 'success',
        });
      })
      .catch(error => {
        console.log(error);
        showMessage({
          message: error.data.message,
          type: 'danger',
        });
      });
  };
  const verifyOTP = code => {
    verifyAccount({id, otp: code})
      .unwrap()
      .then(payload => {
        saveToken(payload.token);
        showMessage({
          message: 'Verify successfull!',
          type: 'success',
        });
        dispatch(loginAccount(payload.name));
      })
      .catch(error => {
        console.log(error);
        // showMessage({
        //   message: error.data.message,
        //   type: 'danger',
        // });
      });
  };
  const onClickLogin = () => {
    navigation.navigate(routes.LOGIN);
  };
  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isVeryfying || isLogining) && <Loading />}
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <BackButton onPress={onClickLogin} />
          <OrangeCircleImage />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Verify OTP</Text>
          <View style={styles.otpContainer}>
            <OTPInputView
              style={{width: '100%', height: 200}}
              pinCount={6}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => {
                setCode(code);
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.borderStyleBase}
              codeInputHighlightStyle={styles.borderStyleHighLighted}
              onCodeFilled={verifyOTP}
              selectionColor={colors.LIGHTORANGE}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title="Resend" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 40,
  },
  borderStyleBase: {
    width: 40,
    height: 60,
    fontSize: 20,
    color: colors.BLACK,
  },
  otpContainer: {alignItems: 'center'},
  borderStyleHighLighted: {
    borderColor: colors.ORANGE,
  },

  buttonContainer: {
    marginHorizontal: units.width / 9,
    marginVertical: units.height / 25,
  },
  title: {
    color: colors.BLACK,
    fontSize: 36,
    fontWeight: '600',
  },
});
