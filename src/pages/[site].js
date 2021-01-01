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

// This function gets called at build time
export async function getStaticPaths() {
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

  // Get the paths we want to pre-render based on posts
  const paths = sites.map((site) => `/${site.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


// This gets called on every request
export async function getStaticProps({ params }) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  })

  const collection = "sites";
  const site = params.site;
  let config = {};
  let entities = [];

  let coll = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection(collection);

  try {
    config = await coll.get(site);
    coll = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection(site);
    entities = await coll.find();
    entities = Object.keys(entities).map((i) => entities[i])

  } catch (e) {
    console.error(e);
  }

  // Pass data to the page via props
  return { props : {config, entities} }
}

export default Site;
