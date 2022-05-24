
import './App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import {useState,useEffect} from 'react'
import AddGrocery from './AddGrocery';
import SearchGrocery from './SearchGrocery';
import {RiLoader4Fill} from 'react-icons/ri'
import handleApiRequest from './apiRequest';
function App() {
  //API URL
  const URL = 'http://localhost:5000/groceries';
  //Grocery Items
  const [groceries,setGroceries] = useState([])
  const [newGrocery,setNewGrocery] = useState('')
  const [search,setSearch] = useState('')
  const [errormessage,setErrorMessage] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
// useEffect(() => {
//   localStorage.setItem("groceries",JSON.stringify(groceries));
// },[groceries])

useEffect(() => {
  
    const fetchItems = async () => {
        try {
            const response = await fetch(URL);
            if(!response.ok) {
              throw Error("Unable to fetch data")
            }
            setErrorMessage(null)
            const data = await response.json();
            setGroceries(data);
        }
      catch(err) {
        // console.log(err.message)
        setErrorMessage(err.message)
        }finally {
          setIsLoading(false)
        }
    }
    (async () => await fetchItems())()
    
},[])
//Set localstorage
// const setLocalStorageAndState = (groceryItems) => {
  
  
// }
const handleSubmit = async (e) => {
  e.preventDefault()
  
  if(!newGrocery) {
    return;
  }
  let groceryItems,newItem;
  newItem = groceries.length > 0 ? 
  {id:groceries[groceries.length-1].id+1,item:newGrocery,checked:false}
  : {id:1,item:newGrocery,checked:false};   
  
  groceryItems = [...groceries,newItem];
   
  setGroceries(groceryItems)
  setNewGrocery('')

  const request = {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newItem)
  }
  const response = await handleApiRequest(URL,request);
  if (response) {
    setErrorMessage(response)
  } 
}
//Handle the check box of grocery
const handleCheck = async (id) => {
  const groceryItems = groceries.map((grocery) => 
     (grocery.id === id ? {...grocery,checked:!grocery.checked} : grocery)
  )
  // setLocalStorageAndState(groceryItems)
  
  setGroceries(groceryItems)
  const newItem = groceryItems.filter((item) => item.id === id)
  console.log(newItem[0])

  const request = {
    method:'PUT',
  
    header: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({item:newItem[0].item,checked:newItem[0].checked})

  }
  const url = `${URL}/${id}`;
  const response = await handleApiRequest(url,request);
  if(response) {
    
    setErrorMessage(response);
  }
}
//Handling the delete grocery function
const deleteGrocery = async (id) => {
  const groceryItems = groceries.filter( (grocery) => grocery.id !== id)
  // setLocalStorageAndState(groceryItems)
  setGroceries(groceryItems)

  const request = {
    method:'DELETE',
    header: {
      'Content-Type':'application/json'
    }
    
  }
  const url = `${URL}/${id}`
  const response = await handleApiRequest(url,request);
  if(response) {
    setErrorMessage(response)
  }

}
  return (
    <div className="App">
      <Header />
      
      <SearchGrocery search={search} setSearch={setSearch} />

      <AddGrocery 
        handleSubmit={handleSubmit} 
        newGrocery={newGrocery}
        setNewGrocery={setNewGrocery}
      />
      {isLoading && <RiLoader4Fill className="loader" />}
      {errormessage && <h3 style={{color:'darkgreen'}}>{errormessage}</h3>}

      {!errormessage && !isLoading &&
      <Content 
      groceries={groceries.filter((grocery) => {
        return ((grocery.item).toLowerCase().includes(search.toLowerCase()))
      })}
      handleCheck={handleCheck}
      deleteGrocery={deleteGrocery}
      />
      }
   
      
      <Footer length={groceries.length} />
    </div>
  );
}

export default App;
