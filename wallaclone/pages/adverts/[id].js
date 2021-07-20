import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';


const advert = () => {

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        /* const advert = getAdvertDetail(id); */
    });


    return (
        <div>
            {id}
        </div>
    );
}

export default advert