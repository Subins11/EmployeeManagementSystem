export interface Employee {
    id: number;
    fullName: string;
    jobRole: string;
    age: number;
    dateOfBirth: Date;
    image: any;
    bloodGroup: string;
    gender: string;
    email: string;
    mobile: number;
    status: 'active' | 'inactive';
  }