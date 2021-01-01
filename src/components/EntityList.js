import React, { useContext } from 'react'
import Entity from './Entity'
import { EntityContext } from '../context/index'

export default function EntityList() {
  const appContext = useContext(EntityContext)
  const { siteConfig, entityList } = appContext

  return (
    <>
      <div className="container my-5 home-button">
        <div className=" d-flex d-flex justify-content-center mb-3">
          <h1 className="text-slaned ">{siteConfig.id ? siteConfig.heading : "Invalid Site"}</h1>
        </div>

        {entityList.length ? 
        <div className="row recipe-list">
          {entityList.map((entity, index) => {
            return <Entity
              key={index} entity={entity} />
          })}
        </div> : 
        <div className="card">No data available</div>
        }
      </div>
    </>
  )
}
