import axios from 'axios';
import BeerDetailPage from '@components/page/beerDetail';
async function getBeerDetail(id: any) {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
  try {
    const { data, status } = await axios.get(`${API_HOST}/beers/${id}?populate=deep`, {
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
export default async function BeerDetail(props: any) {
  const data = await getBeerDetail(props.params.id);
  return <BeerDetailPage data={data} />;
}
