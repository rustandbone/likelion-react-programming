import { node, oneOf, bool } from 'prop-types';
import S from './Button.module.css'

export function Button({type = 'button', children, secondary, ...restProps}) {
  return (
    <button
      type={type}
      className={secondary ? S.secondary : S.primary}
      {...restProps}
    >{children}
    </button>
  )
}

Button.propTypes = {
  secondary: bool,
  type: oneOf(['submit', 'reset', 'button']),
  children: node.isRequired,
}

Button.Group = function ButtonGroup({children}) {
  return (
    <div className="flex gap-2 mt-5">
      {children}
  </div>
  )
}

Button.Group.propTypes = {
  children: node
}