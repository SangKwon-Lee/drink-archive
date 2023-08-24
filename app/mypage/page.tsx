import axios from 'axios';
import { UserInfoType } from 'type';
import { cookies } from 'next/headers';
import MypagePage from '@components/page/Mypage';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
async function getUserId() {
  const userToken = cookies().get('_ga_t')?.value;
  try {
    const { data, status } = await axios.get<UserInfoType>(`${API_HOST}/users/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    if (status === 200) {
      return data;
    } else {
      return {
        id: 0,
        username: '',
        nickname: ''
      };
    }
  } catch (e) {
    return {
      id: 0,
      username: '',
      nickname: ''
    };
  }
}

export default async function Mypage() {
  const userInfo = await getUserId();
  return <MypagePage userInfo={userInfo} />;
}
