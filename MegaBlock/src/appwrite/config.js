import conf from "../conf/conf";
import {Client , ID , Databases ,Storage , Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriterUrl)
        .setProject(conf.appwriterProject);
        this.databases = new  Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriterDatabase,
                conf.appwriterCollection,
                slug,
                {
                title,content,featuredImage,status,userId
                }
            )
        } catch (error) {
            console.log("Appwriter::",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriterDatabase,
                conf.appwriterCollection,
                slug,{
                    title,content,featuredImage,status,
                }
            )
        } catch (error) {
            console.log("Appwriter:: erro",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriterDatabase,
                conf.appwriterCollection,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite::eroor",error);
            return false;
        }
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriterDatabase,
                conf.appwriterCollection,
                slug
            )
        } catch (error){
            console.log("Appwrite service::", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriterDatabase,
                conf.appwriterCollection,
                queries,100,0
            )
        } catch (error) {
            console.log("Appwriter:: error",error);
            return false
        }
    }


//FILE UPLODED SERVICE


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriterBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite::",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                appwriterBucket,
                fileId
            )
            return true;
        } catch (error) {
            console.log(
                "appwrite::error"
            )
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriterBucket,
            fileId
        )
    }
}


const service = new Service()

export default service