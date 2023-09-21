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
      const { data: myRating } = await axios.get(`${API_HOST}/my-rating-beer-count/${data.id}`);
      return {
        ...data,
        ...myRating
      };
    } else {
      return {
        id: 0,
        username: '',
        nickname: '',
        count: 0,
        reviewAvg: 0
      };
    }
  } catch (e) {
    return {
      id: 0,
      username: '',
      nickname: '',
      count: 0,
      reviewAvg: 0
    };
  }
}

export default async function Mypage() {
  const userInfo = await getUserId();
  return <MypagePage userInfo={userInfo} />;
}
