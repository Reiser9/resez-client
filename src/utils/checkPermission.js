export const checkPermission = (permissions, permission) => {
    if(!permissions){
        return false
    }
    
    for(let i = 0; i < permissions.length; i++){
        if(permission.includes(permissions[i].permission)){
            return true;
        }
    }

    return false;
}