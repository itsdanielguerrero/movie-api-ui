import React, { useState } from 'react'

export default () => {
  const [filter, setFilter] = useState()

  return (
    <div className="page">
      <div className="title">AFI's top Movies</div>
      <div className="subtitle">A searchable list of all your favorite heroes</div>
      <input type="text" name="search" onChange={event => setFilter(event.target.value)} />
      <div className="filter">{filter}</div>
    </div>
  )
}