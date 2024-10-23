import React from 'react';
// import { toast } from 'react-hot-toast';

// paypal
import { PayPalButtons } from '@paypal/react-paypal-js';
// api
// import * as api from '@/services';
// import { useMutation } from 'react-query';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next-nprogress-bar';
// import { updatePayment } from '@/lib/redux/slices/user';
function PayPalCheckout() {
  //   const { push } = useRouter();

  //   const dispatch = useDispatch();
  //   const { mutate } = useMutation(api.createPayment, {
  //     onSuccess: () => {
  //       toast.success('Success');
  //     },
  //     onError: (err) => {
  //       const message = JSON.stringify(err.response.data.message);

  //       toast.error(message || 'Email incorrect please try again.');
  //     },
  //   });

  const onApproveHandler = async (data) => {
    console.log(data, 'hello ');

    // orderID
    // subscriptionID

    // if (data.orderID) {
    //   await mutate({
    //     status: 'ACTIVE',
    //     subscriptionId: data.subscriptionID,
    //     orderId: data.orderID,
    //     userId: user.id,
    //   });
    //   dispatch(
    //     updatePayment({
    //       status: 'ACTIVE',
    //       subscriptionId: data.subscriptionID,
    //       orderId: data.orderID,
    //       userId: user.id,
    //     })
    //   );
    //   push('/');
    //   // onSuccess(data.orderID, data.subscriptionID);
    // } else {
    //   toast.error('Payment is not successful');
    // }
  };

  //   React.useEffect(() => {
  //     setTimeout(() => {
  //       if (!isAuthenticated) {
  //         push('/auth/login');
  //       }
  //       if (isAuthenticated && user.activePlan) {
  //         push('/');
  //       }
  //     }, 1000);
  //   }, [isAuthenticated, push, user.activePlan]);

  return (
    <div className="App">
      <PayPalButtons
        style={{
          shape: 'rect',
          layout: 'vertical',
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: process.env.PAYPAL_PLAN_ID || '',
          });
        }}
        onApprove={onApproveHandler}
      />
    </div>
  );
}

export default PayPalCheckout;
