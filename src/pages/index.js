import { useContext, useEffect } from 'react';
import SiteList from '../components/SiteList';
import EntitySearch from '../components/EntitySearch'
import Loading from '../components/Loading'
import { EntityContext } from '../context/index'
import {createClient} from '@astrajs/collections'


function HomePage({sites}) {
  const appContext = useContext(EntityContext)
  const { setSites } = appContext

  useEffect(() => {
    if(sites && sites.length){
      setSites(sites);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps */

  return (
    <div>
        <EntitySearch />
        <Loading />
        <SiteList />
    </div>
  );
}

// This gets called on every request
export async function getStaticProps({ query }) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  })

  const collection = "sites";
  let sites = [];

  const coll = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection(collection);

  try {
    sites = await coll.find();
    sites = Object.keys(sites).map((i) => sites[i])

  } catch (e) {
    console.error(e);
  }

  // Pass data to the page via props
  return { props : {sites} }
}

export default HomePage;
