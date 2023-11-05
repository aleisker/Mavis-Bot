type TinyInt = 1 | 0 | boolean;

export default interface Tables {
  Staffs: {
    StaffId: string;
    SPPoints: number;
    MOPoints: number;
    ARPoints: number;
    TKClaimed: number;
    TUAmount: number;
    TDAmount: number;
  };
  Tickets: {
    TicketId: string;
    OwnerId: TinyInt;
    Handled: TinyInt;
  };
}
