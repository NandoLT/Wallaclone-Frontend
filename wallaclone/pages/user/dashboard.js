import { useRouter } from "next/router"
import { useEffect } from "react";


const Redirect = () => {
    const router = useRouter();


    useEffect(() => {
        router.replace('/user/dashboard/me')
    })

    return (
        <div>

        </div>
    );
}

export default Redirect