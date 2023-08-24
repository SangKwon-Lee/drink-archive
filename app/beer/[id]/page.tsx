import axios from 'axios';
import BeerDetailPage from '@components/page/BeerDetail';
import { cookies } from 'next/dist/client/components/headers';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
async function getBeerDetail(id: any) {
  try {
    const { data, status } = await axios.get(`${API_HOST}/beers/${id}?populate=thumbnail`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    if (status === 200 && data.data) {
      return data.data;
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
}

async function getUserId() {
  const userToken = cookies().get('_ga_t')?.value;
  try {
    const { data } = await axios.get(`${API_HOST}/users/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return data.id;
  } catch (e) {
    return 0;
  }
}

export default async function BeerDetail(props: any) {
  const data = await getBeerDetail(props.params.id);
  const userId = await getUserId();
  return <BeerDetailPage data={data} userId={userId} />;
}
