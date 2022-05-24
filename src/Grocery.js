import {FaTrash} from 'react-icons/fa'
const Grocery = ({grocery,handleCheck,deleteGrocery}) => {
    return  (
        <div className='grocery' key={grocery.id} >
                        <input 
                            type="checkbox"
                            checked={grocery.checked}
                            onChange={() => handleCheck(grocery.id)}

                        />
                        <label className={grocery.checked ? 'line-through' : 'underline'} onDoubleClick={() => handleCheck(grocery.id)}>{grocery.item}</label>
                        <FaTrash role='button' className='trash' aria-label='button' onClick={() => deleteGrocery(grocery.id)} />
                    </div>
    )
}
export default Grocery