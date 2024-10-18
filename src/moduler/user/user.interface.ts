export type Tuser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  timestamps: Date;
};

export type TNewUser = {
  password: string;
  role: string;
  id: string;
};
