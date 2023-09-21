import axios from 'axios';
import BeerDetailPage from '@components/page/BeerDetail';
import { cookies } from 'next/dist/client/components/headers';
import { redirect } from 'next/navigation';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
async function getBeerDetail(id: any) {
  const newId = id.split('-').at(-1);
  try {
    const { data, status } = await axios.get(`${API_HOST}/beers/${newId}?populate=thumbnail`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    if (status === 200 && data.data) {
      return data.data;
    } else {
      return redirect('/404');
    }
  } catch (e) {
    return redirect('/404');
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
