import "../styles/globals.css";
import "../styles/tailwind.css";
import Layout from "../components/Layout/layout";
import {wrapper} from "../store/store";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { setMenuItems } from "../store/menuSlice";
import {storefront} from "../utils";
import {getMenuCollections} from "../utils/queries";
import dynamic from "next/dynamic";
const YotpoScript = dynamic(() => import('../components/Yotpo/YotpoScript'), { ssr: false });

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getStoreCollections = async () => {
      const result = await storefront(getMenuCollections);
      const { data: {menu}} = result;
       dispatch(setMenuItems(JSON.parse(JSON.stringify(menu))));
    };
    getStoreCollections();
  }, [Component, pageProps]);

 return <Layout>
     <YotpoScript />
    <Component {...pageProps} />
  </Layout>;
};

export default wrapper.withRedux(App);
