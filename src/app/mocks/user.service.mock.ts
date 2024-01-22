
import {User} from "../account/model/model.module";

const mockUser1: User = {
  id:1,
  account:undefined,
  address:undefined,
  firstName:"Pera",
  lastName:"Peric",
  lastPasswordResetDate:undefined,
  phoneNumber:"123",
  picturePath:"/putanja"
};

const mockUser2 = null;

export {mockUser1, mockUser2};
