import { ApiClient, DefaultApi} from "finnhub"

const api_key = ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY
const finnhubClient = new DefaultApi()

export {finnhubClient}