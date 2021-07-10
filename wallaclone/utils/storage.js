

const storage = {


    get(key) {
        if (typeof window !== "undefined"){

            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }
            return value;
        }

        return null
        
    },

    set(key, value) {
        if (typeof window !== "undefined"){

            localStorage.setItem(key, JSON.stringify(value));
        }
    },

    remove(key) {
        if (typeof window !== "undefined"){

            localStorage.removeItem(key);
        }
    },

    clear() {
        if (typeof window !== "undefined"){

            localStorage.clear();
        }
    },
};

export default storage;
