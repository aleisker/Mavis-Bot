type TinyInt = 1 | 0 | boolean;

export default interface Tables {
	Staffs: {
		StaffId: string;
		SPLevel: number;
		SPPoints: number;
		SPRequired: number;
		MOLevel: number;
		MOPoints: number;
		MORequired: number;
		ARLevel: number;
		ARPoints: number;
		ARRequired: number;
		TKClaimed: number;
		TUAmount: number;
		TULevel: number;
		TURequired: number;
		TDAmount: number;
	};
	Tickets: {
		TicketId: string;
		OwnerId: TinyInt;
		Handled: TinyInt;
	};
}
