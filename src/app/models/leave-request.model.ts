export interface LeaveRequest {
    id: number;
    fullName: string,
    leaveType : string;
    startDate : Date;
    endDate : Date;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}