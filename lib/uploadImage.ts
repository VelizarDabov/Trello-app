import {ID, storage} from '@/appwrite'

const uploadImage = async (file:File) => {
    if(!file) return;

    const fileUploaded = await storage.createFile(
'655358e56d11a3c119ee',
        ID.unique(),
        file
    )
    return fileUploaded
}
export default uploadImage