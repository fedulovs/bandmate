import { setAuthState } from '@/app/store/authSlice';
import { setUserState } from '@/app/store/userSlice';
import { store, useAppSelector } from '@/app/store/store';
import { User } from '@/app/user/types';

// User example
const testUser = {
    about: 'Ja pierdolę patrzcie co spotkałem! bóbr kurwa! ja pierdolę! jakie bydlę! bober! ej, kurwa, bober! bober, nie spierdalaj, mordo! chodź ty, kurwo, do mnie! bober! ale jesteś kurwa duży, ty! bober! ja pierdolę, pierwszy raz w życiu widzę bobra! jakie bydlę jebane! spierdolił do wody i się utopił! Ja pierdolę patrzcie co spotkałem! bóbr kurwa! ja pierdolę! 23',
    bands: ['Kurwa'],
    email: 'test@test.com',
    id: '12345678d',
    name: 'R2-D2',
    tags: ['rock 🎸', 'classical 🎻', 'electronic 👾'],
};

const authenticateTestUser = (user: User) => {
    store.dispatch(setUserState(user));
    store.dispatch(setAuthState(true));
};

export default authenticateTestUser;
