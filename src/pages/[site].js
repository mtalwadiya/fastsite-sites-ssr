import { useContext, useEffect } from 'react';
import EntityList from '../components/EntityList';
import EntitySearch from '../components/EntitySearch'
import Loading from '../components/Loading'
import { EntityContext } from '../context/index'
import {createClient} from '@astrajs/collections'


function Site({ config, entities }) {
  const appContext = useContext(EntityContext)
  const { setSiteConfig, setEntities, setEntityList } = appContext
  
  useEffect(() => {
    if(config && config.id){
      setSiteConfig(config);
    }
    if(entities && entities.length){
      setEntities(entities);
      setEntityList(entities);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps */

  return (
    <div>
        <EntitySearch />
        <Loading />
        <EntityList />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps({ query }) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  })

  const collection = "sites";
  const site = query.site;
  let opt = {}; 
  let config = {};
  let entities = [];

  if(query.cat){
    opt = { category: { $eq: query.cat } }
  }

  let coll = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection(collection);

  try {
    config = await coll.get(site);
    coll = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection(site);
    entities = await coll.find(opt);
    entities = Object.keys(entities).map((i) => entities[i])

  } catch (e) {
    console.error(e);
  }

  // Pass data to the page via props
  return { props : {config, entities} }
}

export default Site;
