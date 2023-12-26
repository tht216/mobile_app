import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FromTo} from '../../components/FromTo';
import {CustomCard} from '../../components/CustomCard';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import CustomButton from '../../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PaymentCard from '../../components/PaymentCard';
import BackButton from '../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import {API_URL} from '../../../utils/constant';
import {useBookPickupMutation} from '../../../utils/api';
import Loading from '../../components/Loading';
import {completePickup} from '../../../utils/pickupSlice';
export default Checkout = ({navigation, route}) => {
  const params = route.params;
  const serviceType = useSelector(selector => selector.pickupSlice.serviceType);
  const amount = useSelector(selector => selector.pickupSlice.amount);
  const long = useSelector(selector => selector.pickupSlice.long);
  const lat = useSelector(selector => selector.pickupSlice.lat);
  const address = useSelector(selector => selector.pickupSlice.address);
  const companyId = useSelector(selector => selector.pickupSlice.companyId);
  const subPrice = useSelector(selector => selector.pickupSlice.subPrice);
  const delivery = useSelector(selector => selector.pickupSlice.delivery);
  const [bookPickup, {isLoading}] = useBookPickupMutation();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading,
    resetPaymentSheetCustomer,
  } = usePaymentSheet();
  const payments = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'ZaloPay',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'COD',
    },
  ];
  const [value, setValue] = React.useState('');
  const [selectedPayment, setSelectedPayment] = React.useState(payments[0].id);
  useEffect(() => {
    initialisePaymentSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialisePaymentSheet = async () => {
    const {paymentIntent} = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      appearance: {
        colors: {
          primary: colors.ORANGE,
          background: colors.LIGHTORANGE,
          componentBackground: colors.WHITE,
          componentDivider: '#e5c07b',
          primaryText: colors.DARKORANGE,
          secondaryText: colors.BLACK,
          componentText: colors.BLACK,
          icon: '#e06c75',
          placeholderText: colors.DARKGRAY,
        },
        shapes: {
          borderRadius: 25,
        },
      },
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Example Inc.',
      applePay: {
        merchantCountryCode: 'US',
      },
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
        currencyCode: 'usd',
      },
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({price: +subPrice + +delivery}),
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  async function buy() {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      bookPickup({
        companyId,
        long,
        lat,
        address,
        note: value,
        serviceType,
        price: +subPrice + +delivery,
        amount,
      })
        .unwrap()
        .then(payload => console.log(payload))
        .catch(error =>
          Alert.alert(`Error code: ${error.code}`, error.message),
        );
      Alert.alert('Success', 'The payment was confirmed successfully');
      dispatch(completePickup());
    }
  }
  const handleChange = text => {
    setValue(text);
  };
  const onClickBack = () => {
    navigation.goBack();
  };
  const renderPayemtCard = ({item}) => (
    <PaymentCard
      item={item}
      selectedItem={selectedPayment}
      onPress={() => setSelectedPayment(item.id)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <KeyboardAwareScrollView>
        <StripeProvider
          merchantIdentifier={'merchant.com.stripe.react.native'}
          publishableKey="pk_test_51N7sOgBarsI0ZhAvyMJn7fg6duZZHcUEdah6D2roJa2n3D3bDwLcIwdway8sQHYcWayiNLYYFBfmFM93BN0L3RKS00are10Df8">
          <View style={styles.topBar}>
            <BackButton onPress={onClickBack} />
          </View>
          <View style={styles.topview}>
            <Text
              style={{
                top: 20,
                textAlign: 'center',
                position: 'absolute',
                fontSize: 30,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Checkout
            </Text>
          </View>

          <View style={styles.bottomview}>
            <CustomCard
              elevated={true}
              style={{
                backgroundColor: '#fff',
                marginHorizontal: 24,
                marginTop: -100,
                padding: 30,
                borderRadius: 10,
              }}>
              <FromTo from={address} to={params.title} />
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Fontisto name="recycle" size={15} color="#000" />
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                      Collection Type
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text style={{marginLeft: 25}}>
                      {serviceType} ({amount} bags)
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Icon
                      name="chatbox-ellipses-outline"
                      size={15}
                      color="#000"
                    />
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                      Note for collector (Optional)
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <TextInput
                      value={value}
                      onChangeText={handleChange}
                      placeholder="Eg. Please make it before 1pm, I will leaveing home beyond that"
                      multiline={true}
                      numberOfLines={4}
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        width: '100%',
                        borderRadius: 24,
                      }}
                    />
                  </View>
                </View>
              </View>
            </CustomCard>
            {/* <View style={styles.paymentContainer}>
              <Text style={styles.paymentText}>Payment</Text>
              <FlatList
                data={payments}
                renderItem={renderPayemtCard}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={{
                  marginTop: units.height / 50,
                }}
              />
            </View> */}
            <View style={styles.bottomContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>SubTotal:</Text>
                <Text style={styles.priceText}>{subPrice} $</Text>
              </View>
              <View
                style={[styles.priceContainer, {marginTop: units.height / 81}]}>
                <Text style={styles.priceTitle}>Delivery:</Text>
                <Text style={styles.priceText}>{delivery} $</Text>
              </View>
              <View
                style={[styles.priceContainer, {marginTop: units.height / 81}]}>
                <Text style={styles.priceTitle}>Total:</Text>
                <Text style={styles.priceText}>{+subPrice + +delivery} $</Text>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton title="Pay" onPress={buy} />
              </View>
              <View style={styles.lineContainer}>
                <View style={styles.progressLine} />
                <View style={[styles.progressLine]} />
                <View style={[styles.progressLine]} />
                <View style={[styles.progressLine]} />
              </View>
            </View>
          </View>
        </StripeProvider>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    height: units.height / 4,
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: units.height / 30,
    zIndex: 10,
  },
  welcomemessage: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  paymentText: {
    color: colors.DARK,
    fontSize: 20,
    fontWeight: '600',
  },
  paymentContainer: {
    marginVertical: units.height / 28,
    marginHorizontal: units.width / 15,
  },
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 65,
  },
  circle: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  },
  welcomecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomview: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  bottomContainer: {
    marginHorizontal: units.width / 17,
    marginVertical: units.height / 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHTGREY,
    paddingBottom: units.height / 81,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: units.height / 25,
  },
  progressLine: {
    height: 4,
    width: units.width / 5.3,
    backgroundColor: colors.GREEN,
    borderRadius: 20,
  },
  priceTitle: {
    fontSize: 16,
    color: colors.DARK,
  },
  priceText: {
    fontSize: 19,
    color: colors.DARK,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: units.height / 50,
    marginHorizontal: units.width / 7,
    marginBottom: units.height / 81,
  },
});
