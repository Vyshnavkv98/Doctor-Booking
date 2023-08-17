import React, { useEffect, useReducer } from 'react'

    export const ROOT_FOLDER={name:"Root",id:null,path:[]}

    const ACTIONS={
        SELECT_FOLDER:"select_folder",
        UPDATE_FOLDER:"update_folder"
    }

    function reducer(state,{type,payload}){
        switch(type){
            case ACTIONS.SELECT_FOLDER:
                return{
                    ...state,
                    folderId:payload.folderId || null,
                    folder:payload.folder,
                    childFolders:[],
                    childFiles:[]
                }

                case ACTIONS.UPDATE_FOLDER:
                    return{
                        ...state,
                        folder:payload.folder
                    }
        }
    }

function useFolder(folderId=null,folder) {

    const[state,dispatch]=useReducer(reducer,{
        folderId,
        folder,
        childFiles:[],
        childFolders:[]
    })

   useEffect(()=>{
    if(folderId===null){

        return dispatch({
            type:ACTIONS.UPDATE_FOLDER,
            payload:{folder:ROOT_FOLDER}
        })

    }

   },[])

  return state
}

export default useFolder
