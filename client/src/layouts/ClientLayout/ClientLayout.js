import React from 'react'

export function ClientLayout(props) {
    const { children } = props;

  return (
    <div>
        <h1>Estamos en Client Layout</h1>

        {children}
    </div>
  )
}
