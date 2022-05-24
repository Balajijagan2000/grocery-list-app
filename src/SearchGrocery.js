const SearchGrocery = ({search,setSearch}) => {
    return (
        <div className='form-container'>

            <form >
                
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    value={search}
                    placeholder='Search Grocery'
                    onChange={(e) => setSearch(e.target.value)}
                />
               
            </form>

        </div>
    )
}
export default SearchGrocery