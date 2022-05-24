const handleApiRequest = async (url='',postData=null,err=null) => {
    try {
        const response = await fetch(url,postData);
        if(!response.ok) throw new Error("Please reload the app")

        
    } catch(errmsg) {
        err = errmsg.message;
    } finally {
        return err;
    }
}
export default handleApiRequest