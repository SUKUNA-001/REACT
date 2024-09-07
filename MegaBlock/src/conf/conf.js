const conf = {
    appwriterUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriterProject:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriterDatabase:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriterCollection:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriterBucket:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
     
}


export default conf