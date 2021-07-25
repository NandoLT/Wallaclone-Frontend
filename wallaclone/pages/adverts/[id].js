import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import statusEnum from '../../utils/advertsEnum';

const advert = () => {

    const router = useRouter();
    const { id } = router.query;
    const [advert, setAdvert] = useState(null);

    useEffect(() => {
        (async () => {
            if (id) {
                const advert = await getAdvertDetail(id);
                setAdvert(advert);
            }
        })()

    }, [id])


    return (
        <div>
            {advert ?
                <div>
                    <img src={advert.photo ? advert.photo : '/img/image-not-available.png'} />
                    {advert.name} |
                    {advert.price} |
                    {statusEnum[advert.status]} |
                    <ul>
                        {advert.tags.map(tag => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul>
                </div>

                : ''
            }

        </div>
    );
}

export default advert