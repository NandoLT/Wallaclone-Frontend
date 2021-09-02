import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { getAdvertDetail } from '../api/adverts';
import parseAuthToken from '../utils/parseAuthToken';


const useStyles = makeStyles((theme) => ({
    conversation: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        border: '1px solid',
        borderColor: theme.palette.text.secondary,
        borderRadius: 12,
        '&:hover': {
            backgroundColor: '#E5F1F4'
        }
    },
    title: {
        fontSize: '1.5em'

    }
}))

const ChatLink = ({ conversation, action }) => {
    const classes = useStyles();
    const [product, setProduct] = useState();



    useEffect(() => {
        async function fetch() {
            const response = await getAdvertDetail(conversation.productId)
            setProduct(response);
        }
        fetch();
    }, [])



    return (
        <div className={classes.conversation} onClick={action}>
            <span>{product ? product.name : ''}</span>
        </div>
    );
}


export default ChatLink;