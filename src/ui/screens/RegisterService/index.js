import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LogBox,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import ProfileCard from '../../components/ProfileCard';
import CustomButton from '../../components/CustomButton';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import CustomDropDown from '../../components/CustomDropDown';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  useDeleteServiceMutation,
  useGetCompanyQuery,
  useGetDetailCompanyQuery,
  useGetServiceQuery,
  useRegisterServiceMutation,
  useUpdateDetailCompanyMutation,
} from '../../../utils/api';
import {routes} from '../../../navigation/routes';
export default function RegisterService({navigation}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [initailLoginValue, setInitailLoginValue] = useState({
    email: '',
    name: '',
    phone: '',
    description: '',
  });
  const [serviceArray, setServiceArray] = useState([]);
  const {isLoading, data: company} = useGetDetailCompanyQuery();
  const {data: service} = useGetServiceQuery();
  const [updateDetailCompany] = useUpdateDetailCompanyMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [registerService] = useRegisterServiceMutation();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [data, setData] = useState([
    {label: 'Organic', value: 'Organic'},
    {label: 'Plastic', value: 'Plastic'},
    {label: 'Glass', value: 'Glass'},
    {label: 'Metal', value: 'Metal'},
    {label: 'E-waste', value: 'E-waste'},
    {label: 'Hazardous', value: 'Hazardous'},
    {label: 'Paper', value: 'Paper'},
  ]);
  const filter = useMemo(() => {
    if (company?.data) {
      setInitailLoginValue({
        name: company?.data._id.name,
        email: company?.data._id.email,
        phone: company?.data._id.phone,
        description: company?.data.description,
      });
    }
  }, [company?.data]);
  const filterService = useMemo(() => {
    if (service?.service) {
      setServiceArray(
        service.service.map(value => {
          return {
            serviceType: value.serviceType,
            _id: value._id,
            price: value.price,
          };
        }),
      );
      setData(value =>
        value.filter(item =>
          service?.service.reduce(
            (flag, service) =>
              item.label === service.serviceType ? false : flag,
            true,
          ),
        ),
      );
    }
  }, [service?.service]);
  const createService = value => {
    console.log(value);
    registerService({serviceType: value.serviceType.value, price: value.price})
      .unwrap()
      .then(payload => Alert.alert('Successful', 'Create Service Successful!'))
      .catch(err => Alert.alert(err.status, err.data.message));
  };
  const deleteServicePress = item => {
    deleteService({id: item._id})
      .unwrap()
      .then(payload => Alert.alert('Successful', 'Delete Successful!'))
      .catch(err => Alert.alert(err.status, err.data.message));
  };
  const renderServiceCard = ({item}) => (
    <CustomDropDown
      height={75}
      title={
        <View>
          <View style={styles.serviceBox}>
            <Text>{item.serviceType}</Text>
          </View>
          <View style={styles.serviceBox}>
            <Text>{item.price}</Text>
          </View>
        </View>
      }>
      <View style={{}}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 50,
            backgroundColor: '#ff4545',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginHorizontal: 3,
          }}
          onPress={() => {
            console.log(item);
            deleteServicePress(item);
          }}>
          <Icon name="close-circle-outline" size={16} color={colors.WHITE} />
          <Text
            style={{marginStart: 3, fontWeight: '600', color: colors.WHITE}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </CustomDropDown>
  );
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  const initailValue = {
    serviceType: '',
    price: '',
  };
  const validationSchema = Yup.object().shape({
    serviceType: Yup.object().required('Service Type is required'),
    price: Yup.string().required('Price is required'),
  });
  const updateCompany = value => {
    setIsUpdate(value => !value);
    updateDetailCompany(value)
      .unwrap()
      .then(payload => Alert.alert(`Successful`, `Update Successful`))
      .catch(err => Alert.alert(`Error code: ${err.code}`, err.message));
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('Email is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
  });
  const goChangePassword = () => {
    navigation.navigate(routes.CHANGEPASSWORD);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && <Loading />} */}
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
      <ScrollView nestedScrollEnabled={true}>
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
          <Text style={styles.userName}>{initailLoginValue.name}</Text>
          <TouchableOpacity onPress={() => setIsUpdate(value => !value)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Formik
            initialValues={initailLoginValue}
            onSubmit={updateCompany}
            validationSchema={loginValidationSchema}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              resetForm,
            }) => (
              <>
                <View>
                  <Text style={styles.fieldTitle}>Company Name</Text>
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
                <View style={{marginTop: units.height / 50}}>
                  <Text style={styles.fieldTitle}>Company Description</Text>
                  <View style={styles.fieldContainer}>
                    <TextInput
                      editable={isUpdate}
                      style={styles.userName}
                      value={values.description}
                      onChangeText={handleChange('description')}
                    />
                    {errors.description && touched.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}
                  </View>
                </View>
                {isUpdate && (
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      title="Update Information"
                      onPress={(handleSubmit, resetForm)}
                    />
                  </View>
                )}
              </>
            )}
          </Formik>
          <CustomDropDown
            style={{marginTop: units.height / 50}}
            height={270}
            title={
              <View style={[styles.serviceHead]}>
                <Text style={[styles.fieldTitle, styles.header]}>
                  YOUR SERVICE
                </Text>
                <Icon
                  name={'chevron-down-outline'}
                  size={27}
                  color={colors.ORANGE}
                />
              </View>
            }>
            <CustomDropDown
              style={{marginTop: units.height / 50}}
              height={210}
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={'add'} size={27} color={colors.ORANGE} />
                  <Text style={[styles.fieldTitle, {color: colors.ORANGE}]}>
                    Create new
                  </Text>
                </View>
              }>
              <Formik
                initialValues={initailValue}
                onSubmit={createService}
                validationSchema={validationSchema}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          marginTop: units.height / 50,
                          flex: 1,
                          marginEnd: 12,
                        }}>
                        <Text style={[styles.fieldTitle]}>Service Name</Text>
                        <Dropdown
                          style={[
                            styles.fieldContainer,
                            isFocus && {borderColor: colors.DARKORANGE},
                          ]}
                          placeholderStyle={[
                            styles.userName,
                            {color: colors.GRAY},
                          ]}
                          selectedTextStyle={styles.userName}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Select item' : '...'}
                          searchPlaceholder="Search..."
                          value={values.serviceType}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setFieldValue('serviceType', item);
                          }}
                          dropdownPosition="top"
                        />
                        {errors.serviceType && touched.serviceType && (
                          <Text style={styles.errorText}>
                            {errors.serviceType}
                          </Text>
                        )}
                      </View>
                      <View style={{marginTop: units.height / 50, flex: 1}}>
                        <Text style={[styles.fieldTitle]}>Price</Text>
                        <View style={{}}>
                          <TextInput
                            placeholder="Price..."
                            style={[styles.userName, styles.fieldContainer]}
                            value={values.price}
                            onChangeText={handleChange('price')}
                            keyboardType="number-pad"
                          />
                          {errors.price && touched.price && (
                            <Text style={styles.errorText}>{errors.price}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <CustomButton
                      style={{marginTop: units.height / 50}}
                      title={'CREATE'}
                      onPress={handleSubmit}
                    />
                  </>
                )}
              </Formik>
            </CustomDropDown>

            <FlatList
              horizontal
              data={serviceArray}
              renderItem={renderServiceCard}
              ListEmptyComponent={
                <View
                  style={{
                    height: 160,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>This company hasn't registered service yet</Text>
                </View>
              }
              keyExtractor={(_, index) => index.toString()}
              ListHeaderComponent={() => (
                <View>
                  <View
                    style={[
                      styles.serviceBox,
                      {backgroundColor: colors.DARKORANGE},
                    ]}>
                    <Text style={styles.serviceLable}>Service Type</Text>
                  </View>
                  <View
                    style={[
                      styles.serviceBox,
                      {backgroundColor: colors.DARKORANGE},
                    ]}>
                    <Text style={styles.serviceLable}>Price</Text>
                  </View>
                </View>
              )}
              style={styles.list}
            />
          </CustomDropDown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  serviceBox: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.LIGHTORANGE,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomColor: colors.WHITE,
    borderLeftColor: colors.WHITE,
    borderRadius: 10,
  },
  serviceText: {},
  serviceLable: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.WHITE,
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
