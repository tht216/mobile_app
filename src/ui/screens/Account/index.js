import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import ProfileCard from '../../components/ProfileCard';
import CustomButton from '../../components/CustomButton';
import {useGetDetailQuery, useUpdateCustomerMutation} from '../../../utils/api';
import Loading from '../../components/Loading';
import {Formik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import * as Yup from 'yup';
import {routes} from '../../../navigation/routes';

const Account = ({navigation}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const {isLoading, data, error} = useGetDetailQuery();
  const [updateCustomer] = useUpdateCustomerMutation();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [initailLoginValue, setInitailLoginValue] = useState({
    email: '',
    name: '',
    phone: '',
  });
  console.log(data);
  const filter = useMemo(() => {
    if (data?.data) {
      setInitailLoginValue({
        name: data?.data.data.name,
        email: data?.data.data.email,
        phone: data?.data.data.phone,
      });
    }
  }, [data?.data]);
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('Email is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
  });
  const updateCustomerFunction = value => {
    console.log('a');
    setIsUpdate(value => !value);
    updateCustomer(value)
      .unwrap()
      .then(payload => Alert.alert(`Successful`, `Update Successful`))
      .catch(err => Alert.alert(`Error code: ${err.code}`, err.message));
  };
  const goChangePassword = () => {
    navigation.navigate(routes.CHANGEPASSWORD);
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={goChangePassword}
          style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>
          <Text
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              fontWeight: '600',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <Image
            source={require('../../../assets/images/profileBg.png')}
            style={styles.image}
          />
          <View style={styles.profie}>
            <ProfileCard />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.userName}>{data?.data?.data?.name}</Text>
          <TouchableOpacity onPress={() => setIsUpdate(value => !value)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={initailLoginValue}
          onSubmit={updateCustomerFunction}
          validationSchema={loginValidationSchema}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.fieldTitle}>Full Name</Text>
                <View style={styles.fieldContainer}>
                  <TextInput
                    editable={isUpdate}
                    style={styles.userName}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>
              </View>
              <View style={{marginTop: units.height / 50}}>
                <Text style={styles.fieldTitle}>E-mail</Text>
                <View style={styles.fieldContainer}>
                  <TextInput
                    editable={false}
                    style={styles.userName}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
              </View>
              <View style={{marginTop: units.height / 50}}>
                <Text style={styles.fieldTitle}>Phone Number</Text>
                <View style={styles.fieldContainer}>
                  <TextInput
                    editable={isUpdate}
                    style={styles.userName}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                  />
                  {errors.phone && touched.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>
              </View>
              {isUpdate && (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Update Information"
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    alignSelf: 'center',
  },
  profie: {
    position: 'absolute',
    bottom: units.height / 41,
    left: 0,
    right: 0,
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
  errorText: {
    color: colors.ORANGE,
    marginTop: units.height / 101,
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: units.height / 30,
    zIndex: 2,
  },
});
