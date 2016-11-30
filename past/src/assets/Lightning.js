// Lightning icon for quick download feature
import React from 'react'
import pure from 'recompose/pure'
import SvgIcon from 'material-ui/SvgIcon'

let Lightning = (props) => (
  <SvgIcon {...props}>
    <path d="m11-2.86e-8-8.86 9.2h5.54l-2.29 6.8 8.51-8.8h-5.4z"/>
  </SvgIcon>
)
Lightning = pure(Lightning)
Lightning.displayName = 'Lightning'
Lightning.muiName = 'SvgIcon'

export default Lightning
