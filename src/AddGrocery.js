import { FaPlus } from "react-icons/fa"
const AddGrocery = ({handleSubmit,newGrocery,setNewGrocery}) => {
    return (
        <div className='form-container'>

            <form onSubmit={handleSubmit}>
                <br />
                
                <input 
                    type="text" 
                    name="add" 
                    id="add" 
                    value={newGrocery}
                    placeholder='Add grocery'
                    onChange={(e) => setNewGrocery(e.target.value)}
                />
                <button type="submit">
                    <FaPlus role="button" 
                        aria-label="button"
                        className="add-button"
                    />
                </button>
                
            </form>

        </div>
    )
}
export default AddGrocery