import React, { useEffect } from 'react';
import axios from 'axios';

const Success = ({ route }) => {
  const { payment_id } = route.params;
  console.log("patmenid",payment_id);

  useEffect(() => {
    axios
      .post(`http://192.168.104.5:3000/api/payement/pay/${payment_id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Success payment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Success;
