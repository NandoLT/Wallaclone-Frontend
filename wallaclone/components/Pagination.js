import { Link } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTotalAdverts } from '../store/selectors';

const Pagination = () => {

    const totalAdverts = useSelector(getTotalAdverts);
    const paginations = Math.ceil(totalAdverts / 8);
    const numbers = []

    for (let index = 0; index < paginations; index++) {
        numbers.push(index + 1)
    }

    return (
        <div className="pagination">
            <ul>
                {numbers.map(number => {
                    return <Link href={`/adverts?limit=8&skip=${(number - 1) * 8}`} key={number}> <li>{number}</li></Link>
                })}
            </ul>
        </div>
    )
}

export default Pagination;