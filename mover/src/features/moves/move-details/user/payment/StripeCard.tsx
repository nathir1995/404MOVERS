import React from "react";

import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { Elements, useStripe, CardElement } from "@stripe/react-stripe-js";

import colors from "@/assets/scss/colors.module.scss";
import QueryStatus from "@/components/QueryStatus";
import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";
import Button from "@/components/Button";
import { usePayForMove } from "../api";
import Move from "@/models/Move/Move.model";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import usePopup from "@/hooks/usePopup";
import ConfirmPaymentPopup from "./ConfirmPaymentPopup";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type IProps = {
  move: Move;
};

const Content = ({ move }: IProps) => {
  const router = useRouter();
  const stripe = useStripe();
  const [card, setCard] = React.useState<StripeCardElementChangeEvent>();
  const confirmPopup = usePopup();

  const {
    mutate: pay,
    isError,
    isLoading,
  } = usePayForMove({
    onSuccess() {
      toast.success("Payment Succeeded");
      router.replace(sm.portal.user.moves.details.navLink(move.id));
    },
  });

  const amount = move.expected_price;
  const handlePay = () => {
    pay({ move_id: move.id, amount });
  };

  if (!stripe) {
    return (
      <QueryStatus isLoading isError={false} style={{ minHeight: "100%" }} />
    );
  }
  return (
    <>
      {isLoading && <LoadingBackdrop />}
      <ConfirmPaymentPopup
        popup={confirmPopup}
        onConfirm={handlePay}
        amount={move.expected_price}
      />
      <div className={moveCardStyles.header} style={{ marginBottom: "1rem" }}>
        <h5 style={{ textTransform: "uppercase" }}>
          <span style={{ color: colors.primary }}>Credit Card</span> Details
        </h5>
      </div>
      <div className="card-element-container">
        <CardElement
          options={{
            hidePostalCode: true,
          }}
          onChange={setCard}
        />
      </div>
      {isError && (
        <p
          style={{
            lineHeight: 1.2,
            marginTop: ".75rem",
            fontSize: ".8em",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          An Error Occured, Please try again
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Button
          type="button"
          style={{ padding: ".5rem 2rem" }}
          isDisabled={!card?.complete}
          isLoading={isLoading}
          onClick={confirmPopup.handleOpen}
        >
          PAY
        </Button>
      </div>
    </>
  );
};

const StripeCard = ({ move }: IProps) => {
  return (
    <Elements stripe={stripePromise}>
      <div className={moveCardStyles.container}>
        <Content move={move} />
      </div>
    </Elements>
  );
};

export default StripeCard;
