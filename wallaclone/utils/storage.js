const storage = {
    get(key) {
        if (typeof window !== "undefined"){
            const value = localStorage.getItem(key);
            if (!value) {
                const value = sessionStorage.getItem(key);
                return value;
            }
            return value;
        }
        return null        
    },

    set(key, value, remember) {
        if (typeof window !== "undefined"){
            if(remember){
                localStorage.setItem(key, JSON.stringify(value)); 
            }
                sessionStorage.setItem(key, JSON.stringify(value));        
                   
        }
    },

    remove(key) {
        if (typeof window !== "undefined"){
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
            
        }
    },

    clear() {
        if (typeof window !== "undefined"){
            localStorage.clear();
            sessionStorage.clear();
        }
    },
};

export default storage;
