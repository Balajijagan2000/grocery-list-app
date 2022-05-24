
import Grocery from './Grocery'

const Content = ({groceries,handleCheck,deleteGrocery}) => {
   


    return (
    <div className="content">
       
        {
            groceries.length > 0 ?
            (
                groceries.map((grocery) => {

                   return  (<Grocery 
                    key={grocery.id}
                    grocery={grocery}
                    handleCheck={handleCheck}
                    deleteGrocery={deleteGrocery}
                    />)

                })
            ) : (
                <h3 style={{color:'darkgreen'}}>No Groceries</h3>
            )
        }
        
        
    </div>
    )
}
export default Content