import React, { useState, useEffect } from 'react'

const EntityContext = React.createContext()

const EntityProvider = (props) => {
  const [sites, setSites] = useState([])
  const [entities, setEntities] = useState([])
  const [entityList, setEntityList] = useState([])
  const [cat, setCat] = useState('')
  const [siteConfig, setSiteConfig] = useState({id: '', categories: [], name: "FastSite", heading: "List"})


  const handleSelectChange = (e) => {
    setCat(e.target.value);
  }

  useEffect(() => {
    if(siteConfig.id){
      if(cat){
        setEntityList(entities.filter((item) => item.category == cat));
      }else{
        setEntityList(entities);
      }
    }
  }, [cat]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <EntityContext.Provider value={{
      siteConfig,
      cat,
      entities,
      entityList,
      sites,
      setEntities,
      setEntityList,
      setSiteConfig,
      setSites,
      handleSelectChange
    }}>
      {props.children}
    </EntityContext.Provider>
  )
}
const EntityConsumer = EntityContext.Consumer
export { EntityProvider, EntityConsumer, EntityContext }
