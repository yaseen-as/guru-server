

export type UniqueUserKey = {
    email?: string;
    phoneNumber?: string;
  } & (
    | { email: string; phoneNumber?: undefined } 
    | { email?: undefined; phoneNumber: string }
  );