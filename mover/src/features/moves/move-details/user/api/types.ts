export type PayRequestType = {
  move_id: number;
  amount: number;
};

export type PayResponseType = {
  data: {
    payment_intent: {
      id: string;
      client_secret: string;
    };
    amount: number;
  };
};

export type StartMoveRequestType = {
  move_id: number;
};

export type FinishMoveRequestType = {
  move_id: number;
};

export type ConfirmMoverStartRequestType = {
  move_id: number;
  mover_id: number;
};

export type ConfirmMoverFinishRequestType = {
  move_id: number;
  mover_id: number;
};
