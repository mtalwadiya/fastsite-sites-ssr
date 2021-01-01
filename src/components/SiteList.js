import React, { useContext } from 'react'
import { EntityContext } from '../context/index'
import Link from 'next/link'

export default function SiteList() {
  const appContext = useContext(EntityContext)
  const { sites } = appContext

  return (
    <>
      <div className="container my-5 home-button">
        <div className=" d-flex d-flex justify-content-center mb-3">
          <h1 className="text-slaned ">Available Sites: </h1>
        </div>

        {sites.length ? 
        <div>
          {sites.map((site, index) => {
            return <div key={index}><Link href={"/" + site.id} ><a>{site.name} </a></Link><br></br></div>
          })}
        </div> : 
        <div className="card">No data available</div>
        }
      </div>
    </>
  )
}
