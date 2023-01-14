import propTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {

  return (
    <header className='header'>
       <h1 style={{}}>{title}</h1>
       <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} /> 
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}


// const headingStyle = {
//    color: "red",
//    backgroundColor: "yellow",
//    padding: '10px 40%',
//    margin: '0px'
// }


Header.propTypes = {
  title: propTypes.string.isRequired, 
}

export default Header